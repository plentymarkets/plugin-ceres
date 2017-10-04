import ApiService from "services/ApiService";

Vue.component("basket-preview", {

    props: [
        "template",
        "basketData",
        "basketItemsData"
    ],

    computed: Vuex.mapState({
        basket: state => state.basket.data,
        basketItems: state => state.basket.items
    }),

    created()
    {
        this.$options.template = this.template;
        this.$store.commit("setBasket", this.basketData);
        this.$store.commit("setBasketItems", this.basketItemsData);

        ApiService.listen("AfterBasketChanged",
            data =>
            {
                this.$store.commit("setBasket", data.basket);
            });
    }
});
