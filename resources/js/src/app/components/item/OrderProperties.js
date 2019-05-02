Vue.component("order-properties", {

    props: [
        "template"
    ],

    computed: Vuex.mapState({
        properties: state => state.item.variation.documents[0].data.properties
    }),

    methods: Vuex.mapMutations([
        "setVariationOrderProperty"
    ])
});
