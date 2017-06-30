var ResourceService = require("services/ResourceService");

Vue.directive("availabilityClass",
    {
        bind()
        {
            ResourceService.watch(this.arg, value =>
            {
                const availabilityId = value.documents[0].data.variation.availability.id;

                this.el.className = "availability tag availability_" + availabilityId;
            });
        }
    });
