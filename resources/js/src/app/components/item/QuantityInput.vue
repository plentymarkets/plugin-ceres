<template>
    <div class="qty-box d-flex h-100">
        <input class="qty-input text-center"
               type="text"
               :value="displayValue"
               @change="setValue($event.target.value)"
               :disabled="waiting"
               ref="quantityInputField"
               :aria-label="$translate('Ceres::Template.itemQuantityInput')">

        <div class="qty-btn-container d-flex flex-column">
            <button class="btn qty-btn flex-fill d-flex justify-content-center p-0"
                 @click="increaseValue()"
                 :class="{ 'disabled': isMaximum || waiting, 'btn-appearance': useAppearance }"
                 v-tooltip="isMaximum && compMax !== 0"
                 data-toggle="tooltip"
                 data-placement="top"
                 data-testing="quantity-btn-increase"
                 :title="maximumHint"
                 :aria-label="$translate('Ceres::Template.itemQuantityInputIncrease')">
                <i class="fa fa-plus default-float" aria-hidden="true"></i>
            </button>

            <button class="btn qty-btn flex-fill d-flex justify-content-center p-0"
                 @click="decreaseValue()"
                 :class="{ 'disabled': isMinimum || waiting, 'btn-appearance': useAppearance }"
                 v-tooltip="isMinimum && compMax !== 0"
                 data-toggle="tooltip"
                 data-placement="bottom"
                 data-testing="quantity-btn-decrease"
                 :title="minimumHint"
                 :aria-label="$translate('Ceres::Template.itemQuantityInputDecrease')">
                <i class="fa fa-minus default-float" aria-hidden="true"></i>
            </button>
        </div>
    </div>
</template>

<script>
import { floatLength, formatFloat, limit } from "../../helper/number";
import { defaultValue, isDefined, isNullOrUndefined } from "../../helper/utils";
import { debounce } from "../../helper/debounce";
import { mapState } from "vuex";

export default {
    name: "quantity-input",

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
        waiting: {
            type: Boolean,
            required: false
        },
        variationId: {
            type: Number,
            required: false
        },
        useAppearance: Boolean
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
        this.compInterval = defaultValue(this.compInterval, 1);
        this.compInterval = this.compInterval === 0 ? 1 : this.compInterval;

        const minDecimals = floatLength(this.min);
        const intervalDecimals = floatLength(this.compInterval);

        this.compDecimals = Math.max(minDecimals, intervalDecimals);

        this.onValueChanged = debounce(() =>
        {
            this.$emit("quantity-change", this.compValue);
        }, defaultValue(this.timeout, 500));

        if (!isNullOrUndefined(this.variationId))
        {
            this.fetchQuantityFromBasket();
        }
    },

    computed:
    {
        variationBasketQuantity()
        {
            if (isNullOrUndefined(this.variationId))
            {
                return 0;
            }

            if(this.itemSetVariationId <= 0 || this.variationId === this.itemSetVariationId)
            {
                const basketObject = this.$store.state.basket.items.find(variations => variations.variationId === this.variationId);

                return basketObject ? basketObject.quantity : 0;
            }

            return 0;
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
            return this.$translate(
                "Ceres::Template.singleItemQuantityMin",
                {
                    min: this.$options.filters.numberFormat(this.compMin)
                }
            );
        },

        maximumHint()
        {
            return this.$translate(
                "Ceres::Template.singleItemQuantityMax",
                {
                    max: this.$options.filters.numberFormat(this.Max)
                }
            );
        },

        displayValue()
        {
            return this.$options.filters.numberFormat(this.compValue);
        },

        itemSetVariationId()
        {
            if (this.$store.state.items.itemSetId > 0)
            {
                return this.$store.getters[`${this.$store.state.items.itemSetId}/currentItemVariation`].variation.id;
            }

            return 0;
        },

        ...mapState({
            basketItems: state => state.basket.items
        })
    },

    watch:
    {
        basketItems:
        {
            handler(newValue, oldValue)
            {
                if (isDefined(this.variationId))
                {
                    this.fetchQuantityFromBasket();
                }
            },
            deep: true
        },

        min(newValue)
        {
            this.compMin = newValue;
            this.fetchQuantityFromBasket();
        },

        max(newValue)
        {
            this.compMax = newValue;
            this.fetchQuantityFromBasket();
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
            // consider the configured decimal seperator (if the input is typed in the input field)
            if (typeof value === "string")
            {
                value = value.replace(App.decimalSeparator || ",", ".");
            }

            value = parseFloat(value);
            if (isNaN(value))
            {
                value = defaultValue(this.compMin, 1);
            }

            // limit new value to min/ max value
            value = limit(value, this.compMin, this.compMax);

            // make sure, new value is an even multiple of interval
            const diff = formatFloat((value - this.min) % this.compInterval, this.compDecimals, true);

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
            else if (!isNullOrUndefined(this.$refs.quantityInputField))
            {
                this.$refs.quantityInputField.value = this.displayValue;
            }
        },

        fetchQuantityFromBasket()
        {
            if (!isNullOrUndefined(this.min) && this.variationBasketQuantity >= this.min && this.variationBasketQuantity !== 0)
            {
                this.compMin = this.min % this.compInterval  || this.compInterval;
            }
            else if (this.variationBasketQuantity === 0)
            {
                this.compMin = this.min;
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
            else
            {
                this.$emit("out-of-stock", false);
            }

            this.setValue(this.compMin);
        }
    }
}
</script>
