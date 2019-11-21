import Vue from "vue";

Vue.directive("open-mobile-navigation",
    {
        bind(el, binding)
        {
            el.onclick = function(event)
            {
                if (document.querySelector(".mobile-navigation"))
                {
                    document.querySelector(".mobile-navigation").classList.add("open");
                    document.querySelector("body").classList.add("menu-is-visible");
                }
            };
        }
    });
