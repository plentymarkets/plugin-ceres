var fs = require('fs');
var path = require('path');
var glob = require('glob');

var WIDGET_FILES = 'resources/views/Widgets/**/*.json';
var GLOB_FILES   = 'resources/views/Widgets/**/*.inc.json';
var TARGET_FILE  = 'contentWidgets.json';
var INCLUDE_PATTERN = /^@include\(\s*(\S+)\s*\)$/;

console.log("> Collecting widget definitions...");


function root(dir) {
    return path.resolve(__dirname, '..', dir);
}

function readJsonFile(filename)
{
    try {
        return JSON.parse(fs.readFileSync(filename, {encoding: 'utf-8'}));
    }
    catch( e )
    {
        console.error("Cannot read " + filename );
        console.log(e);
    }
}

var globals = {};
var globFiles = glob.sync(root(GLOB_FILES));

globFiles.forEach(function(globFile)
{
    var key = path.basename(globFile, ".inc.json");
    globals[key] = readJsonFile(globFile);
});

function injectGlobals(widgetSettings)
{
    var match;

    Object.keys(widgetSettings || {}).forEach(function(key)
    {
        if ( typeof widgetSettings[key] === "string"
            && (match = INCLUDE_PATTERN.exec(widgetSettings[key])) !== null )
        {
            let basename = path.basename(match[1], ".inc.json");
            if ( globals.hasOwnProperty(basename) )
            {
                widgetSettings[key] = globals[basename];
            }
        }
        else if (typeof widgetSettings[key] === typeof Object())
        {
            widgetSettings[key] = injectGlobals(widgetSettings[key]);
        }
    });

    return widgetSettings;
}


var widgets = glob.sync(root(WIDGET_FILES))
    .filter(function (widgetFile)
    {
        return globFiles.indexOf(widgetFile) < 0;
    })
    .map(function (widgetFile)
    {
        var widget = readJsonFile(widgetFile);
        widget.settings = injectGlobals(widget.settings);

        return widget;
    });

fs.writeFileSync(root(TARGET_FILE), JSON.stringify(widgets, null, 4), {encoding: 'utf-8'});
console.log("> DONE");
