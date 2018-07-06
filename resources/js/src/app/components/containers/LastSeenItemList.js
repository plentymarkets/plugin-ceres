import {isDefined}from "../../helper/utils";
const ApiService = require("services/ApiService");

Vue.component("last-seen-item-list", {

    props: {
        template: {
            type: String,
            default: "#vue-last-seen-item-list"
        }
    },

    data()
    {
        return {
            items: []
        };
    },

    created()
    {
        this.$options.template = this.template;
        this.getLastSeenItems();
    },

    methods:
    {
        getLastSeenItems()
        {
            const params = {items: App.config.itemLists.lastSeenNumber};

            ApiService.get("/rest/io/item/last_seen", params, {keepOriginalResponse: true})
                .done(response =>
                {
                    if (isDefined(response.data))
                    {
                        this.items = response.data.documents;
                    }
                });
        }
    }
});
