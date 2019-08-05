import Vue from "vue";
import "jquery-lazyload";

Vue.component("item-lazy-img", {

    delimiters: ["${", "}"],

    props: [
        "imageUrl",
        "template"
    ],

    mounted()
    {
        this.$nextTick(() =>
        {
            setTimeout(() =>
            {
                $(this.$refs.lazyImg).show().lazyload({ threshold : 100 });
            }, 1);
        });
    },

    methods:
    {
        loadImage()
        {
            $(this.$refs.lazyImg).trigger("appear");
        }
    }
});
