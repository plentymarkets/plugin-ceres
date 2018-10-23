const ModalService = require("services/ModalService");

Vue.component("login-view", {

    delimiters: ["${", "}"],

    props: [
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template;
    },

    methods:
    {
        openGuestModal()
        {
            ModalService.findModal(document.getElementById("guestLogin")).show();
        }
    }
});
