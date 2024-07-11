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
//
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
      code: 'SOMMER',
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
                  viewBox: "0 0 118.1778 119.914",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("g", { attrs: { fill: "currentColor" } }, [
                  _c("path", {
                    attrs: {
                      d:
                        "m69.5786 91.4356c-7.938 0-15.645-2.8613-21.4097-8.1074-7.6089-6.9238-11.5273-17.9932-9.9824-28.1992.6553-4.3306 2.231-8.731 4.9575-13.8486 1.564-2.9365 3.7798-6.6675 7.0562-9.4683 5.001-4.272 12.1582-6.0068 19.6401-4.7583 4.647.7754 6.9517 1.3374 10.4624 2.9136 1.1719.4487 2.3247 1.0049 3.4272 1.6548 4.856 2.8584 8.8052 7.4575 11.1196 12.9492 3.4121 8.0972 3.5933 17.9893.5107 27.8545-1.5688 5.0195-3.6484 8.835-6.3574 11.665-3.311 3.46-8.0024 5.8184-13.5669 6.8213-1.9487.3516-3.9106.5234-5.8574.5234zm-4.4648-56.7798c-3.8105 0-7.2393 1.1221-9.7163 3.2383-2.2554 1.9277-3.9595 4.8325-5.1924 7.1475-2.2881 4.2935-3.5933 7.8784-4.1084 11.2847-1.1558 7.6348 1.771 15.9111 7.457 21.0859 5.3501 4.8691 13.0029 6.9717 20.4629 5.627 2.7124-.4893 6.5112-1.6631 9.207-4.4795 1.8364-1.9189 3.3086-4.7061 4.501-8.5205 2.4829-7.9458 2.3931-16.0962-.2471-22.3613-1.6265-3.8594-4.4722-7.1992-7.8071-9.1621-.7466-.4399-1.5225-.8125-2.3071-1.1074l-.2397-.0986c-2.6528-1.1987-4.2603-1.6411-8.5996-2.3652-1.1597-.1934-2.3013-.2886-3.4102-.2886z"
                    }
                  }),
                  _vm._v(" "),
                  _c("path", {
                    attrs: {
                      d:
                        "m89.7432 4.8852c-.646-.12-1.482.134-2.48.948-1.026.836-1.62 2.077-2.159 3.285-1.718 3.847-3.211 7.792-4.469 11.811-.126.405-.252.829-.18 1.247.163.943 1.203 1.42 2.105 1.741.182.066.378.128.574.164.326.061.65.048.902-.153.186-.147.291-.37.391-.585 2.127-4.596 4.254-9.192 6.382-13.789.933-2.014.461-4.386-1.066-4.669"
                    }
                  }),
                  _vm._v(" "),
                  _c("path", {
                    attrs: {
                      d:
                        "m48.316 97.5117c-.333-.062-.663-.048-.92.157-.189.149-.297.377-.398.596-2.171 4.689-4.342 9.38-6.513 14.069-.951 2.056-.47 4.476 1.088 4.764.66.123 1.512-.137 2.53-.967 1.047-.853 1.653-2.119 2.204-3.352 1.752-3.924 3.275-7.95 4.559-12.051.129-.413.257-.845.184-1.272-.167-.962-1.228-1.449-2.148-1.777-.186-.065-.386-.13-.586-.167"
                    }
                  }),
                  _vm._v(" "),
                  _c("path", {
                    attrs: {
                      d:
                        "m21.1051 37.8071c-2.08-.385-4.061 1.241-2.204 4.082.66 1.011 1.674 1.57 2.661 2.076 3.144 1.607 6.378 2.983 9.682 4.119.165.056.334.113.505.145.174.032.35.039.527-.005.791-.198 1.225-1.269 1.524-2.194.161-.499.313-1.1.06-1.498-.116-.183-.298-.282-.474-.376-3.754-1.996-7.508-3.994-11.263-5.992-.331-.175-.676-.294-1.018-.357"
                    }
                  }),
                  _vm._v(" "),
                  _c("path", {
                    attrs: {
                      d:
                        "m100.6497 78.3408c-.193-.029-.386-.031-.577.016-.858.214-1.277 1.296-1.556 2.23-.15.503-.285 1.109.013 1.502.138.18.342.277.54.367 4.223 1.925 8.446 3.85 12.668 5.775.373.17.757.281 1.136.338 2.301.343 4.388-1.328 2.202-4.136-.779-1-1.919-1.539-3.029-2.026-3.532-1.546-7.153-2.86-10.836-3.931-.184-.053-.372-.107-.561-.135"
                    }
                  }),
                  _vm._v(" "),
                  _c("path", {
                    attrs: {
                      d:
                        "m33.9678 74.4965c-.001 0-.003-.001-.005-.002-.169-.068-.362-.031-.548.006-3.982.8-7.964 1.599-11.946 2.398-2.455.494-4.432 3.587-1.479 4.81.035.015.07.029.106.042.948.365 2.031.165 3.07-.062 3.31-.718 6.611-1.671 9.882-2.85.328-.119.671-.249.94-.534.606-.642.577-1.732.486-2.626-.048-.479-.142-1.032-.506-1.182"
                    }
                  }),
                  _vm._v(" "),
                  _c("path", {
                    attrs: {
                      d:
                        "m103.7492 49.0489c.001-.0002.0031.0005.0053.0012.1777.0403.3623-.0269.5401-.093 3.8043-1.4227 7.6087-2.8444 11.4131-4.2661 2.3453-.8779 3.8056-4.2458.6958-4.9839-.0369-.0092-.0737-.0175-.1113-.0246-.994-.2097-2.0314.1599-3.0211.5491-3.1538 1.2349-6.2614 2.7004-9.3035 4.3843-.3049.1696-.6229.3525-.8432.6766-.4963.7301-.2944 1.8017-.0625 2.6699.1235.4653.3042.9963.6874 1.0866"
                    }
                  }),
                  _vm._v(" "),
                  _c("path", {
                    attrs: {
                      d:
                        "m82.9099 98.2206c-.6534-.105-1.3619.15-1.9603.416-.4379.194-.9297.465-.9492.953-.008.224.0894.45.1857.665 2.0566 4.614 4.1132 9.228 6.1709 13.842.6615 1.486 1.95 2.614 3.0574 2.792 1.0363.168 1.9133-.498 1.9649-2.484.0332-1.256-.509-2.515-1.0627-3.715-1.7608-3.82-3.7395-7.563-5.9221-11.206-.219-.367-.454-.746-.8105-.993-.2121-.147-.4391-.232-.6741-.27"
                    }
                  }),
                  _vm._v(" "),
                  _c("path", {
                    attrs: {
                      d:
                        "m45.1419 4.0356c-1.112-.206-2.17.475-2.409 2.564-.142 1.236.298 2.434.753 3.573 1.449 3.624 3.125 7.157 5.015 10.575.19.345.394.7.733.916.155.099.321.16.496.192.688.128 1.498-.201 2.178-.534.459-.224.98-.528 1.041-1.009.028-.221-.052-.435-.13-.64-1.679-4.383-3.359-8.766-5.039-13.15-.506-1.322-1.596-2.295-2.638-2.487"
                    }
                  })
                ]),
                _vm._v(" "),
                _c("path", {
                  attrs: { d: "m0 0h115.9988v119.914h-115.9988z", fill: "none" }
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
            ? _c("label", [_vm._v("gültig bis 21. Juli 2024")])
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
                " auf bereits reduzierte Ware. Nicht mit anderen Aktionen oder Gutscheinen kombinierbar.\n            Keine Auszahlung möglich. Gültig bis 21.07.2024"
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