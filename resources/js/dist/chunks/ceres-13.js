"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[13],{

/***/ "./resources/js/src/app/components/basket/BasketPreview.vue":
/*!******************************************************************!*\
  !*** ./resources/js/src/app/components/basket/BasketPreview.vue ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BasketPreview_vue_vue_type_template_id_614a7aab___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasketPreview.vue?vue&type=template&id=614a7aab& */ "./resources/js/src/app/components/basket/BasketPreview.vue?vue&type=template&id=614a7aab&");
/* harmony import */ var _BasketPreview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasketPreview.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/basket/BasketPreview.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BasketPreview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BasketPreview_vue_vue_type_template_id_614a7aab___WEBPACK_IMPORTED_MODULE_0__.render,
  _BasketPreview_vue_vue_type_template_id_614a7aab___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/basket/BasketPreview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/BasketPreview.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/BasketPreview.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_ApiService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/ApiService */ "./resources/js/src/app/services/ApiService.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: "basket-preview",

    props:
    {
        showNetPrices:
        {
            type: Boolean,
            default: false
        },
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

    computed: {
        hover()
        {
            return App.config.basket.previewType === 'hover';
        },

        showShippingCountrySelect()
        {
            return App.config.basket.showShippingCountrySelect;
        },

        ...(0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapState)({
            basket: state => state.basket.data,
            basketItems: state => state.basket.items,
            basketNotifications: state => state.basket.basketNotifications,
            isBasketItemQuantityUpdate: state => state.basket.isBasketItemQuantityUpdate
        })
    },

    /**
     * Bind to basket and bind the basket items
     */
    mounted()
    {
        if (App.config.basket.addItemToBasketConfirm === "preview")
        {
            _services_ApiService__WEBPACK_IMPORTED_MODULE_0__["default"].listen("AfterBasketItemAdd", data =>
            {
                this.show();
            });

            _services_ApiService__WEBPACK_IMPORTED_MODULE_0__["default"].listen("AfterBasketItemUpdate", data =>
            {
                if (!this.isBasketItemQuantityUpdate)
                {
                    this.show();
                }
            });
        }
    },

    methods:
    {
        show()
        {
            setTimeout(function()
            {
                document.body.classList.add("basket-open");
            }, 1);
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/basket/BasketPreview.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/BasketPreview.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_BasketPreview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BasketPreview.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/BasketPreview.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketPreview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/basket/BasketPreview.vue?vue&type=template&id=614a7aab&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/BasketPreview.vue?vue&type=template&id=614a7aab& ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketPreview_vue_vue_type_template_id_614a7aab___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketPreview_vue_vue_type_template_id_614a7aab___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BasketPreview_vue_vue_type_template_id_614a7aab___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BasketPreview.vue?vue&type=template&id=614a7aab& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/BasketPreview.vue?vue&type=template&id=614a7aab&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/BasketPreview.vue?vue&type=template&id=614a7aab&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/BasketPreview.vue?vue&type=template&id=614a7aab& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
    {
      staticClass: "basket-preview-wrapper h-100",
      class: {
        empty: !_vm.basketItems.length,
        "open-hover": _vm.hover,
        "open-right": !_vm.hover,
      },
    },
    [
      _c("div", { staticClass: "position-relative h-100" }, [
        _c(
          "div",
          {
            staticClass:
              "basket-preview d-flex flex-column flex-nowrap bg-white shadow w-100",
          },
          [
            _c(
              "header",
              { staticClass: "basket-preview-header border-bottom p-3" },
              [
                _c("span", { staticClass: "h3 mb-0" }, [
                  _vm._v(
                    _vm._s(_vm.$translate("Ceres::Template.basketPreview"))
                  ),
                ]),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    directives: [
                      {
                        name: "toggle-basket-preview",
                        rawName: "v-toggle-basket-preview",
                      },
                    ],
                    staticClass: "close",
                    attrs: {
                      type: "button",
                      "aria-label": _vm.$translate("Ceres::Template.closeIcon"),
                    },
                  },
                  [
                    _c("span", { attrs: { "aria-hidden": "true" } }, [
                      _vm._v("×"),
                    ]),
                  ]
                ),
              ]
            ),
            _vm._v(" "),
            _vm.basketNotifications.length > 0
              ? _c(
                  "div",
                  _vm._l(_vm.basketNotifications, function (notification) {
                    return _c(
                      "div",
                      {
                        key: notification.id,
                        staticClass: "w-100 alert alert-danger",
                      },
                      [_c("div", [_vm._v(_vm._s(notification.message))])]
                    )
                  }),
                  0
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "basket-preview-content d-flex flex-fill" },
              [
                _c("basket-list", {
                  staticClass:
                    "item-list d-flex flex-fill flex-nowrap flex-column overflow-auto px-3",
                  attrs: { "is-preview": true },
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
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "totals d-flex flex-nowrap flex-column px-3 pt-3",
                  },
                  [
                    _vm.showShippingCountrySelect
                      ? _c("shipping-country-select", {
                          attrs: {
                            "basket-select": true,
                            "open-basket-preview": true,
                          },
                        })
                      : _vm._e(),
                    _vm._v(" "),
                    _c("hr"),
                    _vm._v(" "),
                    _vm._t("before-basket-totals"),
                    _vm._v(" "),
                    _c("basket-totals", {
                      attrs: { "visible-fields": _vm.visibleFields },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "before-item-sum",
                            fn: function () {
                              return [_vm._t("before-item-sum")]
                            },
                            proxy: true,
                          },
                          {
                            key: "after-item-sum",
                            fn: function () {
                              return [_vm._t("after-item-sum")]
                            },
                            proxy: true,
                          },
                          {
                            key: "before-shipping-costs",
                            fn: function () {
                              return [_vm._t("before-shipping-costs")]
                            },
                            proxy: true,
                          },
                          {
                            key: "after-shipping-costs",
                            fn: function () {
                              return [_vm._t("after-shipping-costs")]
                            },
                            proxy: true,
                          },
                          {
                            key: "before-total-sum",
                            fn: function () {
                              return [_vm._t("before-total-sum")]
                            },
                            proxy: true,
                          },
                          {
                            key: "before-vat",
                            fn: function () {
                              return [_vm._t("before-vat")]
                            },
                            proxy: true,
                          },
                          {
                            key: "after-vat",
                            fn: function () {
                              return [_vm._t("after-vat")]
                            },
                            proxy: true,
                          },
                          {
                            key: "after-total-sum",
                            fn: function () {
                              return [_vm._t("after-total-sum")]
                            },
                            proxy: true,
                          },
                        ],
                        null,
                        true
                      ),
                    }),
                    _vm._v(" "),
                    _vm._t("after-basket-totals"),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "basket-preview-footer d-flex pb-3" },
                      [
                        _c(
                          "a",
                          {
                            directives: [
                              {
                                name: "waiting-animation-infinite",
                                rawName: "v-waiting-animation-infinite",
                              },
                            ],
                            staticClass: "btn btn-outline-primary btn-block",
                            attrs: {
                              href: _vm.$ceres.urls.basket,
                              rel: "nofollow",
                              title: _vm.$translate("Ceres::Template.basket"),
                            },
                          },
                          [
                            _c("i", { staticClass: "fa fa-shopping-cart" }),
                            _vm._v(
                              "\n                            " +
                                _vm._s(
                                  _vm.$translate("Ceres::Template.basket")
                                ) +
                                "\n                        "
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _vm._t("before-checkout-button"),
                        _vm._v(" "),
                        _c(
                          "a",
                          {
                            directives: [
                              {
                                name: "waiting-animation-infinite",
                                rawName: "v-waiting-animation-infinite",
                              },
                            ],
                            staticClass: "btn btn-primary btn-block",
                            attrs: {
                              href: _vm.$ceres.urls.checkout,
                              rel: "nofollow",
                              title: _vm.$translate(
                                "Ceres::Template.basketCheckout"
                              ),
                            },
                          },
                          [
                            _c("i", {
                              staticClass: "fa fa-arrow-right",
                              attrs: { "aria-hidden": "true" },
                            }),
                            _vm._v(
                              "\n                            " +
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.basketCheckout"
                                  )
                                ) +
                                "\n                        "
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _vm._t("after-checkout-button"),
                      ],
                      2
                    ),
                  ],
                  2
                ),
              ],
              1
            ),
          ]
        ),
      ]),
      _vm._v(" "),
      _c("div", {
        directives: [
          { name: "toggle-basket-preview", rawName: "v-toggle-basket-preview" },
        ],
        staticClass: "basket-preview-overlay",
      }),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-13.js.map