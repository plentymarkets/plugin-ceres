window.addEventListener("message", function(event)
{
    if(event.data.name == "sassy-compile")
    {
        var sass = new Sass();

        // HTTP requests are made relative to worker
        var base = "../../../css/";

        // the directory files should be made available in
        var directory = '';

        // the files to load (relative to both base and directory)
        var files = [
            "ceres.scss"
        ];

        var rootPath = "..";

        if(document.getElementById("ceres-css").href)
        {
            rootPath = document.getElementById("ceres-css").href.split("/");

            while( rootPath.pop() !== 'resources' )
            {
                if ( rootPath.length <= 0 )
                {
                    break;
                }
            }

            rootPath = rootPath.join("/") + '/resources';
        }

        function manipulateVars(content)
        {
            return event.data.data.join(" ") + '$root-directory: "' + rootPath + '";' + content;
        }

        function replaceCss(compiled)
        {
            var cssNode = document.getElementById("ceres-css");
            document.getElementById("ceres-css").parentNode.removeChild(cssNode);

            var head = document.head || document.getElementsByTagName("head")[0];
            var style = document.createElement("style");

            style.type = "text/css";
            style.id = "ceres-css";
            style.href = rootPath;

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
            document.getElementsByClassName("css-loading")[0].classList.remove("hidden");
            sass.readFile("ceres.scss", function(read) {
                sass.writeFile("ceres.scss", manipulateVars(read), function(write) {
                    sass.compileFile("ceres.scss", function(compiled) {
                        document.getElementsByClassName("css-loading")[0].classList.add("hidden");
                        replaceCss(compiled);
                    });
                });
            });
        });
    }
}, false);
