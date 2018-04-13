(function($)
{
    var sass            = new Sass();
    var sassContents    = null;
    var loadingProgress = null;

    function loadSassContent()
    {
        if (loadingProgress === null)
        {
            var promises = [];
            var paths = [];

            $("link[data-sass-original]").each(function(i, element)
            {
                paths.push($(element).attr("data-sass-original"));
            });

            paths.forEach(function(path)
            {
                var promise = $.get(path).done(function(sassContent)
                {
                    sassContents = sassContents || {};
                    sassContents[path] = sassContent;
                });

                promises.push(promise);
            });

            loadingProgress = $.when.apply($, promises);
        }
        return loadingProgress;
    }

    function compileSass(prefix)
    {
        var promises = [];

        Object.keys(sassContents).forEach(function(path)
        {
            var sassContent = sassContents[path];
            var promise = $.Deferred();

            var rootPath = path.split("/");

            while (rootPath.pop() !== "resources")
            {
                if (rootPath.length <= 0)
                {
                    break;
                }
            }

            rootPath = rootPath.join("/") + "/resources";

            prefix += "$root-directory: \"" + rootPath + "\";";

            sass.compile(prefix + sassContent, function(result)
            {
                replaceCSS(path, result);
                promise.resolve();
            });

            promises.push(promise);
        });

        return $.when.apply($, promises);
    }

    function replaceCSS(sassPath, compiledCss)
    {
        var head = document.head || document.getElementsByTagName("head")[0];

        $("[data-sass-original=\"" + sassPath + "\"]").each(function(i, element)
        {
            $(element).remove();

            var style = document.createElement("style");

            style.type = "text/css";
            style.dataset.sassOriginal = sassPath;

            if (style.styleSheet)
            {
                style.styleSheet.cssText = compiledCss.text;
            }
            else
            {
                style.appendChild(document.createTextNode(compiledCss.text));
            }

            head.appendChild(style);
        });
    }

    showTerraLoadingOverlay(true);
    loadSassContent();
    window.addEventListener("message", function(event)
    {
        if (event.data.name === "sassy-compile")
        {
            loadSassContent()
                .done(function()
                {
                    return compileSass(
                        event.data.data.join(" ")
                    );
                })
                .done(function()
                {
                    showTerraLoadingOverlay(false);
                });
        }
    }, false);
})(jQuery);
