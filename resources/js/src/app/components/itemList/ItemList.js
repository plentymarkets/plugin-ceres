var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-list", {

    props: [
        "categoryId",
        "template"
    ],

    data: function()
    {
        return {
            itemList: {},
            filterListState: false
        };
    },

    computed: Vuex.mapState({
        isLoading: state => state.itemList.isLoading
    }),

    created: function()
    {
        this.$options.template = this.template;

        ItemListService.setCategoryId(this.categoryId);
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
    }
});
