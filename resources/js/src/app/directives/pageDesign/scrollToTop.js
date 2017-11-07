Vue.directive("scroll-to-top",
    {
        bind(el, binding)
        {
            el.onclick = function(event)
            {
                $("html, body").animate({scrollTop: 0}, "slow");
            };
        }
    });
