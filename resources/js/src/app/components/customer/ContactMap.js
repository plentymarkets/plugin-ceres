Vue.component("contact-map", {

    props: [
        "mapZoom",
        "zip",
        "street",
        "template"
    ],

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        this.initMap();
    },

    methods:
    {
        initMap()
        {
            const coordinates = {lat: -34.397, lng: 150.644};
            const self = this;

            const gMap = new google.maps.Map(document.getElementsByClassName("contact-map"),
                {
                    center: coordinates,
                    zoom  : self.mapZoom,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

            this.getLatLngByAddress(new google.maps.Geocoder(), gMap);

        },

        getLatLngByAddress(geocoder, resultsMap)
        {
            const addressData = this.zip + " " + this.street;

            geocoder.geocode({address: addressData}, function(results, status)
            {
                if (status === google.maps.GeocoderStatus.OK)
                {
                    resultsMap.setCenter(results[0].geometry.location);

                    // eslint-disable-next-line
                    const marker = new google.maps.Marker(
                        {
                            map: resultsMap,
                            position: results[0].geometry.location
                        });
                }
                else
                {
                    console.log("Not possible to get Ltd and Lng for the given address. State: " + status);
                }
            });
        }
    }
});
