var sass = new Sass();

// HTTP requests are made relative to worker
var base = '../../../css/';

// the directory files should be made available in
var directory = '';

// the files to load (relative to both base and directory)
var files = [
    'ceres.scss'
];

var vars = [
    '$brand-primary: #808080;'
]

function manipulateVars(content)
{
    return vars[0] + content;
}

// download the files immediately
sass.preloadFiles(base, directory, files, function() { 
    sass.readFile("ceres.scss", function(read) {
        sass.writeFile("ceres.scss", manipulateVars(read), function(write) {
            sass.compileFile("ceres.scss", function(compiled) {
                console.log("comp: ", compiled);
                // set css to head
            });
        });
    });
});
