const ResourceService = require("services/ResourceService");
const ItemListService = require("services/ItemListService");

import UrlService from "services/UrlService";

Vue.component("pagination", {

    props: [
        "template"
    ],

    data()
    {
        return {
            itemSearch : {},
            itemList   : {},
            lastPageMax: 0
        };
    },

    created()
    {
        this.$options.template = this.template;

        ResourceService.bind("itemSearch", this);
        ResourceService.bind("itemList", this);

        const urlParams = UrlService.getUrlParams(document.location.search);

        this.itemSearch.page = urlParams.page;
    },

    methods:
    {
        setPage(page)
        {
            this.$store.commit("setItemListPage", page);
            ItemListService.setPage(page);
            ItemListService.getItemList();

            $("html, body").animate({scrollTop: 0}, "slow");
        }
    },

    computed:
    {
        page()
        {
            return parseInt(this.itemSearch.page) || 1;
        },

        pageMax()
        {
            if (this.itemSearch.isLoading)
            {
                return this.lastPageMax;
            }

            let pageMax = this.itemList.total / parseInt(this.itemSearch.items);

            if (this.itemList.total % parseInt(this.itemSearch.items) > 0)
            {
                pageMax += 1;
            }

            this.lastPageMax = parseInt(pageMax) || 1;
            return parseInt(pageMax) || 1;
        }
    }
});
