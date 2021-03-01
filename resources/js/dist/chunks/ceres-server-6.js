exports.ids = [6];
exports.modules = {

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/SingleItem.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/SingleItem.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helper_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../helper/get */ "./resources/js/src/app/helper/get.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    afterKey: Object,
    itemData: Object,
    attributesData: Array,
    variations: Array
  },
  provide: function provide() {
    return {
      itemId: this.$props.itemId
    };
  },
  computed: {
    itemConfig: function itemConfig() {
      return App.config.item.itemData;
    },
    isDescriptionTabActive: function isDescriptionTabActive() {
      return (App.config.item.itemData.includes("item.description") || App.config.item.itemData.includes("all")) && !!this.currentVariation.texts.description.length;
    },
    isRecommendedPriceActive: function isRecommendedPriceActive() {
      return App.config.item.itemData.includes("item.recommendedPrice") || App.config.item.itemData.includes("all");
    },
    isShortDescriptionActive: function isShortDescriptionActive() {
      return App.config.item.itemData.includes("item.shortDescription") || App.config.item.itemData.includes("all");
    },
    hasShippingCostsCategoryId: function hasShippingCostsCategoryId() {
      return App.config.global.shippingCostsCategoryId > 0;
    },
    isTechnicalDataTabActive: function isTechnicalDataTabActive() {
      return (App.config.item.itemData.includes("item.technical_data") || App.config.item.itemData.includes("all")) && !!this.currentVariation.texts.technicalData.length;
    },
    variationGroupedProperties: function variationGroupedProperties() {
      return this.$store.getters["".concat(this.itemId, "/variationGroupedProperties")];
    },
    variationMissingProperties: function variationMissingProperties() {
      return this.$store.getters["".concat(this.itemId, "/variationMissingProperties")];
    },
    currentVariation: function currentVariation() {
      return Object(_helper_get__WEBPACK_IMPORTED_MODULE_5__["get"])(this.$store.state, "items[".concat(this.itemId, "].variation.documents[0].data"));
    },
    isVariationSelected: function isVariationSelected() {
      return Object(_helper_get__WEBPACK_IMPORTED_MODULE_5__["get"])(this.$store.state, "items[".concat(this.itemId, "].variationSelect.isVariationSelected"));
    },
    attributes: function attributes() {
      return Object(_helper_get__WEBPACK_IMPORTED_MODULE_5__["get"])(this.$store.state, "items[".concat(this.itemId, "].variationSelect.attributes"));
    },
    units: function units() {
      return Object(_helper_get__WEBPACK_IMPORTED_MODULE_5__["get"])(this.$store.state, "items[".concat(this.itemId, "].variationSelect.units"));
    }
  },
  created: function created() {},
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.$store.dispatch("initVariation", _this.itemData);

      _this.$store.commit("".concat(_this.itemId, "/setPleaseSelectVariationId"), _this.pleaseSelectOptionVariationId);

      _this.$store.dispatch("addLastSeenItem", _this.currentVariation.variation.id);

      _this.$store.dispatch("".concat(_this.itemId, "/variationSelect/setVariationSelect"), {
        itemId: _this.itemId,
        attributes: _this.attributesData,
        variations: _this.variations,
        initialVariationId: _this.currentVariation.variation.id,
        isPleaseSelectOption: _this.initPleaseSelectOption,
        afterKey: _this.afterKey
      });
    });
  },
  methods: {
    getDataField: function getDataField(field) {
      return Object(_helper_get__WEBPACK_IMPORTED_MODULE_5__["get"])(this.currentVariation, field);
    },
    getFilteredDataField: function getFilteredDataField(field, filter) {
      if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_6__["isNullOrUndefined"])(this.$options.filters[filter])) {
        return this.$options.filters[filter](this.getDataField(field));
      }

      return this.getDataField(field);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/SingleItem.vue?vue&type=template&id=97e1d656&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/SingleItem.vue?vue&type=template&id=97e1d656& ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.currentVariation
    ? _c(
        "div",
        [
          _vm._t(
            "default",
            [
              _c(
                "div",
                { staticClass: "single container-max page-content" },
                [
                  _c("div", { staticClass: "row position-relative" }, [
                    _c(
                      "div",
                      { staticClass: "col-12 col-md-7 mt-5" },
                      [_vm._t("image-carousel")],
                      2
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-12 col-md-5 mt-md-5" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "stick-in-parent",
                              rawName: "v-stick-in-parent"
                            }
                          ]
                        },
                        [
                          _vm.currentVariation.filter.hasManufacturer
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "producertag h6 producer text-muted"
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.currentVariation.item.manufacturer
                                          .externalName
                                      ) +
                                      "\n                        "
                                  )
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "h1",
                            {
                              staticClass: "h2 title",
                              attrs: { "data-testing": "item-name" }
                            },
                            [
                              _c("span", [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(
                                      _vm._f("itemName")(_vm.currentVariation)
                                    ) +
                                    "\n                            "
                                )
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _vm._t("tag-list"),
                          _vm._v(" "),
                          _vm.isShortDescriptionActive &&
                          _vm.currentVariation.texts.shortDescription !== ""
                            ? _c("p", {
                                staticClass: "single-description",
                                domProps: {
                                  innerHTML: _vm._s(
                                    _vm.currentVariation.texts.shortDescription
                                  )
                                }
                              })
                            : _vm._e(),
                          _vm._v(" "),
                          _c("hr"),
                          _vm._v(" "),
                          _c("div", { staticClass: "mb-5" }, [
                            _c(
                              "span",
                              { staticClass: "articlenumber small text-muted" },
                              [
                                _c("b", [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.singleItemNumber"
                                      )
                                    ) + " "
                                  )
                                ]),
                                _vm._v(" "),
                                _c("span", [
                                  _vm._v(
                                    _vm._s(
                                      _vm.currentVariation.variation.number
                                    )
                                  )
                                ])
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _vm.attributes.length || Object.keys(_vm.units).length
                            ? _c(
                                "div",
                                { staticClass: "mb-3" },
                                [_c("variation-select")],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.currentVariation.variation.bundleType === "bundle"
                            ? _c("item-bundle", {
                                attrs: {
                                  "bundle-type":
                                    _vm.currentVariation.variation.bundleType,
                                  "bundle-components":
                                    _vm.currentVariation.bundleComponents
                                }
                              })
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._t("before-price"),
                          _vm._v(" "),
                          _vm.currentVariation.filter.isSalable &&
                          _vm.variationGroupedProperties.length
                            ? _c("div", [_c("order-property-list")], 1)
                            : _vm._e(),
                          _vm._v(" "),
                          _c("graduated-prices"),
                          _vm._v(" "),
                          _c("item-price", {
                            attrs: {
                              "show-cross-price": _vm.isRecommendedPriceActive
                            }
                          }),
                          _vm._v(" "),
                          _vm._t("after-price"),
                          _vm._v(" "),
                          _c("item-availability"),
                          _vm._v(" "),
                          _c("div", { staticClass: "my-3" }, [
                            _c(
                              "div",
                              { staticClass: "w-100" },
                              [_vm._t("before-add-to-basket")],
                              2
                            ),
                            _vm._v(" "),
                            _vm.currentVariation.item.itemType === "set"
                              ? _c(
                                  "div",
                                  { staticClass: "alert alert-info w-100" },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(
                                          _vm.$translate(
                                            "Ceres::Template.singleItemSetInfo"
                                          )
                                        ) +
                                        "\n                            "
                                    )
                                  ]
                                )
                              : _c(
                                  "div",
                                  {
                                    staticClass:
                                      "col-12 col-sm-7 col-md-12 col-lg-8 my-3"
                                  },
                                  [
                                    _c("add-to-basket", {
                                      attrs: {
                                        "variation-id":
                                          _vm.currentVariation.variation.id,
                                        "is-salable":
                                          !!_vm.currentVariation.filter &&
                                          _vm.currentVariation.filter.isSalable,
                                        "has-children":
                                          !!_vm.currentVariation.filter &&
                                          _vm.currentVariation.filter
                                            .hasActiveChildren,
                                        "interval-quantity":
                                          _vm.currentVariation.variation
                                            .intervalOrderQuantity || 1,
                                        "minimum-quantity":
                                          _vm.currentVariation.variation
                                            .minimumOrderQuantity,
                                        "maximum-quantity":
                                          !!_vm.currentVariation.variation
                                            .maximumOrderQuantity &&
                                          _vm.currentVariation.variation
                                            .maximumOrderQuantity > 0
                                            ? _vm.currentVariation.variation
                                                .maximumOrderQuantity
                                            : null,
                                        "order-properties": _vm.currentVariation.properties.filter(
                                          function(prop) {
                                            return prop.property.isOderProperty
                                          }
                                        ),
                                        "use-large-scale": false,
                                        "show-quantity": true,
                                        "item-url": _vm._f("itemURL")(
                                          _vm.currentVariation
                                        ),
                                        "is-variation-selected":
                                          _vm.isVariationSelected &&
                                          _vm.currentVariation.filter.isSalable,
                                        "has-price": _vm._f(
                                          "hasItemDefaultPrice"
                                        )(_vm.currentVariation)
                                      }
                                    })
                                  ],
                                  1
                                ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "w-100" },
                              [_vm._t("after-add-to-basket")],
                              2
                            )
                          ]),
                          _vm._v(" "),
                          _vm.isWishListEnabled
                            ? _c("div", { staticClass: "row" }, [
                                _c(
                                  "div",
                                  { staticClass: "col-12" },
                                  [
                                    _c("add-to-wish-list", {
                                      attrs: {
                                        "variation-id":
                                          _vm.currentVariation.variation.id
                                      }
                                    })
                                  ],
                                  1
                                )
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._t("additional-content-after-add-to-basket"),
                          _vm._v(" "),
                          _c("hr"),
                          _vm._v(" "),
                          _c(
                            "span",
                            { staticClass: "vat small text-muted" },
                            [
                              _vm._v("\n                            * "),
                              _vm.showNetPrices
                                ? [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$translate(
                                          "Ceres::Template.singleItemExclVAT"
                                        )
                                      )
                                    )
                                  ]
                                : [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$translate(
                                          "Ceres::Template.singleItemInclVAT"
                                        )
                                      )
                                    )
                                  ],
                              _vm._v(
                                " " +
                                  _vm._s(
                                    _vm.$translate(
                                      "Ceres::Template.singleItemExclusive"
                                    )
                                  ) +
                                  "\n                        "
                              ),
                              _vm.hasShippingCostsCategoryId
                                ? _c(
                                    "a",
                                    {
                                      attrs: {
                                        "data-toggle": "modal",
                                        href: "#shippingscosts",
                                        title: _vm.$translate(
                                          "Ceres::Template.singleItemShippingCosts"
                                        )
                                      }
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$translate(
                                            "Ceres::Template.singleItemShippingCosts"
                                          )
                                        )
                                      )
                                    ]
                                  )
                                : _c(
                                    "a",
                                    {
                                      attrs: {
                                        title: _vm.$translate(
                                          "Ceres::Template.singleItemShippingCosts"
                                        )
                                      }
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$translate(
                                            "Ceres::Template.singleItemShippingCosts"
                                          )
                                        )
                                      )
                                    ]
                                  )
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _vm._t("additional-content-after-vat")
                        ],
                        2
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-12 col-md-7" }, [
                      _c("div", { staticClass: "my-5" }, [
                        _c(
                          "ul",
                          {
                            staticClass: "nav nav-tabs",
                            attrs: { role: "tablist" }
                          },
                          [
                            _vm.isDescriptionTabActive
                              ? _c("li", { staticClass: "nav-item" }, [
                                  _c(
                                    "a",
                                    {
                                      staticClass: "nav-link active",
                                      attrs: {
                                        "data-toggle": "tab",
                                        href:
                                          "#details-" +
                                          _vm.currentVariation.variation.id,
                                        role: "tab"
                                      }
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$translate(
                                            "Ceres::Template.singleItemDescription"
                                          )
                                        )
                                      )
                                    ]
                                  )
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.isTechnicalDataTabActive
                              ? _c("li", { staticClass: "nav-item" }, [
                                  _c(
                                    "a",
                                    {
                                      staticClass: "nav-link",
                                      class: {
                                        active:
                                          !_vm.isDescriptionTabActive &&
                                          _vm.isTechnicalDataTabActive
                                      },
                                      attrs: {
                                        "data-toggle": "tab",
                                        href:
                                          "#data-" +
                                          _vm.currentVariation.variation.id,
                                        role: "tab"
                                      }
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$translate(
                                            "Ceres::Template.singleItemTechnicalData"
                                          )
                                        )
                                      )
                                    ]
                                  )
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _c("li", { staticClass: "nav-item" }, [
                              _c(
                                "a",
                                {
                                  staticClass: "nav-link",
                                  class: {
                                    active:
                                      !_vm.isDescriptionTabActive &&
                                      !_vm.isTechnicalDataTabActive
                                  },
                                  attrs: {
                                    "data-toggle": "tab",
                                    href: "#assessments-details",
                                    role: "tab"
                                  }
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.singleItemMoreDetails"
                                      )
                                    )
                                  )
                                ]
                              )
                            ]),
                            _vm._v(" "),
                            _vm._t("add-detail-tabs")
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "tab-content overflow-hidden" },
                          [
                            _vm.isDescriptionTabActive
                              ? _c(
                                  "div",
                                  {
                                    staticClass:
                                      "tab-pane active overflow-auto",
                                    attrs: {
                                      id:
                                        "details-" +
                                        _vm.currentVariation.variation.id,
                                      role: "tabpanel"
                                    }
                                  },
                                  [
                                    _c("div", {
                                      staticClass: "my-4",
                                      domProps: {
                                        innerHTML: _vm._s(
                                          _vm.currentVariation.texts.description
                                        )
                                      }
                                    })
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.isTechnicalDataTabActive
                              ? _c(
                                  "div",
                                  {
                                    staticClass: "tab-pane overflow-auto",
                                    class: {
                                      active:
                                        !_vm.isDescriptionTabActive &&
                                        _vm.isTechnicalDataTabActive
                                    },
                                    attrs: {
                                      id:
                                        "data-" +
                                        _vm.currentVariation.variation.id,
                                      role: "tabpanel"
                                    }
                                  },
                                  [
                                    _c("div", {
                                      staticClass: "my-4",
                                      domProps: {
                                        innerHTML: _vm._s(
                                          _vm.currentVariation.texts
                                            .technicalData
                                        )
                                      }
                                    })
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass: "tab-pane overflow-auto",
                                class: {
                                  active:
                                    !_vm.isDescriptionTabActive &&
                                    !_vm.isTechnicalDataTabActive
                                },
                                attrs: {
                                  id: "assessments-details",
                                  role: "tabpanel"
                                }
                              },
                              [
                                _c("div", { staticClass: "my-4" }, [
                                  _c(
                                    "table",
                                    {
                                      staticClass:
                                        "table table-striped table-hover table-sm"
                                    },
                                    [
                                      _c("tbody", [
                                        _vm.itemConfig.includes("item.id") ||
                                        _vm.itemConfig.includes("all")
                                          ? _c("tr", [
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.$translate(
                                                      "Ceres::Template.singleItemId"
                                                    )
                                                  )
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.currentVariation.item.id
                                                  )
                                                )
                                              ])
                                            ])
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.currentVariation.item.condition &&
                                        _vm.currentVariation.item.condition
                                          .names.name !== "" &&
                                        (_vm.itemConfig.includes(
                                          "item.condition"
                                        ) ||
                                          _vm.itemConfig.includes("all"))
                                          ? _c("tr", [
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.$translate(
                                                      "Ceres::Template.singleItemCondition"
                                                    )
                                                  )
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.currentVariation.item
                                                      .condition.names.name
                                                  )
                                                )
                                              ])
                                            ])
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.itemConfig.includes(
                                          "item.age_rating"
                                        ) || _vm.itemConfig.includes("all")
                                          ? _c("tr", [
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.$translate(
                                                      "Ceres::Template.singleItemAge"
                                                    )
                                                  )
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm._f("ageRestriction")(
                                                      _vm.currentVariation.item
                                                        .ageRestriction
                                                    )
                                                  )
                                                )
                                              ])
                                            ])
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.currentVariation.variation
                                          .externalId !== "" &&
                                        (_vm.itemConfig.includes(
                                          "item.external_id"
                                        ) ||
                                          _vm.itemConfig.includes("all"))
                                          ? _c("tr", [
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.$translate(
                                                      "Ceres::Template.singleItemExternalVariationId"
                                                    )
                                                  )
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.currentVariation
                                                      .variation.externalId
                                                  )
                                                )
                                              ])
                                            ])
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.currentVariation.variation.model !==
                                          "" &&
                                        (_vm.itemConfig.includes(
                                          "item.variation_model"
                                        ) ||
                                          _vm.itemConfig.includes("all"))
                                          ? _c("tr", [
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.$translate(
                                                      "Ceres::Template.singleItemModel"
                                                    )
                                                  )
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.currentVariation
                                                      .variation.model
                                                  )
                                                )
                                              ])
                                            ])
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.currentVariation.filter
                                          .hasManufacturer &&
                                        _vm.currentVariation.item.manufacturer
                                          .externalName !== "" &&
                                        (_vm.itemConfig.includes(
                                          "item.manufacturer"
                                        ) ||
                                          _vm.itemConfig.includes("all"))
                                          ? _c("tr", [
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.$translate(
                                                      "Ceres::Template.singleItemManufacturer"
                                                    )
                                                  )
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.currentVariation.item
                                                      .manufacturer.externalName
                                                  )
                                                )
                                              ])
                                            ])
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.currentVariation.item
                                          .producingCountry &&
                                        _vm.currentVariation.item
                                          .producingCountry.names.name !== "" &&
                                        (_vm.itemConfig.includes(
                                          "item.producerCountry"
                                        ) ||
                                          _vm.itemConfig.includes("all"))
                                          ? _c("tr", [
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.$translate(
                                                      "Ceres::Template.singleItemManufacturingCountry"
                                                    )
                                                  )
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.currentVariation.item
                                                      .producingCountry.names
                                                      .name
                                                  )
                                                )
                                              ])
                                            ])
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.currentVariation.unit &&
                                        (_vm.itemConfig.includes(
                                          "item.variationBase_content"
                                        ) ||
                                          _vm.itemConfig.includes("all"))
                                          ? _c("tr", [
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.$translate(
                                                      "Ceres::Template.singleItemContent"
                                                    )
                                                  )
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.currentVariation.unit
                                                      .content
                                                  ) +
                                                    " " +
                                                    _vm._s(
                                                      _vm.currentVariation.unit
                                                        .names.name
                                                    )
                                                )
                                              ])
                                            ])
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.currentVariation.variation
                                          .weightG !== "" &&
                                        (_vm.itemConfig.includes(
                                          "item.weightG"
                                        ) ||
                                          _vm.itemConfig.includes("all"))
                                          ? _c("tr", [
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.$translate(
                                                      "Ceres::Template.singleItemWeight"
                                                    )
                                                  )
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.currentVariation
                                                      .variation.weightG
                                                  ) + " g"
                                                )
                                              ])
                                            ])
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.currentVariation.variation
                                          .weightNetG !== "" &&
                                        (_vm.itemConfig.includes(
                                          "item.weightNetG"
                                        ) ||
                                          _vm.itemConfig.includes("all"))
                                          ? _c("tr", [
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.$translate(
                                                      "Ceres::Template.singleItemNetWeight"
                                                    )
                                                  )
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.currentVariation
                                                      .variation.weightNetG
                                                  ) + " g"
                                                )
                                              ])
                                            ])
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.itemConfig.includes(
                                          "item.variation_dimensions"
                                        ) || _vm.itemConfig.includes("all")
                                          ? _c("tr", [
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.$translate(
                                                      "Ceres::Template.singleItemDimensions"
                                                    )
                                                  )
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("td", [
                                                _c("span", [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.currentVariation
                                                        .variation.lengthMM
                                                    )
                                                  )
                                                ]),
                                                _vm._v("×"),
                                                _c("span", [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.currentVariation
                                                        .variation.widthMM
                                                    )
                                                  )
                                                ]),
                                                _vm._v("×"),
                                                _c("span", [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.currentVariation
                                                        .variation.heightMM
                                                    )
                                                  )
                                                ]),
                                                _vm._v(
                                                  " mm\n                                            "
                                                )
                                              ])
                                            ])
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.currentVariation.variation
                                          .customsTariffNumber !== "" &&
                                        (_vm.itemConfig.includes(
                                          "variation.customs_tariff_number"
                                        ) ||
                                          _vm.itemConfig.includes("all"))
                                          ? _c("tr", [
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.$translate(
                                                      "Ceres::Template.singleItemCustomsTariffNumber"
                                                    )
                                                  )
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("td", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.currentVariation
                                                      .variation
                                                      .customsTariffNumber
                                                  )
                                                )
                                              ])
                                            ])
                                          : _vm._e()
                                      ])
                                    ]
                                  )
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _vm._t("add-detail-tabs-content")
                          ],
                          2
                        )
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _vm._t("item-list-container"),
                  _vm._v(" "),
                  _vm._t("feedback-container")
                ],
                2
              )
            ],
            {
              getDataField: _vm.getDataField,
              getFilteredDataField: _vm.getFilteredDataField
            }
          )
        ],
        2
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/SingleItem.vue":
/*!*************************************************************!*\
  !*** ./resources/js/src/app/components/item/SingleItem.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SingleItem_vue_vue_type_template_id_97e1d656___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SingleItem.vue?vue&type=template&id=97e1d656& */ "./resources/js/src/app/components/item/SingleItem.vue?vue&type=template&id=97e1d656&");
/* harmony import */ var _SingleItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SingleItem.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/SingleItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SingleItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SingleItem_vue_vue_type_template_id_97e1d656___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SingleItem_vue_vue_type_template_id_97e1d656___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  "3993c720"
  
)

component.options.__file = "resources/js/src/app/components/item/SingleItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/SingleItem.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/SingleItem.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SingleItem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/SingleItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/SingleItem.vue?vue&type=template&id=97e1d656&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/SingleItem.vue?vue&type=template&id=97e1d656& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItem_vue_vue_type_template_id_97e1d656___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SingleItem.vue?vue&type=template&id=97e1d656& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/SingleItem.vue?vue&type=template&id=97e1d656&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItem_vue_vue_type_template_id_97e1d656___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItem_vue_vue_type_template_id_97e1d656___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/helper/get.js":
/*!********************************************!*\
  !*** ./resources/js/src/app/helper/get.js ***!
  \********************************************/
/*! exports provided: get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./resources/js/src/app/helper/utils.js");




function get(object, path) {
  var fieldExp = /{\s*\S+\s*,\s*\S+\s*}|\w+/gm;
  var key;

  while (!Object(_utils__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(object) && (key = fieldExp.exec(path)) !== null) {
    if (key.index === fieldExp.lastIndex) {
      fieldExp.lastIndex++;
    }

    object = readField(object, key[0]);
  }

  return object;
}

function readField(object, field) {
  if (Object(_utils__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(object)) {
    return null;
  }

  var match = /^{\s*(\S+)\s*,\s*(\S+)\s*}$/.exec(field);

  if (!Object(_utils__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(match)) {
    var searchKey = match[1];
    var searchValue = match[2];
    return Array.prototype.slice.call(object).find(function (entry) {
      return get(entry, searchKey) + "" === searchValue;
    });
  }

  return object[field];
}

/***/ })

};;
//# sourceMappingURL=ceres-server-6.js.map