import {getUrlParam}from "../../../helper/utils";

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
            minPrice: getUrlParam("price_min"),
            maxPrice: getUrlParam("price_max"),
            currency: App.activeCurrency
        };
    },

    created()
    {
        this.$options.template = this.template || "#vue-item-filter-price";
    },

    computed:
    {
        isDisabled()
		{
            return (this.minPrice === "" && this.maxPrice === "") ||
					(parseInt(this.minPrice) >= parseInt(this.maxPrice));
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

            }
        }
    }
});
