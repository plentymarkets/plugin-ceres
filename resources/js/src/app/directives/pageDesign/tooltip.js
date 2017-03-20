Vue.directive("tooltip", {

    bind: function()
    {
        setTimeout(function()
        {
            $("[data-toggle=\"tooltip\"]").tooltip();
        }, 1);
    }
});
