Vue.directive("open-mobile-navigation",
    {
        bind(el, binding)
        {
            el.onclick = function(event)
            {
                document.querySelector(".mobile-navigation").classList.add("open");
                document.querySelector("body").classList.add("menu-is-visible");
            };
        }
    });
