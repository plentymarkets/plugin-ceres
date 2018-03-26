window.addEventListener("compile-sassy", function(event) {
    var sass = new Sass();

    // HTTP requests are made relative to worker
    var base = "../../../css/";
    
    // the directory files should be made available in
    var directory = '';
    
    // the files to load (relative to both base and directory)
    var files = [
        "ceres.scss"
    ];
    
    function manipulateVars(content)
    {
        return event.detail.toString().replace(",", " ") + content;
    }

    function replaceCss(compiled)
    {
        var cssNode = document.getElementById("ceres-css");
        document.getElementById("ceres-css").parentNode.removeChild(cssNode);

        var head = document.head || document.getElementsByTagName("head")[0];
        var style = document.createElement("style");

        style.type = "text/css";
        style.id = "ceres-css";

        if (style.styleSheet)
        {
            style.styleSheet.cssText = compiled.text;
        }
        else
        {
            style.appendChild(document.createTextNode(compiled.text));
        }

        head.appendChild(style);
    }
    
    // download the files immediately
    sass.preloadFiles(base, directory, files, function() {
        sass.readFile("ceres.scss", function(read) {
            sass.writeFile("ceres.scss", manipulateVars(read), function(write) {
                sass.compileFile("ceres.scss", function(compiled) {
                    replaceCss(compiled);
                });
            });
        });
    });
}, false);
