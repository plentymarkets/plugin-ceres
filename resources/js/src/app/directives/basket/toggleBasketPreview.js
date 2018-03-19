Vue.directive("toggle-basket-preview",
    {
        bind(el)
        {
            el.addEventListener("click", event =>
            {
                const vueApp = document.querySelector("#vue-app");

                if (vueApp)
                {
                    const basketOpenClass = (App.config.basket.previewType === "right") ? "open-hover" : "open-right";

                    vueApp.classList.toggle(basketOpenClass || "open-hover");
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
        }
    });
