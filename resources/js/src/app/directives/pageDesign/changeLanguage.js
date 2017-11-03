Vue.directive(
    "change-lang",
    {
        bind(el, binding)
        {
            el.onclick = function(event)
            {
                let subPath = window.location.pathname.split("/");

                subPath = subPath[1] === binding.value.currLang ? window.location.pathname.substring(3) : window.location.pathname;
                window.location.assign(window.location.origin + "/" + binding.value.lang + "" + subPath);
            };
        }
    });
