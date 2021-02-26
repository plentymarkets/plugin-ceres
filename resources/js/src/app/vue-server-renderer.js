const createRenderer = require("vue-server-renderer").createRenderer;
const { JSDOM, VirtualConsole } = require("jsdom");

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
    const virtualConsole = new VirtualConsole().sendTo(console);

    let twigHtml = domInline.toString();
    const vueAppStartIndex = twigHtml.indexOf("<!-- VUE_APP -->");
    console.log("vueAppStartIndex: ", vueAppStartIndex);
    const vueAppEndIndex = twigHtml.lastIndexOf("<!-- VUE_APP -->");
    console.log("vueAppEndIndex: ", vueAppEndIndex);
    const vueAppHtml = twigHtml.substring(vueAppStartIndex, vueAppEndIndex);


    const virtualDom = new JSDOM(
        domInline.toString(),
        {
            runScripts: "dangerously",
            virtualConsole
        }
    );

    // global.document = virtualDom.window.document;
    // global.window = virtualDom.window;
    // global.App = virtualDom.window.App;

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

            twigHtml = twigHtml.replace(vueAppHtml, "<!-- vue-ssr-outlet -->");
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
