<script>
export default {
    data ()
    {
        return {
            isMounted: false
        }
    },

    render(createElement) {
        if (this.isMounted)
        {
            // if there are multiple nodes in the default slot
            if (this.$slots.default?.length > 1)
            {
                return createElement("div", this.$slots.default);
            }

            return this.$slots.default ? this.$slots.default : null;
        }
    },
    mounted() {
        this.isMounted = true;
    }
}
</script>
