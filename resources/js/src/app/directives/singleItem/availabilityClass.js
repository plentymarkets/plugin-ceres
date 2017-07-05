var ResourceService = require("services/ResourceService");

Vue.directive("availability-class",
    {
        bind(el, binding)
        {
            ResourceService.watch(binding.arg, value =>
            {
                const availabilityId = value.documents[0].data.variation.availability.id;

                el.className = "availability tag availability_" + availabilityId;
            });
        }
    });
