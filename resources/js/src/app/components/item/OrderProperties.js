Vue.component("order-properties", {

    props: [
        "template"
    ],

    computed: Vuex.mapState({
        properties: state => state.item.variation.documents[0].data.properties
    }),

    created()
    {
        this.$options.template = this.template;
    },

    methods: Vuex.mapMutations([
        "setVariationOrderProperty"
    ])
});
