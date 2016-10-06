var ResourceService = require("services/ResourceService");

Vue.directive("resource-if", {

    bind: function()
    {
        var self = this;
        var display = window.getComputedStyle(this.el, null).getPropertyValue("display");

        ResourceService.watch(this.arg, function(value)
        {

            var keys = Object.keys(value);
            var values = keys.map(function(key)
            {
                return value[key];
            });

            // eslint-disable-next-line
            var condition = new Function(keys, "return " + self.expression);

            if (condition.apply(null, values))
            {
                self.el.style.display = display;
            }
            else
            {
                self.el.style.display = "none";
            }
        });
    }

});
