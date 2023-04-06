<template>
    <div>
            <div v-if="inputType === 'text' || inputType === 'float' || inputType === 'int'" class="input-unit order-property-input" :class="{ 'active': property.value, 'error': hasError }" data-validate="text">
                <input
                    type="text"
                    @input="onInputValueChanged($event.target.value)"
                    v-model="inputValue"
                    v-tooltip
                    data-toggle="tooltip"
                    :title="property.names.description"
                    :data-testing="'order-property-input-' + inputType">
                <label class="d-flex">
                    <span class="text-truncate">{{ property.names.name}}</span>
                    <strong class="ml-1" v-if="surcharge > 0">(+ {{ surcharge|currency }}) *</strong>
                </label>
            </div>

            <div v-else-if="inputType === 'checkbox' || inputType === 'radio'" :class="'order-property-' + property.id" class="form-check order-property-checkbox mb-0">
                <input v-if="inputType === 'checkbox'"
                       type="checkbox"
                       :name="group ? group.id : 'check' + _uid"
                       :id="'check' + _uid"
                       :value="property.id"
                       :checked="property.value"
                       @change="onInputValueChanged($event.target.checked)"
                       class="form-check-input"
                       :class="'checkbox_' + property.id"
                       data-testing="order-property-input-checkbox">
                <input v-else
                       type="radio"
                       :name="group ? group.id : 'check' + _uid"
                       :id="'check' + _uid"
                       :value="property.id"
                       @change="onInputValueChanged($event.target.value)"
                       class="form-check-input"
                       :checked="property.value"
                       data-testing="order-property-input-radio">

                <label class="form-check-label text-appearance d-flex"
                       :for="'check' + _uid"
                       :class="{ 'text-danger': hasError }"
                       v-tooltip data-toggle="tooltip"
                       :title="property.names.description">

                    <span class="text-wrap">
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                        {{ property.names.name }}
                      <a data-toggle="modal" href="#aufbauserviceModal">Details</a>
                    </span>

                    <span class="ml-1 surcharge" v-if="surcharge > 0">+ {{ surcharge | currency }}</span>
                </label>
            </div>

            <div v-else-if="inputType === 'selection'" :class="{ 'd-flex': selectedDescription }">
                <div
                    class="input-unit order-property-input"
                    :class="{ 'active': property.value, 'error': hasError }"
                    v-tooltip
                    data-toggle="tooltip"
                    :title="property.names.description">
                    <select id="order-property-input-select" v-model="selectionValue" @change="onInputValueChanged($event.target.value)" class="custom-select" data-testing="order-property-selection">
                        <option :selected="true" :value="null">{{ $translate("Ceres::Template.singleItemPleaseSelect") }}</option>
                        <option :selected="property.id === id" :value="id" v-for="(value, id) in property.selectionValues" :key="id" data-testing="order-property-selection-option">${ value.name }</option>
                    </select>
                    <label class="d-flex w-100" for="order-property-input-select">
                        <span class="text-truncate">{{ property.names.name }}</span>
                        <span class="ml-1" v-if="surcharge > 0">{{ surcharge | currency }}</span>
                    </label>
                </div>

            </div>

            <div v-else-if="inputType === 'file'">
                <label class="input-unit file-input order-property-input component-loading with-icon sending" :class="{ 'active': property.value, 'is-loading': waiting, 'error': hasError }" v-tooltip data-toggle="tooltip" :title="property.names.description">
                    <span class="input-unit-preview" :class="{ 'disabled': waiting }">{{selectedFileName}}</span>
                    <span class="input-unit-label d-flex">
                        <span class="text-truncate">{{ property.names.name }}</span>
                        <strong class="ml-1" v-if="surcharge > 0">(+ {{ surcharge | currency }}) *</strong>
                    </span>
                    <span class="input-unit-btn" v-if="!selectedFile">
                        <i class="fa fa-ellipsis-h"></i>
                    </span>
                    <span class="input-unit-btn" v-else :disabled="waiting" @click.prevent="clearSelectedFile()">
                        <i class="fa fa-times"></i>
                    </span>
                    <input :disabled="waiting" ref="fileInput" type="file" size="50" accept="image/*" @change="setPropertyFile($event)" data-testing="order-property-input-file">
                </label>
            </div>
        </div>
</template>

<script>
const ApiService = require("../../services/ApiService");
const NotificationService = require("../../services/NotificationService");

import { isNullOrUndefined } from "../../helper/utils";
import { mapState, mapMutations } from "vuex";
import TranslationService from '../../services/TranslationService';

export default {

    name: "order-property-list-item",

    props:
    {
        group: Object,
        property: Object
    },

    inject: {
        itemId: {
            default: null
        }
    },

    data()
    {
        return {
            inputValue: "",
            selectedFile: null,
            waiting: false,
            selectionValue: null
        };
    },

    mounted()
    {
        document.addEventListener("onVariationChanged", event =>
        {
            if (event.detail.itemId === this.itemId)
            {
                // clear type specific bindings
                if (this.property.valueType === "selection")
                {
                    this.selectionValue = this.property.value || null;
                }
                else if (this.property.valueType === "file")
                {
                    if (this.property.value && this.property.value.length)
                    {
                        NotificationService.warn(
                            TranslationService.translate("Ceres::Template.singleItemOrderPropertyFileHasReset",
                                { propertyName: this.property.names.name })
                        ).closeAfter(5000);
                    }

                    this.clearSelectedFile();
                }
                else
                {
                    this.inputValue = this.property.value || "";
                }
            }
        });
    },

    computed:
    {
        inputType()
        {
            const orderPropertyGroupingType = this.group ? this.group.orderPropertyGroupingType : null;
            const valueType = this.property.valueType;

            if (valueType === "empty")
            {
                if (!orderPropertyGroupingType || orderPropertyGroupingType === "none" || orderPropertyGroupingType === "multi")
                {
                    return "checkbox";
                }

                return "radio";
            }

            return valueType;
        },

        selectedFileName()
        {
            if (this.selectedFile)
            {
                return this.selectedFile.name;
            }

            return "";
        },

        hasError()
        {
            const isRequired = this.property.isRequired || App.config.item.requireOrderProperties;

            if (isRequired && this.variationMarkInvalidProperties && this.inputType === "radio")
            {
                return this.variationMissingProperties.find(property => property.property.id === this.property.id);
            }

            return isRequired && this.variationMarkInvalidProperties && !this.property.value;
        },

        surcharge()
        {
            return this.property.itemSurcharge || this.property.surcharge;
        },

        hasTax()
        {
            return this.property.vatId !== "none" && this.property.vatId !== null;
        },

        inclOrPlus()
        {
            if(this.property.isShownAsAdditionalCosts || !this.hasTax)
            {
                return this.$translate("Ceres::Template.basketPlusAbbr")
            }
            return this.$translate("Ceres::Template.basketIncludeAbbr");
        },

        footnotes()
        {
            if (this.surcharge > 0)
            {
                if (this.property.isRequired && !this.property.isPreSelected && this.hasTax)
                {
                    return this.$translate("Ceres::Template.singleItemFootnote12");
                }
                else if(this.hasTax)
                {
                    return this.$translate("Ceres::Template.singleItemFootnote1");
                }
            }
        },

        requiredFootnotes()
        {
            if (this.property.isRequired && !this.property.isPreSelected && !this.footnotes)
            {
                return this.$translate("Ceres::Template.singleItemFootnote2");
            }
        },

        selectedDescription()
        {
            if (this.inputType !== "selection" || isNullOrUndefined(this.selectionValue))
            {
                return null;
            }

            const selectedProperty = this.property.selectionValues[this.selectionValue];

            return selectedProperty.description;
        },

        variationMissingProperties()
        {
            return this.$store.getters[`${this.itemId}/variationMissingProperties`];
        },

        variationMarkInvalidProperties() {
            return this.$store.state.items[this.itemId] && this.$store.state.items[this.itemId].variationMarkInvalidProperties;
        },

        isTouchDevice() {
            return !App.isSSR ? document.body.classList.contains("touch"): false;
        },

        ...mapState({
            isBasketLoading: state => state.basket.isBasketLoading,
        })
    },

    methods:
    {
        onInputValueChanged(value)
        {
            if (this.inputType === "int")
            {
                value = this.validateInt(value);
            }
            else if (this.inputType === "float")
            {
                value = this.validateFloat(value);
            }
            else if (this.inputType === "checkbox")
            {
                if (!value)
                {
                    value = null;
                }
            }
            else if (this.inputType === "selection")
            {
                if (isNullOrUndefined(value) || value.length <= 0)
                {
                    value = null;
                }
            }
            else if (this.inputType === "text")
            {
                if(value === "")
                {
                    value = null;
                }
            }

            this.$store.commit(`${this.itemId}/setVariationPropertySurcharges`, this.$store.getters[`${this.itemId}/variationBasePrice`]);
            this.setVariationOrderProperty({ propertyId: this.property.id, value: value });
        },

        validateInt(value)
        {
            value = parseInt(value);

            if (isNaN(value))
            {
                value = null;
            }

            this.inputValue = value;

            return value;
        },

        validateFloat(value)
        {
            const lastChar = value.slice(-1);

            const str = value.replace(App.decimalSeparator, ".");
            const arr = str.split(".");
            let toFixedLength = 0;

            if (arr.length === 2)
            {
                toFixedLength = arr[1].length;
            }

            value = parseFloat(str).toFixed(toFixedLength);

            if (isNaN(value))
            {
                value = null;
            }
            else
            {
                if (lastChar === "." || lastChar === App.decimalSeparator)
                {
                    value += lastChar;
                }

                value = value.toString().replace(".", App.decimalSeparator);
            }

            this.inputValue = value;

            return value;
        },

        setVariationOrderProperty(orderProperty) {
            return this.$store.commit(`${this.itemId}/setVariationOrderProperty`, orderProperty);
        },

        setPropertyFile(event)
        {
            if (event.target && event.target.files && event.target.files.length > 0)
            {
                this.selectedFile = event.target.files[0];
                this.uploadPropertyFile(this.selectedFile);
            }
        },

        uploadPropertyFile(file)
        {
            this.setIsBasketLoading(true);
            this.waiting = true;

            const fileData = new FormData();

            fileData.append("fileData", file);

            ApiService.post("/rest/io/order/property/file", fileData, { processData: false, contentType: false, cache: false, async: true, timeout: 60000, supressNotifications: true })
                .done(response =>
                {
                    this.setVariationOrderProperty({ propertyId: this.property.id, value: response });
                })
                .fail(error =>
                {
                    this.clearSelectedFile();
                    this._handleValidationErrors(error);
                })
                .always(response =>
                {
                    this.setIsBasketLoading(false);
                    this.waiting = false;
                });
        },

        clearSelectedFile()
        {
            this.selectedFile = null;
            this.setVariationOrderProperty({ propertyId: this.property.id, value: null });
            this.$refs.fileInput.value = "";
        },

        _handleValidationErrors(error)
        {
            if (error.hasOwnProperty("validation_errors"))
            {
                for (const err of Object.values(error.validation_errors))
                {
                    NotificationService.error(err[0]);
                }
            }

            if (error.error.message && error.error.message === "Post too large")
            {
                NotificationService.error(
                    this.$translate("Ceres::Template.errorPostTooLarge" , { maxSize: error.error.maxSize })
                );
            }
        },

        ...mapMutations([
            "setIsBasketLoading"
        ]),
    }
}
</script>
