"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[37],{

/***/ "./resources/js/src/app/components/item/OrderPropertyList.vue":
/*!********************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyList.vue ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderPropertyList_vue_vue_type_template_id_fe8a0bd2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderPropertyList.vue?vue&type=template&id=fe8a0bd2& */ "./resources/js/src/app/components/item/OrderPropertyList.vue?vue&type=template&id=fe8a0bd2&");
/* harmony import */ var _OrderPropertyList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderPropertyList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/OrderPropertyList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OrderPropertyList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderPropertyList_vue_vue_type_template_id_fe8a0bd2___WEBPACK_IMPORTED_MODULE_0__.render,
  _OrderPropertyList_vue_vue_type_template_id_fe8a0bd2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/OrderPropertyList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyList.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyList.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderPropertyListGroup_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderPropertyListGroup.vue */ "./resources/js/src/app/components/item/OrderPropertyListGroup.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "order-property-list",

    components:
    {
        "order-property-list-group": _OrderPropertyListGroup_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
    },

    props:
    {
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
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
            activeSlide: 0,
            touchedSlides: { 0: true }
        };
    },

    mounted()
    {
        if (App.useVariationOrderProperties)
        {
            // go to first side, because variation order properties could differ between variations
            document.addEventListener("onVariationChanged", () => {
                this.activeSlide = 0;
            });
        }
    },

    computed:
    {
        sortedGroupedProperties()
        {
            const groupedProperties = JSON.parse(JSON.stringify(this.variationGroupedProperties));

            for (const group of groupedProperties)
            {
                this.sortGroupProperties(group);
            }

            return this.getSortedGroups(groupedProperties);
        },

        missingPropertyGroupIds()
        {
            if (this.variationMarkInvalidProperties)
            {
                return [...new Set(this.variationMissingProperties.map(property => property.group && property.group.id))];
            }

            return [];
        },

        variationGroupedProperties()
        {
            return this.$store.getters[`${this.itemId}/variationGroupedProperties`];
        },

        renderOrderPropertyList()
        {
            return this.variationGroupedProperties.length || App.isShopBuilder;
        },

        variationMissingProperties()
        {
            return this.$store.getters[`${this.itemId}/variationMissingProperties`];
        },

        variationMarkInvalidProperties() {
            return this.$store.state.items[this.itemId] && this.$store.state.items[this.itemId].variationMarkInvalidProperties;
        }
    },

    methods:
    {
        sortGroupProperties(group)
        {
            return group.properties.sort((prev, current) =>
            {
                if (prev.position > current.position)
                {
                    return 1;
                }
                if (prev.position < current.position)
                {
                    return -1;
                }

                return 0;
            });
        },

        getSortedGroups(groups)
        {
            for (const group of groups)
            {
                const lowestPosition = group.properties.reduce((prev, current) => (prev.position < current.position) ? prev : current);

                group.lowestPosition = lowestPosition.position;

                const groupId = group.group ? group.group.id : null;

                if (this.variationMarkInvalidProperties && this.missingPropertyGroupIds.includes(groupId))
                {
                    group.hasError = true;
                }
            }

            return groups.sort((prev, current) =>
            {
                if (prev.lowestPosition > current.lowestPosition)
                {
                    return 1;
                }
                if (prev.lowestPosition < current.lowestPosition)
                {
                    return -1;
                }

                return 0;
            });
        },

        slideTo(position)
        {
            if (position >= 0 && position < this.sortedGroupedProperties.length)
            {
                this.activeSlide = position;
                this.touchedSlides[this.activeSlide] = true;
            }
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyListGroup.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyListGroup.vue ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderPropertyListGroup_vue_vue_type_template_id_65a40158___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderPropertyListGroup.vue?vue&type=template&id=65a40158& */ "./resources/js/src/app/components/item/OrderPropertyListGroup.vue?vue&type=template&id=65a40158&");
/* harmony import */ var _OrderPropertyListGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderPropertyListGroup.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/OrderPropertyListGroup.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OrderPropertyListGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderPropertyListGroup_vue_vue_type_template_id_65a40158___WEBPACK_IMPORTED_MODULE_0__.render,
  _OrderPropertyListGroup_vue_vue_type_template_id_65a40158___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/OrderPropertyListGroup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyListGroup.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyListGroup.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderPropertyListItem_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderPropertyListItem.vue */ "./resources/js/src/app/components/item/OrderPropertyListItem.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "order-property-list-group",

    components:
    {
        OrderPropertyListItem: _OrderPropertyListItem_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
    },

    props:
    {
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        },
        propertyGroup: Object
    },

    computed:
    {
        isShownOnItemPageCount()
        {
            const properties = this.propertyGroup.properties.filter(property => property.isShownOnItemPage);

            return properties.length;
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyListItem.vue":
/*!************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyListItem.vue ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderPropertyListItem_vue_vue_type_template_id_6fc17f6c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderPropertyListItem.vue?vue&type=template&id=6fc17f6c& */ "./resources/js/src/app/components/item/OrderPropertyListItem.vue?vue&type=template&id=6fc17f6c&");
/* harmony import */ var _OrderPropertyListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderPropertyListItem.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/OrderPropertyListItem.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OrderPropertyListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderPropertyListItem_vue_vue_type_template_id_6fc17f6c___WEBPACK_IMPORTED_MODULE_0__.render,
  _OrderPropertyListItem_vue_vue_type_template_id_6fc17f6c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/OrderPropertyListItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyListItem.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyListItem.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _services_TranslationService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/TranslationService */ "./resources/js/src/app/services/TranslationService.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const ApiService = __webpack_require__(/*! ../../services/ApiService */ "./resources/js/src/app/services/ApiService.js");
const NotificationService = __webpack_require__(/*! ../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");





/* harmony default export */ __webpack_exports__["default"] = ({

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
                            _services_TranslationService__WEBPACK_IMPORTED_MODULE_1__["default"].translate("Ceres::Template.singleItemOrderPropertyFileHasReset",
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
            if (this.inputType !== "selection" || (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined)(this.selectionValue))
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

        ...(0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapState)({
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
                if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined)(value) || value.length <= 0)
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

        ...(0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapMutations)([
            "setIsBasketLoading"
        ]),
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyList.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyList.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderPropertyList.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyList.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyList.vue?vue&type=template&id=fe8a0bd2&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyList.vue?vue&type=template&id=fe8a0bd2& ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyList_vue_vue_type_template_id_fe8a0bd2___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyList_vue_vue_type_template_id_fe8a0bd2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyList_vue_vue_type_template_id_fe8a0bd2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderPropertyList.vue?vue&type=template&id=fe8a0bd2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyList.vue?vue&type=template&id=fe8a0bd2&");


/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyListGroup.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyListGroup.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyListGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderPropertyListGroup.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyListGroup.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyListGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyListGroup.vue?vue&type=template&id=65a40158&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyListGroup.vue?vue&type=template&id=65a40158& ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyListGroup_vue_vue_type_template_id_65a40158___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyListGroup_vue_vue_type_template_id_65a40158___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyListGroup_vue_vue_type_template_id_65a40158___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderPropertyListGroup.vue?vue&type=template&id=65a40158& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyListGroup.vue?vue&type=template&id=65a40158&");


/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyListItem.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyListItem.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderPropertyListItem.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyListItem.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyListItem.vue?vue&type=template&id=6fc17f6c&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyListItem.vue?vue&type=template&id=6fc17f6c& ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyListItem_vue_vue_type_template_id_6fc17f6c___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyListItem_vue_vue_type_template_id_6fc17f6c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyListItem_vue_vue_type_template_id_6fc17f6c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderPropertyListItem.vue?vue&type=template&id=6fc17f6c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyListItem.vue?vue&type=template&id=6fc17f6c&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyList.vue?vue&type=template&id=fe8a0bd2&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyList.vue?vue&type=template&id=fe8a0bd2& ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.renderOrderPropertyList
    ? _c("div", { staticClass: "order-property-slider mb-3" }, [
        _c(
          "div",
          {
            staticClass: "order-property-slider-inner",
            style: { transform: "translateX(-" + _vm.activeSlide * 100 + "%)" },
          },
          _vm._l(_vm.sortedGroupedProperties, function (propertyGroup, index) {
            return _c(
              "div",
              { key: index, class: { active: index === _vm.activeSlide } },
              [
                _c("order-property-list-group", {
                  key: propertyGroup.id,
                  attrs: {
                    "padding-classes": _vm.paddingClasses,
                    "padding-inline-styles": _vm.paddingInlineStyles,
                    "property-group": propertyGroup,
                  },
                }),
              ],
              1
            )
          }),
          0
        ),
        _vm._v(" "),
        _vm.sortedGroupedProperties.length > 1
          ? _c(
              "div",
              {
                staticClass: "order-property-slider-controls",
                class: _vm.paddingClasses,
                style: _vm.paddingInlineStyles,
              },
              [
                _c(
                  "div",
                  {
                    staticClass: "btn shadow-none",
                    class: {
                      "btn-primary": _vm.activeSlide > 0,
                      "btn-secondary disabled": _vm.activeSlide === 0,
                    },
                    attrs: {
                      tabindex: "0",
                      "data-testing": "order-property-previous-slide",
                    },
                    on: {
                      click: function ($event) {
                        return _vm.slideTo(_vm.activeSlide - 1)
                      },
                    },
                  },
                  [_c("span", { staticClass: "fa fa-chevron-left" })]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "slider-nav" },
                  _vm._l(
                    _vm.sortedGroupedProperties,
                    function (propertyGroup, index) {
                      return _c("span", {
                        directives: [{ name: "tooltip", rawName: "v-tooltip" }],
                        key: index,
                        class: {
                          active: index === _vm.activeSlide,
                          highlight: !_vm.touchedSlides[index],
                          error: propertyGroup.hasError,
                        },
                        attrs: {
                          "data-toggle": "tooltip",
                          "data-placement": "top",
                          title: propertyGroup.group
                            ? propertyGroup.group.names.name
                            : _vm.$translate(
                                "Ceres::Template.singleItemPropertiesWithoutGroup"
                              ),
                        },
                        on: {
                          click: function ($event) {
                            return _vm.slideTo(index)
                          },
                        },
                      })
                    }
                  ),
                  0
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "btn float-right shadow-none",
                    class: {
                      "btn-primary":
                        _vm.activeSlide <
                        _vm.sortedGroupedProperties.length - 1,
                      "btn-secondary disabled":
                        _vm.activeSlide >=
                        _vm.sortedGroupedProperties.length - 1,
                    },
                    attrs: {
                      tabindex: "0",
                      "data-testing": "order-property-next-slide",
                    },
                    on: {
                      click: function ($event) {
                        return _vm.slideTo(_vm.activeSlide + 1)
                      },
                    },
                  },
                  [_c("span", { staticClass: "fa fa-chevron-right" })]
                ),
              ]
            )
          : _vm._e(),
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyListGroup.vue?vue&type=template&id=65a40158&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyListGroup.vue?vue&type=template&id=65a40158& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.isShownOnItemPageCount
      ? _c(
          "div",
          { staticClass: "pt-2" },
          [
            _vm.propertyGroup.group
              ? _c(
                  "div",
                  { class: _vm.paddingClasses, style: _vm.paddingInlineStyles },
                  [
                    _c("div", { staticClass: "h4" }, [
                      _vm._v(
                        "\n                " +
                          _vm._s(_vm.propertyGroup.group.names.name) +
                          ":\n            "
                      ),
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "text-muted text-wrap" }, [
                      _vm._v(
                        "\n                " +
                          _vm._s(_vm.propertyGroup.group.names.description) +
                          "\n            "
                      ),
                    ]),
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm._l(_vm.propertyGroup.properties, function (property) {
              return _c(
                "div",
                {
                  key: property.id,
                  class: _vm.paddingClasses,
                  style: _vm.paddingInlineStyles,
                },
                [
                  property.isShownOnItemPage
                    ? _c("order-property-list-item", {
                        attrs: {
                          group: _vm.propertyGroup.group,
                          property: property,
                        },
                      })
                    : _vm._e(),
                ],
                1
              )
            }),
          ],
          2
        )
      : _vm._e(),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyListItem.vue?vue&type=template&id=6fc17f6c&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyListItem.vue?vue&type=template&id=6fc17f6c& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "position-relative" },
    [
      _vm.inputType === "text" ||
      _vm.inputType === "float" ||
      _vm.inputType === "int"
        ? _c(
            "div",
            {
              staticClass: "input-unit order-property-input",
              class: { active: _vm.property.value, error: _vm.hasError },
              attrs: { "data-validate": "text" },
            },
            [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.inputValue,
                    expression: "inputValue",
                  },
                  { name: "tooltip", rawName: "v-tooltip" },
                ],
                attrs: {
                  type: "text",
                  "data-toggle": "tooltip",
                  title: _vm.property.names.description,
                  "data-testing": "order-property-input-" + _vm.inputType,
                },
                domProps: { value: _vm.inputValue },
                on: {
                  input: [
                    function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.inputValue = $event.target.value
                    },
                    function ($event) {
                      return _vm.onInputValueChanged($event.target.value)
                    },
                  ],
                },
              }),
              _vm._v(" "),
              _c("label", { staticClass: "d-flex" }, [
                _c("span", { staticClass: "text-truncate" }, [
                  _vm._v(_vm._s(_vm.property.names.name)),
                ]),
                _vm._v(" "),
                _c(
                  "strong",
                  { staticClass: "ml-1" },
                  [
                    _vm.surcharge > 0
                      ? [
                          _vm._v(
                            "( " +
                              _vm._s(_vm.inclOrPlus) +
                              " " +
                              _vm._s(_vm._f("currency")(_vm.surcharge)) +
                              ")"
                          ),
                        ]
                      : _vm._e(),
                    _vm._v(" "),
                    _c("span", [
                      _vm._v(
                        _vm._s(_vm.footnotes) +
                          " " +
                          _vm._s(_vm.requiredFootnotes)
                      ),
                    ]),
                  ],
                  2
                ),
              ]),
            ]
          )
        : _vm.inputType === "checkbox" || _vm.inputType === "radio"
        ? _c(
            "div",
            { staticClass: "form-check", class: { error: _vm.hasError } },
            [
              _vm.inputType === "checkbox" &&
              !(_vm.property.isRequired && _vm.property.isPreSelected)
                ? _c("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      name: _vm.group ? _vm.group.id : "check" + _vm._uid,
                      id: "check" + _vm._uid,
                      "data-testing": "order-property-input-checkbox",
                    },
                    domProps: {
                      value: _vm.property.id,
                      checked: _vm.property.value,
                    },
                    on: {
                      change: function ($event) {
                        return _vm.onInputValueChanged($event.target.checked)
                      },
                    },
                  })
                : _vm.inputType === "radio"
                ? _c("input", {
                    staticClass: "form-check-input",
                    attrs: {
                      type: "radio",
                      name: _vm.group ? _vm.group.id : "check" + _vm._uid,
                      id: "check" + _vm._uid,
                      "data-testing": "order-property-input-radio",
                    },
                    domProps: {
                      value: _vm.property.id,
                      checked: _vm.property.value,
                    },
                    on: {
                      change: function ($event) {
                        return _vm.onInputValueChanged($event.target.value)
                      },
                    },
                  })
                : _vm._e(),
              _vm._v(" "),
              _c(
                "label",
                {
                  directives: [{ name: "tooltip", rawName: "v-tooltip" }],
                  staticClass: "form-check-label text-appearance d-flex",
                  attrs: {
                    for: "check" + _vm._uid,
                    "data-toggle": "tooltip",
                    title: _vm.property.names.description,
                    "data-testing": "order-property-label-" + _vm.inputType,
                  },
                },
                [
                  _c("span", { staticClass: "text-wrap" }, [
                    _vm._v(_vm._s(_vm.property.names.name)),
                  ]),
                  _vm._v(" "),
                  _c(
                    "strong",
                    { staticClass: "ml-1" },
                    [
                      _vm.surcharge > 0
                        ? [
                            _vm._v(
                              "( " +
                                _vm._s(_vm.inclOrPlus) +
                                " " +
                                _vm._s(_vm._f("currency")(_vm.surcharge)) +
                                ")"
                            ),
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _c("span", [
                        _vm._v(
                          _vm._s(_vm.footnotes) +
                            " " +
                            _vm._s(_vm.requiredFootnotes)
                        ),
                      ]),
                    ],
                    2
                  ),
                ]
              ),
            ]
          )
        : _vm.inputType === "selection"
        ? _c(
            "div",
            { class: { "d-flex": _vm.selectedDescription } },
            [
              _c(
                "div",
                {
                  directives: [{ name: "tooltip", rawName: "v-tooltip" }],
                  staticClass: "input-unit order-property-input",
                  class: { active: _vm.property.value, error: _vm.hasError },
                  attrs: {
                    "data-toggle": "tooltip",
                    title: _vm.property.names.description,
                  },
                },
                [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.selectionValue,
                          expression: "selectionValue",
                        },
                      ],
                      staticClass: "custom-select",
                      attrs: {
                        id: "order-property-input-select",
                        "data-testing": "order-property-selection",
                      },
                      on: {
                        change: [
                          function ($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function (o) {
                                return o.selected
                              })
                              .map(function (o) {
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.selectionValue = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                          function ($event) {
                            return _vm.onInputValueChanged($event.target.value)
                          },
                        ],
                      },
                    },
                    [
                      _c(
                        "option",
                        { domProps: { selected: true, value: null } },
                        [
                          _vm._v(
                            _vm._s(
                              _vm.$translate(
                                "Ceres::Template.singleItemPleaseSelect"
                              )
                            )
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _vm._l(
                        _vm.property.selectionValues,
                        function (value, id) {
                          return _c(
                            "option",
                            {
                              key: id,
                              attrs: {
                                "data-testing":
                                  "order-property-selection-option",
                              },
                              domProps: {
                                selected: _vm.property.id === id,
                                value: id,
                              },
                            },
                            [_vm._v(_vm._s(value.name))]
                          )
                        }
                      ),
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c(
                    "label",
                    {
                      staticClass: "d-flex w-100",
                      attrs: { for: "order-property-input-select" },
                    },
                    [
                      _c("span", { staticClass: "text-truncate" }, [
                        _vm._v(_vm._s(_vm.property.names.name)),
                      ]),
                      _vm._v(" "),
                      _c(
                        "strong",
                        { staticClass: "ml-1" },
                        [
                          _vm.surcharge > 0
                            ? [
                                _vm._v(
                                  "( " +
                                    _vm._s(_vm.inclOrPlus) +
                                    " " +
                                    _vm._s(_vm._f("currency")(_vm.surcharge)) +
                                    ")"
                                ),
                              ]
                            : _vm._e(),
                          _vm._v(" "),
                          _c("span", [
                            _vm._v(
                              _vm._s(_vm.footnotes) +
                                " " +
                                _vm._s(_vm.requiredFootnotes)
                            ),
                          ]),
                        ],
                        2
                      ),
                    ]
                  ),
                ]
              ),
              _vm._v(" "),
              _vm.selectedDescription
                ? _c("popper", {
                    staticClass: "order-property-selection-info-popper",
                    attrs: { placement: "bottom" },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "handle",
                          fn: function () {
                            return [
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-icon btn-circle btn-default btn-appearance font-weight-bold",
                                },
                                [_vm._v("?")]
                              ),
                            ]
                          },
                          proxy: true,
                        },
                        {
                          key: "content",
                          fn: function () {
                            return [
                              _vm._v(
                                "\n                " +
                                  _vm._s(_vm.selectedDescription) +
                                  "\n            "
                              ),
                            ]
                          },
                          proxy: true,
                        },
                      ],
                      null,
                      false,
                      2730731730
                    ),
                  })
                : _vm._e(),
            ],
            1
          )
        : _vm.inputType === "file"
        ? _c(
            "div",
            { staticClass: "d-flex" },
            [
              _c(
                "label",
                {
                  directives: [{ name: "tooltip", rawName: "v-tooltip" }],
                  staticClass:
                    "input-unit file-input order-property-input component-loading with-icon sending",
                  class: {
                    active: _vm.property.value,
                    "is-loading": _vm.waiting,
                    error: _vm.hasError,
                  },
                  attrs: {
                    "data-toggle": "tooltip",
                    title: _vm.property.names.description,
                  },
                },
                [
                  _c(
                    "span",
                    {
                      staticClass: "input-unit-preview",
                      class: { disabled: _vm.waiting },
                    },
                    [_vm._v(_vm._s(_vm.selectedFileName))]
                  ),
                  _vm._v(" "),
                  _c("span", { staticClass: "input-unit-label d-flex" }, [
                    _c("span", { staticClass: "text-truncate" }, [
                      _vm._v(_vm._s(_vm.property.names.name)),
                    ]),
                    _vm._v(" "),
                    _c(
                      "strong",
                      { staticClass: "ml-1" },
                      [
                        _vm.surcharge > 0
                          ? [
                              _vm._v(
                                "( " +
                                  _vm._s(_vm.inclOrPlus) +
                                  " " +
                                  _vm._s(_vm._f("currency")(_vm.surcharge)) +
                                  ")"
                              ),
                            ]
                          : _vm._e(),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(
                            _vm._s(_vm.footnotes) +
                              " " +
                              _vm._s(_vm.requiredFootnotes)
                          ),
                        ]),
                      ],
                      2
                    ),
                  ]),
                  _vm._v(" "),
                  !_vm.selectedFile
                    ? _c("span", { staticClass: "input-unit-btn" }, [
                        _c("i", { staticClass: "fa fa-ellipsis-h" }),
                      ])
                    : _c(
                        "span",
                        {
                          staticClass: "input-unit-btn",
                          attrs: { disabled: _vm.waiting },
                          on: {
                            click: function ($event) {
                              $event.preventDefault()
                              return _vm.clearSelectedFile()
                            },
                          },
                        },
                        [_c("i", { staticClass: "fa fa-times" })]
                      ),
                  _vm._v(" "),
                  _c("input", {
                    ref: "fileInput",
                    attrs: {
                      disabled: _vm.waiting,
                      type: "file",
                      size: "50",
                      "data-testing": "order-property-input-file",
                    },
                    on: {
                      change: function ($event) {
                        return _vm.setPropertyFile($event)
                      },
                    },
                  }),
                ]
              ),
              _vm._v(" "),
              _c(
                "client-only",
                [
                  _vm.isTouchDevice && _vm.property.names.description
                    ? _c("popper", {
                        staticClass: "order-property-selection-info-popper",
                        attrs: { placement: "bottom" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "handle",
                              fn: function () {
                                return [
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-icon btn-circle btn-default btn-appearance font-weight-bold",
                                    },
                                    [_vm._v("?")]
                                  ),
                                ]
                              },
                              proxy: true,
                            },
                            {
                              key: "content",
                              fn: function () {
                                return [
                                  _vm._v(
                                    "\n                    " +
                                      _vm._s(_vm.property.names.description) +
                                      "\n                "
                                  ),
                                ]
                              },
                              proxy: true,
                            },
                          ],
                          null,
                          false,
                          1618376136
                        ),
                      })
                    : _vm._e(),
                ],
                1
              ),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "client-only",
        [
          _vm.isTouchDevice &&
          _vm.inputType !== "selection" &&
          _vm.inputType !== "file" &&
          _vm.property.names.description
            ? _c("popper", {
                staticClass:
                  "order-property-selection-info-popper position-absolute",
                class: {
                  "checkbox-or-radio":
                    _vm.inputType === "checkbox" || _vm.inputType === "radio",
                },
                attrs: { placement: "bottom" },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "handle",
                      fn: function () {
                        return [
                          _c(
                            "button",
                            {
                              staticClass:
                                "btn btn-icon btn-circle btn-default btn-appearance font-weight-bold",
                            },
                            [_vm._v("?")]
                          ),
                        ]
                      },
                      proxy: true,
                    },
                    {
                      key: "content",
                      fn: function () {
                        return [
                          _vm._v(
                            "\n                " +
                              _vm._s(_vm.property.names.description) +
                              "\n            "
                          ),
                        ]
                      },
                      proxy: true,
                    },
                  ],
                  null,
                  false,
                  1214237640
                ),
              })
            : _vm._e(),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-37.js.map