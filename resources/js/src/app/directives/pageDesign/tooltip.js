Vue.directive("tooltip", {

    bind: function(el)
    {
        setTimeout(function()
        {
            $(el).tooltip();
        }, 1);
    }
});
