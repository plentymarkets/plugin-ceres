import Vue from "vue";

const BASKET_PREVIEW_COMPONENT_NAME = "basket-preview";

Vue.directive("toggle-basket-preview",
    {
        bind(el)
        {
            el.addEventListener("click", event =>
            {
                let timeout = 0;

                // trigger the lazyloading of the basket-preview
                if (!vueApp.$store.state.lazyComponent.components.hasOwnProperty(BASKET_PREVIEW_COMPONENT_NAME))
                {
                    vueApp.$store.dispatch("loadComponent", BASKET_PREVIEW_COMPONENT_NAME);
                    timeout = 100;
                }

                // postpone the opening for 100ms, to prevent markup jumps
                setTimeout(() =>
                {
                    document.body.classList.toggle("basket-open");
                }, timeout);

                event.preventDefault();
                event.stopPropagation();
            });
        }
    });
