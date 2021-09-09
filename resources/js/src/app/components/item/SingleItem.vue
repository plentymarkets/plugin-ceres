<template>
    <div>
        <slot :getDataField="getDataField" :getFilteredDataField="getFilteredDataField">
            <div class="single container-max page-content">
                <div class="row position-relative">

                    <div class="col-12 col-md-7 mt-5">
                        <slot name="image-carousel"></slot>
                    </div>

                    <div class="col-12 col-md-5 mt-md-5">
                        <div v-stick-in-parent>
                            <!-- START SINGLEITEM_DETAILS -->
                            <div class="producertag h6 producer text-muted" v-if="currentVariation.filter.hasManufacturer">
                                {{ currentVariation.item.manufacturer.externalName }}
                            </div>

                            <h1 class="h2 title" data-testing="item-name">
                                <span>
                                    {{ currentVariation | itemName }}
                                </span>
                            </h1>

                            <slot name="tag-list"></slot>

                            <p class="single-description"
                               v-if="isShortDescriptionActive && currentVariation.texts.shortDescription !== ''"
                               v-html="currentVariation.texts.shortDescription"></p>

                            <hr>

                            <div class="mb-5">
                                <span class="articlenumber small text-muted">
                                    <b>{{ $translate("Ceres::Template.singleItemNumber") }} </b>
                                    <span>{{ currentVariation.variation.number }}</span>
                                </span>
                            </div>

                            <!-- Variation -->
                            <div class="mb-3" v-if="attributes.length || Object.keys(units).length">
                                <variation-select></variation-select>
                            </div>
                            <!-- /Variation -->

                            <!-- Item Bundle -->
                            <item-bundle v-if="currentVariation.variation.bundleType === 'bundle'" :bundle-type="currentVariation.variation.bundleType" :bundle-components="currentVariation.bundleComponents"></item-bundle>
                            <!-- /Item Bundle -->

                            <slot name="before-price"></slot>

                            <div v-if="currentVariation.filter.isSalable && variationGroupedProperties.length">
                                <order-property-list></order-property-list>
                            </div>

                            <graduated-prices></graduated-prices>

                            <item-price :show-cross-price="isRecommendedPriceActive"></item-price>

                            <slot name="after-price"></slot>

                            <item-availability></item-availability>

                            <div class="my-3">
                                <div class="w-100">
                                    <slot name="before-add-to-basket"></slot>
                                </div>

                                <div v-if="currentVariation.item.itemType === 'set'" class="alert alert-info w-100">
                                    {{ $translate("Ceres::Template.singleItemSetInfo") }}
                                </div>
                                <div v-else class="col-12 col-sm-7 col-md-12 col-lg-8 my-3">
                                    <add-to-basket
                                        :variation-id="currentVariation.variation.id"
                                        :is-salable="!!currentVariation.filter && currentVariation.filter.isSalable"
                                        :has-children="!!currentVariation.filter && currentVariation.filter.hasActiveChildren"
                                        :interval-quantity="currentVariation.variation.intervalOrderQuantity || 1"
                                        :minimum-quantity="currentVariation.variation.minimumOrderQuantity"
                                        :maximum-quantity="!!currentVariation.variation.maximumOrderQuantity && currentVariation.variation.maximumOrderQuantity > 0 ? currentVariation.variation.maximumOrderQuantity : null"
                                        :order-properties="currentVariation.properties.filter(function(prop) { return prop.property.isOderProperty })"
                                        :use-large-scale="false"
                                        :show-quantity="true"
                                        :item-url="currentVariation | itemURL"
                                        :is-variation-selected="isVariationSelected && currentVariation.filter.isSalable"
                                        :has-price="currentVariation | hasItemDefaultPrice"
                                    >
                                    </add-to-basket>
                                </div>

                                <div class="w-100">
                                    <slot name="after-add-to-basket"></slot>
                                </div>
                            </div>

                            <div v-if="isWishListEnabled" class="row">
                                <div class="col-12">
                                    <add-to-wish-list :variation-id="currentVariation.variation.id"></add-to-wish-list>
                                </div>
                            </div>
                            <!-- ./ITEM DETAIL -->

                            <slot name="additional-content-after-add-to-basket"></slot>

                            <hr>

                            <span class="vat small text-muted">
                                * <template v-if="showNetPrices">{{ $translate("Ceres::Template.singleItemExclVAT") }}</template><template v-else>{{ $translate("Ceres::Template.singleItemInclVAT") }}</template> {{ $translate("Ceres::Template.singleItemExclusive") }}
                            <a v-if="hasShippingCostsCategoryId" data-toggle="modal" href="#shippingscosts" :title="$translate('Ceres::Template.singleItemShippingCosts')">{{ $translate("Ceres::Template.singleItemShippingCosts") }}</a>
                            <a v-else :title="$translate('Ceres::Template.singleItemShippingCosts')">{{ $translate("Ceres::Template.singleItemShippingCosts") }}</a>

                            </span>

                            <slot name="additional-content-after-vat"></slot>
                            <!-- END SINGLEITEM_DETAILS -->
                        </div>
                    </div>

                    <div class="col-12 col-md-7">
                        <!-- ITEM DESCRIPTION -->
                        <div class="my-5">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item" v-if="isDescriptionTabActive">
                                    <a class="nav-link active" data-toggle="tab" :href="'#details-' + currentVariation.variation.id" role="tab">{{ $translate("Ceres::Template.singleItemDescription") }}</a>
                                </li>

                                <li class="nav-item" v-if="isTechnicalDataTabActive">
                                    <a :class="{ 'active': !isDescriptionTabActive && isTechnicalDataTabActive }" class="nav-link" data-toggle="tab" :href="'#data-' + currentVariation.variation.id" role="tab">{{ $translate("Ceres::Template.singleItemTechnicalData") }}</a>
                                </li>

                                <li class="nav-item">
                                    <a :class="{ 'active': !isDescriptionTabActive && !isTechnicalDataTabActive }" class="nav-link" data-toggle="tab" href="#assessments-details" role="tab">{{ $translate("Ceres::Template.singleItemMoreDetails") }}</a>
                                </li>

                                <slot name="add-detail-tabs"></slot>
                            </ul>

                            <div class="tab-content overflow-hidden">
                                <div class="tab-pane active overflow-auto" :id="'details-' + currentVariation.variation.id" role="tabpanel" v-if="isDescriptionTabActive">
                                    <div class="my-4" v-html="currentVariation.texts.description">
                                    </div>
                                </div>

                                <div :class="{ 'active': !isDescriptionTabActive && isTechnicalDataTabActive }" class="tab-pane overflow-auto" :id="'data-' + currentVariation.variation.id" role="tabpanel" v-if="isTechnicalDataTabActive">
                                    <div class="my-4" v-html="currentVariation.texts.technicalData">
                                    </div>
                                </div>

                                <div :class="{ 'active': !isDescriptionTabActive && !isTechnicalDataTabActive }" class="tab-pane overflow-auto" id="assessments-details" role="tabpanel">
                                    <div class="my-4">
                                        <table class="table table-striped table-hover table-sm">
                                            <tbody>
                                            <tr v-if="itemConfig.includes('item.id') || itemConfig.includes('all')">
                                                <td>{{ $translate("Ceres::Template.singleItemId") }}</td>
                                                <td>{{ currentVariation.item.id }}</td>
                                            </tr>

                                            <tr v-if="currentVariation.item.condition && currentVariation.item.condition.names.name !== '' && (itemConfig.includes('item.condition') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemCondition") }}</td>
                                                <td>{{ currentVariation.item.condition.names.name }}</td>
                                            </tr>

                                            <tr v-if="itemConfig.includes('item.age_rating') || itemConfig.includes('all')">
                                                <td>{{ $translate("Ceres::Template.singleItemAge") }}</td>
                                                <td>{{ currentVariation.item.ageRestriction | ageRestriction }}</td>
                                            </tr>

                                            <tr v-if="currentVariation.variation.externalId !== '' && (itemConfig.includes('item.external_id') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemExternalVariationId") }}</td>
                                                <td>{{ currentVariation.variation.externalId }}</td>
                                            </tr>

                                            <tr v-if="currentVariation.variation.model !== '' && (itemConfig.includes('item.variation_model') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemModel") }}</td>
                                                <td>{{ currentVariation.variation.model }}</td>
                                            </tr>

                                            <tr v-if="currentVariation.filter.hasManufacturer && currentVariation.item.manufacturer.externalName !== '' && (itemConfig.includes('item.manufacturer') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemManufacturer") }}</td>
                                                <td>{{ currentVariation.item.manufacturer.externalName }}</td>
                                            </tr>

                                            <tr v-if="currentVariation.item.producingCountry && currentVariation.item.producingCountry.names.name !== '' && (itemConfig.includes('item.producerCountry') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemManufacturingCountry") }}</td>
                                                <td>{{ currentVariation.item.producingCountry.names.name }}</td>
                                            </tr>

                                            <tr v-if="currentVariation.unit && (itemConfig.includes('item.variationBase_content') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemContent") }}</td>
                                                <td>{{ currentVariation.unit.content }} {{ currentVariation.unit.names.name }}</td>
                                            </tr>

                                            <tr v-if="currentVariation.variation.weightG !== '' && (itemConfig.includes('item.weightG') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemWeight") }}</td>
                                                <td>{{ currentVariation.variation.weightG }} g</td>
                                            </tr>

                                            <tr v-if="currentVariation.variation.weightNetG !== '' && (itemConfig.includes('item.weightNetG') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemNetWeight") }}</td>
                                                <td>{{ currentVariation.variation.weightNetG }} g</td>
                                            </tr>

                                            <tr v-if="itemConfig.includes('item.variation_dimensions') || itemConfig.includes('all')">
                                                <td>{{ $translate("Ceres::Template.singleItemDimensions") }}</td>
                                                <td>
                                                    <span>{{ currentVariation.variation.lengthMM }}</span>&times;<!--
                                                --><span>{{ currentVariation.variation.widthMM }}</span>&times;<!--
                                                --><span>{{ currentVariation.variation.heightMM }}</span> mm
                                                </td>
                                            </tr>

                                            <tr v-if="currentVariation.variation.customsTariffNumber !== '' && (itemConfig.includes('variation.customs_tariff_number') || itemConfig.includes('all'))">
                                                <td>{{ $translate("Ceres::Template.singleItemCustomsTariffNumber") }}</td>
                                                <td>{{ currentVariation.variation.customsTariffNumber }}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <slot name="add-detail-tabs-content"></slot>
                            </div>
                        </div>
                        <!-- ./ITEM DESCRIPTION -->
                    </div>

                </div>

                <slot name="item-list-container"></slot>
                <slot name="feedback-container"></slot>
            </div>
        </slot>
    </div>
</template>

<script>
import { get } from "../../helper/get";
import { isNullOrUndefined } from "../../helper/utils";

export default {

    name: "single-item",

    props: {
        pleaseSelectOptionVariationId: {
            type: Number,
            default: 0
        },
        initPleaseSelectOption: {
            type: Boolean,
            default: false
        },
        showNetPrices: {
            type: Boolean,
            default: false
        },
        isWishListEnabled: {
            type: Boolean,
            default: false
        },
        itemId: {
            type: Number,
            required: true
        },
        afterKey: Object
    },

    jsonDataFields: [
        "itemData",
        "attributesData",
        "variations"
    ],

    provide()
    {
        return {
            itemId: this.$props.itemId
        }
    },

    computed:
    {
        itemConfig()
        {
            return App.config.item.itemData;
        },

        isDescriptionTabActive()
        {
            return (App.config.item.itemData.includes("item.description") || App.config.item.itemData.includes("all"))
                && !!this.currentVariation.texts.description.length;
        },

        isRecommendedPriceActive()
        {
            return App.config.item.itemData.includes("item.recommendedPrice") || App.config.item.itemData.includes("all");
        },

        isShortDescriptionActive()
        {
            return App.config.item.itemData.includes("item.shortDescription") || App.config.item.itemData.includes("all");
        },

        hasShippingCostsCategoryId()
        {
            return App.config.global.shippingCostsCategoryId > 0;
        },

        isTechnicalDataTabActive()
        {
            return (App.config.item.itemData.includes("item.technical_data") || App.config.item.itemData.includes("all"))
                && !!this.currentVariation.texts.technicalData.length;
        },

        variationGroupedProperties()
        {
            return this.$store.getters[`${this.itemId}/variationGroupedProperties`];
        },

        variationMissingProperties()
        {
            return this.$store.getters[`${this.itemId}/variationMissingProperties`];
        },

        currentVariation() {
            return get(this.$store.state, `items[${this.itemId}].variation.documents[0].data`);
        },

        isVariationSelected() {
            return get(this.$store.state, `items[${this.itemId}].variationSelect.isVariationSelected`);
        },

        attributes() {
            return get(this.$store.state, `items[${this.itemId}].variationSelect.attributes`);
        },

        units() {
            return get(this.$store.state, `items[${this.itemId}].variationSelect.units`);
        },

        isItemSet() {
            return this.$store.state.items.isItemSet;
        }
    },

    created()
    {
        this.$store.dispatch("initVariation", this.itemData);
        this.$store.commit(`${this.itemId}/setPleaseSelectVariationId`, this.pleaseSelectOptionVariationId);
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.$store.dispatch(`${this.itemId}/variationSelect/setVariationSelect`, {
                itemId:             this.itemId,
                attributes:         this.attributesData,
                variations:         this.variations,
                initialVariationId: this.currentVariation.variation.id,
                isPleaseSelectOption: this.initPleaseSelectOption,
                afterKey:           this.afterKey
            });

            if (this.isItemSet)
            {
                this.$store.dispatch("initSetComponents", this.itemData);   
            }
        })

        // listen for variation change to hydrate all children lazy-hydrate components
        document.addEventListener("onVariationChanged", () => this.hydrateChildren(this.$children));
    },

    methods:
    {
        getDataField(field)
        {
            return get(this.currentVariation, field);
        },

        getFilteredDataField(field, filter)
        {
            if (!isNullOrUndefined(this.$options.filters[filter]))
            {
                return this.$options.filters[filter](this.getDataField(field));
            }

            return this.getDataField(field);
        },

        // iterate recursively the children components and call their hydrate method, if it is a lazy-hydrate component
        hydrateChildren(nodes)
        {
            nodes.forEach(component => {
                if (component.$options.name === "lazy-hydrate")
                {
                    component.hydrate();
                }
                else if (component.$children.length)
                {
                    this.hydrateChildren(component.$children);
                }
            })
        }
    }
}
</script>
