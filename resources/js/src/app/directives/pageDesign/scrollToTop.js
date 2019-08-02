import Vue from "vue";

Vue.directive("scroll-to-top",
    {
        bind(el, binding)
        {
            el.onclick = event =>
            {
                $("html, body").animate({ scrollTop: 0 }, "slow");
            };
        }
    });
