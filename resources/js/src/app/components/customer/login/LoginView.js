import Vue from "vue";
const ModalService = require("../../../services/ModalService");

Vue.component("login-view", {

    delimiters: ["${", "}"],

    props: [
        "template"
    ],

    methods:
    {
        openGuestModal()
        {
            ModalService.findModal(document.getElementById("guestLogin")).show();
        }
    }
});
