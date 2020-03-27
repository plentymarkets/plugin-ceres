<template>
    <div class="qty-box d-flex h-100">
        <input class="qty-input text-center"
               type="text"
               :value="displayValue"
               @change="setValue($event.target.value)"
               :disabled="waiting"
               ref="quantityInputField">

        <div class="qty-btn-container d-flex flex-column">
            <button class="btn qty-btn flex-fill d-flex justify-content-center p-0"
                    @click="increaseValue()"
                    :class="{ 'disabled': isMaximum || waiting }"
                    v-tooltip="isMaximum && max !== 0"
                    data-toggle="tooltip"
                    data-placement="top"
                    :title="maximumHint">
                <i class="fa fa-plus default-float" aria-hidden="true"></i>
            </button>

            <button class="btn qty-btn flex-fill d-flex justify-content-center p-0"
                    @click="decreaseValue()"
                    :class="{ 'disabled': isMinimum || waiting }"
                    v-tooltip="isMinimum"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    :title="minimumHint">
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
    name: "set-quantity-input",

    props: {
        timeout: {
            type: Number,
            required: false,
            default: 500
        },
        waiting: {
            type: Boolean,
            required: false
        },
    },

    inject: {
        itemId: {
            default: null
        }
    },

    data()
    {
        return {
            value: 1,
            min: 0,
            max: 0,
            onValueChanged: null
        };
    },

    created()
    {
        this.min = this.minimumQuantity;
        this.max = this.maximumQuantity;

        this.onValueChanged = debounce(() =>
        {
            this.$emit("quantity-change", this.currentQuantity);
        }, defaultValue(this.timeout, 500));

        /*if (!isNullOrUndefined(this.currentVariation))
        {
            this.fetchQuantityFromBasket();
        }*/

        this.currentQuantity = 1;
    },

    computed:
    {
        variationBasketQuantity()
        {
            if (isNullOrUndefined(this.variationId))
            {
                return 0;
            }

            const basketObject = this.$store.state.basket.items.find(variations => variations.variationId === this.currentVariation.variation.id);

            return basketObject ? basketObject.quantity : 0;
        },

        isMinimum()
        {
            return isDefined(this.minimumQuantity) && this.currentQuantity < this.minimumQuantity;
        },

        isMaximum()
        {
            return isDefined(this.maximumQuantity) && this.currentQuantity  > this.maximumQuantity;
        },

        minimumHint()
        {
            return this.$translate(
                "Ceres::Template.singleItemQuantityMin",
                {
                    min: this.minimumQuantity
                }
            );
        },

        maximumHint()
        {
            return this.$translate(
                "Ceres::Template.singleItemQuantityMax",
                {
                    max: this.maximumQuantity
                }
            );
        },

        displayValue()
        {
            return this.$options.filters.numberFormat(this.currentQuantity);
        },

        currentVariation()
        {
            return this.$store.getters[`${this.itemId}/currentItemVariation`]
        },

        minimumQuantity()
        {
            return this.currentVariation.variation.minimumOrderQuantity;
        },

        maximumQuantity()
        {
            return this.currentVariation.variation.maximumOrderQuantity;
        },

        currentQuantity:
        {
            get: function()
            {
                return this.$store.state.items[this.itemId] && this.$store.state.items[this.itemId].variationOrderQuantity;
            },

            set: function(quantity)
            {
                this.$store.commit(`${this.itemId}/setVariationOrderQuantity`, quantity);
            }
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
                if (isDefined(this.currentVariation) &&
                    isDefined(oldValue) &&
                    JSON.stringify(newValue) !== JSON.stringify(oldValue))
                {
                    this.fetchQuantityFromBasket();
                }
            },
            deep: true
        },

        currentVariation(newVariation)
        {

        },

        /*min(newValue)
        {
            this.minimumQuantity = newValue;
            this.fetchQuantityFromBasket();
        },

        max(newValue)
        {
            this.maximumQuantity = newValue;
            this.fetchQuantityFromBasket();
        },*/

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
            const newValue = this.value + 1;

            if ((isNullOrUndefined(this.maximumQuantity) || newValue <= this.maximumQuantity) && !this.waiting)
            {
                this.setValue(newValue);
            }
        },

        decreaseValue()
        {
            const newValue = this.value - 1;

            if ((isNullOrUndefined(this.minimumQuantity) || newValue >= this.minimumQuantity) && !this.waiting)
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
                value = defaultValue(this.minimumQuantity, 1);
            }

            // For sets, we want a integer value
            value = Math.round(value);

            // limit new value to min/ max value
            value = limit(value, this.min, this.max);

            if (value !== this.value)
            {
                this.currentQuantity = value;
                this.onValueChanged();
            }
            else if (!isNullOrUndefined(this.$refs.quantityInputField))
            {
                this.$refs.quantityInputField.value = value;
            }
        },

        fetchQuantityFromBasket()
        {
            if (!isNullOrUndefined(this.min) && this.variationBasketQuantity >= this.min)
            {
                // minimum quantity already in basket
                this.minimumQuantity = this.compInterval;
            }

            if (!isNullOrUndefined(this.max))
            {
                // decrease maximum quantity by quantity of variations already in basket
                this.maximumQuantity = this.max - this.variationBasketQuantity;

                if (this.variationBasketQuantity + this.compInterval > this.max)
                {
                    this.minimumQuantity = 0;
                    this.maximumQuantity = 0;
                    this.$emit("out-of-stock", true);
                }
                else
                {
                    this.$emit("out-of-stock", false);
                }
            }

            this.setValue(this.minimumQuantity);
        }
    }
}
</script>
