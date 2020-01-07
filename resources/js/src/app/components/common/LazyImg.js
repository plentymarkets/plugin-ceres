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
    },

    watch:
    {
        imageUrl()
        {
            this.$nextTick(() =>
            {
                this.$el.setAttribute("data-loaded", false);
                lozad(this.$el).triggerLoad(this.$el);
            });
        }
    }
});
