Vue.directive("tooltip", {

    bind()
    {
        setTimeout(() =>
        {
            $(this.el).tooltip({
                trigger: "hover"
            });
        }, 1);
    }
});
