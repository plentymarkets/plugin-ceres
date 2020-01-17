<template>
    <div>
        <div v-if="inputType === 'text' || inputType === 'float' || inputType === 'int'" class="input-unit order-property-input" :class="{ 'active': property.value, 'error': hasError }" data-validate="text">
            <input type="text" @input="onInputValueChanged($event.target.value)" v-model="inputValue" v-tooltip data-toggle="tooltip" :title="property.names.description">
            <label>{{property.names.name}}
                <strong v-if="surcharge > 0">(+ {{ surcharge | currency}})</strong>
            *</label>
        </div>

        <div v-else-if="inputType === 'checkbox' || inputType === 'radio'" class="form-check">
            <input :name="group ? group.id : 'check' + _uid"
                   :id="'check' + _uid"
                   :value="property.id"
                   v-model="property.value"
                   @change="onInputValueChanged(inputType === 'checkbox' ? $event.target.checked : $event.target.value)"
                   class="form-check-input"
                   :type="inputType">

            <label class="form-check-label text-appearance"
                   :for="'check' + _uid"
                   :class="{ 'text-danger': hasError }"
                   v-tooltip data-toggle="tooltip"
                   :title="property.names.description">
                {{ property.names.name }}
                <strong v-if="surcharge > 0">(+ {{ surcharge | currency}}) *</strong>
            </label>
        </div>

        <div v-else-if="inputType === 'selection'" :class="{ 'd-flex': selectedDescription }">
            <div
                class="input-unit order-property-input"
                :class="{ 'active': property.value, 'error': hasError }"
                v-tooltip
                data-toggle="tooltip"
                :title="property.names.description">
                <select v-model="selectionValue" @change="onInputValueChanged($event.target.value)" class="custom-select">
                    <option :selected="true" :value="null">{{ $translate("Ceres::Template.singleItemPleaseSelect") }}</option>
                    <option :selected="property.id === id" :value="id" v-for="(value, id) in property.selectionValues" :key="id">{{ value.name }}</option>
                </select>
                <label>
                    {{property.names.name}}
                    <strong v-if="surcharge > 0">(+ {{ surcharge | currency}})</strong>
                    *
                </label>
            </div>
            <popper class="order-property-selection-info-popper" v-cloak v-if="selectedDescription" placement="bottom">
                <template #handle>
                    <button class="btn btn-icon btn-circle btn-default">
                        <i class="fa fa-info"></i>
                    </button>
                </template>
                <template #content>
                    {{ selectedDescription }}
                </template>
            </popper>
        </div>

        <div v-else-if="inputType === 'file'">
            <label class="input-unit file-input order-property-input component-loading with-icon sending" :class="{ 'active': property.value, 'isLoading': waiting, 'error': hasError }" v-tooltip data-toggle="tooltip" :title="property.names.description">
                <span class="input-unit-preview" :class="{ 'disabled': waiting }">{{selectedFileName}}</span>
                <span class="input-unit-label">
                    {{property.names.name}}
                    <strong v-if="surcharge > 0">(+ {{ surcharge | currency}}) *</strong>
                </span>
                <span class="input-unit-btn" v-if="!selectedFile">
                    <i class="fa fa-ellipsis-h"></i>
                </span>
                <span class="input-unit-btn" v-else :disabled="waiting" @click.prevent="clearSelectedFile()">
                    <i class="fa fa-times"></i>
                </span>
                <input :disabled="waiting" ref="fileInput" type="file" size="50" accept="image/*" @change="setPropertyFile($event)">
            </label>
        </div>
    </div>
</template>

<script>
const ApiService = require("../../services/ApiService");
const NotificationService = require("../../services/NotificationService");

import { isNullOrUndefined } from "../../helper/utils";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {

    props:
    {
        group: Object,
        property: Object
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
        document.addEventListener("onVariationChanged", () =>
        {
            if (this.property.valueType !== "file")
            {
                this.inputValue = "";
            }
            else
            {
                this.clearSelectedFile();
            }
            this.setVariationOrderProperty({ propertyId: this.property.id, value: null });
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
            if (this.variationMarkInvalidProperties && this.inputType === "radio")
            {
                return this.variationMissingProperties.find(property => property.property.id === this.property.id);
            }

            return this.variationMarkInvalidProperties && !this.property.value;
        },

        surcharge()
        {
            return this.property.itemSurcharge || this.property.surcharge;
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

        ...mapState({
            isBasketLoading: state => state.basket.isBasketLoading,
            variationMarkInvalidProperties: state => state.item.variationMarkInvalidProperties
        }),

        ...mapGetters([
            "variationMissingProperties"
        ])
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

            value = parseFloat(value.replace(App.decimalSeparator, "."));

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

        ...mapMutations([
            "setVariationOrderProperty",
            "setIsBasketLoading"
        ]),

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
        }
    }
}
</script>

<style>

</style>
