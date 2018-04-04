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
            minPrice: "",
            maxPrice: ""
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
    }
});
