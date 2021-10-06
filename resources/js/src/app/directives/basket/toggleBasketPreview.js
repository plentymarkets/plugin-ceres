import Vue from "vue";

Vue.directive("toggle-basket-preview",
    {
        bind(el)
        {
            el.addEventListener("click", event =>
            {
                document.body.classList.toggle("basket-open");

                event.preventDefault();
                event.stopPropagation();
            });
        }
    });
