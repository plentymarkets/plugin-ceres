import Vue from "vue";

Vue.mixin({
    props: {
        // used to override the sfc template - takes an html elements id (#el-id)
        templateOverride: {
            type: String,
            default: ""
        }
    },

    created()
    {
        if (this.$props && this.$props.template)
        {
            this.$options.template = this.$props.template;
        }
    }
});
