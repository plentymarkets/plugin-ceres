"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[17],{

/***/ "./resources/js/src/app/components/basket/list/BasketList.vue":
/*!********************************************************************!*\
  !*** ./resources/js/src/app/components/basket/list/BasketList.vue ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BasketList_vue_vue_type_template_id_354088c4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasketList.vue?vue&type=template&id=354088c4& */ "./resources/js/src/app/components/basket/list/BasketList.vue?vue&type=template&id=354088c4&");
/* harmony import */ var _BasketList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasketList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/basket/list/BasketList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BasketList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BasketList_vue_vue_type_template_id_354088c4___WEBPACK_IMPORTED_MODULE_0__.render,
  _BasketList_vue_vue_type_template_id_354088c4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/basket/list/BasketList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketList.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketList.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _BasketListItem_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasketListItem.vue */ "./resources/js/src/app/components/basket/list/BasketListItem.vue");
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
    name: "basket-list",
    
    components:
    {
        BasketListItem: _BasketListItem_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
    },

    props:
    {
        template:
        {
            type: String,
            default: "#vue-basket-list"
        },
        basketDetailsData:
        {
            type: Array,
            default: () => []
        },
        isPreview:
        {
            type: Boolean,
            default: false
        }
    },

    computed: (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapState)({
        basketItems: state => state.basket.items,
        isBasketInitiallyLoaded: state => state.basket.isBasketInitiallyLoaded
    })
});


/***/ }),

/***/ "./resources/js/src/app/components/basket/list/BasketListItem.vue":
/*!************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/list/BasketListItem.vue ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BasketListItem_vue_vue_type_template_id_3c2c335e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasketListItem.vue?vue&type=template&id=3c2c335e& */ "./resources/js/src/app/components/basket/list/BasketListItem.vue?vue&type=template&id=3c2c335e&");
/* harmony import */ var _BasketListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasketListItem.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/basket/list/BasketListItem.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BasketListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BasketListItem_vue_vue_type_template_id_3c2c335e___WEBPACK_IMPORTED_MODULE_0__.render,
  _BasketListItem_vue_vue_type_template_id_3c2c335e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/basket/list/BasketListItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketListItem.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketListItem.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _exceptions_ExceptionMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../exceptions/ExceptionMap */ "./resources/js/src/app/exceptions/ExceptionMap.js");
/* harmony import */ var _services_TranslationService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/TranslationService */ "./resources/js/src/app/services/TranslationService.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _BasketSetComponentList_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BasketSetComponentList.vue */ "./resources/js/src/app/components/basket/list/BasketSetComponentList.vue");
/* harmony import */ var _item_OrderPropertyValueList_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../item/OrderPropertyValueList.vue */ "./resources/js/src/app/components/item/OrderPropertyValueList.vue");
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






const NotificationService = __webpack_require__(/*! ../../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "basket-list-item",
    
    components:
    {
        BasketSetComponentList: _BasketSetComponentList_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
        OrderPropertyValueList: _item_OrderPropertyValueList_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
    },

    props:
    {
        template:
        {
            type: String,
            default: "#vue-basket-list-item"
        },
        basketItem: Object,
        basketDetailsData:
        {
            type: Array,
            default: () => []
        },
        isPreview:
        {
            type: Boolean,
            default: false
        }
    },

    data()
    {
        return {
            waiting: false,
            waitingForDelete: false,
            itemCondition: "",
            showMoreInformation: false
        };
    },

    computed:
    {
        image()
        {
            const itemImages = this.$options.filters.itemImages(this.basketItem.variation.data.images, "urlPreview");

            return this.$options.filters.itemImage(itemImages);
        },

        altText()
        {
            const images = this.$options.filters.itemImages(this.basketItem.variation.data.images, "urlPreview");
            const altText =  this.$options.filters.itemImageAlternativeText(images);

            if (altText)
            {
                return altText;
            }

            return this.itemName;
        },

        itemName()
        {
            return this.$options.filters.itemName(this.basketItem.variation.data);
        },

        isInputLocked()
        {
            return this.waiting || this.isBasketLoading;
        },

        propertySurchargeSum()
        {
            let sum = 0;

            for (const property of this.basketItem.basketItemOrderParams)
            {
                sum += this.$options.filters.propertySurcharge(this.basketItem.variation.data.properties, property.propertyId);
            }

            return sum;
        },

        unitPrice()
        {
            let setComponentsParamSurcharge = 0;
            if((0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(this.basketItem.setComponents))
            {
                setComponentsParamSurcharge = this.basketItem.setComponents
                    .map(component => component.quantity * component.attributeTotalMarkup)
                    .reduce((sum, i) => sum + i, 0);
            }
            return this.basketItem.price + setComponentsParamSurcharge;
        },

        basePrice()
        {
            // if the 'AfterBasketItemUpdate' event contains a new base price for the item, return it
            if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(this.basketItem.updatedBasePrice)) 
            {
                return this.basketItem.updatedBasePrice;
            }

            if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(this.basketItem.variation.data.prices.specialOffer))
            {
                return this.basketItem.variation.data.prices.specialOffer.basePrice;
            }

            if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(this.basketItem.variation.data.prices.graduatedPrices))
            {
              let calculatedPrice = null;
              this.basketItem.variation.data.prices.graduatedPrices.forEach(price =>
              {
                  if((0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(calculatedPrice) && this.basketItem.quantity >= price.minimumOrderQuantity) {
                    calculatedPrice = price;
                  }
                  else if(this.basketItem.quantity >= price.minimumOrderQuantity && price.minimumOrderQuantity >= calculatedPrice.minimumOrderQuantity ) {
                    calculatedPrice = price;
                  }
              });

              if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(calculatedPrice)) {
                return calculatedPrice.basePrice;
              }
            }

            return this.basketItem.variation.data.prices.default.basePrice;
        },

        // eslint-disable-next-line complexity
        isMoreButtonVisible()
        {
            return this.isDataFieldVisible("basket.item.item_id") && this.basketItem.variation.data.item.id ||
                   this.isDataFieldVisible("basket.item.customNumber") && this.basketItem.variation.data.variation.number ||
                   this.isDataFieldVisible("basket.item.availability") && this.basketItem.variation.data.variation.availability.names.name ||
                   this.isDataFieldVisible("basket.item.description_long") && this.basketItem.variation.data.texts.description ||
                   this.isDataFieldVisible("basket.item.description_short") && this.basketItem.variation.data.texts.shortDescription;
        },

        ...(0,vuex__WEBPACK_IMPORTED_MODULE_5__.mapState)({
            isBasketLoading: state => state.basket.isBasketLoading,
            isCheckoutReadonly: state => state.checkout.readOnly,
            showNetPrice: state => state.basket.showNetPrices
        })
    },

    methods: {

        /**
         * Delete item from basket
         */
        deleteItem()
        {
            if (!this.waiting && !this.waitingForDelete && !this.isBasketLoading)
            {
                this.waitingForDelete = true;

                this.$store.dispatch("removeBasketItem", this.basketItem.id).then(
                    response =>
                    {
                        document.dispatchEvent(new CustomEvent("afterBasketItemRemoved", { detail: this.basketItem }));
                        this.waitingForDelete = false;
                    },
                    error =>
                    {
                        this.waitingForDelete = false;
                    });
            }
        },

        /**
         * Update item quantity in basket
         * @param quantity
         */
        updateQuantity(quantity)
        {
            if (this.basketItem.quantity !== quantity)
            {
                this.waiting = true;

                const origQty = this.basketItem.quantity;

                this.$store.dispatch("updateBasketItemQuantity", { id: this.basketItem.id, variationId: this.basketItem.variation.id, quantity: quantity }).then(
                    response =>
                    {
                        document.dispatchEvent(new CustomEvent("afterBasketItemQuantityUpdated", { detail: this.basketItem }));
                        this.waiting = false;
                    },
                    error =>
                    {
                        this.basketItem.quantity = origQty;

                        if (this.isPreview)
                        {
                            this.$store.dispatch(
                                "addBasketNotification",
                                {
                                    type: "error",
                                    message: _services_TranslationService__WEBPACK_IMPORTED_MODULE_1__["default"].translate(
                                        "Ceres::Template." + _exceptions_ExceptionMap__WEBPACK_IMPORTED_MODULE_0__["default"].get(error.data.exceptionCode.toString()),
                                        error.data.placeholder
                                    )
                                }
                            );
                        }
                        else
                        {
                            NotificationService.error(
                                _services_TranslationService__WEBPACK_IMPORTED_MODULE_1__["default"].translate(
                                    "Ceres::Template." + _exceptions_ExceptionMap__WEBPACK_IMPORTED_MODULE_0__["default"].get(error.data.exceptionCode.toString()),
                                    error.data.placeholder
                                )
                            ).closeAfter(5000);
                        }

                        this.waiting = false;
                    });
            }
        },

        isDataFieldVisible(value)
        {
            return this.basketDetailsData.includes(value);
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/basket/list/BasketSetComponentList.vue":
/*!********************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/list/BasketSetComponentList.vue ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BasketSetComponentList_vue_vue_type_template_id_8eecb10e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasketSetComponentList.vue?vue&type=template&id=8eecb10e& */ "./resources/js/src/app/components/basket/list/BasketSetComponentList.vue?vue&type=template&id=8eecb10e&");
/* harmony import */ var _BasketSetComponentList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasketSetComponentList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/basket/list/BasketSetComponentList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BasketSetComponentList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BasketSetComponentList_vue_vue_type_template_id_8eecb10e___WEBPACK_IMPORTED_MODULE_0__.render,
  _BasketSetComponentList_vue_vue_type_template_id_8eecb10e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/basket/list/BasketSetComponentList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketSetComponentList.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketSetComponentList.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SetComponentItem_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SetComponentItem.vue */ "./resources/js/src/app/components/basket/list/SetComponentItem.vue");
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
    name: "basket-set-component-list",

    components: {
        SetComponentItem: _SetComponentItem_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
    },

    props: {
        setComponents: {
            type: Array,
            default: () => []
        },
        setItem: Object
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/basket/list/BasketList.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/list/BasketList.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_BasketList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BasketList.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketList.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/basket/list/BasketList.vue?vue&type=template&id=354088c4&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/list/BasketList.vue?vue&type=template&id=354088c4& ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketList_vue_vue_type_template_id_354088c4___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketList_vue_vue_type_template_id_354088c4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketList_vue_vue_type_template_id_354088c4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BasketList.vue?vue&type=template&id=354088c4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketList.vue?vue&type=template&id=354088c4&");


/***/ }),

/***/ "./resources/js/src/app/components/basket/list/BasketListItem.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/list/BasketListItem.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_BasketListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BasketListItem.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketListItem.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/basket/list/BasketListItem.vue?vue&type=template&id=3c2c335e&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/list/BasketListItem.vue?vue&type=template&id=3c2c335e& ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketListItem_vue_vue_type_template_id_3c2c335e___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketListItem_vue_vue_type_template_id_3c2c335e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketListItem_vue_vue_type_template_id_3c2c335e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BasketListItem.vue?vue&type=template&id=3c2c335e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketListItem.vue?vue&type=template&id=3c2c335e&");


/***/ }),

/***/ "./resources/js/src/app/components/basket/list/BasketSetComponentList.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/list/BasketSetComponentList.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_BasketSetComponentList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BasketSetComponentList.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketSetComponentList.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketSetComponentList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/basket/list/BasketSetComponentList.vue?vue&type=template&id=8eecb10e&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/list/BasketSetComponentList.vue?vue&type=template&id=8eecb10e& ***!
  \***************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketSetComponentList_vue_vue_type_template_id_8eecb10e___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketSetComponentList_vue_vue_type_template_id_8eecb10e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketSetComponentList_vue_vue_type_template_id_8eecb10e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BasketSetComponentList.vue?vue&type=template&id=8eecb10e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketSetComponentList.vue?vue&type=template&id=8eecb10e&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketList.vue?vue&type=template&id=354088c4&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketList.vue?vue&type=template&id=354088c4& ***!
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
  return _c(
    "div",
    [
      _c(
        "div",
        [
          !_vm.basketItems.length > 0
            ? _c("div", [
                _c("div", { staticClass: "h5 py-3" }, [
                  _vm._v(
                    _vm._s(_vm.$translate("Ceres::Template.basketNoItems"))
                  ),
                ]),
              ])
            : _vm._e(),
          _vm._v(" "),
          _c(
            "transition-group",
            { attrs: { name: "list-transition", tag: "div" } },
            [
              _vm._l(_vm.basketItems, function (basketItem) {
                return [
                  _c("basket-list-item", {
                    key: basketItem.id,
                    attrs: {
                      "basket-item": basketItem,
                      "is-preview": _vm.isPreview,
                      "basket-details-data": _vm.basketDetailsData,
                    },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "before-basket-item",
                          fn: function () {
                            return [_vm._t("before-basket-item")]
                          },
                          proxy: true,
                        },
                        {
                          key: "after-basket-item",
                          fn: function () {
                            return [_vm._t("after-basket-item")]
                          },
                          proxy: true,
                        },
                      ],
                      null,
                      true
                    ),
                  }),
                ]
              }),
            ],
            2
          ),
        ],
        1
      ),
      _vm._v(" "),
      !_vm.isBasketInitiallyLoaded
        ? _c("loading-animation", { staticClass: "d-table w-100" })
        : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketListItem.vue?vue&type=template&id=3c2c335e&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketListItem.vue?vue&type=template&id=3c2c335e& ***!
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
    { staticClass: "basket-list-item py-3" },
    [
      _vm._t("before-basket-item"),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "basket-item component-loading with-icon d-flex",
          class: {
            "sending is-loading": _vm.waiting,
            "is-loading": _vm.isCheckoutReadonly,
          },
        },
        [
          _c("div", { staticClass: "image-container" }, [
            _c(
              "a",
              {
                attrs: {
                  href: _vm._f("itemURL")(_vm.basketItem.variation.data),
                },
              },
              [
                _vm.image
                  ? _c("lazy-img", {
                      attrs: {
                        "picture-class": "d-block mw-100 mh-100",
                        "image-url": _vm.image,
                        alt: _vm.altText,
                        title: _vm.itemName,
                        "data-testing": "basket-item-img",
                      },
                    })
                  : _vm._e(),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "meta-container-wrapper" },
            [
              _c("div", { staticClass: "meta-container-wrapper-inner" }, [
                _c("div", { staticClass: "meta-container" }, [
                  _c(
                    "div",
                    { staticClass: "position-relative w-100" },
                    [
                      _c(
                        "a",
                        {
                          staticClass:
                            "item-name text-primary text-appearance small font-weight-bold text-break",
                          attrs: {
                            href: _vm._f("itemURL")(
                              _vm.basketItem.variation.data
                            ),
                            "data-testing": "basket-item-name",
                          },
                        },
                        [
                          _vm._v(
                            "\n                            " +
                              _vm._s(
                                _vm._f("itemName")(
                                  _vm.basketItem.variation.data
                                )
                              ) +
                              "\n                        "
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "item-base-price small" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm._f("currency")(_vm.unitPrice)) +
                            "\n                        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("item-bundle", {
                        attrs: {
                          "bundle-type":
                            _vm.basketItem.variation.data.variation.bundleType,
                          "bundle-components":
                            _vm.basketItem.variation.data.bundleComponents,
                        },
                      }),
                      _vm._v(" "),
                      !(
                        _vm.basketItem.variation.data.unit.unitOfMeasurement ===
                          "C62" &&
                        _vm.basketItem.variation.data.unit.content === 1
                      ) &&
                      _vm.basketItem.variation.data.variation.mayShowUnitPrice
                        ? _c("div", { staticClass: "text-muted small" }, [
                            _c("div", [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(_vm.basePrice) +
                                  "\n                            "
                              ),
                            ]),
                            _vm._v(" "),
                            _c("div", [
                              _c("strong", [
                                _vm._v(
                                  _vm._s(
                                    _vm.$translate(
                                      "Ceres::Template.basketContent"
                                    )
                                  ) + ": "
                                ),
                              ]),
                              _vm._v(
                                "\n                                " +
                                  _vm._s(
                                    _vm.basketItem.variation.data.unit.content
                                  ) +
                                  " " +
                                  _vm._s(
                                    _vm.basketItem.variation.data.unit.names
                                      .name
                                  ) +
                                  "\n                            "
                              ),
                            ]),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.basketItem.inputLength > 0 ||
                      _vm.basketItem.inputWidth > 0
                        ? _c("div", { staticClass: "small" }, [
                            _c("div", [
                              _c("strong", [
                                _vm._v(
                                  _vm._s(
                                    _vm.$translate("Ceres::Template.itemInput")
                                  ) +
                                    " " +
                                    _vm._s(
                                      _vm._f("inputUnit")(_vm.basketItem, true)
                                    ) +
                                    ": "
                                ),
                              ]),
                              _vm._v(
                                "\n                                " +
                                  _vm._s(_vm._f("inputUnit")(_vm.basketItem)) +
                                  "\n                            "
                              ),
                            ]),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "small" },
                        _vm._l(
                          _vm.basketItem.variation.data.attributes,
                          function (attribute) {
                            return _c("div", [
                              _c("strong", [
                                _vm._v(
                                  _vm._s(attribute.attribute.names.name) + ": "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(_vm._s(attribute.value.names.name)),
                              ]),
                            ])
                          }
                        ),
                        0
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "text-muted small" },
                        [
                          _vm._l(
                            _vm.basketItem.variation.data.variationProperties,
                            function (propertyGroup) {
                              return _vm._l(
                                propertyGroup.properties,
                                function (property) {
                                  return _c(
                                    "div",
                                    [
                                      propertyGroup.name
                                        ? _c("strong", [
                                            _vm._v(
                                              _vm._s(propertyGroup.name) + ": "
                                            ),
                                          ])
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c("span", [
                                        _vm._v(_vm._s(property.names.name)),
                                      ]),
                                      _vm._v(" "),
                                      property.cast === "file"
                                        ? _c("span", [
                                            _c("a", {
                                              attrs: {
                                                href: _vm._f("propertyFileUrl")(
                                                  property.values.value
                                                ),
                                                target: "_blank",
                                              },
                                              domProps: {
                                                innerHTML: _vm._s(
                                                  property.values.value
                                                ),
                                              },
                                            }),
                                          ])
                                        : property.cast === "multiSelection" &&
                                          property.values[0] !== undefined
                                        ? [
                                            _c(
                                              "ul",
                                              { staticClass: "pl-3" },
                                              _vm._l(
                                                property.values,
                                                function (multiSelectProperty) {
                                                  return _c("li", [
                                                    _vm._v(
                                                      _vm._s(
                                                        multiSelectProperty.value
                                                      )
                                                    ),
                                                  ])
                                                }
                                              ),
                                              0
                                            ),
                                          ]
                                        : _c("span", {
                                            domProps: {
                                              innerHTML: _vm._s(
                                                property.values.value
                                              ),
                                            },
                                          }),
                                    ],
                                    2
                                  )
                                }
                              )
                            }
                          ),
                        ],
                        2
                      ),
                    ],
                    1
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "basket-item-container-right" }, [
                  _c(
                    "div",
                    { staticClass: "qty-box-container" },
                    [
                      _c("quantity-input", {
                        attrs: {
                          value: _vm.basketItem.quantity,
                          waiting: _vm.isInputLocked || _vm.isCheckoutReadonly,
                          min: _vm.basketItem.variation.data.variation
                            .minimumOrderQuantity,
                          max: _vm.basketItem.variation.data.variation
                            .maximumOrderQuantity,
                          interval:
                            _vm.basketItem.variation.data.variation
                              .intervalOrderQuantity,
                        },
                        on: { "quantity-change": _vm.updateQuantity },
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "price-box text-right ml-2 mt-1" }, [
                    _c(
                      "div",
                      {
                        staticClass:
                          "item-total-price font-weight-bold text-nowrap",
                      },
                      [
                        _vm._v(
                          _vm._s(
                            _vm._f("currency")(
                              _vm.basketItem.quantity * _vm.unitPrice,
                              _vm.basketItem.variation.data.prices.default
                                .currency
                            )
                          )
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-sm text-danger p-0",
                        class: {
                          disabled:
                            _vm.waiting ||
                            _vm.isBasketLoading ||
                            _vm.isCheckoutReadonly ||
                            _vm.waitingForDelete,
                        },
                        attrs: { "data-testing": "basket-item-delete" },
                        on: { click: _vm.deleteItem },
                      },
                      [
                        _vm._v(
                          "\n                            " +
                            _vm._s(
                              _vm.$translate("Ceres::Template.basketDelete")
                            ) +
                            "\n                            "
                        ),
                        _c("icon", {
                          staticClass: "default-float",
                          attrs: {
                            icon: "trash-o",
                            loading: _vm.waitingForDelete,
                          },
                        }),
                      ],
                      1
                    ),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _vm.basketItem.setComponents
                ? _c("basket-set-component-list", {
                    attrs: {
                      "set-components": _vm.basketItem.setComponents,
                      "set-item": _vm.basketItem,
                    },
                  })
                : _vm._e(),
              _vm._v(" "),
              _c("order-property-value-list", {
                attrs: { "basket-item": _vm.basketItem },
              }),
              _vm._v(" "),
              _vm.showMoreInformation
                ? _c(
                    "div",
                    { staticClass: "small" },
                    [
                      _vm.isDataFieldVisible("basket.item.item_id") &&
                      _vm.basketItem.variation.data.item.id
                        ? [
                            _c("div", { staticClass: "mt-3" }, [
                              _c("strong", [
                                _vm._v(
                                  _vm._s(
                                    _vm.$translate(
                                      "Ceres::Template.basketItemId"
                                    )
                                  ) + ":"
                                ),
                              ]),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(
                                  _vm._s(_vm.basketItem.variation.data.item.id)
                                ),
                              ]),
                            ]),
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.isDataFieldVisible("basket.item.customNumber")
                        ? [
                            _vm.basketItem.variation.data.variation.number
                              ? _c("div", [
                                  _c("strong", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$translate(
                                          "Ceres::Template.basketItemNumber"
                                        )
                                      ) + ":"
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("span", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.basketItem.variation.data.variation
                                          .number
                                      )
                                    ),
                                  ]),
                                ])
                              : _vm._e(),
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.isDataFieldVisible("basket.item.availability")
                        ? [
                            _vm.basketItem.variation.data.variation
                              .availability &&
                            _vm.basketItem.variation.data.variation.availability
                              .names.name
                              ? _c("div", [
                                  _c("strong", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$translate(
                                          "Ceres::Template.basketAvailability"
                                        )
                                      ) + ":"
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("span", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.basketItem.variation.data.variation
                                          .availability.names.name
                                      )
                                    ),
                                  ]),
                                ])
                              : _vm._e(),
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.isDataFieldVisible("basket.item.description_long")
                        ? [
                            _vm.basketItem.variation.data.texts.description
                              ? _c("p", {
                                  staticClass: "my-3",
                                  domProps: {
                                    innerHTML: _vm._s(
                                      _vm.basketItem.variation.data.texts
                                        .description
                                    ),
                                  },
                                })
                              : _vm._e(),
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.isDataFieldVisible("basket.item.description_short")
                        ? [
                            _vm.basketItem.variation.data.texts.shortDescription
                              ? _c("p", {
                                  staticClass: "my-3",
                                  domProps: {
                                    innerHTML: _vm._s(
                                      _vm.basketItem.variation.data.texts
                                        .shortDescription
                                    ),
                                  },
                                })
                              : _vm._e(),
                          ]
                        : _vm._e(),
                    ],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.isMoreButtonVisible
                ? _c("label", {
                    staticClass: "btn-collapse",
                    class: { collapsed: !_vm.showMoreInformation },
                    attrs: {
                      "data-show-more": _vm.$translate(
                        "Ceres::Template.basketShowMore"
                      ),
                      "data-show-less": _vm.$translate(
                        "Ceres::Template.basketShowLess"
                      ),
                    },
                    on: {
                      click: function ($event) {
                        _vm.showMoreInformation = !_vm.showMoreInformation
                      },
                    },
                  })
                : _vm._e(),
            ],
            1
          ),
        ]
      ),
      _vm._v(" "),
      _vm._t("after-basket-item"),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketSetComponentList.vue?vue&type=template&id=8eecb10e&":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/BasketSetComponentList.vue?vue&type=template&id=8eecb10e& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.setComponents.length > 0
    ? _c(
        "div",
        { staticClass: "set-data small" },
        [
          _c("div", { staticClass: "mb-2" }, [
            _c("strong", [
              _vm._v(_vm._s(_vm.$translate("Ceres::Template.itemSetContent"))),
            ]),
          ]),
          _vm._v(" "),
          _vm._l(_vm.setComponents, function (setComponent) {
            return [
              _c("set-component-item", {
                attrs: {
                  variation: setComponent.variation.data,
                  quantity: setComponent.quantity,
                  "order-properties": setComponent.basketItemOrderParams,
                  rebate: _vm.setItem.variation.data.item.rebate,
                },
              }),
            ]
          }),
        ],
        2
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-17.js.map