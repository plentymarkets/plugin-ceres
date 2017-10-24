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
            _value: this.value,
            _timeout: this.timeout,
            _min: this.min,
            _max: this.max,
            _vertical: this.vertical,
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

        if (!this._vertical)
        {
            this.handleMissingItems();
        }
    },

    mounted()
    {
        this.$nextTick(() =>
        {
           
        });
    },

    methods:
    {
        countValueUp()
        {
            if (!(this._value === this.internalMax) && !this.waiting)
            {
                this._value++;
            }
        },

        countValueDown()
        {
            if (!(this._value === this.internalMin) && !this.waiting)
            {
                this._value--;
            }
        },

        checkDefaultVars()
        {
            this._min = this._min === 0 || this._min === undefined ? null : this._min;
            this._max = this._max === 0 || this._max === undefined ? null : this._max;
        },

        initDefaultVars()
        {
            this._timeout = this._timeout || 300;
            this.internalMin = this._min || 1;
            this.internalMax = this._max || 9999;
            this._vertical = this._vertical || false;
        },

        initValueWatcher()
        {
            this.$watch("_value", newValue =>
            {
                if (newValue < this.internalMin)
                {
                    this._value = this.internalMin;
                }

                if (newValue > this.internalMax)
                {
                    this._value = this.internalMax;
                }

                if (this.timeoutHandle)
                {
                    window.clearTimeout(this.timeoutHandle);
                }

                this.timeoutHandle = window.setTimeout(() =>
                {
                    this.$emit("quantity-change", newValue);
                }, this._timeout);
            });
        },

        handleMissingItems()
        {
            if (this.alreadyInBasketCount >= this.internalMin)
            {
                this.internalMin = 1;
            }

            if (this._max !== null)
            {
                this.internalMax = this._max - this.alreadyInBasketCount;

                if (this.alreadyInBasketCount === this._max)
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

            this._value = this.internalMin;
        }
    }
});
