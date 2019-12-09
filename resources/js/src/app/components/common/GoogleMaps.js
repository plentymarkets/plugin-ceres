import Vue from "vue";
import { whenConsented } from "../../helper/whenConsented";
import { isNullOrUndefined } from "../../helper/utils";

Vue.component("google-maps-widget",
    {
        template: `<div :class="aspectRatio" class="maps-component position-relative" ref="googleMapsContainer"><div v-if="scriptBlocked"><slot></slot></div></div>`,

        props:
        {
            lat:
            {
                type: Number
            },
            lng:
            {
                type: Number
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

        computed:
        {
            coordinates()
            {
                const isLatValid = !isNaN(this.lat) && this.lat > -90 && this.lat < 90;
                const isLngValid = !isNaN(this.lng) && this.lng > -180 && this.lng < 180;

                if (isLatValid && isLngValid)
                {
                    return {
                        lat: this.lat,
                        lng: this.lng
                    };
                }

                return null;
            }
        },

        mounted()
        {
            this.$nextTick(() =>
            {
                this.createScript()
                    .then(() =>
                    {
                        this.initializeMap();
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
                                script.src = `https://maps.googleapis.com/maps/api/js?key=${App.config.global.googleMapsApiKey}`;

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

            initializeMap()
            {
                if (this.coordinates)
                {
                    const map = new google.maps.Map(this.$refs.googleMapsContainer,
                        {
                            center: this.coordinates,
                            zoom  : this.zoom,
                            mapTypeId: this.maptype
                        });

                    new google.maps.Marker(
                        {
                            map: map,
                            position: this.coordinates
                        });
                }
            }
        }
    });
