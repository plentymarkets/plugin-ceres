import {isDefined}from "../../helper/utils";
const ApiService = require("services/ApiService");

Vue.component("last-seen-item-list", {

    props: {
        template: {
            type: String,
            default: "#vue-last-seen-item-list"
        },
        variationId: Number
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

        if (this.variationId)
        {
            this.getLastSeenItems();
        }
        else
        {
            this.setLastSeenItem();
        }
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
        },

        setLastSeenItem()
        {
            ApiService.put("/rest/io/item/last_seen/" + this.variationId)
                .done(response =>
                {
                    this.items = response.data.documents;
                });
        }
    }
});
