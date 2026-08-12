import { isDefined } from "../../helper/utils";
import Vue from "vue";

export default Vue.component("guarantee-notice", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-guarantee-notice"
        },
        pluginPath:
        {
            type: String,
            default: ""
        }
    },

    mounted()
    {
        this.loadLightbox().catch(event =>
        {
            console.log("error while loading lightbox", event);
        });
    },

    methods:
    {
        loadLightbox()
        {
            return new Promise((resolve, reject) =>
            {
                const script = document.querySelector("script#lightboxscript");

                if (isDefined(script))
                {
                    resolve();
                }
                else
                {
                    const script = document.createElement("script");

                    script.type = "text/javascript";
                    script.id = "lightboxscript";
                    script.src = `${ this.pluginPath }/js/dist/lightbox.min.js`;

                    script.addEventListener("load", () => resolve(), false);
                    script.addEventListener("error", event => reject(event), false);

                    document.body.appendChild(script);
                }
            });
        }
    }
});
