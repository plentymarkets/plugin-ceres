exports.ids = [42];
exports.modules = {

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");







function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    consentGroups: {
      type: Object
    },
    cardClass: {
      type: String
    },
    cardStyle: {
      type: String
    }
  },
  data: function data() {
    return {
      expandedGroups: {}
    };
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_6__["mapMutations"])(["toggleConsent"])), {}, {
    isConsented: function isConsented(key, defaultValue) {
      return this.$store.getters.isConsented(key, defaultValue);
    },
    setGroupVisibility: function setGroupVisibility(groupKey, value, event) {
      event.preventDefault();
      event.stopPropagation();
      this.$set(this.expandedGroups, groupKey, value);
    }
  })
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "privacy-settings d-flex flex-column" }, [
    _vm._ssrNode(
      '<div class="privacy-settings-body overflow-auto">' +
        _vm._ssrList(_vm.consentGroups, function(consentGroup, index) {
          return (
            "<div" +
            _vm._ssrClass("card consent-group", {
              cardClass: _vm.cardClass,
              "mb-3": index < consentGroup.length - 1
            }) +
            _vm._ssrStyle(null, _vm.cardStyle, null) +
            '><div class="card-body mb-0"><p class="card-title h4 d-flex"><span class="flex-fill">' +
            (consentGroup.label.length > 0
              ? _vm._ssrEscape(
                  "\n                            " +
                    _vm._s(consentGroup.label) +
                    "\n                        "
                )
              : _vm._ssrEscape(
                  "\n                            " +
                    _vm._s(
                      _vm.$translate(
                        "Ceres::Template.privacySettingsDefaultGroup"
                      )
                    ) +
                    "\n                        "
                )) +
            _vm._ssrEscape(
              "\n                        (" +
                _vm._s(consentGroup.consents.length) +
                ")\n                    "
            ) +
            "</span> " +
            (!consentGroup.necessary
              ? '<span class="custom-control custom-switch custom-control-appearance"><input type="checkbox"' +
                _vm._ssrAttr(
                  "checked",
                  _vm.isConsented(consentGroup.key + ".*")
                ) +
                ' class="custom-control-input"> <label class="custom-control-label"></label></span>'
              : '<span class="badge badge-primary bg-appearance">' +
                _vm._ssrEscape(
                  _vm._s(
                    _vm.$translate("Ceres::Template.privacySettingsNecessary")
                  )
                ) +
                "</span>") +
            "</p> " +
            (consentGroup.description.length > 0
              ? '<p class="card-text">' +
                _vm._ssrEscape(_vm._s(consentGroup.description)) +
                "</p>"
              : "<!---->") +
            '</div> <div class="card-body mt-0">' +
            (_vm.expandedGroups[consentGroup.key]
              ? "<div>" +
                _vm._ssrList(consentGroup.consents, function(consent) {
                  return (
                    "<div" +
                    _vm._ssrClass("card consent bg-light mb-3", {
                      "border-primary border-appearance active":
                        _vm.isConsented(consentGroup.key + "." + consent.key) ||
                        consent.necessary ||
                        consentGroup.necessary
                    }) +
                    '><div class="card-body"><p class="d-flex mb-0 font-weight-bold"><span class="flex-fill">' +
                    _vm._ssrEscape(_vm._s(consent.label)) +
                    "</span> " +
                    (!consentGroup.necessary && !consent.necessary
                      ? '<span class="custom-control custom-switch custom-control-appearance"><input type="checkbox"' +
                        _vm._ssrAttr(
                          "checked",
                          _vm.isConsented(consentGroup.key + "." + consent.key)
                        ) +
                        ' class="custom-control-input"> <label class="custom-control-label"></label></span>'
                      : "<!---->") +
                    "</p></div> " +
                    (consent.provider.length > 0 ||
                    consent.description.length > 0 ||
                    consent.policyUrl.length > 0 ||
                    consent.lifespan.length > 0
                      ? '<table class="table table-responsive-md table-sm table-striped mb-0"><tbody>' +
                        (consent.provider.length > 0
                          ? '<tr><td class="pl-3">' +
                            _vm._ssrEscape(
                              _vm._s(
                                _vm.$translate(
                                  "Ceres::Template.privacySettingsProvider"
                                )
                              )
                            ) +
                            '</td> <td class="pr-3">' +
                            _vm._ssrEscape(_vm._s(consent.provider)) +
                            "</td></tr>"
                          : "<!---->") +
                        " " +
                        (consent.description.length > 0
                          ? '<tr><td class="pl-3">' +
                            _vm._ssrEscape(
                              _vm._s(
                                _vm.$translate(
                                  "Ceres::Template.privacySettingsDescription"
                                )
                              )
                            ) +
                            '</td> <td class="pr-3">' +
                            _vm._ssrEscape(_vm._s(consent.description)) +
                            "</td></tr>"
                          : "<!---->") +
                        " " +
                        (consent.policyUrl.length > 0
                          ? '<tr><td class="pl-3">' +
                            _vm._ssrEscape(
                              _vm._s(
                                _vm.$translate(
                                  "Ceres::Template.privacySettingsPolicyUrl"
                                )
                              )
                            ) +
                            '</td> <td class="pr-3"><a' +
                            _vm._ssrAttr("href", consent.policyUrl) +
                            ' target="_blank" class="text-primary text-appearance">' +
                            _vm._ssrEscape(_vm._s(consent.policyUrl)) +
                            "</a></td></tr>"
                          : "<!---->") +
                        " " +
                        (consent.lifespan.length > 0
                          ? '<tr><td class="pl-3">' +
                            _vm._ssrEscape(
                              _vm._s(
                                _vm.$translate(
                                  "Ceres::Template.privacySettingsLifespan"
                                )
                              )
                            ) +
                            '</td> <td class="pr-3">' +
                            _vm._ssrEscape(_vm._s(consent.lifespan)) +
                            "</td></tr>"
                          : "<!---->") +
                        "</tbody></table>"
                      : "<!---->") +
                    "</div>"
                  )
                }) +
                "</div>"
              : "<!---->") +
            " " +
            (!_vm.expandedGroups[consentGroup.key]
              ? '<a href="#" data-testing="privacy-settings-show-more-information" class="card-link text-primary text-appearance">' +
                _vm._ssrEscape(
                  "\n                    " +
                    _vm._s(
                      _vm.$translate(
                        "Ceres::Template.privacySettingsMoreInformation"
                      )
                    ) +
                    "\n                "
                ) +
                "</a>"
              : '<a href="#" data-testing="privacy-settings-hide-more-information" class="card-link text-primary text-appearance">' +
                _vm._ssrEscape(
                  ">\n                    " +
                    _vm._s(
                      _vm.$translate(
                        "Ceres::Template.privacySettingsLessInformation"
                      )
                    ) +
                    "\n                "
                ) +
                "</a>") +
            "</div></div>"
          )
        }) +
        "</div>"
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue":
/*!************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/PrivacySettings.vue ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrivacySettings.vue?vue&type=template&id=28a6037b& */ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b&");
/* harmony import */ var _PrivacySettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PrivacySettings.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PrivacySettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  "2327ef84"
  
)

component.options.__file = "resources/js/src/app/components/pageDesign/PrivacySettings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./PrivacySettings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./PrivacySettings.vue?vue&type=template&id=28a6037b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

};;
//# sourceMappingURL=ceres-server-42.js.map