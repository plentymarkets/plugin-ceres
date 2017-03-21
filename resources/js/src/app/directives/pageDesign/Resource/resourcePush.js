var ResourceService = require("services/ResourceService");

Vue.directive("resource-push", {

    params: [
        "dataAccessor",
        "resource"
    ],

    bind: function()
    {
        var self = this;

        ResourceService.watch(this.params.resource, function(newValue, oldValue)
        {
            if (self.params.dataAccessor)
            {
                self.el.__vue__[self.arg] = newValue.documents[0].data;
            }
            else
            {
                self.el.__vue__[self.arg] = newValue;
            }
        });
    }

});
