const createRenderer = require("vue-server-renderer").createRenderer;
const path = require("path");
const {
    performance
} = require('perf_hooks');

process.stdin.setEncoding("utf8");
process.stdout.setEncoding("utf8");
let domInline = "";

const t0 = performance.now();
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
    try
    {
        const t1 = performance.now();
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
        const t2 = performance.now();

        const scriptPath = path.resolve(process.env.rootDir, '../plugins/sets/31/productive/Ceres/resources/js/dist/ceres-server.js');
        const createApp = require(scriptPath).default;
        const t3 = performance.now();
        const vueApp = createApp({
            template: vueAppHtml
        }).then((vueApp) =>
        {
            twigHtml = twigHtml.replace(vueAppHtml, "<!--vue-ssr-outlet-->");
            // TODO cant this be placed inside the renderToString callback
            twigHtml = twigHtml.replace("<!-- SSR_SCRIPT_CONTAINER -->", `<script type="x-template" id="ssr-script-container">${vueAppHtml}</script>`);

            const t4 = performance.now();
            createRenderer({ template: twigHtml })
                .renderToString(vueApp, (err, renderedHTML) =>
                {
                    if (err)
                    {
                        process.stdout.write(err);
                        process.exit(-3);
                        return;
                    }

                    renderedHTML = renderedHTML.replace(
                        "<!-- INITIAL_STATE -->",
                        `<script>window.__INITIAL_STATE__ = ${JSON.stringify(vueApp.$store.state)}</script>`);

                    const t5 = performance.now();
                    process.stdout.write(`<!-- read input: ${t0 - t1}ms - processing string: ${t1 - t2}ms - require script: ${t2 - t3}ms - create app: ${t3 - t4}ms - render: ${t4 - t5}ms - total: ${t0 - t5}} -->` + renderedHTML);
                });
        });
    }
    catch (e)
    {
        process.stdout.write(e);
        process.exit(-1);
    }
});

process.exit(0);
