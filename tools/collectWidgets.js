var fs = require('fs');
var path = require('path');
var glob = require('glob');

var WIDGET_FILES = 'resources/views/Widgets/**/*.json';
var TARGET_FILE = 'contentWidgets.json';

function root(dir) {
    return path.resolve(__dirname, '..', dir);
}

console.log("Collecting widget definitions.");
var widgets = glob.sync(root(WIDGET_FILES))
    .map(function (widgetFile)
    {
        return JSON.parse(fs.readFileSync(widgetFile, {encoding: 'utf-8'}))
    });


fs.writeFileSync(root(TARGET_FILE), JSON.stringify(widgets, null, 4), {encoding: 'utf-8'});
console.log("> Done");
