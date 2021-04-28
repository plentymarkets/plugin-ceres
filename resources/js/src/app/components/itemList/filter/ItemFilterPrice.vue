<template>
    <div class="item-filter-price">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">{{ currency }}</span>
            </div>

            <input type="number"
                   class="form-control"
                   @focus="selectAll($event)"
                   placeholder="Min"
                   v-model="priceMin"
                   :aria-label="$translate('Ceres::Template.itemFilterPriceMin')">
        </div>

        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">{{ currency }}</span>
            </div>

            <input type="number"
                   class="form-control"
                   @focus="selectAll($event)"
                   placeholder="Max"
                   v-model="priceMax"
                   :aria-label="$translate('Ceres::Template.itemFilterPriceMax')">
        </div>

        <button type="button" class="btn btn-primary btn-appearance" :class="{'disabled': isDisabled}" v-tooltip
                data-toggle="tooltip" data-placement="top" @click="triggerFilter()" :title="$translate('Ceres::Template.itemApply')" :aria-label="$translate('Ceres::Template.itemFilterButton')">
            <icon icon="check" :loading="isLoading"></icon>
        </button>
    </div>
</template>

<script>
import UrlService from "../../../services/UrlService";
import { mapState } from "vuex";

export default {
    data()
    {
        return {
            priceMin: "",
            priceMax: "",
            currency: App.activeCurrency
        };
    },

    mounted()
    {
        const urlParams = UrlService.getUrlParams(document.location.search);

        this.priceMin = urlParams.priceMin || "";
        this.priceMax = urlParams.priceMax || "";
    },

    computed:
    {
        isDisabled()
        {
            return (this.priceMin === "" && this.priceMax === "") ||
                (parseInt(this.priceMin) >= parseInt(this.priceMax)) ||
                this.isLoading;
        },

        ...mapState({
            isLoading: state => state.itemList.isLoading
        })
    },

    methods:
    {
        selectAll(event)
        {
            event.target.select();
        },

        triggerFilter()
        {
            if (!this.isDisabled)
            {
                window.localStorage.setItem("openFilterToolbar", true);
                this.$store.dispatch("selectPriceFacet", { priceMin: this.priceMin, priceMax: this.priceMax });
            }
        }
    }
}
</script>
