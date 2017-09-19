Vue.component("contact-wish-input", {

    props: [
        "template"
    ],

    computed: Vuex.mapState({
        contactWish: state => state.checkout.contactWish
    }),

    created: function()
    {
        this.$options.template = this.template;
    },

    methods: {
        updateContactWish(event)
        {
            this.$store.commit("setContactWish", event.srcElement.value);
        }
    }
});
