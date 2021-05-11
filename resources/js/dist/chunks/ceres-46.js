(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[46],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/Popper.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/pageDesign/Popper.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var _helper_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helper/dom */ "./resources/js/src/app/helper/dom.js");
/* harmony import */ var _services_ModalService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/ModalService */ "./resources/js/src/app/services/ModalService.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    placement: {
      type: String,
      default: "auto"
    },
    trigger: {
      type: String,
      default: "click"
    },
    popoverClass: {
      type: String,
      default: ""
    },
    bodyClass: {
      type: String,
      default: ""
    },
    bodyStyle: {
      type: String,
      default: ""
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(_this.$refs.node) && !Object(_helper_utils__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(_this.$refs.handle)) {
        _this.initializePopper();
      }

      var parentModal = Object(_helper_dom__WEBPACK_IMPORTED_MODULE_1__["findParent"])(_this.$el, ".modal");

      if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(parentModal)) {
        Object(_services_ModalService__WEBPACK_IMPORTED_MODULE_2__["findModal"])(parentModal).on("hide.bs.modal", function () {
          _this.hidePopper();
        });
      }
    });
  },
  destroyed: function destroyed() {
    this.popper.destroy();
    window.removeEventListener("resize", this.eventListener);
  },
  data: function data() {
    return {
      isVisible: false,
      popper: null,
      eventListener: null
    };
  },
  computed: {
    classNames: function classNames() {
      // in the shopbuilder we need to hide the popper completely, to hide the dropzone
      var hideClass = App.isShopBuilder ? " d-none" : " hidden";
      return this.popoverClass + (!this.isVisible ? hideClass : "");
    }
  },
  methods: {
    initializePopper: function initializePopper() {
      var node = this.$refs.node;

      if (!App.isShopBuilder) {
        node.parentElement.removeChild(node);
        document.body.appendChild(node);
      }

      this.popper = new popper_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.$refs.handle.firstElementChild || this.$refs.handle, node, {
        placement: this.placement,
        modifiers: {
          arrow: {
            element: this.$refs.arrow
          }
        },
        removeOnDestroy: true
      });
      this.addEventListeners();
    },
    addEventListeners: function addEventListeners() {
      var _this2 = this;

      this.eventListener = window.addEventListener("resize", function () {
        // popper's position needs to be reset after a resize, to prevent the overflow, after switching from landscape to normal
        _this2.hidePopper();

        setTimeout(function () {
          _this2.$refs.node.style.transform = "";
        }, 0);
      });
      var handle = this.$refs.handle.firstElementChild || this.$refs.handle;

      if (this.trigger === "focus") {
        handle.addEventListener("focus", function () {
          _this2.showPopper();
        });
        handle.addEventListener("blur", function () {
          _this2.hidePopper();
        });
      } else {
        handle.addEventListener(this.trigger, function () {
          _this2.togglePopper();
        });
      }
    },
    togglePopper: function togglePopper() {
      this.isVisible = !this.isVisible;
      this.update();
    },
    showPopper: function showPopper() {
      this.isVisible = true;
      this.update();
    },
    hidePopper: function hidePopper() {
      this.isVisible = false;
      this.update();
    },
    update: function update() {
      if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(this.popper)) {
        this.popper.scheduleUpdate();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/Popper.vue?vue&type=template&id=00b0102c&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/pageDesign/Popper.vue?vue&type=template&id=00b0102c& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
    _c(
      "div",
      { ref: "handle", staticClass: "popper-handle" },
      [_vm._t("handle", [_vm._m(0)])],
      2
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        ref: "node",
        staticClass: "popover bs-popover-auto",
        class: _vm.classNames
      },
      [
        _c("h3", { staticClass: "popover-header" }, [_vm._t("title")], 2),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "popover-body",
            class: _vm.bodyClass,
            style: _vm.bodyStyle
          },
          [_vm._t("content")],
          2
        ),
        _vm._v(" "),
        _c("div", { ref: "arrow", staticClass: "arrow" })
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("button", { staticClass: "btn btn-icon btn-secondary btn-sm" }, [
      _c("i", { staticClass: "fa fa-info" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/Popper.vue":
/*!***************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/Popper.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Popper_vue_vue_type_template_id_00b0102c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popper.vue?vue&type=template&id=00b0102c& */ "./resources/js/src/app/components/pageDesign/Popper.vue?vue&type=template&id=00b0102c&");
/* harmony import */ var _Popper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Popper.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/pageDesign/Popper.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Popper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Popper_vue_vue_type_template_id_00b0102c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Popper_vue_vue_type_template_id_00b0102c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/pageDesign/Popper.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/Popper.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/Popper.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Popper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Popper.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/Popper.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Popper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/Popper.vue?vue&type=template&id=00b0102c&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/Popper.vue?vue&type=template&id=00b0102c& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Popper_vue_vue_type_template_id_00b0102c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Popper.vue?vue&type=template&id=00b0102c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/Popper.vue?vue&type=template&id=00b0102c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Popper_vue_vue_type_template_id_00b0102c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Popper_vue_vue_type_template_id_00b0102c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-46.js.map