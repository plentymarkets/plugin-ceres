(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_3__);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: {
    liveShoppingData: {
      type: Object,
      required: true
    },
    displaySettings: {
      type: Object,
      default: function _default() {
        return {
          showCrossPrice: true,
          showStock: true,
          showStockProgress: true,
          showTimer: true,
          showTimerProgress: true
        };
      }
    },
    prices: {
      type: Object,
      required: true
    },
    isActiveByStock: {
      type: Boolean
    },
    showNetPrices: {
      type: Boolean
    }
  },
  data: function data() {
    return {
      currentInterval: null,
      duration: null,
      hasClosed: null,
      hasStarted: null,
      itemPriceRebatePercentage: 0,
      itemQuantityRemaining: 0,
      momentBegin: null,
      momentEnd: null,
      quantitySoldPercentage: 0,
      timePercentage: 0
    };
  },
  computed: {
    oldPriceBefore: function oldPriceBefore() {
      return this.$translate('Ceres::Template.liveShoppingBefore', {
        'price': '<del>' + this.prices.rrp.unitPrice.formatted + '</del>'
      });
    },
    oldPriceRrp: function oldPriceRrp() {
      return this.$translate('Ceres::Template.liveShoppingRrp', {
        'price': '<del>' + this.prices.rrp.unitPrice.formatted + '</del>'
      });
    }
  },
  created: function created() {
    this.initializeDataAndTimer();
  },
  methods: {
    initializeDataAndTimer: function initializeDataAndTimer() {
      var _this = this;

      var momentNow = dayjs__WEBPACK_IMPORTED_MODULE_3___default()();
      this.momentBegin = dayjs__WEBPACK_IMPORTED_MODULE_3___default.a.unix(this.liveShoppingData.liveShopping.fromTime);
      this.momentEnd = dayjs__WEBPACK_IMPORTED_MODULE_3___default.a.unix(this.liveShoppingData.liveShopping.toTime);
      this.hasStarted = this.momentBegin.valueOf() < momentNow.valueOf();
      this.hasClosed = this.momentEnd.valueOf() < momentNow.valueOf();
      this.setQuantitySoldPercentage();

      if (this.hasStarted && !this.hasClosed) {
        this.setItemPriceRebatePercentage();
      }

      clearInterval(this.currentInterval);
      this.calculations();
      this.currentInterval = setInterval(function () {
        _this.calculations();
      }, 1000);
    },
    setQuantitySoldPercentage: function setQuantitySoldPercentage() {
      var data = this.liveShoppingData.liveShopping;
      var percentage = 100 - data.quantitySold / data.quantityMax * 100;
      this.itemQuantityRemaining = data.quantityMax - data.quantitySold;
      this.quantitySoldPercentage = percentage.toFixed(App.config.item.storeSpecial);
    },
    setItemPriceRebatePercentage: function setItemPriceRebatePercentage() {
      var specialOfferPrice = this.prices.price.price.value;
      var defaultPrice = this.prices.rrp && this.prices.rrp.price.value || 0;

      if (defaultPrice === 0) {
        this.itemPriceRebatePercentage = 0;
      } else {
        var percentage = 100 - specialOfferPrice / defaultPrice * 100;
        percentage = percentage.toFixed(App.config.item.storeSpecial);
        percentage = percentage.replace(".", App.decimalSeparator);
        this.itemPriceRebatePercentage = percentage;
      }
    },
    calculations: function calculations() {
      var momentNow = dayjs__WEBPACK_IMPORTED_MODULE_3___default()();
      var fullSeconds = 0;
      var remainSeconds = 0;
      fullSeconds = this.momentEnd.diff(this.momentBegin, "second");

      if (this.hasStarted) {
        remainSeconds = this.momentEnd.diff(momentNow, "second");
      } else {
        remainSeconds = this.momentBegin.diff(momentNow, "second");
      }

      this.timePercentage = (remainSeconds / fullSeconds * 100).toFixed(App.config.item.storeSpecial);
      this.duration = this.getDuration(remainSeconds);
      var hasToStart = !this.hasStarted && this.momentBegin < momentNow;
      var hasToClose = !this.hasClosed && this.momentEnd < momentNow;

      if (hasToStart || hasToClose) {
        clearInterval(this.currentInterval);
        this.$emit("reload-offer");
      }
    },
    getDuration: function getDuration(seconds) {
      var days = Math.floor(seconds / (60 * 60 * 24));
      seconds = seconds - days * 60 * 60 * 24;
      var hours = Math.floor(seconds / (60 * 60));
      seconds = seconds - hours * 60 * 60;
      var minutes = Math.floor(seconds / 60);
      seconds = seconds - minutes * 60;
      return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    }
  },
  watch: {
    liveShoppingData: function liveShoppingData() {
      this.initializeDataAndTimer();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/liveShopping/LiveShoppingItem.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/liveShopping/LiveShoppingItem.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_object_freeze_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.freeze.js */ "./node_modules/core-js/modules/es.object.freeze.js");
/* harmony import */ var core_js_modules_es_object_freeze_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_freeze_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var _LiveShoppingDetails_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LiveShoppingDetails.vue */ "./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue");
/* harmony import */ var _itemList_ItemStoreSpecial_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../itemList/ItemStoreSpecial.vue */ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue");



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




var TimeEnum = Object.freeze({
  past: 1,
  now: 2,
  future: 3
});
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    LiveShoppingDetails: _LiveShoppingDetails_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    ItemStoreSpecial: _itemList_ItemStoreSpecial_vue__WEBPACK_IMPORTED_MODULE_6__["default"]
  },
  props: {
    liveShoppingId: {
      type: Number,
      required: true,
      validator: function validator(value) {
        return value % 1 === 0 && value >= 1 && value <= 10;
      }
    },
    displaySettings: {
      type: Object
    },
    paddingClasses: {
      type: String,
      default: null
    },
    paddingInlineStyles: {
      type: String,
      default: null
    },
    sorting: {
      type: String,
      default: null
    },
    showNetPrices: {
      type: Boolean
    }
  },
  computed: {
    currentOffer: function currentOffer() {
      return this.$store.state.liveShopping.liveShoppingOffers[this._uid];
    },
    isActive: function isActive() {
      return this.isActiveByTime && this.isActiveByStock;
    },
    isActiveByTime: function isActiveByTime() {
      if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_4__["isNullOrUndefined"])(this.currentOffer)) {
        var begin = parseInt(this.currentOffer.liveShopping.fromTime) * 1000;
        var end = parseInt(this.currentOffer.liveShopping.toTime) * 1000;
        var now = Date.now();
        return begin < now && now < end;
      }

      return false;
    },
    isActiveByStock: function isActiveByStock() {
      if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_4__["isNullOrUndefined"])(this.currentOffer)) {
        var liveShopping = this.currentOffer.liveShopping;
        return liveShopping.quantitySold < liveShopping.quantityMax;
      }

      return false;
    },
    storeSpecial: function storeSpecial() {
      if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_4__["isNullOrUndefined"])(this.currentOffer)) {
        if (this.isActive) {
          return {
            id: 1
          };
        }

        var offerTime = this.whenIsCurrentOffer();
        var name = "";

        if (offerTime === TimeEnum.past) {
          name = this.$translate("Ceres::Template.liveShoppingOfferClosed");
        } else if (offerTime === TimeEnum.future) {
          name = this.$translate("Ceres::Template.liveShoppingNextOffer");
        } else if (offerTime === TimeEnum.now) {
          name = this.$translate("Ceres::Template.liveShoppingOfferSoldOut");
        }

        return {
          id: -1,
          names: {
            name: name
          }
        };
      }

      return null;
    },
    prices: function prices() {
      var itemPrices = this.currentOffer.item.prices;
      var prices = {
        price: itemPrices.default,
        rrp: itemPrices.rrp,
        isRrpDefaultPrice: false
      };

      if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_4__["isNullOrUndefined"])(itemPrices.specialOffer)) {
        prices.price = itemPrices.specialOffer;
        prices.rrp = itemPrices.default || itemPrices.rrp;
        prices.isRrpDefaultPrice = !!itemPrices.default;
      }

      return prices;
    }
  },
  mounted: function mounted() {
    this.reloadOffer();
  },
  methods: {
    whenIsCurrentOffer: function whenIsCurrentOffer() {
      var begin = parseInt(this.currentOffer.liveShopping.fromTime) * 1000;
      var end = parseInt(this.currentOffer.liveShopping.toTime) * 1000;
      var now = Date.now();

      if (begin < now && now > end) {
        return TimeEnum.past;
      }

      if (begin < now && now < end) {
        return TimeEnum.now;
      }

      return TimeEnum.future;
    },
    reloadOffer: function reloadOffer() {
      this.$store.dispatch("retrieveLiveShoppingOffer", {
        liveShoppingId: this.liveShoppingId,
        sorting: this.sorting,
        uid: this._uid
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.object.freeze.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.freeze.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var FREEZING = __webpack_require__(/*! ../internals/freezing */ "./node_modules/core-js/internals/freezing.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var onFreeze = __webpack_require__(/*! ../internals/internal-metadata */ "./node_modules/core-js/internals/internal-metadata.js").onFreeze;

var nativeFreeze = Object.freeze;
var FAILS_ON_PRIMITIVES = fails(function () { nativeFreeze(1); });

// `Object.freeze` method
// https://tc39.es/ecma262/#sec-object.freeze
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  freeze: function freeze(it) {
    return nativeFreeze && isObject(it) ? nativeFreeze(onFreeze(it)) : it;
  }
});


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue?vue&type=template&id=c760b5b6&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue?vue&type=template&id=c760b5b6& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "live-shopping-details" },
    [
      _c("div", { staticClass: "h3 live-shopping-item-name" }, [
        _c(
          "a",
          { attrs: { href: _vm._f("itemURL")(_vm.liveShoppingData.item) } },
          [
            _vm._v(
              "\n            " +
                _vm._s(_vm._f("itemName")(_vm.liveShoppingData.item)) +
                "\n        "
            )
          ]
        )
      ]),
      _vm._v(" "),
      _vm._t("after-item-name"),
      _vm._v(" "),
      _vm.displaySettings.showTimer || _vm.displaySettings.showStock
        ? _c(
            "div",
            { staticClass: "live-shopping-countdown" },
            [
              _c("hr", { staticClass: "live-shopping-countdown-separator" }),
              _vm._v(" "),
              _vm.displaySettings.showTimer
                ? _c(
                    "div",
                    { staticClass: "live-shopping-countdown-heading" },
                    [
                      _vm.hasStarted
                        ? _c("div", [
                            _vm._v(
                              "\n                " +
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.liveShoppingOfferEndsIn"
                                  )
                                ) +
                                "\n            "
                            )
                          ])
                        : _c("div", [
                            _vm._v(
                              "\n                " +
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.liveShoppingOfferBeginsIn"
                                  )
                                ) +
                                "\n            "
                            )
                          ])
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.displaySettings.showTimer && !!_vm.duration
                ? _c(
                    "div",
                    { staticClass: "live-shopping-countdown-thread-container" },
                    [
                      _vm.duration.days > 0
                        ? _c(
                            "div",
                            { staticClass: "live-shopping-countdown-thread" },
                            [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "live-shopping-countdown-thread-number"
                                },
                                [_vm._v(_vm._s(_vm.duration.days))]
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "small" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.$translate(
                                      "Ceres::Template.liveShoppingDays"
                                    )
                                  )
                                )
                              ])
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "live-shopping-countdown-thread" },
                        [
                          _c(
                            "div",
                            {
                              staticClass:
                                "live-shopping-countdown-thread-number"
                            },
                            [_vm._v(_vm._s(_vm.duration.hours))]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "small" }, [
                            _vm._v(
                              _vm._s(
                                _vm.$translate(
                                  "Ceres::Template.liveShoppingHours"
                                )
                              )
                            )
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "live-shopping-countdown-thread" },
                        [
                          _c(
                            "div",
                            {
                              staticClass:
                                "live-shopping-countdown-thread-number"
                            },
                            [_vm._v(_vm._s(_vm.duration.minutes))]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "small" }, [
                            _vm._v(
                              _vm._s(
                                _vm.$translate(
                                  "Ceres::Template.liveShoppingMinutes"
                                )
                              )
                            )
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _vm.duration.days <= 0
                        ? _c(
                            "div",
                            { staticClass: "live-shopping-countdown-thread" },
                            [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "live-shopping-countdown-thread-number"
                                },
                                [_vm._v(_vm._s(_vm.duration.seconds))]
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "small" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.$translate(
                                      "Ceres::Template.liveShoppingSeconds"
                                    )
                                  )
                                )
                              ])
                            ]
                          )
                        : _vm._e()
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.hasStarted && !_vm.hasClosed
                ? [
                    _vm.displaySettings.showTimer &&
                    _vm.displaySettings.showTimerProgress
                      ? _c("div", { staticClass: "live-shopping-progress" }, [
                          _c("div", { staticClass: "progress" }, [
                            _c("div", {
                              staticClass: "progress-bar",
                              class:
                                "progress-" +
                                Math.round(_vm.timePercentage / 10) * 10,
                              style: "width:" + _vm.timePercentage + "%",
                              attrs: {
                                role: "progressbar",
                                "aria-valuenow": "25",
                                "aria-valuemin": "0",
                                "aria-valuemax": "100"
                              }
                            })
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.displaySettings.showStock
                      ? _c("div", { staticClass: "live-shopping-progress" }, [
                          _c(
                            "div",
                            { staticClass: "live-shopping-progress-heading" },
                            [
                              _c("span", [
                                _vm._v(
                                  _vm._s(
                                    _vm.$translate(
                                      "Ceres::Template.liveShoppingRemainingStock",
                                      {
                                        quantityRemaining:
                                          _vm.itemQuantityRemaining,
                                        quantityMax:
                                          _vm.liveShoppingData.liveShopping
                                            .quantityMax
                                      }
                                    )
                                  )
                                )
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _vm.displaySettings.showStockProgress
                            ? _c("div", { staticClass: "progress" }, [
                                _c("div", {
                                  staticClass: "progress-bar",
                                  class:
                                    "progress-" +
                                    Math.round(
                                      _vm.quantitySoldPercentage / 10
                                    ) *
                                      10,
                                  style:
                                    "width:" + _vm.quantitySoldPercentage + "%",
                                  attrs: {
                                    role: "progressbar",
                                    "aria-valuenow": "25",
                                    "aria-valuemin": "0",
                                    "aria-valuemax": "100"
                                  }
                                })
                              ])
                            : _vm._e()
                        ])
                      : _vm._e()
                  ]
                : _vm._e()
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.hasStarted && !_vm.hasClosed
        ? _c("div", { staticClass: "live-shopping-prices bg-danger" }, [
            _c("div", { staticClass: "live-shopping-prices-inner" }, [
              !isNaN(_vm.itemPriceRebatePercentage) &&
              _vm.itemPriceRebatePercentage > 0
                ? _c("div", { staticClass: "live-shopping-prices-rebate" }, [
                    _vm._v(
                      _vm._s(
                        _vm.$translate("Ceres::Template.liveShoppingRebate", {
                          rebate: _vm.itemPriceRebatePercentage
                        })
                      )
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("div", { staticClass: "live-shopping-prices-container" }, [
                _c("div", { staticClass: "live-shopping-price" }, [
                  _c("strong", [
                    _vm._v(_vm._s(_vm.prices.price.unitPrice.formatted) + " *")
                  ])
                ]),
                _vm._v(" "),
                _vm.displaySettings.showCrossPrice &&
                _vm.prices.rrp &&
                _vm.prices.rrp.unitPrice.value > 0
                  ? _c("span", [
                      _vm.prices.isRrpDefaultPrice
                        ? _c("span", {
                            domProps: { innerHTML: _vm._s(_vm.oldPriceBefore) }
                          })
                        : _c("span", {
                            domProps: { innerHTML: _vm._s(_vm.oldPriceRrp) }
                          })
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "live-shopping-prices-additional-info" },
              [
                !(
                  _vm.liveShoppingData.item.unit.unitOfMeasurement === "C62" &&
                  _vm.liveShoppingData.item.unit.content === 1
                )
                  ? _c("div", [
                      _c("span", [
                        _vm._v(_vm._s(_vm.liveShoppingData.item.unit.content))
                      ]),
                      _vm._v(" "),
                      _c("span", [
                        _vm._v(
                          _vm._s(_vm.liveShoppingData.item.unit.names.name)
                        )
                      ]),
                      _vm._v(" "),
                      _vm.liveShoppingData.item.variation.mayShowUnitPrice
                        ? _c("span", [
                            _vm._v("| " + _vm._s(_vm.prices.price.basePrice))
                          ])
                        : _vm._e()
                    ])
                  : _vm._e(),
                _vm._v("\n\n            * "),
                _vm.showNetPrices
                  ? [
                      _vm._v(
                        _vm._s(_vm.$translate("Ceres::Template.itemExclVAT"))
                      )
                    ]
                  : [
                      _vm._v(
                        _vm._s(_vm.$translate("Ceres::Template.itemInclVAT"))
                      )
                    ],
                _vm._v(
                  " " +
                    _vm._s(_vm.$translate("Ceres::Template.itemExclusive")) +
                    "\n            "
                ),
                _vm.$ceres.config.global.shippingCostsCategoryId > 0
                  ? _c(
                      "a",
                      {
                        attrs: {
                          "data-toggle": "modal",
                          href: "#shippingscosts",
                          title: _vm.$translate(
                            "Ceres::Template.itemShippingCosts"
                          )
                        }
                      },
                      [
                        _vm._v(
                          _vm._s(
                            _vm.$translate("Ceres::Template.itemShippingCosts")
                          )
                        )
                      ]
                    )
                  : _c(
                      "a",
                      {
                        attrs: {
                          title: _vm.$translate(
                            "Ceres::Template.itemShippingCosts"
                          )
                        }
                      },
                      [
                        _vm._v(
                          _vm._s(
                            _vm.$translate("Ceres::Template.itemShippingCosts")
                          )
                        )
                      ]
                    )
              ],
              2
            )
          ])
        : _c("div", { staticClass: "thumb-content" }, [
            _c("div", [
              _c("div", { staticClass: "prices" }, [
                _c("div", { staticClass: "price-view-port" }, [
                  _vm.displaySettings.showCrossPrice &&
                  _vm.prices.rrp.price.value > 0
                    ? _c("del", { staticClass: "crossprice" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(
                              _vm._f("itemCrossPrice")(
                                _vm.prices.rrp.price.formatted
                              )
                            ) +
                            "\n                    "
                        )
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "price" }, [
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.prices.price.price.formatted) +
                      " *\n                "
                  )
                ])
              ]),
              _vm._v(" "),
              !(
                _vm.liveShoppingData.item.unit.unitOfMeasurement === "C62" &&
                _vm.liveShoppingData.item.unit.content === 1
              )
                ? _c("div", { staticClass: "category-unit-price small" }, [
                    _c("span", [
                      _vm._v(_vm._s(_vm.liveShoppingData.item.unit.content))
                    ]),
                    _vm._v(" "),
                    _c("span", [
                      _vm._v(_vm._s(_vm.liveShoppingData.item.unit.names.name))
                    ]),
                    _vm._v(" "),
                    _vm.liveShoppingData.item.variation.mayShowUnitPrice
                      ? _c("span", [
                          _vm._v("| " + _vm._s(_vm.prices.price.basePrice))
                        ])
                      : _vm._e()
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "vat small text-muted" },
                [
                  _vm._v("\n                * "),
                  _vm.showNetPrices
                    ? [
                        _vm._v(
                          _vm._s(_vm.$translate("Ceres::Template.itemExclVAT"))
                        )
                      ]
                    : [
                        _vm._v(
                          _vm._s(_vm.$translate("Ceres::Template.itemInclVAT"))
                        )
                      ],
                  _vm._v(
                    " " +
                      _vm._s(_vm.$translate("Ceres::Template.itemExclusive")) +
                      "\n                "
                  ),
                  _vm.$ceres.config.global.shippingCostsCategoryId > 0
                    ? _c(
                        "a",
                        {
                          attrs: {
                            "data-toggle": "modal",
                            href: "#shippingscosts",
                            title: _vm.$translate(
                              "Ceres::Template.itemShippingCosts"
                            )
                          }
                        },
                        [
                          _vm._v(
                            _vm._s(
                              _vm.$translate(
                                "Ceres::Template.itemShippingCosts"
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
                              "Ceres::Template.itemShippingCosts"
                            )
                          }
                        },
                        [
                          _vm._v(
                            _vm._s(
                              _vm.$translate(
                                "Ceres::Template.itemShippingCosts"
                              )
                            )
                          )
                        ]
                      )
                ],
                2
              )
            ])
          ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/liveShopping/LiveShoppingItem.vue?vue&type=template&id=3c96f6c0&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/liveShopping/LiveShoppingItem.vue?vue&type=template&id=3c96f6c0& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    [
      !!_vm.currentOffer
        ? _c("category-item", {
            attrs: {
              "item-data": _vm.currentOffer.item,
              "decimal-count": _vm.$ceres.config.item.storeSpecial,
              "image-url-accessor": "urlMiddle",
              "padding-classes": _vm.paddingClasses,
              "padding-inline-styles": _vm.paddingInlineStyles,
              "force-url-with-variation-id": true
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "store-special",
                  fn: function() {
                    return [
                      !!_vm.storeSpecial
                        ? _c("item-store-special", {
                            attrs: {
                              "store-special": _vm.storeSpecial,
                              "recommended-retail-price": _vm.prices.rrp,
                              "variation-retail-price": _vm.prices.price,
                              "decimal-count":
                                _vm.$ceres.config.item.storeSpecial
                            }
                          })
                        : _vm._e()
                    ]
                  },
                  proxy: true
                },
                {
                  key: "item-image",
                  fn: function() {
                    return [
                      !!_vm.displaySettings.customImagePath
                        ? _c(
                            "a",
                            {
                              attrs: {
                                href: _vm._f("itemURL")(_vm.currentOffer.item)
                              }
                            },
                            [
                              _c("lazy-img", {
                                attrs: {
                                  "image-url":
                                    _vm.displaySettings.customImagePath,
                                  alt: _vm._f("itemName")(
                                    _vm.currentOffer.item
                                  ),
                                  title: _vm._f("itemName")(
                                    _vm.currentOffer.item
                                  )
                                }
                              })
                            ],
                            1
                          )
                        : _vm._e()
                    ]
                  },
                  proxy: true
                },
                !!_vm.currentOffer &&
                _vm.whenIsCurrentOffer() !== 1 &&
                _vm.isActiveByStock
                  ? {
                      key: "item-details",
                      fn: function() {
                        return [
                          _c("live-shopping-details", {
                            attrs: {
                              "live-shopping-data": _vm.currentOffer,
                              "display-settings": _vm.displaySettings,
                              prices: _vm.prices,
                              "is-active-by-stock": _vm.isActiveByStock,
                              "show-net-prices": _vm.showNetPrices
                            },
                            on: {
                              "reload-offer": function($event) {
                                return _vm.reloadOffer()
                              }
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "after-item-name",
                                  fn: function() {
                                    return [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "live-shopping-add-to-basket"
                                        },
                                        [
                                          _c("add-to-basket", {
                                            attrs: {
                                              "variation-id":
                                                _vm.currentOffer.item.variation
                                                  .id,
                                              "is-salable":
                                                !!_vm.currentOffer.item
                                                  .filter &&
                                                _vm.currentOffer.item.filter
                                                  .isSalable,
                                              "has-children":
                                                !!_vm.currentOffer.item
                                                  .filter &&
                                                _vm.currentOffer.item.filter
                                                  .hasActiveChildren,
                                              "interval-quantity":
                                                _vm.currentOffer.item.variation
                                                  .intervalOrderQuantity || 1,
                                              "minimum-quantity":
                                                _vm.currentOffer.item.variation
                                                  .minimumOrderQuantity,
                                              "maximum-quantity":
                                                !!_vm.currentOffer.item
                                                  .variation
                                                  .maximumOrderQuantity &&
                                                _vm.currentOffer.item.variation
                                                  .maximumOrderQuantity > 0
                                                  ? _vm.currentOffer.item
                                                      .variation
                                                      .maximumOrderQuantity
                                                  : null,
                                              "order-properties": _vm.currentOffer.item.properties.filter(
                                                function(prop) {
                                                  return prop.property
                                                    .isOderProperty
                                                }
                                              ),
                                              "has-order-properties":
                                                _vm.currentOffer.item
                                                  .hasOrderProperties,
                                              "use-large-scale": false,
                                              "show-quantity": false,
                                              "item-url": _vm._f("itemURL")(
                                                _vm.currentOffer.item
                                              ),
                                              "item-type":
                                                _vm.currentOffer.item.item
                                                  .itemType
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ]
                                  },
                                  proxy: true
                                }
                              ],
                              null,
                              false,
                              741665433
                            )
                          })
                        ]
                      },
                      proxy: true
                    }
                  : null
              ],
              null,
              true
            )
          })
        : _c("div", [_vm._t("default")], 2)
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue":
/*!******************************************************************************!*\
  !*** ./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LiveShoppingDetails_vue_vue_type_template_id_c760b5b6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LiveShoppingDetails.vue?vue&type=template&id=c760b5b6& */ "./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue?vue&type=template&id=c760b5b6&");
/* harmony import */ var _LiveShoppingDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LiveShoppingDetails.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LiveShoppingDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LiveShoppingDetails_vue_vue_type_template_id_c760b5b6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LiveShoppingDetails_vue_vue_type_template_id_c760b5b6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LiveShoppingDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LiveShoppingDetails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LiveShoppingDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue?vue&type=template&id=c760b5b6&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue?vue&type=template&id=c760b5b6& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LiveShoppingDetails_vue_vue_type_template_id_c760b5b6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LiveShoppingDetails.vue?vue&type=template&id=c760b5b6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue?vue&type=template&id=c760b5b6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LiveShoppingDetails_vue_vue_type_template_id_c760b5b6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LiveShoppingDetails_vue_vue_type_template_id_c760b5b6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/liveShopping/LiveShoppingItem.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/src/app/components/liveShopping/LiveShoppingItem.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LiveShoppingItem_vue_vue_type_template_id_3c96f6c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LiveShoppingItem.vue?vue&type=template&id=3c96f6c0& */ "./resources/js/src/app/components/liveShopping/LiveShoppingItem.vue?vue&type=template&id=3c96f6c0&");
/* harmony import */ var _LiveShoppingItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LiveShoppingItem.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/liveShopping/LiveShoppingItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LiveShoppingItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LiveShoppingItem_vue_vue_type_template_id_3c96f6c0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LiveShoppingItem_vue_vue_type_template_id_3c96f6c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/liveShopping/LiveShoppingItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/liveShopping/LiveShoppingItem.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/liveShopping/LiveShoppingItem.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LiveShoppingItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LiveShoppingItem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/liveShopping/LiveShoppingItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LiveShoppingItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/liveShopping/LiveShoppingItem.vue?vue&type=template&id=3c96f6c0&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/liveShopping/LiveShoppingItem.vue?vue&type=template&id=3c96f6c0& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LiveShoppingItem_vue_vue_type_template_id_3c96f6c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LiveShoppingItem.vue?vue&type=template&id=3c96f6c0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/liveShopping/LiveShoppingItem.vue?vue&type=template&id=3c96f6c0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LiveShoppingItem_vue_vue_type_template_id_3c96f6c0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LiveShoppingItem_vue_vue_type_template_id_3c96f6c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-client-8.js.map