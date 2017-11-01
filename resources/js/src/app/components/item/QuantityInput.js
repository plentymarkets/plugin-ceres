Vue.component("quantity-input", {

    delimiters: ["${", "}"],

    props: [
        "value",
        "timeout",
        "min",
        "max",
        "vertical",
        "template",
        "waiting",
        "variationId"
    ],

    data()
    {
        return {
            compQuantity: this.value,
            compTimeout: this.timeout,
            compMin: this.min,
            compMax: this.max,
            compVertical: this.vertical,
            timeoutHandle: null,
            internalMin: null,
            internalMax: null,
            currentCount: 0
        };
    },

    computed: {
        alreadyInBasketCount()
        {
            return this.$store.state.basket.items.find(variations => variations.variationId === this.variationId) || 0;
        },

        ...Vuex.mapState({
            basketItems: state => state.basket.items
        })
    },

    watch: {
        basketItems:
        {
            handler(val, oldVal)
            {
                if (oldVal)
                {
                    if (JSON.stringify(val) != JSON.stringify(oldVal))
                    {
                        this.initDefaultVars();

                        this.handleMissingItems();
                    }
                }
            },
            deep: true
        }
    },

    created()
    {
        this.$options.template = this.template;

        this.checkDefaultVars();
        this.initDefaultVars();
        this.initValueWatcher();

        if (!this.compVertical)
        {
            this.handleMissingItems();
        }
    },

    methods:
    {
        countValueUp()
        {
            if (!(this.compQuantity === this.internalMax) && !this.waiting)
            {
                this.compQuantity++;
            }
        },

        countValueDown()
        {
            if (!(this.compQuantity === this.internalMin) && !this.waiting)
            {
                this.compQuantity--;
            }
        },

        checkDefaultVars()
        {
            this.compMin = this.compMin === 0 || typeof this.compMin === "undefined" ? null : this.compMin;
            this.compMax = this.compMax === 0 || typeof this.compMax === "undefined" ? null : this.compMax;
        },

        initDefaultVars()
        {
            this.compTimeout = this.compTimeout || 300;
            this.internalMin = this.compMin || 1;
            this.internalMax = this.compMax || 9999;
            this.compVertical = this.compVertical || false;
        },

        initValueWatcher()
        {
            this.$watch("compQuantity", newValue =>
            {
                if (newValue < this.internalMin)
                {
                    this.compQuantity = this.internalMin;
                }

                if (newValue > this.internalMax)
                {
                    this.compQuantity = this.internalMax;
                }

                if (this.timeoutHandle)
                {
                    window.clearTimeout(this.timeoutHandle);
                }

                this.timeoutHandle = window.setTimeout(() =>
                {
                    this.$emit("quantity-change", newValue);
                }, this.compTimeout);
            });
        },

        handleMissingItems()
        {
            if (this.alreadyInBasketCount >= this.internalMin)
            {
                this.internalMin = 1;
            }

            if (this.compMax !== null)
            {
                this.internalMax = this.compMax - this.alreadyInBasketCount;

                if (this.alreadyInBasketCount === this.compMax)
                {
                    this.internalMin = 0;
                    this.internalMax = 0;
                    this.$emit("out-of-stock", true);
                }
                else
                {
                    this.$emit("out-of-stock", false);
                }
            }

            this.compQuantity = this.internalMin;
        }
    }
});
