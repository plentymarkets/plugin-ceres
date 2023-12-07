<template>
<div class="bkr-cc input-group qty-box-small" v-if="useAppearance">  <!-- useAppearance: showSmallQtySelect -->
    <div class="qty-btn-container input-group-btn left">
        <div class="qty-btn"
                @click="decreaseValue()"
                :class="{ 'disabled': isMinimum || waiting }"
                v-tooltip="isMinimum"
                data-toggle="tooltip"
                data-placement="bottom"
                :title="minimumHint">
            <i class="fa fa-minus qty-sign" aria-hidden="true"></i>
        </div>
    </div>
    <input class="qty-input form-control"
            type="text"
            :value="displayValue"
            @change="setValue($event.target.value)"
            :disabled="waiting"
            ref="quantityInputField">

    <div class="qty-btn-container  input-group-btn right">
        <div class="qty-btn"
                @click="increaseValue()"
                :class="{ 'disabled': isMaximum || waiting }"
                v-tooltip="isMaximum && compMax !== 0"
                data-toggle="tooltip"
                data-placement="top"
                :title="maximumHint">
            <i class="fa fa-plus qty-sign" aria-hidden="true"></i>
        </div>
    </div>
</div>
<div v-else class="qty-box h-100 d-flex">
        <input class="qty-input"
                type="text"
                :value="displayValue"
                @change="setValue($event.target.value)"
                :disabled="waiting"
                ref="quantityInputField">
        <div class="qty-btn-container">
            <div class="qty-btn"
                @click="increaseValue()"
                :class="{ 'disabled': isMaximum || waiting }"
                v-tooltip="isMaximum && compMax !== 0"
                data-toggle="tooltip"
                data-placement="top"
                :title="maximumHint">
                <i class="fa fa-plus qty-sign" aria-hidden="true"></i>
            </div>
            <div class="qty-btn-seperator"></div>
            <div class="qty-btn"
                @click="decreaseValue()"
                :class="{ 'disabled': isMinimum || waiting }"
                v-tooltip="isMinimum"
                data-toggle="tooltip"
                data-placement="bottom"
                :title="minimumHint">
                <i class="fa fa-minus qty-sign" aria-hidden="true"></i>
            </div>
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
        useAppearance: {
            type: Boolean,
            default: false
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
        this.compInterval = defaultValue(this.compInterval, 1);
        this.compInterval = this.compInterval === 0 ? 1 : this.compInterval;

        const minDecimals = floatLength(this.min);
        const intervalDecimals = floatLength(this.compInterval);

        this.compDecimals = Math.max(minDecimals, intervalDecimals);

        this.onValueChanged = debounce(() =>
        {
            this.$emit("quantity-change", this.compValue);
        }, defaultValue(this.timeout, 250));

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
                    max: this.$options.filters.numberFormat(this.max)
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
        variationId(newValue)
        {
            if (isDefined(newValue))
            {
                this.fetchQuantityFromBasket();
            }
        },

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
        },

        interval(newInterval)
        {
            this.compInterval = defaultValue(newInterval, 1)
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
            let diff;
            if (this.variationBasketQuantity === 0 && this.min !== 0)
            {
                diff = formatFloat((value - this.min) % this.compInterval, this.compDecimals, true);
            }
            else
            {
                diff = formatFloat(value % this.compInterval, this.compDecimals, true);
            }

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
                // set the minimum value to the interval, if the item is already in the basket
                this.compMin = this.compInterval;
            }
            else if (this.variationBasketQuantity === 0)
            {
                // reset the minimum, when item is not in the basket
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
