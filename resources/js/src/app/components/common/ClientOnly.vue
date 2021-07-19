<script>
export default {
    props: {
        wrapperTag: String
    },
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
                const tag = this.wrapperTag ? this.wrapperTag : 'div';
                return createElement(tag, this.$slots.default);
            }

            return this.$slots.default ? this.$slots.default : null;
        }
    },
    mounted() {
        this.isMounted = true;
    }
}
</script>
