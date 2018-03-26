var sass = new Sass();

// HTTP requests are made relative to worker
var base = '../../../css/';
// equals 'http://medialize.github.io/sass.js/scss/'

// the directory files should be made available in
var directory = '/';

// the files to load (relative to both base and directory)
var files = [
    'ceres.scss'
];

var vars = [
    '$brand-primary: #008ebd;'
]

function manipulateVars(content)
{
    return vars[0] + content;
}

// download the files immediately
sass.preloadFiles(base, directory, files, function() { 
    console.log('files loaded');
    sass.readFile("ceres.scss", read => {
        sass.writeFile("ceres.scss", manipulateVars(read), write => {
            console.log("write: ", write);
            sass.readFile("ceres.scss", readAE => {
                console.log("read after edit: ", readAE);
            });
            sass.compileFile("ceres.scss", compiled => {
                console.log("comp: ", compiled);
            });
        });
    });
});
