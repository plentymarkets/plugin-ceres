Vue.directive("tooltip", {

    bind()
    {
        setTimeout(() =>
        {
            $(this.el).tooltip({
                trigger: "hover",
                // eslint-disable-next-line
                template: '<div class="tooltip" style="z-index:9999" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
            });
        }, 1);
    }
});
