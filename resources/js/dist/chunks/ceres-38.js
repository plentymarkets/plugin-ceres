(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[38],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/SalesCoupon.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/SalesCoupon.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_2__);




function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var NotificationService = __webpack_require__(/*! ../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "sales-coupon",
  props: {
    short: {
      type: Boolean,
      default: true
    },
    showvalid: {
      type: Boolean,
      default: true
    },
    details: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: true
    },
    bundleType: String,
    bundleComponents: Array
  },
  data: function data() {
    return {
      code: 'SOMMER20',
      codeActive: false
    };
  },
  computed: {
    showItemBundleItems: function showItemBundleItems() {
      return App.bundleSetting !== 1 && this.bundleType === "bundle";
    }
  },
  methods: {
    getBundleInnerText: function getBundleInnerText(item) {
      item.variation.bundleType = null;
      return item;
    },
    copy: function copy() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return navigator.clipboard.writeText(_this.code);

              case 3:
                _this.codeActive = true;
                NotificationService.success("Der Gutscheincode wurde in Ihre Zwischenablage kopiert!").closeAfter(5000);
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                _this.codeActive = false;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/SalesCoupon.vue?vue&type=template&id=29b8cde8&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/SalesCoupon.vue?vue&type=template&id=29b8cde8& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "sales-coupon" }, [
    _c(
      "div",
      { staticClass: "codeHolder" },
      [
        _vm.icon
          ? _c(
              "svg",
              {
                staticClass: "sunIcon",
                attrs: {
                  viewBox: "0 0 24 24",
                  width: "24",
                  height: "24",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  fill: "none",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              },
              [
                _c("circle", { attrs: { cx: "12", cy: "12", r: "5" } }),
                _vm._v(" "),
                _c("line", { attrs: { x1: "12", y1: "1", x2: "12", y2: "3" } }),
                _vm._v(" "),
                _c("line", {
                  attrs: { x1: "12", y1: "21", x2: "12", y2: "23" }
                }),
                _vm._v(" "),
                _c("line", {
                  attrs: { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" }
                }),
                _vm._v(" "),
                _c("line", {
                  attrs: { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78" }
                }),
                _vm._v(" "),
                _c("line", { attrs: { x1: "1", y1: "12", x2: "3", y2: "12" } }),
                _vm._v(" "),
                _c("line", {
                  attrs: { x1: "21", y1: "12", x2: "23", y2: "12" }
                }),
                _vm._v(" "),
                _c("line", {
                  attrs: { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36" }
                }),
                _vm._v(" "),
                _c("line", {
                  attrs: { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22" }
                })
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "labeling" }, [
          !_vm.short
            ? _c("h3", [_vm._v("Sommer-Aktion: 20% sparen!*")])
            : _c("h3", [_vm._v("Jetzt 20% sparen!*")]),
          _vm._v(" "),
          _vm.showvalid
            ? _c("label", [_vm._v("gültig bis 16. Juni 2024")])
            : _vm._e()
        ]),
        _vm._v(" "),
        _vm._t("additionalContent"),
        _vm._v(" "),
        _c("button", { staticClass: "codeField", on: { click: _vm.copy } }, [
          _c("i", {
            staticClass: "fa",
            class: { "fa-check": _vm.codeActive, "fa-copy": !_vm.codeActive }
          }),
          _vm._v(" "),
          _c("span", {
            staticClass: "code",
            domProps: { innerHTML: _vm._s(_vm.code) }
          })
        ]),
        _vm._v(" "),
        _vm.details
          ? _c(
              "button",
              {
                staticClass: "viewDetails collapsed",
                attrs: {
                  "data-toggle": "collapse",
                  "data-target": "#couponDetails",
                  "aria-expanded": "false",
                  "aria-controls": "couponDetails"
                }
              },
              [_c("i", { staticClass: "fa fa-chevron-down" })]
            )
          : _vm._e()
      ],
      2
    ),
    _vm._v(" "),
    _vm.details
      ? _c(
          "div",
          {
            staticClass: "collapse couponDetails",
            attrs: { id: "couponDetails" }
          },
          [
            _c("p", [
              _vm._v(
                "* Gültig für die nächste Bestellung nur in Verbindung mit dem Gutscheincode " +
                  _vm._s(_vm.code) +
                  ".\n            Gilt "
              ),
              _c("i", [_vm._v("nicht")]),
              _vm._v(
                " auf bereits reduzierte Ware. Nicht mit anderen Aktionen oder Gutscheinen kombinierbar.\n            Keine Auszahlung möglich. Gültig bis 16.06.2024"
              )
            ])
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/SalesCoupon.vue":
/*!**************************************************************!*\
  !*** ./resources/js/src/app/components/item/SalesCoupon.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SalesCoupon_vue_vue_type_template_id_29b8cde8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SalesCoupon.vue?vue&type=template&id=29b8cde8& */ "./resources/js/src/app/components/item/SalesCoupon.vue?vue&type=template&id=29b8cde8&");
/* harmony import */ var _SalesCoupon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SalesCoupon.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/SalesCoupon.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SalesCoupon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SalesCoupon_vue_vue_type_template_id_29b8cde8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SalesCoupon_vue_vue_type_template_id_29b8cde8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/SalesCoupon.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/SalesCoupon.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/SalesCoupon.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesCoupon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SalesCoupon.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/SalesCoupon.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesCoupon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/SalesCoupon.vue?vue&type=template&id=29b8cde8&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/SalesCoupon.vue?vue&type=template&id=29b8cde8& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesCoupon_vue_vue_type_template_id_29b8cde8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SalesCoupon.vue?vue&type=template&id=29b8cde8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/SalesCoupon.vue?vue&type=template&id=29b8cde8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesCoupon_vue_vue_type_template_id_29b8cde8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalesCoupon_vue_vue_type_template_id_29b8cde8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-38.js.map