(function($)
{
    var sassContents     = null;
    var loadingProgress  = null;
    var sass             = new Sass();
    var retryCompilation = true;

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

            sass.compile(prefix + "$root-directory: '" + rootPath + "';" + sassContent, function(result)
            {
                if (result.status === 0)
                {
                    retryCompilation = true;
                    replaceCSS(path, result);
                    promise.resolve();
                }
                else if (retryCompilation)
                {
                    sass.destroy();
                    sass = new Sass();
                    retryCompilation = false;
                    compileSass(prefix)
                        .done(promise.resolve)
                        .fail(promise.reject);
                }
                else
                {
                    promise.reject();
                }
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

    loadSassContent();
    window.addEventListener("message", function(event)
    {
        if (event.data.name === "sassy-compile")
        {
            showTerraLoadingOverlay(true);
            loadSassContent()
                .done(function()
                {
                    compileSass(
                        event.data.data.join(" ")
                    )
                    .done(function()
                    {
                        showTerraLoadingOverlay(false);
                    });
                });

        }
    }, false);
})(jQuery);
