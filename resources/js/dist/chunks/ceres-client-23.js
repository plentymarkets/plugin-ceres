(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/common/GoogleMaps.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/common/GoogleMaps.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helper_whenConsented__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helper/whenConsented */ "./resources/js/src/app/helper/whenConsented.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");



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
    address: {
      type: String,
      required: false
    },
    lat: {
      type: Number,
      required: false
    },
    lng: {
      type: Number,
      required: false
    },
    zoom: {
      type: Number,
      default: 16
    },
    maptype: {
      type: String,
      default: "roadmap"
    },
    aspectRatio: {
      type: String,
      default: "3-1"
    }
  },
  data: function data() {
    return {
      scriptBlocked: true
    };
  },
  computed: {
    aspectClass: function aspectClass() {
      return "prop-" + this.aspectRatio;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.createScript().then(function () {
        _this.initializeMap();
      }).catch(function () {// Do nothing
      });
    });
  },
  methods: {
    createScript: function createScript() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var script = document.querySelector("script#google-maps-api");

        if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_4__["isNullOrUndefined"])(script)) {
          // script already injected...
          _this2.scriptBlocked = false;

          if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_4__["isNullOrUndefined"])(window.google)) {
            // ...but not loaded yet
            script.addEventListener("load", function () {
              return resolve(script);
            }, false);
          } else {
            // ..and fully loaded
            resolve(script);
          }
        } else {
          // script not loaded
          Object(_helper_whenConsented__WEBPACK_IMPORTED_MODULE_3__["whenConsented"])("media.googleMaps", function () {
            _this2.scriptBlocked = false;
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.id = "google-maps-api";
            script.src = "https://maps.googleapis.com/maps/api/js?key=".concat(App.config.global.googleMapsApiKey);
            script.addEventListener("load", function () {
              return resolve(script);
            }, false);
            script.addEventListener("error", function () {
              return reject(script);
            }, false);
            document.body.appendChild(script);
          }, function () {
            _this2.scriptBlocked = true;
          });
        }
      });
    },
    getCoordinates: function getCoordinates() {
      var _this3 = this;

      var isLatValid = !isNaN(this.lat) && this.lat > -90 && this.lat < 90;
      var isLngValid = !isNaN(this.lng) && this.lng > -180 && this.lng < 180;

      if (isLatValid && isLngValid) {
        return Promise.resolve({
          lat: this.lat,
          lng: this.lng
        });
      } else if (!!this.address && !!window.google) {
        return new Promise(function (resolve, reject) {
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({
            address: _this3.address
          }, function (result, status) {
            if (!!result && result.length > 0 && !!result[0].geometry) {
              resolve(result[0].geometry.location);
            } else {
              reject();
            }
          });
        });
      }

      return Promise.reject();
    },
    initializeMap: function initializeMap() {
      var _this4 = this;

      this.getCoordinates().then(function (coordinates) {
        var map = new google.maps.Map(_this4.$refs.googleMapsContainer, {
          center: coordinates,
          zoom: _this4.zoom,
          mapTypeId: _this4.maptype
        });
        new google.maps.Marker({
          map: map,
          position: coordinates
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/common/GoogleMaps.vue?vue&type=template&id=5bf88bf2&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/common/GoogleMaps.vue?vue&type=template&id=5bf88bf2& ***!
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
  return _c(
    "div",
    {
      ref: "googleMapsContainer",
      staticClass: "maps-component position-relative",
      class: _vm.aspectClass
    },
    [_vm.scriptBlocked ? _c("div", [_vm._t("default")], 2) : _vm._e()]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/common/GoogleMaps.vue":
/*!***************************************************************!*\
  !*** ./resources/js/src/app/components/common/GoogleMaps.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GoogleMaps_vue_vue_type_template_id_5bf88bf2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GoogleMaps.vue?vue&type=template&id=5bf88bf2& */ "./resources/js/src/app/components/common/GoogleMaps.vue?vue&type=template&id=5bf88bf2&");
/* harmony import */ var _GoogleMaps_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GoogleMaps.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/common/GoogleMaps.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GoogleMaps_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GoogleMaps_vue_vue_type_template_id_5bf88bf2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GoogleMaps_vue_vue_type_template_id_5bf88bf2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/common/GoogleMaps.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/common/GoogleMaps.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/src/app/components/common/GoogleMaps.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GoogleMaps_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./GoogleMaps.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/common/GoogleMaps.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GoogleMaps_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/common/GoogleMaps.vue?vue&type=template&id=5bf88bf2&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/src/app/components/common/GoogleMaps.vue?vue&type=template&id=5bf88bf2& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GoogleMaps_vue_vue_type_template_id_5bf88bf2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./GoogleMaps.vue?vue&type=template&id=5bf88bf2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/common/GoogleMaps.vue?vue&type=template&id=5bf88bf2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GoogleMaps_vue_vue_type_template_id_5bf88bf2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GoogleMaps_vue_vue_type_template_id_5bf88bf2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-client-23.js.map