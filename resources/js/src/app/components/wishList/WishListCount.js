import { isDefined } from "../../helper/utils";
import Vue from "vue";
const ApiService = require("../../services/ApiService");

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
        ApiService.get("/rest/io/itemWishList", {}, { keepOriginalResponse: true })
            .done(response =>
            {
                if (isDefined(response.data))
                {
                    this.$store.commit("setWishListIds", response.data);
                }
            });
    }
});
