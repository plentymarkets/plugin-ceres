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
        updateSorting()
        {
            this.$store.dispatch("selectItemListSorting", this.selectedSorting);
        },

        setSelectedValue()
        {
            const urlParams = UrlService.getUrlParams(document.location.search);

            if (urlParams.sorting)
            {
                this.selectedSorting = urlParams.sorting;
                this.updateSorting();
            }
            else
            {
                this.selectedSorting = this.defaultSorting;
            }
        }
    }
});
