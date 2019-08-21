import Vue from "vue";

Vue.mixin({
    created()
    {
        if (this.$props && this.$props.template)
        {
            this.$options.template = this.$props.template;
        }
    }
});
