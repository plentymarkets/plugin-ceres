import UrlService from "services/UrlService";

Vue.component("item-list-sorting", {

    delimiters: ["${", "}"],

    props: [
        "sortingList",
        "defaultSorting",
        "template"
    ],

    data()
    {
        return {
            selectedSorting: {}
        };
    },

    created()
    {
        this.$options.template = this.template;

        this.setSelectedValue();
    },

    methods:
    {
        /**
         * Set the selected sorting in the vuex storage and trigger the item search.
         */
        updateSorting()
        {
            // TODO reload
            // this.$store.dispatch("selectItemListSorting", this.selectedSorting);
        },

        /**
         * Determine the initial value and set it in the vuex storage.
         */
        setSelectedValue()
        {
            const urlParams = UrlService.getUrlParams(document.location.search);

            if (urlParams.sorting)
            {
                this.selectedSorting = urlParams.sorting;
            }
            else
            {
                this.selectedSorting = this.defaultSorting;
            }

            this.$store.commit("setItemListSorting", this.selectedSorting);
        }
    }
});
