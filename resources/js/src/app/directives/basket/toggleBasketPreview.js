Vue.directive("toggle-basket-preview",
    {
        bind(el)
        {
            el.addEventListener("click", event =>
            {
                const vueApp = document.querySelector("#vue-app");

                if (vueApp)
                {
                    vueApp.classList.toggle("open-right");
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
        }
    });
