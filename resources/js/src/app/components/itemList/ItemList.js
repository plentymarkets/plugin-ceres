Vue.component("item-list", {

    delimiters: ["${", "}"],

    props: [
        "categoryId",
        "template",
        "itemData",
        "totalItemsData"
    ],

    data()
    {
        return {
            filterListState: false
        };
    },

    computed: Vuex.mapState({
        isLoading: state => state.itemList.isLoading,
        items: state => state.itemList.items
    }),

    created()
    {
        this.$options.template = this.template;
        this.$store.commit("setItemListItems", this.itemData);
        this.$store.commit("setItemListTotalItems", this.totalItemsData);
    }
});
