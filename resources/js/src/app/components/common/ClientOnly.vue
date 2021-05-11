<script>
export default {
    data ()
    {
        return {
            isMounted: false
        }
    },

    render(){
        if(this.isMounted)
        {
            return this.$slots.default ? this.$slots.default : null;
        }
    },
    mounted(){
        this.isMounted = true;
    }
}
</script>