import Vue from "vue";

const GUARANTEE_NOTICE_NAME = "guarantee-notice-modal";

Vue.directive("toggle-guarantee-notice",
    {
        bind(el)
        {
            el.addEventListener("click", () =>
            {
                // trigger the lazyloading of the guarantee notice modal image
                if (!vueApp.$store.state.lazyComponent.components.hasOwnProperty(GUARANTEE_NOTICE_NAME))
                {
                    vueApp.$store.dispatch("loadComponent", GUARANTEE_NOTICE_NAME);
                }
            });
        }
    });
