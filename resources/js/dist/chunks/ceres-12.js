"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[12],{

/***/ "./resources/js/src/app/components/basket/AddToBasket.vue":
/*!****************************************************************!*\
  !*** ./resources/js/src/app/components/basket/AddToBasket.vue ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddToBasket_vue_vue_type_template_id_729fe3ab___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddToBasket.vue?vue&type=template&id=729fe3ab& */ "./resources/js/src/app/components/basket/AddToBasket.vue?vue&type=template&id=729fe3ab&");
/* harmony import */ var _AddToBasket_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddToBasket.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/basket/AddToBasket.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AddToBasket_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddToBasket_vue_vue_type_template_id_729fe3ab___WEBPACK_IMPORTED_MODULE_0__.render,
  _AddToBasket_vue_vue_type_template_id_729fe3ab___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/basket/AddToBasket.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/AddToBasket.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/AddToBasket.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _exceptions_ExceptionMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../exceptions/ExceptionMap */ "./resources/js/src/app/exceptions/ExceptionMap.js");
/* harmony import */ var _services_UrlService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/UrlService */ "./resources/js/src/app/services/UrlService.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _mixins_buttonSizeProperty_mixin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/buttonSizeProperty.mixin */ "./resources/js/src/app/mixins/buttonSizeProperty.mixin.js");
/* harmony import */ var _item_QuantityInput_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../item/QuantityInput.vue */ "./resources/js/src/app/components/item/QuantityInput.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








const NotificationService = __webpack_require__(/*! ../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "add-to-basket",

    mixins: [_mixins_buttonSizeProperty_mixin__WEBPACK_IMPORTED_MODULE_3__.ButtonSizePropertyMixin],
    
    components:
    {
        QuantityInput: _item_QuantityInput_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
    },

    props:
    {
        itemUrl: String,
        showQuantity:
        {
            type: Boolean,
            default: false
        },
        useLargeScale:
        {
            type: Boolean,
            default: false
        },
        variationId:
        {
            type: Number
        },
        isSalable:
        {
            type: Boolean,
            default: false
        },
        hasChildren:
        {
            type: Boolean,
            default: false
        },
        intervalQuantity:
        {
            type: Number,
            default: 1
        },
        minimumQuantity:
        {
            type: Number,
            default: 0
        },
        maximumQuantity:
        {
            type: Number,
            default: null
        },
        orderProperties:
        {
            type: Array,
            default: () => []
        },
        hasOrderProperties:
        {
            type: Boolean,
            default: false
        },
        hasRequiredOrderProperty:
        {
            type: Boolean,
            default: false
        },
        hasPrice:
        {
            type: Boolean,
            default: true
        },
        hasGraduatedPrice:
        {
          type: Boolean,
          default: false
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
        isWishList:
        {
            type: Boolean,
            default: false
        },
        propQuantity:
        {
            type: Number,
            default: null
        },
        itemType:
        {
            type: String,
            default: null
        }
    },

    inject: {
        itemId: {
            default: null
        }
    },

    computed:
    {
        isSet()
        {
            return (
                this.$store.state.items[this.itemId]
                && this.$store.state.items[this.itemId].variation
                && this.$store.state.items[this.itemId].variation.documents[0].data.item.itemType === "set"
            ) || this.itemType === "set";
        },

        canBeAddedToBasket()
        {
            return this.isSalable &&
                !this.hasChildren &&
                !(this.minimumQuantity != 1 || this.intervalQuantity != 1) &&
                !this.requiresProperties &&
                this.hasPrice &&
                !this.hasGraduatedPrice &&
                !this.isSet;
        },

        requiresProperties()
        {
            return (App.config.item.requireOrderProperties && 
                (this.hasOrderProperties || this.orderProperties.filter(property => property.property.isShownOnItemPage).length > 0)) ||
                this.hasRequiredOrderProperty;
        },

        buttonClasses()
        {
            const classes = [];

            if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(this.buttonSizeClass))
            {
                classes.push(this.buttonSizeClass);
            }

            if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.isDefined)(this.paddingClasses))
            {
                classes.push(this.paddingClasses.split(" "));
            }

            return classes;
        },

        tooltipText()
        {
            if (this.hasAvailableVariations)
            {
                return this.$translate("Ceres::Template.singleItemPleaseSelectValidVariation");
            }
            else
            {
                return this.$translate("Ceres::Template.singleItemPleaseSelectNotAvailable");
            }
        },

        variationOrderQuantity()
        {
            return this.$store.state.items[this.itemId] && this.$store.state.items[this.itemId].variationOrderQuantity;
        },

        variationMissingProperties()
        {
            return this.$store.getters[`${this.itemId}/variationMissingProperties`];
        },

        hasAvailableVariations()
        {
            return this.$store.state.items[this.itemId]
                && this.$store.state.items[this.itemId].variationSelect
                && this.$store.state.items[this.itemId].variationSelect.variations.some(variation => variation.isSalable);
        },

        allVariationsSelected()
        {
            if (this.isSet)
            {
                return this.$store.getters["itemSetAllVariationSelected"];
            }
            else
            {
                // FIX return true if module is not registered. This equals the default value from the module
                // and is required to use this component in other contexts, e.g. the category view
                return !this.$store.state.items[this.itemId]
                    || (this.$store.state.items[this.itemId].variationSelect
                        && this.$store.state.items[this.itemId].variationSelect.isVariationSelected);
            }
        },

        isLoading()
        {
            return this.$store.state.items.isAddToBasketLoading === this.variationId || this.$store.state.items.isSetLoading;
        },

        ...(0,vuex__WEBPACK_IMPORTED_MODULE_5__.mapState)({
            basketItems: state => state.basket.items,
            isBasketLoading: state => state.basket.isBasketLoading
        })
    },

    data()
    {
        return {
            quantity: 1,
            buttonLockState: false
        };
    },

    methods:
    {
        /**
         * add an item to basket-resource
         */
        addToBasket()
        {
            this.$store.dispatch("loadComponent", "add-item-to-basket-overlay");
            this.$store.dispatch("loadComponent", "basket-preview");

            if (this.variationMissingProperties !== undefined && this.variationMissingProperties.length)
            {
                this.showMissingPropertiesError();
            }
            else if (this.isSalable || this.isSet)
            {
                this.$store.commit("setIsAddToBasketLoading", this.variationId);

                const orderParamsAndSurcharge = extractPropertiesAndSurcharge(this.orderProperties);

                const basketObject =
                    {
                        variationId             :   this.variationId,
                        quantity                :   this.quantity,
                        basketItemOrderParams   :   orderParamsAndSurcharge.orderParams,
                        totalOrderParamsMarkup  :   orderParamsAndSurcharge.totalSurcharge
                    };

                if(this.isSet)
                {
                    const setComponents = [];
                    this.$store.state.items.setComponentIds.forEach(itemId =>
                    {
                        const setComponent = this.$store.getters[`${itemId}/currentItemVariation`];

                        const variationId = setComponent && setComponent.variation.id;

                        // Extract order properties and total surcharge for set components
                        const setComponentOrderParamsAndSurcharge = extractPropertiesAndSurcharge(
                            setComponent.properties.filter(prop => prop.property.isOderProperty)
                        );

                        setComponents.push({
                            variationId: variationId,
                            quantity: this.$store.state.items[itemId].variationOrderQuantity,
                            basketItemOrderParams: setComponentOrderParamsAndSurcharge.orderParams,
                            totalOrderParamsMarkup: setComponentOrderParamsAndSurcharge.totalSurcharge
                        });
                    });
                    basketObject.setComponents = setComponents;
                }

                this.$store.dispatch("addBasketItem", basketObject).then(
                    response =>
                    {
                        document.dispatchEvent(new CustomEvent("afterBasketItemAdded", { detail: basketObject }));
                        this.$store.commit("setIsAddToBasketLoading", 0);
                    },
                    error =>
                    {
                        this.$store.commit("setIsAddToBasketLoading", 0);

                        if (error.data)
                        {
                            NotificationService.error(
                                this.$translate(
                                    "Ceres::Template." + _exceptions_ExceptionMap__WEBPACK_IMPORTED_MODULE_0__["default"].get(error.data.exceptionCode.toString()),
                                    error.data.placeholder
                                )
                            ).closeAfter(5000);
                        }
                    });
            }
        },
        showMissingPropertiesError()
        {
            this.$store.commit(`${this.itemId}/setVariationMarkInvalidProps`, true);

            const propertyNames = this.variationMissingProperties.map(property => property.property.names.name);
            let errorMsgContent = "";

            for (const name of propertyNames)
            {
                errorMsgContent += name + "<br>";
            }

            NotificationService.error(this.$translate("Ceres::Template.singleItemMissingOrderPropertiesError").replace("<properties>", errorMsgContent));
        },

        directToItem()
        {
            (0,_services_UrlService__WEBPACK_IMPORTED_MODULE_1__.navigateTo)(this.itemUrl);
        },

        handleButtonState(value)
        {
            this.buttonLockState = value;
        },

        /**
         * update the property quantity of the current instance
         * @param value
         */
        updateQuantity(value)
        {
            this.quantity = value;
        }
    },

    watch:
    {
        quantity(value)
        {
            if(!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(this.itemId))
            {
                this.$store.commit(`${this.itemId}/setVariationOrderQuantity`, value);
                this.$store.commit(`${this.itemId}/setVariationPropertySurcharges`, this.$store.getters[`${this.itemId}/variationBasePrice`]);
            }
        },

        variationOrderQuantity(value)
        {
            if (this.quantity !== value)
            {
                this.quantity = value;
            }
        },

        propQuantity(value)
        {
            if (!isNaN(value))
            {
                this.quantity = value;
            }
        }
    }
});

function extractPropertiesAndSurcharge(orderProperties)
{
    let totalSurcharge = 0;
    const orderParams = [];

    orderProperties.forEach((orderProperty) =>
    {
        if(!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(orderProperty.property.value))
        {
            const property = orderProperty.property;

            if (property.valueType === "float" &&
                !(0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(property.value) &&
                property.value.slice(-1) === App.decimalSeparator)
            {
                property.value = property.value.substr(0, property.value.length - 1);
            }

            totalSurcharge += (orderProperty.surcharge || 0) + (property.surcharge || 0);

            orderParams.push({
                propertyId: property.id,
                type: property.valueType,
                name: property.names.name,
                value: property.value
            });
        }
    });

    return {
        orderParams: orderParams,
        totalSurcharge: totalSurcharge
    };
}


/***/ }),

/***/ "./resources/js/src/app/components/basket/AddToBasket.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/AddToBasket.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_AddToBasket_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddToBasket.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/AddToBasket.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_AddToBasket_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/basket/AddToBasket.vue?vue&type=template&id=729fe3ab&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/AddToBasket.vue?vue&type=template&id=729fe3ab& ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddToBasket_vue_vue_type_template_id_729fe3ab___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddToBasket_vue_vue_type_template_id_729fe3ab___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddToBasket_vue_vue_type_template_id_729fe3ab___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddToBasket.vue?vue&type=template&id=729fe3ab& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/AddToBasket.vue?vue&type=template&id=729fe3ab&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/AddToBasket.vue?vue&type=template&id=729fe3ab&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/AddToBasket.vue?vue&type=template&id=729fe3ab& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
    !_vm.showQuantity && _vm.useLargeScale && _vm.canBeAddedToBasket
      ? _c(
          "div",
          {
            directives: [{ name: "tooltip", rawName: "v-tooltip" }],
            staticClass: "add-to-basket-lg-container d-none d-lg-block",
            class: { "no-pointer-events": _vm.isLoading },
            attrs: {
              "data-toggle": "tooltip",
              "data-placement": "top",
              title: _vm.$translate("Ceres::Template.singleItemAddToBasket"),
            },
            on: {
              click: function ($event) {
                return _vm.addToBasket()
              },
            },
          },
          [
            _c("icon", {
              staticClass: "fa-lg mobile-icon-right",
              attrs: { icon: "cart-plus", loading: _vm.isLoading },
            }),
          ],
          1
        )
      : _vm._e(),
    _vm._v(" "),
    !_vm.showQuantity && _vm.useLargeScale && !_vm.canBeAddedToBasket
      ? _c(
          "div",
          {
            directives: [{ name: "tooltip", rawName: "v-tooltip" }],
            staticClass: "add-to-basket-lg-container d-none d-lg-block",
            attrs: {
              "data-toggle": "tooltip",
              "data-placement": "top",
              title: _vm.$translate("Ceres::Template.itemShowItem"),
            },
            on: {
              click: function ($event) {
                return _vm.directToItem()
              },
            },
          },
          [
            _c("i", {
              staticClass: "fa fa-arrow-right fa-lg d-none d-sm-block",
            }),
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.showQuantity && !_vm.useLargeScale
      ? _c(
          "div",
          {
            staticClass: "d-inline",
            class: { "d-lg-none": !_vm.$ceres.isItemView },
          },
          [
            _c("div", { staticClass: "add-to-basket-container" }, [
              _c(
                "div",
                { staticClass: "quantity-input-container" },
                [
                  _c("quantity-input", {
                    attrs: {
                      value: _vm.quantity,
                      timeout: 0,
                      min: _vm.minimumQuantity,
                      max: _vm.maximumQuantity,
                      interval: _vm.intervalQuantity,
                      "variation-id": _vm.variationId,
                      waiting:
                        _vm.isLoading ||
                        !_vm.isSalable ||
                        !_vm.allVariationsSelected,
                    },
                    on: {
                      "quantity-change": _vm.updateQuantity,
                      "out-of-stock": _vm.handleButtonState,
                    },
                  }),
                ],
                1
              ),
              _vm._v(" "),
              !_vm.allVariationsSelected || !_vm.isSalable
                ? _c(
                    "button",
                    {
                      directives: [{ name: "tooltip", rawName: "v-tooltip" }],
                      staticClass:
                        "btn btn-block btn-primary btn-appearance disabled",
                      class: _vm.buttonClasses,
                      style: _vm.paddingInlineStyles,
                      attrs: {
                        "data-toggle": "tooltip",
                        "data-placement": "top",
                        title: _vm.tooltipText,
                      },
                    },
                    [
                      _c("i", {
                        staticClass: "fa fa-shopping-cart",
                        attrs: { "aria-hidden": "true" },
                      }),
                      _vm._v(
                        "\n                " +
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.singleItemAddToBasket"
                            )
                          ) +
                          "\n            "
                      ),
                    ]
                  )
                : !_vm.buttonLockState
                ? _c(
                    "button",
                    {
                      staticClass: "btn btn-block btn-primary btn-appearance",
                      class: _vm.buttonClasses,
                      style: _vm.paddingInlineStyles,
                      attrs: { disabled: _vm.isLoading || !_vm.hasPrice },
                      on: {
                        click: function ($event) {
                          return _vm.addToBasket()
                        },
                      },
                    },
                    [
                      _c("icon", {
                        attrs: {
                          icon: "shopping-cart",
                          loading: _vm.isLoading,
                        },
                      }),
                      _vm._v(
                        "\n                " +
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.singleItemAddToBasket"
                            )
                          ) +
                          "\n            "
                      ),
                    ],
                    1
                  )
                : _c(
                    "button",
                    {
                      directives: [{ name: "tooltip", rawName: "v-tooltip" }],
                      staticClass:
                        "btn btn-block btn-primary btn-appearance disabled",
                      class: _vm.buttonClasses,
                      style: _vm.paddingInlineStyles,
                      attrs: {
                        "data-toggle": "tooltip",
                        "data-placement": "top",
                        title: _vm._f("translate")(
                          "Ceres::Template.singleItemQuantityMax",
                          { max: _vm.maximumQuantity }
                        ),
                      },
                    },
                    [
                      _c("icon", {
                        attrs: {
                          icon: "shopping-cart",
                          waiting: _vm.isLoading,
                        },
                      }),
                      _vm._v(
                        "\n                " +
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.singleItemAddToBasket"
                            )
                          ) +
                          "\n            "
                      ),
                    ],
                    1
                  ),
            ]),
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    !_vm.showQuantity && !_vm.useLargeScale
      ? _c(
          "div",
          { staticClass: "d-inline", class: { "d-lg-none": !_vm.isWishList } },
          [
            _c(
              "div",
              {
                staticClass: "btn-group",
                attrs: { role: "group", "aria-label": "Thumb Control" },
              },
              [
                _vm.canBeAddedToBasket
                  ? _c(
                      "button",
                      {
                        staticClass:
                          "btn btn-primary btn-appearance mobile-width-button",
                        class: { "no-pointer-events": _vm.isLoading },
                        attrs: { type: "button" },
                        on: {
                          click: function ($event) {
                            return _vm.addToBasket()
                          },
                        },
                      },
                      [
                        _c("icon", {
                          staticClass: "fa-lg mobile-icon-right",
                          attrs: {
                            icon: "shopping-cart",
                            loading: _vm.isLoading,
                          },
                        }),
                        _vm._v(
                          "\n                " +
                            _vm._s(
                              _vm.$translate(
                                "Ceres::Template.singleItemAddToBasket"
                              )
                            ) +
                            "\n            "
                        ),
                      ],
                      1
                    )
                  : _c(
                      "button",
                      {
                        staticClass:
                          "btn btn-primary btn-appearance mobile-width-button",
                        attrs: { type: "button" },
                        on: {
                          click: function ($event) {
                            return _vm.directToItem()
                          },
                        },
                      },
                      [
                        _c("i", {
                          staticClass:
                            "fa fa-arrow-right fa-lg d-none d-sm-block",
                          attrs: { "aria-hidden": "true" },
                        }),
                        _vm._v(
                          "\n                " +
                            _vm._s(
                              _vm.$translate("Ceres::Template.itemShowItem")
                            ) +
                            "\n            "
                        ),
                      ]
                    ),
              ]
            ),
          ]
        )
      : _vm._e(),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/mixins/buttonSizeProperty.mixin.js":
/*!*****************************************************************!*\
  !*** ./resources/js/src/app/mixins/buttonSizeProperty.mixin.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ButtonSizePropertyMixin": function() { return /* binding */ ButtonSizePropertyMixin; }
/* harmony export */ });
const BUTTON_SIZES = ["btn-sm", "btn-lg"];

const LEGACY_CLASS_MAP = {
    "sm": "btn-sm",
    "md": "",
    "lg": "btn-lg"
};

const ButtonSizePropertyMixin =
{
    props: {
        buttonSize:
        {
            type: [String, null],
            default: null,
            validator: value =>
            {
                return [
                    "",
                    ...BUTTON_SIZES,
                    ...Object.keys(LEGACY_CLASS_MAP)
                ].indexOf(value) !== -1;
            }
        }
    },

    computed: {
        buttonSizeClass()
        {
            if (LEGACY_CLASS_MAP.hasOwnProperty(this.buttonSize))
            {
                return LEGACY_CLASS_MAP[this.buttonSize];
            }

            return this.buttonSize;
        }
    }
};


/***/ })

}]);
//# sourceMappingURL=ceres-12.js.map