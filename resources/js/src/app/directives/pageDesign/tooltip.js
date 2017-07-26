Vue.directive("tooltip", {

    unbind()
    {
        $(this.el).tooltip("dispose");
    },

    update(value)
    {
        if (typeof value === "undefined" || value)
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
        else
        {
            setTimeout(() =>
            {
                $(this.el).tooltip("dispose");
            }, 1);
        }
    }
});
