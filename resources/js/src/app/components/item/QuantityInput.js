import {floatLength, formatFloat, limit}from "../../helper/number";
import {defaultValue, isDefined, isNullOrUndefined}from "../../helper/utils";
import TranslationService from "../../services/TranslationService";
import {debounce}from "../../helper/debounce";

Vue.component("quantity-input", {

    delimiters: ["${", "}"],

    props: {
        value: {
            type: Number,
            required: true
        },
        timeout: {
            type: Number,
            required: false,
            default: 500
        },
        min: {
            type: Number,
            required: false,
            default: 0
        },
        max: {
            type: Number,
            required: false
        },
        interval: {
            type: Number,
            required: false,
            default: 1
        },
        template: {
            type: String,
            required: true
        },
        waiting: {
            type: Boolean,
            required: false
        },
        variationId: {
            type: Number,
            required: false
        }
    },

    data()
    {
        return {
            compValue:      this.value,
            compMin:        this.min,
            compMax:        this.max,
            compInterval:   this.interval,
            compDecimals:   0,
            onValueChanged: null
        };
    },

    created()
    {
        this.$options.template = this.template;

        this.compDecimals = floatLength(defaultValue(this.compInterval, 0));
        this.compInterval = defaultValue(this.compInterval, 1);
        this.onValueChanged = debounce(
            () =>
            {
                this.$emit("quantity-change", this.compValue);
            },
            defaultValue(this.timeout, 500)
        );

        if (!isNullOrUndefined(this.variationId))
        {
            this.fetchQuantityFromBasket();
        }
    },

    computed: {
        variationBasketQuantity()
        {
            if (isNullOrUndefined(this.variationId))
            {
                return 0;
            }
            const basketObject = this.$store.state.basket.items.find(variations => variations.variationId === this.variationId);

            return basketObject ? basketObject.quantity : 0;
        },

        isMinimum()
        {
            return isDefined(this.compMin) && (this.compValue - this.compInterval) < this.compMin;
        },

        isMaximum()
        {
            return isDefined(this.compMax) && (this.compValue + this.compInterval) > this.compMax;
        },

        minimumHint()
        {
            return TranslationService.translate(
                "Ceres::Template.orderQuantityMin",
                {
                    min: this.min
                }
            );
        },

        maximumHint()
        {
            return TranslationService.translate(
                "Ceres::Template.orderQuantityMax",
                {
                    max: this.max
                }
            );
        },

        displayValue()
        {
            return this.$options.filters.numberFormat(this.compValue);
        },

        ...Vuex.mapState({
            basketItems: state => state.basket.items
        })
    },

    watch: {
        basketItems:
        {
            handler(newValue, oldValue)
            {
                if (isDefined(this.variationId) &&
                    isDefined(oldValue) &&
                    JSON.stringify(newValue) !== JSON.stringify(oldValue))
                {
                    this.fetchQuantityFromBasket();
                }
            },
            deep: true
        },

        value(newValue, oldValue)
        {
            if (newValue !== oldValue)
            {
                this.setValue(newValue);
            }
        }
    },

    methods:
    {
        increaseValue()
        {
            const newValue = formatFloat(this.compValue + this.compInterval, this.compDecimals);

            if ((isNullOrUndefined(this.compMax) || newValue <= this.compMax) && !this.waiting)
            {
                this.setValue(newValue);
            }
        },

        decreaseValue()
        {
            const newValue = formatFloat(this.compValue - this.compInterval, this.compDecimals);

            if ((isNullOrUndefined(this.compMin) || newValue >= this.compMin) && !this.waiting)
            {
                this.setValue(newValue);
            }
        },

        setValue(value)
        {
            value = parseFloat(value);
            if (isNaN(value))
            {
                value = defaultValue(this.compMin, 1);
            }

            // limit new value to min/ max value
            value = limit(value, this.compMin, this.compMax);

            // make sure, new value is an even multiple of interval
            const diff = formatFloat(value % this.compInterval, this.compDecimals, true);

            if (diff > 0 && diff !== this.compInterval)
            {
                if (diff < this.compInterval / 2)
                {
                    value -= diff;
                }
                else
                {
                    value += this.compInterval - diff;
                }
                value = limit(value, this.compMin, this.compMax);
            }

            // cut fraction
            value = formatFloat(value, this.compDecimals);

            if (value !== this.compValue)
            {
                this.compValue = value;
                this.onValueChanged();
            }
        },

        fetchQuantityFromBasket()
        {
            if (!isNullOrUndefined(this.min) && this.variationBasketQuantity >= this.min)
            {
                // minimum quantity already in basket
                this.compMin = this.compInterval;
            }

            if (!isNullOrUndefined(this.max))
            {
                // decrease maximum quantity by quantity of variations already in basket
                this.compMax = this.max - this.variationBasketQuantity;

                if (this.variationBasketQuantity + this.compInterval > this.max)
                {
                    this.compMin = 0;
                    this.compMax = 0;
                    this.$emit("out-of-stock", true);
                }
                else
                {
                    this.$emit("out-of-stock", false);
                }
            }

            this.setValue(this.compMin);
        }
    }
});
