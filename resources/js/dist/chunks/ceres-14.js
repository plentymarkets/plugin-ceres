"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[14],{

/***/ "./resources/js/src/app/components/basket/BasketTotals.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/src/app/components/basket/BasketTotals.vue ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BasketTotals_vue_vue_type_template_id_3765131c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasketTotals.vue?vue&type=template&id=3765131c& */ "./resources/js/src/app/components/basket/BasketTotals.vue?vue&type=template&id=3765131c&");
/* harmony import */ var _BasketTotals_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasketTotals.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/basket/BasketTotals.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BasketTotals_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BasketTotals_vue_vue_type_template_id_3765131c___WEBPACK_IMPORTED_MODULE_0__.render,
  _BasketTotals_vue_vue_type_template_id_3765131c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/basket/BasketTotals.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/BasketTotals.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/BasketTotals.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _helper_OrderPropertyHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/OrderPropertyHelper */ "./resources/js/src/app/helper/OrderPropertyHelper.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: "basket-totals",
    data() {
        return {
            displayedProperties: [],
            displayedPropertiesWithoutTax: []
        }
    },
    created() {
        this.setPropertiesForTotals(this.basketItems);
    },
    watch: {
        
        basketItems: 
        {
            deep: true,
            handler(newItems)
            {
                this.setPropertiesForTotals(newItems)
            }
        }
        
    },

    props:
    {
        visibleFields:
        {
            type: Array,
            default: () => [
                "basketValueNet",
                "basketValueGross",
                "rebate",
                "shippingCostsNet",
                "shippingCostsGross",
                "promotionCoupon",
                "totalSumNet",
                "vats",
                "additionalCosts",
                "totalSumGross",
                "salesCoupon",
                "openAmount",
                "subAmount"
            ]
        }
    },

    computed:
    {
        currentShippingCountry()
        {
            const shippingCountryId = this.basket.shippingCountryId;

            return this.shippingCountries.find(country => country.id === shippingCountryId);
        },

        shopCountry()
        {
            const shopCountryId = this.basket.shopCountryId;

            return this.shippingCountries.find(country => country.id === shopCountryId);
        },

        deliveryExportTranslation()
        {
            const shopCountry = this.shopCountry && this.shopCountry.currLangName;
            const currentShippingCountry = this.currentShippingCountry && this.currentShippingCountry.currLangName;

            return this.$translate("Ceres::Template.basketExportDeliveryWarning", { from: shopCountry, to: currentShippingCountry });
        },

        ...(0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapState)({
            basket: state => state.basket.data,
            basketItems: state => state.basket.items,
            isBasketLoading: state => state.basket.isBasketLoading,
            shippingCountries: state => state.localization.shippingCountries,
            showNetPrices: state => state.basket.showNetPrices
        })
    },

    methods: {
        calculateBaseValue(value, percent)
        {
            return (value / (100 - percent)) * 100;
        },

        isVariationProperty(property)
        {
            return property.property.isOderProperty && App.useVariationOrderProperties;
        },

        isInBasketItemOrderParams(basketItem, property)
        {
            if (!property.property.isOderProperty && !App.useVariationOrderProperties)
            {
                return true;
            }
            return !!basketItem.basketItemOrderParams.find(param => Number(param.propertyId) === Number(property.propertyId));
        },
        
        setPropertiesForTotals(newBasketItems)
        {
            this.displayedPropertiesWithoutTax = [];
            this.displayedProperties = [];
            for (const basketItem of newBasketItems)
            {
                basketItem.variation.data.properties?.forEach(property => {
                    if(this.isInBasketItemOrderParams(basketItem, property) && 
                      ((0,_helper_OrderPropertyHelper__WEBPACK_IMPORTED_MODULE_0__.isAdditionalCosts)(property) || (!(0,_helper_OrderPropertyHelper__WEBPACK_IMPORTED_MODULE_0__.hasVat)(property) && App.useVariationOrderProperties )))
                    {
                        const existsIndisplayedProperties = this.displayedProperties.find(entry => entry.propertyId === property.propertyId)
                        const existsIndisplayedPropertiesWithoutTax = this.displayedPropertiesWithoutTax.find(entry => entry.propertyId === property.propertyId)
                        const existingProperty = existsIndisplayedProperties || existsIndisplayedPropertiesWithoutTax;

                        // if new item gets added and its property already exist update quantity
                        if (existingProperty) 
                        {
                            existingProperty.quantity += basketItem.quantity
                        }
                        else
                        {
                            const newProperty = {
                                propertyId: property.propertyId,
                                name: property.property.names.name,
                                quantity: basketItem.quantity,
                                surcharge: this.$options.filters.propertySurcharge(basketItem.variation.data.properties, property.propertyId),
                                vatId: property.property.vatId
                            }
                            !(0,_helper_OrderPropertyHelper__WEBPACK_IMPORTED_MODULE_0__.hasVat)(property) ? this.displayedPropertiesWithoutTax.push(newProperty) : this.displayedProperties.push(newProperty);
                        }
                    }
                });
            }
            this.displayedPropertiesWithoutTax.forEach((entry) => 
            {
                entry.price = entry.quantity * entry.surcharge;
            })
            this.displayedProperties.forEach((entry) => 
            {
                entry.price = entry.quantity * entry.surcharge;
            })
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/basket/BasketTotals.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/BasketTotals.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_BasketTotals_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BasketTotals.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/BasketTotals.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketTotals_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/basket/BasketTotals.vue?vue&type=template&id=3765131c&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/BasketTotals.vue?vue&type=template&id=3765131c& ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketTotals_vue_vue_type_template_id_3765131c___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketTotals_vue_vue_type_template_id_3765131c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketTotals_vue_vue_type_template_id_3765131c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BasketTotals.vue?vue&type=template&id=3765131c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/BasketTotals.vue?vue&type=template&id=3765131c&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/BasketTotals.vue?vue&type=template&id=3765131c&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/BasketTotals.vue?vue&type=template&id=3765131c& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "cmp-totals" }, [
    _c("div", { staticClass: "h3" }, [
      _vm._v(_vm._s(_vm.$translate("Ceres::Template.basketSum"))),
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "component-loading with-icon refreshing",
        class: { "is-loading": _vm.isBasketLoading },
      },
      [
        _c(
          "dl",
          [
            _vm._t("before-item-sum"),
            _vm._v(" "),
            (_vm.visibleFields.includes("additionalCosts") ||
              _vm.visibleFields.includes("basket.additional_costs")) &&
            _vm.displayedProperties.length
              ? [
                  _vm._l(_vm.displayedProperties, function (property) {
                    return [
                      _c(
                        "dt",
                        {
                          key: "property-name-" + property.propertyId,
                          class: { "font-weight-bold": _vm.showNetPrices },
                          attrs: { "data-testing": "additionalcost-with-tax" },
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(property.name) +
                              "\n                    "
                          ),
                        ]
                      ),
                      _c(
                        "dd",
                        {
                          key: "property-price-" + property.propertyId,
                          class: { "font-weight-bold": _vm.showNetPrices },
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm._f("currency")(property.price)) +
                              "\n                    "
                          ),
                        ]
                      ),
                    ]
                  }),
                ]
              : _vm._e(),
            _vm._v(" "),
            _vm.visibleFields.includes("basketValueNet") ||
            _vm.visibleFields.includes("basket.value_of_items_net")
              ? [
                  _c(
                    "dt",
                    { class: { "font-weight-bold": _vm.showNetPrices } },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm.$translate("Ceres::Template.basketValue")
                          ) +
                          " " +
                          _vm._s(_vm.$translate("Ceres::Template.basketNet")) +
                          "\n                "
                      ),
                    ]
                  ),
                  _c(
                    "dd",
                    {
                      class: { "font-weight-bold": _vm.showNetPrices },
                      attrs: { "data-testing": "item-sum-net" },
                    },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm._f("currency")(
                              _vm.calculateBaseValue(
                                _vm.basket.itemSumNet,
                                _vm.basket.basketRebate
                              )
                            )
                          ) +
                          "\n                "
                      ),
                    ]
                  ),
                ]
              : _vm._e(),
            _vm._v(" "),
            _vm.visibleFields.includes("basketValueGross") ||
            _vm.visibleFields.includes("basket.value_of_items_gross")
              ? [
                  _c(
                    "dt",
                    { class: { "font-weight-bold": !_vm.showNetPrices } },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm.$translate("Ceres::Template.basketValue")
                          ) +
                          " " +
                          _vm._s(
                            _vm.$translate("Ceres::Template.basketGross")
                          ) +
                          "\n                "
                      ),
                    ]
                  ),
                  _c(
                    "dd",
                    {
                      class: { "font-weight-bold": !_vm.showNetPrices },
                      attrs: { "data-testing": "item-sum" },
                    },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm._f("currency")(
                              _vm.calculateBaseValue(
                                _vm.basket.itemSum,
                                _vm.basket.basketRebate
                              )
                            )
                          ) +
                          "\n                "
                      ),
                    ]
                  ),
                ]
              : _vm._e(),
            _vm._v(" "),
            (_vm.visibleFields.includes("rebate") ||
              _vm.visibleFields.includes("basket.rebate")) &&
            _vm.basket.basketRebate
              ? [
                  _c("dt", { staticClass: "rebate-hint" }, [
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm.$translate("Ceres::Template.basketRebate")) +
                        "\n                "
                    ),
                  ]),
                  !_vm.showNetPrices
                    ? _c("dd", { staticClass: "rebate-hint" }, [
                        _vm._v(
                          "\n                    " +
                            _vm._s(
                              _vm.$translate("Ceres::Template.basketRebateSign")
                            ) +
                            _vm._s(
                              _vm._f("currency")(
                                _vm.calculateBaseValue(
                                  _vm.basket.itemSum,
                                  _vm.basket.basketRebate
                                ) - _vm.basket.itemSum
                              )
                            ) +
                            "\n                "
                        ),
                      ])
                    : _c("dd", { staticClass: "rebate-hint" }, [
                        _vm._v(
                          "\n                    " +
                            _vm._s(
                              _vm.$translate("Ceres::Template.basketRebateSign")
                            ) +
                            _vm._s(
                              _vm._f("currency")(
                                _vm.calculateBaseValue(
                                  _vm.basket.itemSumNet,
                                  _vm.basket.basketRebate
                                ) - _vm.basket.itemSumNet
                              )
                            ) +
                            "\n                "
                        ),
                      ]),
                  _vm._v(" "),
                  _c(
                    "dt",
                    { class: { "font-weight-bold": _vm.showNetPrices } },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm.$translate("Ceres::Template.basketSubTotal")
                          ) +
                          " " +
                          _vm._s(_vm.$translate("Ceres::Template.basketNet")) +
                          "\n                "
                      ),
                    ]
                  ),
                  _c(
                    "dd",
                    { class: { "font-weight-bold": _vm.showNetPrices } },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(_vm._f("currency")(_vm.basket.itemSumNet)) +
                          "\n                "
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "dt",
                    { class: { "font-weight-bold": !_vm.showNetPrices } },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm.$translate("Ceres::Template.basketSubTotal")
                          ) +
                          " " +
                          _vm._s(
                            _vm.$translate("Ceres::Template.basketGross")
                          ) +
                          "\n                "
                      ),
                    ]
                  ),
                  _c(
                    "dd",
                    { class: { "font-weight-bold": !_vm.showNetPrices } },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(_vm._f("currency")(_vm.basket.itemSum)) +
                          "\n                "
                      ),
                    ]
                  ),
                ]
              : _vm._e(),
            _vm._v(" "),
            _vm._t("after-item-sum"),
            _vm._v(" "),
            _vm._t("before-shipping-costs"),
            _vm._v(" "),
            _vm.visibleFields.includes("shippingCostsNet") ||
            _vm.visibleFields.includes("basket.shipping_costs_net")
              ? [
                  _c(
                    "dt",
                    { class: { "font-weight-bold": _vm.showNetPrices } },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.basketShippingCosts"
                            )
                          ) +
                          " " +
                          _vm._s(_vm.$translate("Ceres::Template.basketNet")) +
                          "\n                "
                      ),
                    ]
                  ),
                  _c(
                    "dd",
                    {
                      class: { "font-weight-bold": _vm.showNetPrices },
                      attrs: { "data-testing": "shipping-amount-net" },
                    },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm._f("currency")(_vm.basket.shippingAmountNet)
                          ) +
                          "\n                "
                      ),
                    ]
                  ),
                ]
              : _vm._e(),
            _vm._v(" "),
            _vm.visibleFields.includes("shippingCostsGross") ||
            _vm.visibleFields.includes("basket.shipping_costs_gross")
              ? [
                  _c(
                    "dt",
                    { class: { "font-weight-bold": !_vm.showNetPrices } },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.basketShippingCosts"
                            )
                          ) +
                          " " +
                          _vm._s(
                            _vm.$translate("Ceres::Template.basketGross")
                          ) +
                          "\n                "
                      ),
                    ]
                  ),
                  _c(
                    "dd",
                    {
                      class: { "font-weight-bold": !_vm.showNetPrices },
                      attrs: { "data-testing": "shipping-amount" },
                    },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm._f("currency")(_vm.basket.shippingAmount)
                          ) +
                          "\n                "
                      ),
                    ]
                  ),
                ]
              : _vm._e(),
            _vm._v(" "),
            _vm._t("after-shipping-costs"),
            _vm._v(" "),
            (_vm.visibleFields.includes("promotionCoupon") ||
              _vm.visibleFields.includes("basket.promotion_coupon")) &&
            _vm.basket.couponCode &&
            _vm.basket.couponCampaignType === "promotion"
              ? [
                  _c("dt", { staticClass: "font-weight-bold" }, [
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm.$translate("Ceres::Template.basketCoupon")) +
                        "\n                "
                    ),
                  ]),
                  _c(
                    "dd",
                    {
                      staticClass: "font-weight-bold",
                      attrs: { "data-testing": "promotion-coupon" },
                    },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm._f("currency")(_vm.basket.couponDiscount)
                          ) +
                          "\n                "
                      ),
                    ]
                  ),
                ]
              : _vm._e(),
            _vm._v(" "),
            _c("hr"),
            _vm._v(" "),
            _vm._t("before-total-sum"),
            _vm._v(" "),
            _vm.visibleFields.includes("subAmount") ||
            _vm.visibleFields.includes("basket.order_total_net")
              ? [
                  _c(
                    "dt",
                    { class: { "font-weight-bold": _vm.showNetPrices } },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm.$translate("Ceres::Template.basketSubAmount")
                          ) +
                          " " +
                          _vm._s(_vm.$translate("Ceres::Template.basketNet")) +
                          "\n                "
                      ),
                    ]
                  ),
                  _c(
                    "dd",
                    {
                      class: { "font-weight-bold": _vm.showNetPrices },
                      attrs: { "data-testing": "basket-sub-amount" },
                    },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(_vm._f("currency")(_vm.basket.subAmount)) +
                          "\n                "
                      ),
                    ]
                  ),
                ]
              : _vm._e(),
            _vm._v(" "),
            _vm._t("before-vat"),
            _vm._v(" "),
            _vm._l(_vm.basket.totalVats, function (totalVat) {
              return _vm.visibleFields.includes("vats") ||
                _vm.visibleFields.includes("basket.vat")
                ? [
                    _c("dt", [
                      _vm._v(
                        "\n                    " +
                          _vm._s(_vm.$translate("Ceres::Template.basketVAT")) +
                          " " +
                          _vm._s(totalVat.vatValue) +
                          "%\n                "
                      ),
                    ]),
                    _c("dd", { attrs: { "data-testing": "vat-amount" } }, [
                      _vm._v(
                        "\n                    " +
                          _vm._s(_vm._f("currency")(totalVat.vatAmount)) +
                          "\n                "
                      ),
                    ]),
                  ]
                : _vm._e()
            }),
            _vm._v(" "),
            _vm._t("after-vat"),
            _vm._v(" "),
            (_vm.visibleFields.includes("additionalCosts") ||
              _vm.visibleFields.includes("basket.additional_costs")) &&
            _vm.displayedPropertiesWithoutTax.length
              ? [
                  _vm._l(
                    _vm.displayedPropertiesWithoutTax,
                    function (property) {
                      return [
                        _c(
                          "dt",
                          {
                            key: "property-name-" + property.propertyId,
                            class: { "font-weight-bold": _vm.showNetPrices },
                            attrs: {
                              "data-testing": "additionalcost-without-tax",
                            },
                          },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(property.name) +
                                "\n                    "
                            ),
                          ]
                        ),
                        _c(
                          "dd",
                          {
                            key: "property-price-" + property.propertyId,
                            class: { "font-weight-bold": _vm.showNetPrices },
                          },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(_vm._f("currency")(property.price)) +
                                "\n                    "
                            ),
                          ]
                        ),
                      ]
                    }
                  ),
                ]
              : _vm._e(),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "totalSum" },
              [
                _c("hr"),
                _vm._v(" "),
                _vm.visibleFields.includes("totalSumNet") ||
                _vm.visibleFields.includes("basket.order_total_net")
                  ? [
                      _c(
                        "dt",
                        { class: { "font-weight-bold": _vm.showNetPrices } },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(
                                _vm.$translate("Ceres::Template.basketTotalSum")
                              ) +
                              " " +
                              _vm._s(
                                _vm.$translate("Ceres::Template.basketNet")
                              ) +
                              "\n                    "
                          ),
                        ]
                      ),
                      _c(
                        "dd",
                        {
                          class: { "font-weight-bold": _vm.showNetPrices },
                          attrs: { "data-testing": "basket-amount-net" },
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(
                                _vm._f("currency")(_vm.basket.basketAmountNet)
                              ) +
                              "\n                    "
                          ),
                        ]
                      ),
                    ]
                  : _vm._e(),
                _vm._v(" "),
                _vm.visibleFields.includes("totalSumGross") ||
                _vm.visibleFields.includes("basket.order_total_gross")
                  ? [
                      _c(
                        "dt",
                        { class: { "font-weight-bold": !_vm.showNetPrices } },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(
                                _vm.$translate("Ceres::Template.basketTotalSum")
                              ) +
                              " " +
                              _vm._s(
                                _vm.$translate("Ceres::Template.basketGross")
                              ) +
                              "\n                    "
                          ),
                        ]
                      ),
                      _c(
                        "dd",
                        {
                          class: { "font-weight-bold": !_vm.showNetPrices },
                          attrs: { "data-testing": "basket-amount" },
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(
                                _vm._f("currency")(_vm.basket.basketAmount)
                              ) +
                              "\n                    "
                          ),
                        ]
                      ),
                    ]
                  : _vm._e(),
                _vm._v(" "),
                (_vm.visibleFields.includes("salesCoupon") ||
                  _vm.visibleFields.includes("basket.sales_coupon")) &&
                _vm.basket.couponCode &&
                _vm.basket.couponCampaignType === "sales"
                  ? [
                      _c("dt", { staticClass: "font-weight-bold" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(
                              _vm.$translate("Ceres::Template.basketCoupon")
                            ) +
                            "\n                    "
                        ),
                      ]),
                      _c(
                        "dd",
                        {
                          staticClass: "font-weight-bold",
                          attrs: { "data-testing": "sales-coupon" },
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(
                                _vm._f("currency")(_vm.basket.couponDiscount)
                              ) +
                              "\n                    "
                          ),
                        ]
                      ),
                    ]
                  : _vm._e(),
                _vm._v(" "),
                (_vm.visibleFields.includes("openAmount") ||
                  _vm.visibleFields.includes("basket.open_amount")) &&
                _vm.basket.couponCampaignType === "sales"
                  ? [
                      _c("dt", { staticClass: "font-weight-bold" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(
                              _vm.$translate("Ceres::Template.basketOpenAmount")
                            ) +
                            "\n                    "
                        ),
                      ]),
                      _c(
                        "dd",
                        {
                          staticClass: "font-weight-bold",
                          attrs: { "data-testing": "open-amount" },
                        },
                        [
                          _vm._v(
                            "\n                        " +
                              _vm._s(
                                _vm._f("currency")(_vm.basket.openAmount)
                              ) +
                              "\n                    "
                          ),
                        ]
                      ),
                    ]
                  : _vm._e(),
              ],
              2
            ),
            _vm._v(" "),
            _vm._t("after-total-sum"),
          ],
          2
        ),
      ]
    ),
    _vm._v(" "),
    _vm.basket.isExportDelivery && _vm.deliveryExportTranslation
      ? _c("div", { staticClass: "alert alert-info w-100" }, [
          _vm._v(
            "\n        " + _vm._s(_vm.deliveryExportTranslation) + "\n    "
          ),
        ])
      : _vm._e(),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-14.js.map