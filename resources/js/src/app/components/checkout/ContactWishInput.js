import Vue from "vue";
import { mapState } from "vuex";

export default Vue.component("contact-wish-input", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-contact-wish-input"
        }
    },

    computed: mapState({
        contactWish: state => state.checkout.contactWish
    }),

    methods: {
        updateContactWish(event)
        {
            this.$store.commit("setContactWish", event.target.value);
        }
    }
});
