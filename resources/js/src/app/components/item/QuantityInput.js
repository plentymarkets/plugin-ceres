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
            compValue: this.value,
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
            const basketObject = this.$store.state.basket.items.find(variations => variations.variationId === this.variationId);

            return basketObject ? basketObject.quantity : 0;
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
                    if (JSON.stringify(val) !== JSON.stringify(oldVal))
                    {
                        this.initDefaultVars();

                        if (!this.compVertical)
                        {
                            this.handleMissingItems();
                        }
                    }
                }
            },
            deep: true
        },

        value(val, oldVal)
        {
            if (val !== oldVal)
            {
                this.compValue = val;
            }
        }
    },

    created()
    {
        this.$options.template = this.template;

        this.checkDefaultVars();
        this.initDefaultVars();

        if (!this.compVertical)
        {
            this.handleMissingItems();
        }

        this.validateValue();
    },

    methods:
    {
        countValueUp()
        {
            if (!(this.compValue === this.internalMax) && !this.waiting)
            {
                this.compValue++;
                this.validateValue();
            }
        },

        countValueDown()
        {
            if (!(this.compValue === this.internalMin) && !this.waiting)
            {
                this.compValue--;
                this.validateValue();
            }
        },

        setValue(value)
        {
            this.compValue = parseInt(value);
            this.validateValue();
        },

        validateValue()
        {
            if (isNaN(this.compValue))
            {
                this.compValue = this.internalMin === 0 ? 0 : this.internalMin || 1;
            }
            else if (this.compValue < this.internalMin)
            {
                this.compValue = this.internalMin;
            }
            else if (this.compValue > this.internalMax)
            {
                this.compValue = this.internalMax;
            }

            this.onValueChanged();
        },

        onValueChanged()
        {
            if (this.compTimeout === 0)
            {
                this.$emit("quantity-change", this.compValue);
            }
            else
            {
                if (this.timeoutHandle)
                {
                    window.clearTimeout(this.timeoutHandle);
                }

                this.timeoutHandle = window.setTimeout(() =>
                {
                    this.$emit("quantity-change", this.compValue);
                }, this.compTimeout);
            }
        },

        checkDefaultVars()
        {
            this.compMin = this.compMin === 0 || typeof this.compMin === "undefined" ? null : this.compMin;
            this.compMax = this.compMax === 0 || typeof this.compMax === "undefined" ? null : this.compMax;
        },

        initDefaultVars()
        {
            this.compTimeout = this.compTimeout === 0 ? 0 : this.compTimeout || 500;
            this.internalMin = this.compMin || 1;
            this.internalMax = this.compMax || 9999;
            this.compVertical = this.compVertical || false;
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

            this.compValue = this.internalMin;

            this.onValueChanged();
        }
    }
});
