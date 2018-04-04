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

    created()
    {
        this.$options.template = this.template || "#vue-item-filter-price";
    },

    methods:
    {
    }
});
