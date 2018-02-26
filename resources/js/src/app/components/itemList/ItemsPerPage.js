import UrlService from "services/UrlService";

Vue.component("items-per-page", {

    delimiters: ["${", "}"],

    props: [
        "paginationValues",
        "template"
    ],

    data()
    {
        return {
            selectedValue: null
        };
    },

    created()
    {
        this.$options.template = this.template;

        this.setSelectedValueByUrl();
    },

    methods:
    {
        itemsPerPageChanged()
        {
            this.$store.dispatch("selectItemsPerPage", this.selectedValue);
        },

        setSelectedValueByUrl()
        {
            const urlParams = UrlService.getUrlParams(document.location.search);

            if (urlParams.items)
            {
                if (this.paginationValues.includes(parseInt(urlParams.items)))
                {
                    this.selectedValue = urlParams.items;
                }
                else
                {
                    this.selectedValue = App.config.defaultItemsPerPage;
                }
            }
            else
            {
                this.selectedValue = App.config.defaultItemsPerPage;
            }

            this.$store.commit("setItemsPerPage", parseInt(this.selectedValue));
        }
    }
});
