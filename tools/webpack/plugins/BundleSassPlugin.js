const fs = require('fs');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const postcssSCSS = require('postcss-scss');

const pluginRoot = (dir) =>
{
    return path.resolve(__dirname, '../../../', dir);
};

class ImportTree
{
    constructor( filename )
    {
        this.imports = [];
        this.filename = filename;
        this.fileContent = [];
    }

    parseImports()
    {
        let fileContent = "";
        try
        {
            fileContent = fs.readFileSync( this.filename, {encoding: 'utf-8'});
        }
        catch( e )
        {
            console.log( e );
        }

        if ( fileContent && fileContent.length > 0 )
        {
            this.fileContent = fileContent.split("\n");
            this.fileContent
                .forEach((line, index) =>
                {
                    const match = /^[^@]?(@import\s?(?:"([^"]+)"|'([^']+)');).*$/.exec(line);
                    if ( match )
                    {
                        const importStmt = match[1];
                        const importFile = this._resolveImportPath( match[2] );
                        this.imports.push({
                            line: index,
                            start: line.indexOf(importStmt),
                            end: line.indexOf(importStmt) + importStmt.length,
                            tree: new ImportTree( importFile )
                        });
                    }
                });

            this.imports.forEach((importEntry) =>
            {
                importEntry.tree.parseImports();
            });
        }
    }

    _resolveImportPath( importPath )
    {
        let resolvedPath = '';

        if (importPath.charAt(0) === '~')
        {
            resolvedPath = pluginRoot('node_modules/' + importPath.substr(1));
        }
        else
        {
            resolvedPath = path.resolve(
                path.dirname(this.filename),
                importPath
            );
        }

        if (!fs.existsSync(resolvedPath) || !fs.lstatSync(resolvedPath).isFile())
        {
            if (resolvedPath.substr(-5, 5) !== ".scss")
            {
                resolvedPath += ".scss";
            }

            if (!fs.existsSync(resolvedPath))
            {
                resolvedPath = path.resolve(
                    path.dirname(resolvedPath),
                    "_" + path.basename(resolvedPath)
                );
            }
        }

        return resolvedPath;
    }

    toString()
    {
        if ( this.imports.length > 0 )
        {
            var self = this;
            this.imports.forEach(function(importEntry)
            {
                var originalLine    = self.fileContent[importEntry.line];
                var prefix          = originalLine.substr(0, importEntry.start);
                var affix           = originalLine.substr( importEntry.end );

                self.fileContent[importEntry.line] = prefix + importEntry.tree.toString() + affix;
            });
        }
        return this.fileContent.join("\n");
    }
}

class SassResolver
{
    constructor( rootSassFile )
    {
        this.rootSassFile = pluginRoot(rootSassFile);
    }

    bundle( targetFile )
    {
        targetFile = pluginRoot(targetFile);
        const importTree = new ImportTree( this.rootSassFile );
        importTree.parseImports();

        const bundleContent = importTree.toString();
        postcss( [autoprefixer()] )
            .process( bundleContent, { from: targetFile, syntax: postcssSCSS })
            .then(function( result )
            {
                fs.writeFileSync( targetFile, result.content );
            })
            .catch(function(err)
            {
                console.log("ERROR: " + err.reason + " at " + err.file + ":" + err.line);
            });
    }
}

class BundleSassPlugin
{
    constructor(active, entries)
    {
        this.active = active;
        this.entries = entries;
    }

    apply(compiler)
    {
        compiler.hooks.beforeRun.tap(
            'BundleSassPlugin',
            (compiler) =>
            {
                if(compiler.options.mode === 'production')
                {
                    this.entries.forEach(entry =>
                    {
                        const resolverBootstrapLegacy = new SassResolver('resources/scss/' + entry);
                        resolverBootstrapLegacy.bundle('resources/css/' + entry);
                    });
                }
            }
        );
    }
}

module.exports = BundleSassPlugin;
