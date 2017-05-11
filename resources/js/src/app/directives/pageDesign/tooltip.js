Vue.directive("tooltip", {

    bind: function()
    {
        setTimeout(function()
        {
            $(this.el).tooltip();
        }.bind(this), 1);
    }
});
