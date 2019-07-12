Vue.component("contact-wish-input", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-contact-wish-input"
        }
    },

    computed: Vuex.mapState({
        contactWish: state => state.checkout.contactWish
    }),

    methods: {
        updateContactWish(event)
        {
            this.$store.commit("setContactWish", event.srcElement.value);
        }
    }
});
