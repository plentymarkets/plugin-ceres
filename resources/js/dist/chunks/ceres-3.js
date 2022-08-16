"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[3],{

/***/ "./resources/js/src/app/components/itemList/CategoryImageCarousel.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/CategoryImageCarousel.vue ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CategoryImageCarousel_vue_vue_type_template_id_62e5025e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryImageCarousel.vue?vue&type=template&id=62e5025e& */ "./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=template&id=62e5025e&");
/* harmony import */ var _CategoryImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CategoryImageCarousel.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CategoryImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CategoryImageCarousel_vue_vue_type_template_id_62e5025e___WEBPACK_IMPORTED_MODULE_0__.render,
  _CategoryImageCarousel_vue_vue_type_template_id_62e5025e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/itemList/CategoryImageCarousel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
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

    name: "category-image-carousel",

    props: {
        imageUrlsData:
        {
            type: Array
        },
        itemUrl:
        {
            type: String
        },
        alt:
        {
            type: String
        },
        title:
        {
            type: String
        },
        showDots:
        {
            type: Boolean,
            default: App.config.item.categoryShowDots
        },
        showNav:
        {
            type: Boolean,
            default: App.config.item.categoryShowNav
        },
        disableLazyLoad: {
            type: Boolean,
            default: false
        },
        disableCarouselOnMobile:
        {
            type: Boolean
        },
        enableCarousel:
        {
            type: Boolean
        },
        template:
        {
            type: String
        }
    },

    data()
    {
        return {
            $_enableCarousel: false
        };
    },

    computed:
    {
        imageUrls()
        {
            return this.imageUrlsData;
        }
    },

    mounted()
    {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const shouldCarouselBeEnabled = this.enableCarousel && this.imageUrls.length > 1;

        this.$data.$_enableCarousel = this.disableCarouselOnMobile && isMobile ? false : shouldCarouselBeEnabled;

        this.$nextTick(() =>
        {
            if (this.$data.$_enableCarousel)
            {
                this.initializeCarousel();
            }
        });
    },

    methods:
    {
        initializeCarousel()
        {
            $("#owl-carousel-" + this._uid).owlCarousel({
                dots     : !!this.showDots,
                items    : 1,
                mouseDrag: false,
                loop     : this.imageUrls.length > 1,
                lazyLoad : !this.disableLazyLoad,
                margin   : 10,
                nav      : !!this.showNav,
                navText  : [
                    `<i id="owl-nav-text-left-${this._uid}" class='fa fa-chevron-left' aria-hidden='true'></i>`,
                    `<i id="owl-nav-text-right-${this._uid}" class='fa fa-chevron-right' aria-hidden='true'></i>`
                ],
                onTranslated(event)
                {
                    const element = event.target.querySelector(".owl-item.active img");

                    if (element && element.dataset.src && !element.src)
                    {
                        element.src = element.dataset.src;
                        element.removeAttribute("data-src");
                    }
                },
                onInitialized: event =>
                {
                    if (this.showNav)
                    {
                        document.querySelector(`#owl-nav-text-left-${this._uid}`).parentElement.onclick = event => event.preventDefault();
                        document.querySelector(`#owl-nav-text-right-${this._uid}`).parentElement.onclick = event => event.preventDefault();
                    }
                }
            });
        },

        getAltText(image)
        {
            const alt = image && image.alternate ? image.alternate : this.alt;

            return alt;
        },

        getTitleText(image)
        {
            const title = image && image.name ? image.name : this.title;

            return title;
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/itemList/CategoryItem.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/CategoryItem.vue ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CategoryItem_vue_vue_type_template_id_8ab526e6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryItem.vue?vue&type=template&id=8ab526e6& */ "./resources/js/src/app/components/itemList/CategoryItem.vue?vue&type=template&id=8ab526e6&");
/* harmony import */ var _CategoryItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CategoryItem.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/itemList/CategoryItem.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CategoryItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CategoryItem_vue_vue_type_template_id_8ab526e6___WEBPACK_IMPORTED_MODULE_0__.render,
  _CategoryItem_vue_vue_type_template_id_8ab526e6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/itemList/CategoryItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/CategoryItem.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/CategoryItem.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _CategoryImageCarousel_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryImageCarousel.vue */ "./resources/js/src/app/components/itemList/CategoryImageCarousel.vue");
/* harmony import */ var _ItemStoreSpecial_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemStoreSpecial.vue */ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue");
/* harmony import */ var _helper_getSlotData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/getSlotData */ "./resources/js/src/app/helper/getSlotData.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    components: {
        CategoryImageCarousel: _CategoryImageCarousel_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
        ItemStoreSpecial: _ItemStoreSpecial_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
    },

    props: {
        decimalCount:
        {
            type: Number,
            default: 0
        },
        imageUrlAccessor:
        {
            type: String,
            default: "urlMiddle"
        },
        itemData:
        {
            type: Object
        },
        disableCarouselOnMobile:
        {
            type: Boolean
        },
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
        forceUrlWithVariationId:
        {
            type: Boolean,
            default: false
        }
    },

    jsonDataFields: [
        "itemDataRef"
    ],

    computed:
    {
        item()
        {
            return this.itemData || this.itemSlotData || this.itemDataRef;
        },

        itemSlotData: (0,_helper_getSlotData__WEBPACK_IMPORTED_MODULE_2__.getSlotData)('item-data'),

        /**
         * returns itemData.item.storeSpecial
         */
        storeSpecial()
        {
            return this.item.item.storeSpecial;
        },

        /**
         * returns itemData.texts
         */
        texts()
        {
            return this.item.texts;
        },

        itemPrice()
        {
            return this.$options.filters.specialOffer(this.item.prices.default.unitPrice.formatted, this.item.prices, "unitPrice", "formatted" );
        },

        basePrice()
        {
            return this.item.prices.default.basePrice;
        },

        itemPriceGraduated()
        {
           let unitPrice;
           if (App.config.item.enableGraduatedPrices) {
             unitPrice = this.item.prices.graduatedPrices.length > 0
                 ? this.item.prices.graduatedPrices[0].unitPrice
                 : this.item.prices.default.unitPrice;
           } else {
             unitPrice = this.item.prices.default.unitPrice;
           }

            return this.$options.filters.specialOffer(unitPrice.formatted, this.item.prices, "unitPrice", "formatted" );
        },

        itemGraduatedPriceisCheapestSorting()
        {
            return !!this.item.item && this.item.item.salableVariationCount > 1 && !!this.$ceres.isCheapestSorting;
        },

        itemGraduatedPricesalableVariationCount()
        {
            return !!this.item.item && this.item.item.salableVariationCount == 1 && this.item.prices.graduatedPrices.length > 1 && App.config.item.enableGraduatedPrices;
        },

        itemSetPrice()
        {
            return this.$options.filters.currency(
                this.item.prices.default.price.value,
                this.item.prices.default.currency
            );
        },

        urlWithVariationId()
        {
            return !this.$ceres.config.item.showPleaseSelect || this.$ceres.initialPleaseSelect == 0 || this.forceUrlWithVariationId;
        },

        hasCrossPrice() {
            const hasRrpPrice = !!this.item.prices.rrp &&
                this.item.prices.rrp.unitPrice.value > this.item.prices.default.unitPrice.value;

            const hasBeforePrice = !!this.item.prices.specialOffer &&
                !!this.item.prices.default &&
                this.item.prices.default.unitPrice.value > this.item.prices.specialOffer.unitPrice.value;

            return hasRrpPrice || hasBeforePrice;
        },

        ...(0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapState)({
            showNetPrices: state => state.basket.showNetPrices
        })
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/ItemStoreSpecial.vue ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemStoreSpecial.vue?vue&type=template&id=9410a8b2& */ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2&");
/* harmony import */ var _ItemStoreSpecial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemStoreSpecial.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemStoreSpecial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__.render,
  _ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/itemList/ItemStoreSpecial.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
//
//
//
//
//
//
//
//
//
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

    name: "item-store-special",

    props: [
        "storeSpecial",
        "recommendedRetailPrice",
        "variationRetailPrice",
        "specialOfferPrice",
        "decimalCount",
        "bundleType",
        "itemType"
    ],

    data()
    {
        return {
            tagClass: "",
            label: "",
            tagClasses:
            {
                1: "badge-offer badge-danger",
                2: "badge-new badge-primary",
                3: "badge-top badge-success",
                default: "badge-success",
                itemBundle: "badge badge-bundle bg-info",
                itemSet: "badge badge-dark"
            },
            labels:
            {
                1: this.$translate("Ceres::Template.storeSpecialOffer"),
                2: this.$translate("Ceres::Template.storeSpecialNew"),
                3: this.$translate("Ceres::Template.storeSpecialTop")
            }
        };
    },

    computed:
    {
        hasLabel() {
            return this.label && this.label !== "";
        },

        isBundle() {
            return this.bundleType === "bundle";
        },

        isSet() {
            return this.itemType === "set";
        }
    },

    created()
    {
        this.initializeStoreSpecial();
    },

    methods:
    {
        initializeStoreSpecial()
        {
            if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined)(this.storeSpecial))
            {
                this.tagClass = this.tagClasses[this.storeSpecial.id] || this.tagClasses.default;
            }
            else
            {
                this.tagClass = this.tagClasses.default;
            }

            this.label = this.getLabel();
        },

        getLabel()
        {
            if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined)(this.storeSpecial) && this.storeSpecial.id === 1 && !(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined)(this.recommendedRetailPrice))
            {
                return this.getPercentageSale();
            }

            if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined)(this.storeSpecial))
            {
                return "";
            }

            return this.labels[this.storeSpecial.id] || this.storeSpecial.names.name;
        },

        getPercentageSale()
        {
            let percent;

            if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isDefined)(this.specialOfferPrice))
            {
                percent = (1 - this.specialOfferPrice.unitPrice.value / this.variationRetailPrice.unitPrice.value ) * -100;
            }
            else
            {
                percent = (1 - this.variationRetailPrice.unitPrice.value / this.recommendedRetailPrice.unitPrice.value ) * -100;
            }

            if (percent < 0)
            {
                return percent.toFixed(this.decimalCount).replace(".", App.decimalSeparator) + "%";
            }

            return "";
        }
    },

    watch:
    {
        storeSpecial()
        {
            this.initializeStoreSpecial();
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CategoryImageCarousel.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=template&id=62e5025e&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=template&id=62e5025e& ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryImageCarousel_vue_vue_type_template_id_62e5025e___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryImageCarousel_vue_vue_type_template_id_62e5025e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryImageCarousel_vue_vue_type_template_id_62e5025e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CategoryImageCarousel.vue?vue&type=template&id=62e5025e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=template&id=62e5025e&");


/***/ }),

/***/ "./resources/js/src/app/components/itemList/CategoryItem.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/CategoryItem.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CategoryItem.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/CategoryItem.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/itemList/CategoryItem.vue?vue&type=template&id=8ab526e6&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/CategoryItem.vue?vue&type=template&id=8ab526e6& ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryItem_vue_vue_type_template_id_8ab526e6___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryItem_vue_vue_type_template_id_8ab526e6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryItem_vue_vue_type_template_id_8ab526e6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CategoryItem.vue?vue&type=template&id=8ab526e6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/CategoryItem.vue?vue&type=template&id=8ab526e6&");


/***/ }),

/***/ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemStoreSpecial.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2& ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemStoreSpecial.vue?vue&type=template&id=9410a8b2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=template&id=62e5025e&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/CategoryImageCarousel.vue?vue&type=template&id=62e5025e& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.$data.$_enableCarousel
    ? _c(
        "a",
        {
          staticClass: "owl-carousel owl-theme",
          attrs: {
            id: "owl-carousel-" + _vm._uid,
            href: _vm.itemUrl,
            role: "listbox",
            "aria-label": _vm.$translate("Ceres::Template.itemImageCarousel"),
          },
        },
        _vm._l(_vm.imageUrls, function (imageUrl, index) {
          return _c(
            "div",
            { key: index },
            [
              index === 0 && !_vm.disableLazyLoad
                ? _c("lazy-img", {
                    ref: "itemLazyImage",
                    refInFor: true,
                    attrs: {
                      "picture-class": "img-fluid",
                      "image-url": imageUrl.url,
                      alt: _vm.getAltText(imageUrl),
                      title: _vm.getTitleText(imageUrl),
                      role: "option",
                    },
                  })
                : index !== 0 && !_vm.disableLazyLoad
                ? _c("img", {
                    staticClass: "img-fluid owl-lazy",
                    attrs: {
                      "data-src": imageUrl.url,
                      alt: _vm.getAltText(imageUrl),
                      title: _vm.getTitleText(imageUrl),
                      role: "option",
                    },
                  })
                : _c("img", {
                    staticClass: "img-fluid",
                    attrs: {
                      src: imageUrl.url,
                      alt: _vm.getAltText(imageUrl),
                      title: _vm.getAltText(imageUrl),
                      role: "option",
                    },
                  }),
            ],
            1
          )
        }),
        0
      )
    : _c(
        "a",
        { attrs: { href: _vm.itemUrl } },
        [
          !_vm.disableLazyLoad
            ? _c("lazy-img", {
                ref: "itemLazyImage",
                attrs: {
                  "picture-class": "img-fluid",
                  "image-url": _vm._f("itemImage")(_vm.imageUrls),
                  alt: _vm.getAltText(_vm.imageUrls[0]),
                  title: _vm.getTitleText(_vm.imageUrls[0]),
                },
              })
            : _c("img", {
                staticClass: "img-fluid",
                attrs: {
                  src: _vm._f("itemImage")(_vm.imageUrls),
                  alt: _vm.getAltText(_vm.imageUrls[0]),
                  title: _vm.getTitleText(_vm.imageUrls[0]),
                },
              }),
        ],
        1
      )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/CategoryItem.vue?vue&type=template&id=8ab526e6&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/CategoryItem.vue?vue&type=template&id=8ab526e6& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
    "article",
    {
      staticClass: "cmp cmp-product-thumb",
      attrs: { "data-testing": _vm.item.variation.id },
    },
    [
      _c(
        "div",
        { class: _vm.paddingClasses, style: _vm.paddingInlineStyles },
        [
          _c("add-to-basket", {
            attrs: {
              "data-testing": "item-add-to-basket",
              "variation-id": _vm.item.variation.id,
              "is-salable": !!_vm.item.filter && _vm.item.filter.isSalable,
              "has-children":
                !!_vm.item.item && _vm.item.item.salableVariationCount > 1,
              "interval-quantity":
                _vm.item.variation.intervalOrderQuantity || 1,
              "minimum-quantity": _vm.item.variation.minimumOrderQuantity,
              "maximum-quantity":
                !!_vm.item.variation.maximumOrderQuantity &&
                _vm.item.variation.maximumOrderQuantity > 0
                  ? _vm.item.variation.maximumOrderQuantity
                  : null,
              "order-properties": _vm.item.properties.filter(function (prop) {
                return prop.property.isOderProperty
              }),
              "has-order-properties": _vm.item.hasOrderProperties,
              "has-required-order-property": _vm.item.hasRequiredOrderProperty,
              "use-large-scale": true,
              "show-quantity": false,
              "item-url": _vm._f("itemURL")(_vm.item, _vm.urlWithVariationId),
              "has-price": _vm._f("hasItemDefaultPrice")(_vm.item),
              "has-graduated-price":
                _vm.itemGraduatedPriceisCheapestSorting ||
                _vm.itemGraduatedPricesalableVariationCount,
              "item-type": _vm.item.item.itemType,
            },
          }),
          _vm._v(" "),
          _c("div", { staticClass: "thumb-image" }, [
            _c(
              "div",
              { staticClass: "prop-1-1" },
              [
                _vm._t("item-image", [
                  _c("category-image-carousel", {
                    ref: "categoryImageCarousel",
                    attrs: {
                      "image-urls-data": _vm._f("itemImages")(
                        _vm.item.images,
                        _vm.imageUrlAccessor
                      ),
                      alt: _vm._f("itemName")(_vm.item),
                      title: _vm._f("itemName")(_vm.item),
                      "item-url": _vm._f("itemURL")(
                        _vm.item,
                        _vm.urlWithVariationId
                      ),
                      "enable-carousel":
                        _vm.$ceres.config.item.enableImageCarousel,
                      "disable-carousel-on-mobile": _vm.disableCarouselOnMobile,
                    },
                  }),
                ]),
              ],
              2
            ),
          ]),
          _vm._v(" "),
          _vm._t("store-special", [
            _vm.storeSpecial ||
            _vm.item.variation.bundleType === "bundle" ||
            _vm.item.item.itemType === "set"
              ? _c("item-store-special", {
                  attrs: {
                    "store-special": _vm.storeSpecial,
                    "recommended-retail-price": _vm.item.prices.rrp,
                    "variation-retail-price": _vm.item.prices.default,
                    "special-offer-price": _vm.item.prices.specialOffer,
                    "decimal-count": _vm.decimalCount,
                    "bundle-type": _vm.item.variation.bundleType,
                    "item-type": _vm.item.item.itemType,
                  },
                })
              : _vm._e(),
          ]),
          _vm._v(" "),
          _vm._t("item-details", [
            _c(
              "div",
              { staticClass: "thumb-content" },
              [
                _c(
                  "a",
                  {
                    staticClass: "thumb-title small",
                    class: {
                      "stretched-link":
                        _vm.$ceres.config.global.shippingCostsCategoryId == 0,
                    },
                    attrs: {
                      href: _vm._f("itemURL")(_vm.item, _vm.urlWithVariationId),
                    },
                  },
                  [
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm._f("itemName")(_vm.item))
                    ),
                    _vm._l(_vm.item.groupedAttributes, function (attribute) {
                      return _c("span", [
                        _vm._v(
                          _vm._s(
                            _vm._f("translate")(
                              "Ceres::Template.itemGroupedAttribute",
                              attribute
                            )
                          )
                        ),
                      ])
                    }),
                  ],
                  2
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "thumb-meta mt-2" },
                  [
                    _vm._t("before-prices"),
                    _vm._v(" "),
                    _c("div", { staticClass: "prices" }, [
                      _vm.item.prices.rrp &&
                      _vm.item.prices.rrp.price.value > 0 &&
                      _vm.item.prices.rrp.price.value >
                        _vm.item.prices.default.unitPrice.value
                        ? _c("div", { staticClass: "price-view-port" }, [
                            _vm.item.prices.specialOffer
                              ? _c("del", { staticClass: "crossprice" }, [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(
                                        _vm._f("itemCrossPrice")(
                                          _vm.item.prices.default.unitPrice
                                            .formatted,
                                          true
                                        )
                                      ) +
                                      "\n                            "
                                  ),
                                ])
                              : _c("del", { staticClass: "crossprice" }, [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(
                                        _vm._f("itemCrossPrice")(
                                          _vm.item.prices.rrp.unitPrice
                                            .formatted
                                        )
                                      ) +
                                      "\n                            "
                                  ),
                                ]),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "price" },
                        [
                          _vm.item.item.itemType === "set"
                            ? [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.itemSetPrice",
                                        { price: _vm.itemSetPrice }
                                      )
                                    ) +
                                    " " +
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.itemFootnote"
                                      )
                                    ) +
                                    "\n                            "
                                ),
                              ]
                            : _vm.itemGraduatedPriceisCheapestSorting
                            ? [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.itemFromPrice",
                                        { price: _vm.itemPriceGraduated }
                                      )
                                    ) +
                                    " " +
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.itemFootnote"
                                      )
                                    ) +
                                    "\n                            "
                                ),
                              ]
                            : _vm.itemGraduatedPricesalableVariationCount
                            ? [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.itemFromPrice",
                                        { price: _vm.itemPriceGraduated }
                                      )
                                    ) +
                                    " " +
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.itemFootnote"
                                      )
                                    ) +
                                    "\n                            "
                                ),
                              ]
                            : [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(
                                      _vm._f("specialOffer")(
                                        _vm.item.prices.default.unitPrice
                                          .formatted,
                                        _vm.item.prices,
                                        "unitPrice",
                                        "formatted"
                                      )
                                    ) +
                                    " " +
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.itemFootnote"
                                      )
                                    ) +
                                    "\n                            "
                                ),
                              ],
                        ],
                        2
                      ),
                    ]),
                  ],
                  2
                ),
                _vm._v(" "),
                _vm._t("after-prices"),
                _vm._v(" "),
                _vm.item.prices.default.lowestPrice.value && _vm.hasCrossPrice
                  ? _c("div", { staticClass: "category-lowest-price small" }, [
                      _c("span", {
                        domProps: {
                          innerHTML: _vm._s(
                            _vm.$translate("Ceres::Template.itemLowestPrice", {
                              price:
                                _vm.item.prices.default.lowestPrice.formatted,
                            })
                          ),
                        },
                      }),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                !(
                  _vm.item.unit.unitOfMeasurement === "C62" &&
                  _vm.item.unit.content === 1
                )
                  ? _c("div", { staticClass: "category-unit-price small" }, [
                      _c("span", [_vm._v(_vm._s(_vm.item.unit.content))]),
                      _vm._v(" "),
                      _c("span", [
                        _vm._v(" " + _vm._s(_vm.item.unit.names.name)),
                      ]),
                      _vm._v(" "),
                      _vm.item.variation.mayShowUnitPrice
                        ? _c("span", [_vm._v(" | " + _vm._s(_vm.basePrice))])
                        : _vm._e(),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("add-to-basket", {
                  attrs: {
                    "variation-id": _vm.item.variation.id,
                    "is-salable":
                      !!_vm.item.filter && _vm.item.filter.isSalable,
                    "has-children":
                      !!_vm.item.item &&
                      _vm.item.item.salableVariationCount > 1,
                    "interval-quantity":
                      _vm.item.variation.intervalOrderQuantity || 1,
                    "minimum-quantity": _vm.item.variation.minimumOrderQuantity,
                    "maximum-quantity":
                      !!_vm.item.variation.maximumOrderQuantity &&
                      _vm.item.variation.maximumOrderQuantity > 0
                        ? _vm.item.variation.maximumOrderQuantity
                        : null,
                    "order-properties": _vm.item.properties.filter(function (
                      prop
                    ) {
                      return prop.property.isOderProperty
                    }),
                    "has-order-properties": _vm.item.hasOrderProperties,
                    "has-required-order-property":
                      _vm.item.hasRequiredOrderProperty,
                    "use-large-scale": false,
                    "show-quantity": false,
                    "item-url": _vm._f("itemURL")(
                      _vm.item,
                      _vm.urlWithVariationId
                    ),
                    "has-price": _vm._f("hasItemDefaultPrice")(_vm.item),
                    "has-graduated-price":
                      _vm.itemGraduatedPriceisCheapestSorting ||
                      _vm.itemGraduatedPricesalableVariationCount,
                    "item-type": _vm.item.item.itemType,
                  },
                }),
                _vm._v(" "),
                _c("div", { staticClass: "vat small text-muted" }, [
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.$translate("Ceres::Template.itemFootnote")) +
                      " "
                  ),
                  _vm.showNetPrices
                    ? _c("span", [
                        _vm._v(
                          _vm._s(_vm.$translate("Ceres::Template.itemExclVAT"))
                        ),
                      ])
                    : _c("span", [
                        _vm._v(
                          _vm._s(_vm.$translate("Ceres::Template.itemInclVAT"))
                        ),
                      ]),
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.$translate("Ceres::Template.itemExclusive")) +
                      "\n                    "
                  ),
                  _vm.$ceres.config.global.shippingCostsCategoryId > 0
                    ? _c(
                        "a",
                        {
                          staticClass: "text-appearance",
                          attrs: {
                            "data-toggle": "modal",
                            href: "#shippingscosts",
                            title: _vm.$translate(
                              "Ceres::Template.itemShippingCosts"
                            ),
                          },
                        },
                        [
                          _vm._v(
                            _vm._s(
                              _vm.$translate(
                                "Ceres::Template.itemShippingCosts"
                              )
                            )
                          ),
                        ]
                      )
                    : _c(
                        "a",
                        {
                          attrs: {
                            title: _vm.$translate(
                              "Ceres::Template.itemShippingCosts"
                            ),
                          },
                        },
                        [
                          _vm._v(
                            _vm._s(
                              _vm.$translate(
                                "Ceres::Template.itemShippingCosts"
                              )
                            )
                          ),
                        ]
                      ),
                ]),
              ],
              2
            ),
          ]),
        ],
        2
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
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
  return _vm.hasLabel || _vm.isBundle || _vm.isSet
    ? _c("div", { staticClass: "special-tags p-2" }, [
        _vm.hasLabel
          ? _c("span", { staticClass: "badge", class: _vm.tagClass }, [
              _vm._v("\n        " + _vm._s(_vm.label) + "\n    "),
            ])
          : _vm.isBundle
          ? _c("span", { class: _vm.tagClasses.itemBundle }, [
              _vm._v(
                "\n        " +
                  _vm._s(_vm.$translate("Ceres::Template.itemBundle")) +
                  "\n    "
              ),
            ])
          : _vm.isSet
          ? _c("span", { class: _vm.tagClasses.itemSet }, [
              _vm._v(
                "\n        " +
                  _vm._s(_vm.$translate("Ceres::Template.itemSet")) +
                  "\n    "
              ),
            ])
          : _vm._e(),
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/helper/getSlotData.js":
/*!****************************************************!*\
  !*** ./resources/js/src/app/helper/getSlotData.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSlotData": function() { return /* binding */ getSlotData; }
/* harmony export */ });
/**
 * Return a getter function to read json formatted data from a slot of the component.
 * This can be used to create a dynamic property for a vue component returning the parsed
 * json data from the given slot.
 * Once the data have been parsed, the result is stored on the vm options to avoid parsing the slot again.
 *
 * @param string slotKey The identifier of the slot to parse json data from
 */
function getSlotData(slotKey)
{
    return (vm) =>
    {
        vm.$options.slotData = vm.$options.slotData || {};
        if (!vm.$options.slotData.hasOwnProperty(slotKey) && vm.$slots.hasOwnProperty(slotKey))
        {
            const slotNode = vm.$slots[slotKey][0];

            if (slotNode.elm)
            {
                vm.$options.slotData[slotKey] = JSON.parse(slotNode.elm.textContent);
            }
            else
            {
                vm.$options.slotData[slotKey] = JSON.parse(slotNode.text);
            }
        }

        return vm.$options.slotData[slotKey];
    };
}


/***/ })

}]);
//# sourceMappingURL=ceres-3.js.map