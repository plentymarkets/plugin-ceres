<template>
    <div class="facetValue priceFacet bkr-cc">
        <div class="row">
      		<div class="input-group col-lg-6 pb-3">
      			<input type="number"
      				   class="form-control"
      				   @focus="selectAll($event)"
      				   placeholder="Min"
      				   v-model="priceMin">
      		</div>
      		<div class="input-group col-lg-6 pb-3">
      			<input type="number"
      				   class="form-control"
      				   @focus="selectAll($event)"
      				   placeholder="Max"
      				   v-model="priceMax">
      		</div>
      		<div class="col-lg-12">
      			<button type="button" class="btn btn-bkm-inverted btn-block btn-sm" :class="{ 'disabled': isDisabled }" v-tooltip
      					data-toggle="tooltip" data-placement="top" @click="triggerFilter()" :title="$translate('Ceres::Template.itemApply')">
                <span v-html="$translate('Ceres::Template.itemApply')"></span>
                <icon icon="check" :loading="isLoading"></icon>
      			</button>
      		</div>
      	</div>
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
