<template>
    <div :class="aspectClass" class="maps-component position-relative" ref="googleMapsContainer">
        <div v-if="scriptBlocked">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { whenConsented } from "../../helper/whenConsented";
import { isNullOrUndefined } from "../../helper/utils";

export default {
    props: {
        address:
        {
            type: String,
            required: false
        },
        lat:
        {
            type: Number,
            required: false
        },
        lng:
        {
            type: Number,
            required: false
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
            default: "3-1"
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
        aspectClass()
        {
            return "prop-" + this.aspectRatio;
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
                    if (isNullOrUndefined(window.google))
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

        getCoordinates()
        {
            const isLatValid = !isNaN(this.lat) && this.lat > -90 && this.lat < 90;
            const isLngValid = !isNaN(this.lng) && this.lng > -180 && this.lng < 180;

            if (isLatValid && isLngValid)
            {
                return Promise.resolve({
                    lat: this.lat,
                    lng: this.lng
                });
            }
            else if(!!this.address && !!window.google)
            {
                return new Promise((resolve, reject) =>
                {
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode(
                        {
                            address: this.address
                        },
                        (result, status) =>
                        {
                            if(!!result && result.length > 0 && !!result[0].geometry)
                            {
                                resolve(result[0].geometry.location);
                            }
                            else
                            {
                                reject();
                            }
                        }
                    );
                });
            }

            return Promise.reject();
        },

        initializeMap()
        {
            this.getCoordinates()
                .then((coordinates) =>
                {
                    const map = new google.maps.Map(this.$refs.googleMapsContainer,
                        {
                            center: coordinates,
                            zoom  : this.zoom,
                            mapTypeId: this.maptype
                        });

                    new google.maps.Marker(
                        {
                            map: map,
                            position: coordinates
                        });

                });
        }
    }
}
</script>
