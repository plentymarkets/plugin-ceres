const WaitScreenService = require("../../services/WaitScreenService");

import Vue from "vue";

/**
*
* CURRENTLY NOT IN USE
* MAY BE USEFUL LATER
*
*/

Vue.component("wait-screen", {

    // template: "#vue-wait-screen", NEED TO IMPLEMENT TEMPLATE IN COMPONENT

    delimiters: ["${", "}"],

    props: [
        "template"
    ],

    data: function()
    {
        return {
            overlay: WaitScreenService.getOverlay()
        };
    },

    computed: {
        /**
         * Show an overlay over the page
         * @returns {boolean}
         */
        visible: function()
        {
            return this.overlay.count > 0;
        }
    }
});
