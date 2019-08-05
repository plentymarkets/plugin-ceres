var fs = require('fs');
var path = require('path');
var autoprefixer = require('autoprefixer');
var postcss = require('postcss');
var postcssSCSS = require('postcss-scss');
var glob = require('glob');

/*
 CLASS ImportTree
 */
var ImportTree = function( filename )
{
    this.imports = [];
    this.filename = filename;
    this.fileContent = [];
};

ImportTree.prototype.parseImports = function()
{
    var fileContent = "";
    try {
        fileContent = fs.readFileSync( this.filename, {encoding: 'utf-8'});
    } catch( e )
    {
        console.log( e );
    }

    if ( fileContent && fileContent.length > 0 )
    {
        var _this = this;
        this.fileContent = fileContent.split("\n");
        this.fileContent
            .forEach(function(line, index)
            {
                var match = /^[^@]?(@import\s?(?:"([^"]+)"|'([^']+)');).*$/.exec(line);
                if ( match )
                {
                    var importStmt = match[1];
                    var importFile = _this._resolveImportPath( match[2] );
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
    var resolvedPath = '';

    if (importPath.charAt(0) === '~')
    {
        resolvedPath = path.resolve(__dirname, '../node_modules/' + importPath.substr(1));
    }
    else
    {
        resolvedPath = path.resolve(
            path.dirname(this.filename),
            importPath
        );
    }

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
};

/*
 CLASS: SassResolver
 */

var SassResolver = function ( rootSassFile )
{
    this.rootSassFile = rootSassFile;
};

SassResolver.prototype.bundle = function( targetFile )
{
    var importTree = new ImportTree( this.rootSassFile );
    importTree.parseImports();

    var bundleContent = importTree.toString();
    var prefixOptions = {
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
        })
        .catch(function(err)
        {
            console.log("ERROR: " + err.reason + " at " + err.file + ":" + err.line);
        });
};

glob.sync(path.resolve(__dirname, '../resources/scss/*.scss')).forEach(file =>
{
    if (path.basename(file) !== '_variables.scss')
    {
        (new SassResolver(file)).bundle(
            path.resolve(
                __dirname,
                '../resources/css',
                path.basename(file)
            )
        );
    }

});