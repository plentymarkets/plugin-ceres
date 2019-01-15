var fs = require('fs');
var path = require('path');
var glob = require('glob');

var WIDGET_FILES = 'resources/views/Widgets/**/*.json';
var GLOB_FILES   = 'resources/views/Widgets/**/*.glob.json';
var TARGET_FILE  = 'contentWidgets.json';
var INCLUDE_PATTERN = /^@glob\((\w+)\)$/;

console.log("Collecting widget definitions.");


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
    var key = path.basename(globFile, ".glob.json");
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
            if ( globals.hasOwnProperty(match[1]) )
            {
                widgetSettings[key] = globals[match[1]];
            }
        }
        else if (!!widgetSettings[key].children)
        {
            widgetSettings[key].children = injectGlobals(widgetSettings[key].children);
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
console.log("> Done");
