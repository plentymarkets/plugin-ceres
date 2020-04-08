(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[29],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EditCouponOverlay.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/EditCouponOverlay.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_NotificationService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var ModalService = __webpack_require__(/*! ../../services/ModalService */ "./resources/js/src/app/services/ModalService.js");

var ApiService = __webpack_require__(/*! ../../services/ApiService */ "./resources/js/src/app/services/ApiService.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    orderItem: Object,
    paymentStatus: {
      type: String,
      default: "unpaid"
    },
    orderAccessKey: {
      type: String,
      default: ""
    }
  },
  data: function data() {
    return {
      couponData: [],
      isFinalized: this.orderItem.giftCard.hasPdf,
      isLoading: false
    };
  },
  computed: {
    pdfLink: function pdfLink() {
      var pdfLink = '/rest/online_store/gift_card/download_pdf/?orderId=' + this.orderItem.orderId + '&orderItemId=' + this.orderItem.id;

      if (this.orderAccessKey) {
        pdfLink += '&accessKey=' + this.orderAccessKey;
      }

      return pdfLink;
    },
    isPaid: function isPaid() {
      return this.paymentStatus === ("fullyPaid" || false);
    }
  },
  created: function created() {
    for (var i = 0; i < this.orderItem.quantity; i++) {
      this.couponData.push({
        sender: this.orderItem.giftCard.information[i].sender,
        recipient: this.orderItem.giftCard.information[i].recipient,
        content: this.orderItem.giftCard.information[i].content,
        campaignCodeOrderId: this.orderItem.giftCard.information[i].id,
        accessKey: this.orderAccessKey
      });
    }
  },
  methods: {
    submit: function submit() {
      var _this = this;

      if (this.isFinalized) {
        return;
      }

      this.isLoading = true;
      ApiService.put("/rest/online_store/gift_card/information", {
        giftCardInformation: this.couponData
      }).done(function (response) {
        _services_NotificationService__WEBPACK_IMPORTED_MODULE_0__["default"].success(_this.$translate("Ceres::Template.couponChangeSuccess"));

        _this.closeModal();
      }).fail(function () {
        _services_NotificationService__WEBPACK_IMPORTED_MODULE_0__["default"].error(_this.$translate("Ceres::Template.couponChangeFailure")).closeAfter(10000);
      }).always(function () {
        _this.isLoading = false;
      });
    },
    finalize: function finalize() {
      var _this2 = this;

      if (!this.isPaid) {
        return;
      }

      this.isLoading = true;
      ApiService.post("/rest/online_store/gift_card/generate_pdf", {
        orderId: this.orderItem.orderId,
        orderItemId: this.orderItem.id,
        accessKey: this.orderAccessKey
      }) // Route and Params missing
      .done(function (response) {
        _services_NotificationService__WEBPACK_IMPORTED_MODULE_0__["default"].success(_this2.$translate("Ceres::Template.couponFinalizeSuccess"));
        _this2.isFinalized = true;
      }).fail(function () {
        _services_NotificationService__WEBPACK_IMPORTED_MODULE_0__["default"].error(_this2.$translate("Ceres::Template.couponFinalizeFailure")).closeAfter(10000);
      }).always(function () {
        _this2.isLoading = false;
      });
    },
    download: function download() {
      var _this3 = this;

      this.isLoading = true;
      ApiService.get("/rest/online_store/gift_card/download_pdf", {
        orderId: this.orderItem.orderId,
        orderItemId: this.orderItem.id,
        accessKey: this.orderAccessKey
      }) // Route and Params missing
      .done(function (response) {
        _services_NotificationService__WEBPACK_IMPORTED_MODULE_0__["default"].success(_this3.$translate("Ceres::Template.couponFinalizeSuccess"));
      }).fail(function () {
        _services_NotificationService__WEBPACK_IMPORTED_MODULE_0__["default"].error(_this3.$translate("Ceres::Template.couponFinalizeFailure")).closeAfter(10000);
      }).always(function () {
        _this3.isLoading = false;
      });
    },
    closeModal: function closeModal() {
      ModalService.findModal(this.$refs.editCouponOverlay).hide();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EditCouponOverlay.vue?vue&type=template&id=e7dbc914&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/EditCouponOverlay.vue?vue&type=template&id=e7dbc914& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-12 col-sm-6 mb-2" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-primary btn-appearance btn-block",
            attrs: {
              type: "button",
              "data-toggle": "modal",
              "data-target": "#edit-coupon-overlay"
            }
          },
          [
            _c("span", [
              _vm._v(_vm._s(_vm.$translate("Ceres::Template.couponEdit")))
            ]),
            _vm._v(" "),
            _c("i", {
              staticClass: "fa fa-gift default-float",
              attrs: { "aria-hidden": "true" }
            })
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-12 col-sm-6 mb-2" }, [
        !_vm.isFinalized
          ? _c(
              "button",
              {
                directives: [
                  {
                    name: "tooltip",
                    rawName: "v-tooltip",
                    value: !_vm.isPaid,
                    expression: "!isPaid"
                  }
                ],
                staticClass: "btn btn-success btn-block",
                class: { disabled: _vm.isLoading || !_vm.isPaid },
                attrs: {
                  type: "button",
                  "data-placement": "top",
                  title: _vm.$translate("Ceres::Template.couponNotPaid")
                },
                on: {
                  click: function($event) {
                    return _vm.finalize()
                  }
                }
              },
              [
                _c("span", [
                  _vm._v(
                    _vm._s(_vm.$translate("Ceres::Template.couponFinalize"))
                  )
                ]),
                _vm._v(" "),
                _c("icon", {
                  staticClass: "default-float",
                  attrs: { icon: "check", loading: _vm.isLoading }
                })
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.isFinalized && _vm.isPaid
          ? _c(
              "a",
              {
                staticClass: "btn btn-primary btn-appearance btn-block",
                attrs: {
                  href: _vm.pdfLink,
                  target: "_blank",
                  title: "$translate('Ceres::Template.couponDownload')"
                }
              },
              [
                _c("span", [
                  _vm._v(
                    _vm._s(_vm.$translate("Ceres::Template.couponDownload"))
                  )
                ]),
                _vm._v(" "),
                _c("i", {
                  staticClass: "fa fa-download default-float",
                  attrs: { "aria-hidden": "true" }
                })
              ]
            )
          : _vm._e()
      ])
    ]),
    _vm._v(" "),
    _c(
      "form",
      {
        attrs: { method: "post" },
        on: {
          submit: function($event) {
            $event.preventDefault()
            return _vm.submit()
          }
        }
      },
      [
        _c(
          "div",
          {
            ref: "editCouponOverlay",
            staticClass: "modal fade",
            attrs: { id: "edit-coupon-overlay", tabindex: "-1", role: "dialog" }
          },
          [
            _c(
              "div",
              {
                staticClass:
                  "modal-dialog modal-lg mx-auto modal-dialog-scrollable",
                attrs: { role: "document" }
              },
              [
                _c("div", { staticClass: "modal-content" }, [
                  _c("div", { staticClass: "modal-header" }, [
                    _c("div", { staticClass: "modal-title h4" }, [
                      _vm._v(
                        _vm._s(_vm.$translate("Ceres::Template.couponEdit"))
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "close",
                        attrs: {
                          type: "button",
                          "data-dismiss": "modal",
                          "aria-label": "Close"
                        },
                        on: {
                          click: function($event) {
                            return _vm.closeModal()
                          }
                        }
                      },
                      [
                        _c("span", { attrs: { "aria-hidden": "true" } }, [
                          _vm._v("×")
                        ])
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "modal-body overflow-x-hidden modal-multi-row"
                    },
                    [
                      _vm._l(_vm.couponData, function(coupon) {
                        return [
                          _c("div", { staticClass: "row" }, [
                            _c("div", { staticClass: "col-12 h5" }, [
                              _vm._v("Gutschein")
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-6" }, [
                              _c("div", { staticClass: "input-unit" }, [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "tooltip",
                                      rawName: "v-tooltip",
                                      value: _vm.isFinalized,
                                      expression: "isFinalized"
                                    },
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: coupon.sender,
                                      expression: "coupon.sender"
                                    }
                                  ],
                                  class: {
                                    disabled: _vm.isLoading || _vm.isFinalized
                                  },
                                  attrs: {
                                    readonly: _vm.isFinalized,
                                    "data-placement": "top",
                                    title: _vm.$translate(
                                      "Ceres::Template.couponAlreadyFinalized"
                                    ),
                                    type: "text",
                                    name: "sender",
                                    autocomplete: "off",
                                    "data-validate": "text",
                                    "data-autofocus": ""
                                  },
                                  domProps: { value: coupon.sender },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        coupon,
                                        "sender",
                                        $event.target.value
                                      )
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("label", { attrs: { for: "sender" } }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.couponSender"
                                      )
                                    ) + "*"
                                  )
                                ])
                              ])
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-6" }, [
                              _c("div", { staticClass: "input-unit" }, [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "tooltip",
                                      rawName: "v-tooltip",
                                      value: _vm.isFinalized,
                                      expression: "isFinalized"
                                    },
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: coupon.recipient,
                                      expression: "coupon.recipient"
                                    }
                                  ],
                                  class: {
                                    disabled: _vm.isLoading || _vm.isFinalized
                                  },
                                  attrs: {
                                    readonly: _vm.isFinalized,
                                    "data-placement": "top",
                                    title: _vm.$translate(
                                      "Ceres::Template.couponAlreadyFinalized"
                                    ),
                                    type: "text",
                                    name: "recipient",
                                    autocomplete: "off",
                                    "data-validate": "text"
                                  },
                                  domProps: { value: coupon.recipient },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        coupon,
                                        "recipient",
                                        $event.target.value
                                      )
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("label", { attrs: { for: "recipient" } }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.couponRecipient"
                                      )
                                    ) + "*"
                                  )
                                ])
                              ])
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-12" }, [
                              _c("div", { staticClass: "input-unit" }, [
                                _c("textarea", {
                                  directives: [
                                    {
                                      name: "tooltip",
                                      rawName: "v-tooltip",
                                      value: _vm.isFinalized,
                                      expression: "isFinalized"
                                    },
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: coupon.content,
                                      expression: "coupon.content"
                                    }
                                  ],
                                  class: {
                                    disabled: _vm.isLoading || _vm.isFinalized
                                  },
                                  attrs: {
                                    readonly: _vm.isFinalized,
                                    "data-placement": "top",
                                    title: _vm.$translate(
                                      "Ceres::Template.couponAlreadyFinalized"
                                    ),
                                    name: "content",
                                    rows: "3",
                                    autocomplete: "off"
                                  },
                                  domProps: { value: coupon.content },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        coupon,
                                        "content",
                                        $event.target.value
                                      )
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("label", { attrs: { for: "content" } }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.couponContent"
                                      )
                                    )
                                  )
                                ])
                              ])
                            ])
                          ])
                        ]
                      })
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "modal-footer" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-danger",
                        attrs: {
                          type: "reset",
                          disabled: _vm.isLoading,
                          "data-dismiss": "modal",
                          "aria-label": "Close"
                        },
                        on: {
                          click: function($event) {
                            return _vm.closeModal()
                          }
                        }
                      },
                      [
                        _c("span", [
                          _vm._v(
                            _vm._s(
                              _vm.$translate("Ceres::Template.couponCancel")
                            )
                          )
                        ]),
                        _vm._v(" "),
                        _c("i", {
                          staticClass: "fa fa-times default-float",
                          attrs: { "aria-hidden": "true" }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        directives: [
                          {
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: _vm.isFinalized,
                            expression: "isFinalized"
                          }
                        ],
                        staticClass: "btn btn-primary",
                        class: { disabled: _vm.isLoading || _vm.isFinalized },
                        attrs: {
                          type: "submit",
                          "data-placement": "top",
                          title: _vm.$translate(
                            "Ceres::Template.couponAlreadyFinalized"
                          )
                        }
                      },
                      [
                        _c("span", [
                          _vm._v(
                            _vm._s(_vm.$translate("Ceres::Template.couponSave"))
                          )
                        ]),
                        _vm._v(" "),
                        _c("icon", {
                          staticClass: "default-float",
                          attrs: { icon: "floppy-o", loading: _vm.isLoading }
                        })
                      ],
                      1
                    )
                  ])
                ])
              ]
            )
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/EditCouponOverlay.vue":
/*!********************************************************************!*\
  !*** ./resources/js/src/app/components/item/EditCouponOverlay.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditCouponOverlay_vue_vue_type_template_id_e7dbc914___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditCouponOverlay.vue?vue&type=template&id=e7dbc914& */ "./resources/js/src/app/components/item/EditCouponOverlay.vue?vue&type=template&id=e7dbc914&");
/* harmony import */ var _EditCouponOverlay_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditCouponOverlay.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/EditCouponOverlay.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditCouponOverlay_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditCouponOverlay_vue_vue_type_template_id_e7dbc914___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditCouponOverlay_vue_vue_type_template_id_e7dbc914___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/EditCouponOverlay.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/EditCouponOverlay.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/EditCouponOverlay.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCouponOverlay_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EditCouponOverlay.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EditCouponOverlay.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCouponOverlay_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/EditCouponOverlay.vue?vue&type=template&id=e7dbc914&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/EditCouponOverlay.vue?vue&type=template&id=e7dbc914& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCouponOverlay_vue_vue_type_template_id_e7dbc914___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EditCouponOverlay.vue?vue&type=template&id=e7dbc914& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EditCouponOverlay.vue?vue&type=template&id=e7dbc914&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCouponOverlay_vue_vue_type_template_id_e7dbc914___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCouponOverlay_vue_vue_type_template_id_e7dbc914___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-29.js.map