const ResourceService = require("services/ResourceService");

Vue.component("quantity-input", {

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
    },

    ready()
    {
        // ResourceService.bind("basketItems", this);

        this.checkDefaultVars();
        this.initDefaultVars();
        this.initValueWatcher();

        if (!this.vertical)
        {
            this.handleMissingItems();
        }
    },

    methods:
    {
        countValueUp()
        {
            if (!(this.value === this.internalMax) && !this.waiting)
            {
                this.value++;
            }
        },

        countValueDown()
        {
            if (!(this.value === this.internalMin) && !this.waiting)
            {
                this.value--;
            }
        },

        checkDefaultVars()
        {
            this.min = this.min === 0 ? null : this.min;
            this.max = this.max === 0 ? null : this.max;
        },

        initDefaultVars()
        {
            this.timeout = this.timeout || 300;
            this.internalMin = this.min || 1;
            this.internalMax = this.max || 9999;
            this.vertical = this.vertical || false;
        },

        initValueWatcher()
        {
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
        },

        handleMissingItems()
        {
            if (this.alreadyInBasketCount >= this.internalMin)
            {
                this.internalMin = 1;
            }

            if (this.max !== null)
            {
                this.internalMax = this.max - this.alreadyInBasketCount;

                if (this.alreadyInBasketCount === this.max)
                {
                    this.internalMin = 0;
                    this.internalMax = 0;
                    this.$dispatch("out-of-stock", true);
                }
                else
                {
                    this.$dispatch("out-of-stock", false);
                }
            }

            this.value = this.internalMin;
        }
    }
});
