const ResourceService = require("services/ResourceService");

import UrlService from "services/UrlService";

Vue.component("pagination", {

    props: [
        "template"
    ],

    data()
    {
        return {
            itemList   : {},
            lastPageMax: 0
        };
    },

    computed:
    {
        pageMax()
        {
            if (this.isLoading)
            {
                return this.lastPageMax;
            }

            let pageMax = this.itemList.total / parseInt(this.itemsPerPage);

            if (this.itemList.total % parseInt(this.itemsPerPage) > 0)
            {
                pageMax += 1;
            }

            this.lastPageMax = parseInt(pageMax) || 1;
            return parseInt(pageMax) || 1;
        },

        ...Vuex.mapState({
            page: state => state.itemList.page || 1,
            isLoading: state => state.itemList.isLoading,
            itemsPerPage: state => state.itemList.itemsPerPage
        })
    },

    created()
    {
        this.$options.template = this.template;

        ResourceService.bind("itemList", this);

        const urlParams = UrlService.getUrlParams(document.location.search);
        const page = urlParams.page || 1;

        this.$store.commit("setItemListPage", parseInt(page));
    },

    methods:
    {
        setPage(page)
        {
            this.$store.dispatch("selectItemListPage", page);

            $("html, body").animate({scrollTop: 0}, "slow");
        }
    }
});
