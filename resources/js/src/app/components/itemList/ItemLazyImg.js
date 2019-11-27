import Vue from "vue";
import lozad from "lozad";

Vue.component("item-lazy-img", {

    delimiters: ["${", "}"],

    props: {
        imageUrl: String,
        template: {
            type: String,
            default: "#vue-item-lazy-img"
        }
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            const observer = lozad(this.$el);

            observer.observe();
        });
    }
});
