const fs = require('fs');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const postcssSCSS = require('postcss-scss');

/*
 CLASS ImportTree
 */
const ImportTree = function( filename )
{
    this.imports = [];
    this.filename = filename;
    this.fileContent = [];
};

ImportTree.prototype.parseImports = function()
{
    let fileContent = "";
    try {
        fileContent = fs.readFileSync( this.filename, {encoding: 'utf-8'});
    } catch( e )
    {
        console.log( e );
    }

    if ( fileContent && fileContent.length > 0 )
    {
        let _this = this;
        this.fileContent = fileContent.split("\n");
        this.fileContent
            .forEach(function(line, index)
            {
                const match = /^[^@]?(@import\s?(?:"([^"]+)"|'([^']+)');).*$/.exec(line);
                if ( match )
                {
                    const importStmt = match[1];
                    const importFile = _this._resolveImportPath( match[2] );
                    _this.imports.push({
                        line: index,
                        start: line.indexOf(importStmt),
                        end: line.indexOf(importStmt) + importStmt.length,
                        tree: new ImportTree( importFile )
                    });
                }
            });

        this.imports.forEach(function(importEntry)
        {
            importEntry.tree.parseImports();
        });
    }
};

ImportTree.prototype._resolveImportPath = function( importPath )
{
    let resolvedPath = path.resolve(
        path.dirname(this.filename),
        importPath
    );

    if ( !fs.existsSync(resolvedPath) || !fs.lstatSync(resolvedPath).isFile() )
    {
        if ( resolvedPath.substr(-5, 5) !== ".scss" )
        {
            resolvedPath += ".scss";
        }

        if ( !fs.existsSync(resolvedPath) )
        {
            resolvedPath = path.resolve(
                path.dirname( resolvedPath ),
                "_" + path.basename( resolvedPath )
            );
        }
    }


    return resolvedPath;
};

ImportTree.prototype.toString = function()
{
    if ( this.imports.length > 0 )
    {
        const self = this;
        this.imports.forEach(function(importEntry)
        {
            let originalLine    = self.fileContent[importEntry.line];
            let prefix          = originalLine.substr(0, importEntry.start);
            let affix           = originalLine.substr( importEntry.end );

            self.fileContent[importEntry.line] = prefix + importEntry.tree.toString() + affix;
        });
    }
    return this.fileContent.join("\n");
};

/*
 CLASS: SassResolver
 */

const SassResolver = function ( rootSassFile )
{
    this.rootSassFile = path.resolve(
        __dirname,
        rootSassFile
    );
};

SassResolver.prototype.bundle = function( targetFile )
{
    targetFile = path.resolve(
        __dirname,
        targetFile
    );
    const importTree = new ImportTree( this.rootSassFile );
    importTree.parseImports();

    const bundleContent = importTree.toString();
    const prefixOptions = {
        browsers: [
            "last 2 versions",
            "> 5%",
            "Firefox ESR"
        ]
    };
    postcss( [autoprefixer(prefixOptions)] )
        .process( bundleContent, { from: targetFile, syntax: postcssSCSS })
        .then(function( result )
        {
            fs.writeFileSync( targetFile, result.content );
        });
};

console.log("Start bundling scss");
const resolverBootstrap = new SassResolver('resources/scss/Ceres.scss');
resolverBootstrap.bundle('resources/css/ceres.scss');
console.log("=> done!");