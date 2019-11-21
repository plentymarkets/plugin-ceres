import Vue from "vue";

Vue.component("contact-map", {

    props: [
        "mapZoom",
        "zip",
        "street",
        "googleApiKey",
        "template"
    ],

    mounted()
    {
        this.$nextTick(() =>
        {
            if (!document.getElementById("maps-api"))
            {
                this.addScript("https://maps.googleapis.com/maps/api/js?key=" + this.googleApiKey);
            }
        });
    },

    methods:
    {
        initMap()
        {
            const coordinates = { lat: -34.397, lng: 150.644 };

            const gMap = new google.maps.Map(document.getElementById("contact-map"),
                {
                    center: coordinates,
                    zoom  : parseInt(this.mapZoom)
                });

            this.getLatLngByAddress(new google.maps.Geocoder(), gMap);
        },

        getLatLngByAddress(geocoder, resultsMap)
        {
            const addressData = this.zip + " " + this.street;

            geocoder.geocode({ address: addressData }, function(results, status)
            {
                if (status === google.maps.GeocoderStatus.OK)
                {
                    resultsMap.setCenter(results[0].geometry.location);

                    // eslint-disable-next-line
                    var marker = new google.maps.Marker(
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
        },

        addScript(path)
        {
            const head = document.getElementsByTagName("head")[0];
            const script = document.createElement("script");

            script.type = "text/javascript";
            script.src = path;
            script.id = "contact-map-api";

            if (script.readyState)
            {
                script.onreadystatechange = () =>
                {
                    if (script.readyState === "loaded" || script.readyState === "complete")
                    {
                        script.onreadystatechange = null;
                        this.initMap();
                    }
                };
            }
            else
            {
                script.onload = () =>
                {
                    this.initMap();
                };
            }

            head.appendChild(script);
        }
    }
});
