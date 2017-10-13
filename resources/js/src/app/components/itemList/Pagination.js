import UrlService from "services/UrlService";

Vue.component("pagination", {

    delimiters: ["${", "}"],

    props: [
        "template"
    ],

    data()
    {
        return {
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

            let pageMax = this.totalItems / parseInt(this.itemsPerPage);

            if (this.totalItems % parseInt(this.itemsPerPage) > 0)
            {
                pageMax += 1;
            }

            this.lastPageMax = parseInt(pageMax) || 1;

            return parseInt(pageMax) || 1;
        },

        ...Vuex.mapState({
            page: state => state.itemList.page || 1,
            isLoading: state => state.itemList.isLoading,
            itemsPerPage: state => state.itemList.itemsPerPage,
            totalItems: state => state.itemList.totalItems
        })
    },

    created()
    {
        this.$options.template = this.template;

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
