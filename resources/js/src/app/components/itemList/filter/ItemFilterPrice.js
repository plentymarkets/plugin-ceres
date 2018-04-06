import UrlService from "services/UrlService";

Vue.component("item-filter-price", {

    delimiters: ["${", "}"],

    props:
    {
        template:
        {
            type: String,
            default: "#vue-item-filter-price"
        }
    },

    data()
	{
        return {
            priceMin: "",
            priceMax: "",
            currency: App.activeCurrency
        };
    },

    created()
    {
        this.$options.template = this.template || "#vue-item-filter-price";

        const urlParams = UrlService.getUrlParams(document.location.search);

        this.priceMin = urlParams.price_min || "";
        this.priceMax = urlParams.price_max || "";
    },

    computed:
    {
        isDisabled()
		{
            return (this.priceMin === "" && this.priceMax === "") ||
					(parseInt(this.priceMin) >= parseInt(this.priceMax));
        }
    },

    methods:
    {
        selectAll(event)
        {
            event.target.select();
        },

        triggerFilter()
        {
            if (!this.isDisabled)
            {
                this.$store.commit("setPriceFacet", {priceMin: this.priceMin, priceMax: this.priceMax});
            }
        }
    }
});
