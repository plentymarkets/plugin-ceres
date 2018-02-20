Vue.directive("toggle-basket-preview",
    {
        bind(el)
        {
            el.addEventListener("click", event =>
            {
                const vueApp = document.querySelector("#vue-app");

                if (vueApp)
                {
                    vueApp.classList.toggle(App.config.basketOpenClass || "open-hover");
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
        }
    });
