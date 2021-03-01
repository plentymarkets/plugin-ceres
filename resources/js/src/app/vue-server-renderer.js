const createRenderer = require("vue-server-renderer").createRenderer;

process.stdin.setEncoding("utf8");
process.stdout.setEncoding("utf8");
let domInline = "";

process.stdin.on("readable", () =>
{
    let chunk;

    // Use a loop to make sure we read all available data.
    while ((chunk = process.stdin.read()) !== null)
    {
        domInline += chunk;
    }
});

process.stdin.on("end", () =>
{
    let twigHtml = domInline.toString();
    const vueAppMarker = "<!-- VUE_APP -->";
    const vueAppStartIndex = twigHtml.indexOf(vueAppMarker);
    const vueAppEndIndex = twigHtml.lastIndexOf(vueAppMarker);
    const vueAppHtml = twigHtml.substring(vueAppStartIndex, vueAppEndIndex);

    const ceresAppDateMarker = "// CERES_APP_DATA";
    const ceresAppDateStart = twigHtml.indexOf(ceresAppDateMarker);
    const ceresAppDateEnd = twigHtml.lastIndexOf(ceresAppDateMarker);

    let ceresAppData = twigHtml.substring(ceresAppDateStart + ceresAppDateMarker.length, ceresAppDateEnd);

    ceresAppData = ceresAppData.replace("App = ", "").replace(";", "").trim();

    // Translation extraction
    const ceresTranslationRegex = /<script type="application\/json" data-translation="([^"]*)">(.*)<\/script>/g;
    const ceresTranslationMatches = twigHtml.matchAll(ceresTranslationRegex);
    const ceresTranslations = {};
    
    for(const match of ceresTranslationMatches)
    {
        const key = match[1].split('::');
        const group = key[0], name = key[1];

        if(ceresTranslations[group] === undefined)
        {
            ceresTranslations[group] = {};
        }

        ceresTranslations[group][name] = JSON.parse(match[2]);
    }

    global.App = JSON.parse(ceresAppData);
    global.translations = ceresTranslations;

    try
    {
        const createApp = require("../../dist/ceres-server.js").default;
        // const vueAppElement = document.getElementById("vue-app");
        const vueApp = createApp({
            template: vueAppHtml
        }).then((vueApp) =>
        {
            // vueAppElement.parentElement.replaceChild(
            //     document.createComment("vue-ssr-outlet"),
            //     vueAppElement
            // );
            console.log("app created");

            twigHtml = twigHtml.replace(vueAppHtml, "<!--vue-ssr-outlet-->");
            // TODO cant this be placed inside the renderToString callback
            twigHtml = twigHtml.replace("<!-- SSR_SCRIPT_CONTAINER -->", `<script type="x-template" id="ssr-script-container">${vueAppHtml}</script>`);

            // document.getElementById("ssr-script-container").innerHTML = vueAppElement.outerHTML;

            createRenderer({ template: twigHtml })
                .renderToString(vueApp, (err, renderedHTML) =>
                {
                    if (err)
                    {
                        console.log(err);
                        process.stdout.write(err);
                        return 0;
                    }

                    renderedHTML = renderedHTML.replace(
                        "<!-- INITIAL_STATE -->",
                        `<script>window.__INITIAL_STATE__ = ${JSON.stringify(vueApp.$store.state)}</script>`);

                    process.stdout.write(renderedHTML);
                });
        });
    }
    catch (e)
    {
        console.log("error: ", e);
        process.stdout.write("ERROR: ", e);
    }
});
