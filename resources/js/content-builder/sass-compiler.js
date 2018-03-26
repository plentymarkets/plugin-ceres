window.addEventListener("compile-sassy", function(event) {
    var sass = new Sass();

    // HTTP requests are made relative to worker
    var base = '../../../css/';
    
    // the directory files should be made available in
    var directory = '';
    
    // the files to load (relative to both base and directory)
    var files = [
        'ceres.scss'
    ];
    
    function manipulateVars(content)
    {
        return event.detail.toString() + content;
    }
    
    // download the files immediately
    sass.preloadFiles(base, directory, files, function() { 
        sass.readFile("ceres.scss", function(read) {
            sass.writeFile("ceres.scss", manipulateVars(read), function(write) {
                sass.compileFile("ceres.scss", function(compiled) {
                    console.log("comp: ", compiled);
                    // set css to head
                    var cssNode = document.getElementById("css");
                    document.getElementById("css").parentNode.removeChild(cssNode);

                    //INSERT NEW STUFF
                });
            });
        });
    });
}, false);
