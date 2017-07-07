var ResourceService = require("services/ResourceService");

Vue.directive("availability-class",
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
