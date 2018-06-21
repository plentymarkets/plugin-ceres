import {isDefined}from "../../helper/utils";
const ApiService = require("services/ApiService");

Vue.component("wish-list-count", {

    props: {
        template: {
            type: String,
            default: "#vue-wish-list-count"
        }
    },

    computed: {
        wishListCount()
        {
            return this.$store.getters.wishListCount;
        }
    },

    created()
    {
        this.$options.template = this.template;

        ApiService.get("/rest/io/itemWishList", {}, {keepOriginalResponse: true})
        .done(response =>
        {
            if (isDefined(response.data))
            {
                this.$store.commit("setWishListIds", response.data);
            }
        });
    }
});
