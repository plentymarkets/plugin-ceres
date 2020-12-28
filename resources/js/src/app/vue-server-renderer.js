const renderer = require("vue-server-renderer").createRenderer();
const jsdom = require("jsdom");
const Vue = require("Vue");
const { JSDOM } = jsdom;

process.stdin.setEncoding("utf8");
let domInline = "";

process.stdin.on("readable", () =>
{
    // We will see later how Symfony communicates on this input
    let chunk;

    // Use a loop to make sure we read all available data.
    while ((chunk = process.stdin.read()) !== null)
    {
        domInline += chunk;
    }
});

process.stdin.on("end", () =>
{
    const virtualDom = new JSDOM(domInline.toString());

    global.document = virtualDom.window.document;

    try
    {
        const app = new Vue({
            el: "#vue-app"
        });
        console.log("app:", app);

        renderer.renderToString(app, (err, renderedHTML) =>
        {
            console.log("error", err);
            const appEL = document.getElementById("vue-app");

            // Insert global __TEMPLATE__ variable to be used by front
            const scriptEl = document.getElementById("ssr-script-container");

            scriptEl.innerHTML = `
        var template = "";
        window.__SSR_CONFIG__ = {
            fromServer: true,
            template: template,
        };
        `;

            appEL.parentElement.replaceChild(createElementFromHTML(renderedHTML), appEL);
            console.log(renderedHTML.toString());
            console.log(">>>>>>>>>>>>>>>>>>> END");
            process.stdout.write(document.documentElement.outerHTML);
        });
    }
    catch (error)
    {
        console.log("error", error);
    }
});

function createElementFromHTML(htmlString)
{
    const div = document.createElement("div");

    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}
