<template>
    <div class="bkr-cc w-100">
            <div class="input-unit" v-if="localization.shippingCountries.length > 1" >
                <select class="custom-select form-control" @change="setShippingCountry($event.target.value)">
                    <option v-for="shippingCountry in localization.shippingCountries"
                            :value="shippingCountry.id"
                            :class="{ 'is-disabled': isDisabled }"
                            :disabled="isDisabled"
                            v-tooltip="isDisabled"
                            :selected="basket.shippingCountryId == shippingCountry.id">
                        {{ shippingCountry.currLangName }}
                    </option>
                </select>
                <label>{{ $translate('Ceres::Template.headerSelectShippingCountry') }}</label>
            </div>
            <div v-else>
                {{ getCountryName(localization.shippingCountryId) }}
            </div>
    </div>
</template>

<script>
import { removeUrlParam } from "../../services/UrlService";
import Vue from "vue";
import { mapState, mapGetters } from "vuex";

export default {
    props:
    {
        disableInput: Boolean,
        openBasketPreview: Boolean,
        basketSelect: Boolean
    },

    computed:
    {
        isDisabled()
        {
            return !!this.basket.customerInvoiceAddressId || !!this.basket.customerShippingAddressId || this.disableInput;
        },

        ...mapState({
            localization: state => state.localization,
            basket: state => state.basket.data
        }),

        ...mapGetters([
            "getCountryName"
        ])
    },

    mounted()
    {
        removeUrlParam("openBasketPreview");
    },

    methods:
    {
        setShippingCountry(id)
        {
            if (!this.isDisabled)
            {
                this.$store.dispatch("selectShippingCountry", { shippingCountryId: id, openBasketPreview: this.openBasketPreview });
            }
        }
    }
}
</script>
