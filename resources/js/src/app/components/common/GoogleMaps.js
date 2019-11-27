import Vue from "vue";
import { whenConsented } from "../../helper/whenConsented";
import { isNullOrUndefined } from "../../helper/utils";

Vue.component("google-maps-widget",
    {
        template: `<div :class="aspectRatio" class="maps-component position-relative" ref="googleMapsContainer"><div v-if="scriptBlocked"><slot></slot></div></div>`,

        props:
        {
            googleApiKey:
                {
                    type: String,
                    required: true
                },
            address:
                {
                    type: String,
                    required: true
                },
            zoom:
                {
                    type: Number,
                    default: 16
                },
            maptype:
                {
                    type: String,
                    default: "roadmap"
                },
            aspectRatio:
                {
                    type: String,
                    default: "prop-xs-3-1"
                }
        },

        data: function()
        {
            return {
                scriptBlocked: true
            };
        },

        mounted()
        {
            this.$nextTick(() =>
            {
                this.createScript()
                    .then(() =>
                    {
                        this.renderMap();
                    })
                    .catch(() =>
                    {
                        // Do nothing
                    });
            });
        },

        methods:
        {
            createScript()
            {
                return new Promise((resolve, reject) =>
                {
                    const script = document.querySelector("script#google-maps-api");

                    if (!isNullOrUndefined(script))
                    {
                        // script already injected...
                        this.scriptBlocked = false;
                        if (isNullOrUndefined(google))
                        {
                            // ...but not loaded yet
                            script.addEventListener("load", () => resolve(script), false);
                        }
                        else
                        {
                            // ..and fully loaded
                            resolve(script);
                        }
                    }
                    else
                    {
                        // script not loaded
                        whenConsented(
                            "media.googleMaps",
                            () =>
                            {
                                this.scriptBlocked = false;
                                const script = document.createElement("script");

                                script.type = "text/javascript";
                                script.id = "google-maps-api";
                                script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleApiKey}`;

                                script.addEventListener("load", () => resolve(script), false);
                                script.addEventListener("error", () => reject(script), false);

                                document.body.appendChild(script);
                            },
                            () =>
                            {
                                this.scriptBlocked = true;
                            });
                    }
                });
            },

            renderMap()
            {
                const map = new google.maps.Map(this.$refs.googleMapsContainer,
                    {
                        center: { lat: -34.397, lng: 150.644 },
                        zoom  : this.zoom,
                        mapTypeId: this.maptype
                    });

                this.geocodeAddress(map);
            },

            geocodeAddress(map)
            {
                return new Promise((resolve, reject) =>
                {
                    new google.maps.Geocoder().geocode({ address: this.address }, (results, status) =>
                    {
                        if (status === google.maps.GeocoderStatus.OK)
                        {
                            resolve({
                                lat: results[0].geometry.location.lat(),
                                lng: results[0].geometry.location.lng()
                            });
                        }
                        else
                        {
                            console.log("Not possible to get Ltd and Lng for the given address. Status: " + status);
                            reject();
                        }
                    });
                }).then( coordinates =>
                {
                    map.setCenter(coordinates);

                    new google.maps.Marker(
                        {
                            map: map,
                            position: coordinates
                        });
                });
            }
        }
    });
