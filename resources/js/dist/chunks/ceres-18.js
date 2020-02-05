(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/common/TabItem.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/common/TabItem.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "tab-item",
  render: function render(createElement) {
    return createElement("div", {
      staticClass: "tab-pane",
      class: {
        active: this.localActive
      },
      attrs: {
        role: "tabpanel"
      }
    }, [this.$slots.default]);
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    dataBuilderClickable: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      localActive: this.active
    };
  },
  methods: {
    setActive: function setActive(isActive) {
      this.localActive = isActive;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/common/TabList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/common/TabList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.join */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.some */ "./node_modules/core-js/modules/es.array.some.js");
/* harmony import */ var core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.trim */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var _TabItem_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TabItem.vue */ "./resources/js/src/app/components/common/TabItem.vue");









var TabNavItem = {
  name: "tab-nav-item",
  render: function render(createElement) {
    var _this = this;

    var anchorAttrs = {
      role: "tab",
      href: ""
    };

    if (this.tab.dataBuilderClickable) {
      anchorAttrs["data-builder-clickable"] = "";
    }

    var anchor = createElement("a", {
      staticClass: "nav-link text-appearance",
      class: {
        active: this.tab.localActive
      },
      attrs: anchorAttrs,
      on: {
        click: function click(evt) {
          evt.preventDefault();

          _this.$emit("click", evt);
        }
      }
    }, [this.tab.$slots.title || this.tab.title]);
    return createElement("li", {
      staticClass: "nav-item"
    }, [anchor]);
  },
  props: {
    tab: {
      type: Object,
      default: null
    },
    tabIndex: {
      type: Number,
      default: null
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "tab-list",
  components: {
    TabItem: _TabItem_vue__WEBPACK_IMPORTED_MODULE_8__["default"]
  },
  render: function render(createElement) {
    var _this2 = this;

    var tabListElements = [];
    var tabs = this.getVisibleTabs();

    if (tabs.length > 0) {
      var navElements = tabs.map(function (tab, index) {
        return createElement(TabNavItem, {
          props: {
            tab: tab,
            tabIndex: index
          },
          on: {
            click: function click(evt) {
              if (!tab.localActive) {
                _this2.activateTab(tab, evt);
              }
            }
          }
        });
      });
      var nav = createElement("ul", {
        staticClass: "nav nav-tabs",
        class: ["widget-" + this.appearance],
        attrs: {
          role: "tablist"
        }
      }, [navElements]);
      tabListElements.push(nav);
    }

    var content = createElement("div", {
      staticClass: "tab-content"
    }, [this.$slots.default.filter(function (tab) {
      return !!tab.componentOptions;
    })]);
    tabListElements.push(content);
    return createElement("div", {}, tabListElements);
  },
  props: {
    appearance: {
      type: String,
      default: "none"
    },
    renderEmpty: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      tabComponents: [],
      tabsHash: ""
    };
  },
  created: function created() {
    var _this3 = this;

    this.$nextTick(function () {
      // get all child tab components
      _this3.tabComponents = (_this3.$slots.default || []).map(function (vnode) {
        return vnode.componentInstance;
      }).filter(function (entry) {
        return !!entry;
      });
    });
  },
  updated: function updated() {
    var tabs = this.getVisibleTabs();
    var hash = tabs.map(function (component) {
      return component._uid;
    }).join("_"); // need to check if visible tabs have been changed after rendering

    if (this.tabsHash !== hash) {
      // visible tabs changed => need to re-render component
      this.tabsHash = hash;
      this.$forceUpdate(); // check for active tab

      if (!tabs.some(function (tab) {
        return tab.active;
      }) && tabs.length > 0) {
        this.activateTab(tabs[0]);
      }
    }
  },
  methods: {
    getVisibleTabs: function getVisibleTabs() {
      var _this4 = this;

      // filter visible tabs
      var tabs = this.tabComponents.filter(function (tab) {
        return Object(_helper_utils__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(tab) && Object(_helper_utils__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(tab.$slots.default) && (_this4.renderEmpty || _this4.filterContent(tab));
      });
      return tabs;
    },
    activateTab: function activateTab(tab) {
      var activeTab = this.tabComponents.find(function (tab) {
        return tab.localActive;
      });
      tab.setActive(true);

      if (activeTab && activeTab.setActive && tab !== activeTab) {
        activeTab.setActive(false);
      }
    },

    /**
     * Checks if tab content contains text or img or iframe element.
     * @param {*} tab
     */
    filterContent: function filterContent(tab) {
      return tab.$el.textContent.trim().length > 0 || tab.$el.querySelector("img, iframe");
    }
  }
});

/***/ }),

/***/ "./resources/js/src/app/components/common/TabItem.vue":
/*!************************************************************!*\
  !*** ./resources/js/src/app/components/common/TabItem.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TabItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TabItem.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/common/TabItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _TabItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/common/TabItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/common/TabItem.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/src/app/components/common/TabItem.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TabItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./TabItem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/common/TabItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TabItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/common/TabList.vue":
/*!************************************************************!*\
  !*** ./resources/js/src/app/components/common/TabList.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TabList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TabList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/common/TabList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _TabList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/common/TabList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/common/TabList.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/src/app/components/common/TabList.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TabList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./TabList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/common/TabList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TabList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ })

}]);
//# sourceMappingURL=ceres-18.js.map