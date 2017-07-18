Vue.component("quantity-input", {

    props: [
        "value",
        "timeout",
        "min",
        "max",
        "vertical",
        "template",
        "waiting"
    ],

    data()
    {
        return {
            timeoutHandle: null,
            internalMin: null,
            internalMax: null
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    /**
     * TODO
     */
    ready()
    {
        if (this.min)
        {
            this.value = this.min;
            this.$dispatch("quantity-change", this.min);
        }

        this.timeout = this.timeout || 300;
        this.internalMin = this.min || 1;
        this.internalMax = this.max || 9999;
        this.vertical = this.vertical || false;

        this.$watch("value", newValue =>
        {
            if (newValue < this.internalMin)
            {
                this.value = this.internalMin;
            }

            if (newValue > this.internalMax)
            {
                this.value = this.internalMax;
            }

            if (this.timeoutHandle)
            {
                window.clearTimeout(this.timeoutHandle);
            }

            this.timeoutHandle = window.setTimeout(() =>
            {
                this.$dispatch("quantity-change", newValue);
            }, this.timeout);
        });
    }

});
