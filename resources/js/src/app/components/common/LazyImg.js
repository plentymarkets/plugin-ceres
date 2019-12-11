import Vue from "vue";
import lozad from "lozad";

Vue.component("lazy-img", {

    template: `<img :data-src="imageUrl">`,

    props: {
        imageUrl: String
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            lozad(this.$el).observe();
        });
    }
});
