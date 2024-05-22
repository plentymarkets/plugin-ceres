(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/BKAvailability.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/BKAvailability.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var feiertagejs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! feiertagejs */ "./node_modules/feiertagejs/build/feiertage.js");



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "biokinder-availability",
  data: function data() {
    return {
      txt1to3Days: this.$translate("biokinderDesign::Template.availabilityDisplayTxt1to3Days"),
      txt3to5Days: this.$translate("biokinderDesign::Template.availabilityDisplayTxt3to5Days"),
      txt5to8Days: this.$translate("biokinderDesign::Template.availabilityDisplayTxt5to8Days"),
      txt1to2Weeks: this.$translate("biokinderDesign::Template.availabilityDisplayTxt1to2Weeks"),
      txt2to4Weeks: this.$translate("biokinderDesign::Template.availabilityDisplayTxt2to4Weeks"),
      txt4to6Weeks: this.$translate("biokinderDesign::Template.availabilityDisplayTxt4to6Weeks"),
      txt6to8Weeks: this.$translate("biokinderDesign::Template.availabilityDisplayTxt6to8Weeks"),
      txt8to10Weeks: this.$translate("biokinderDesign::Template.availabilityDisplayTxt8to10Weeks"),
      txtDefaultDelivery: this.$translate("biokinderDesign::Template.availabilityDisplayTxtDefaultDelivery"),
      txtShipsToday: this.$translate("biokinderDesign::Template.availabilityDisplayTxtShipsToday"),
      txtChristmasHint: "<span class='christmas'><i class='fa fa-gift' aria-hidden='true'></i> Pünktlich zu Weihnachten!</span>",
      txtEasterHint: "<span class='easter'><i class='fa fa-gift' aria-hidden='true'></i> Pünktlich zu Ostern!</span>",
      txtShipsTomorrow: this.$translate("biokinderDesign::Template.availabilityDisplayTxtShipsTomorrow"),
      txtShipsMondays: this.$translate("biokinderDesign::Template.availabilityDisplayTxtShipsMondays"),
      // txtFrightShipsFriday: this.$translate("biokinderDesign::Template.availabilityDisplayTxtFrightShipsFriday"),
      txtFrightShipsTomorow: this.$translate("biokinderDesign::Template.availabilityDisplayTxtFrightShipsTomorow"),
      txtFrightNextFriday: this.$translate("biokinderDesign::Template.availabilityDisplayTxtFrightNextFriday"),
      isLoading: true,
      requestLoading: false
    };
  },
  props: {
    variation: {
      type: Object
    },
    avd: {
      type: Object
    },
    short: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    requestAvailabilityData: function requestAvailabilityData() {
      var _this = this;

      this.isLoading = true; // Already requested this variation

      if (this.$store.erid.some(function (e) {
        if (e && e.id == _this.variation.id) return true;
      })) {
        this.isLoading = false;
        return;
      }

      if (this.variation.availabilityId == 1) {
        var avd = {
          'id': variationId,
          'd': 0
        };
        this.$store.erid.push(avd);
        this.isLoading = false;
        return;
      }

      var variationId = this.variation.id;

      if (this.variation.availabilityId != 1 && !this.requestLoading) {
        this.requestLoading = true;
        $.ajax({
          method: 'GET',
          context: this,
          url: 'availabilities/' + variationId + '/',
          success: function success(intDays) {
            var avd = {
              'id': variationId,
              'd': intDays
            };
            this.$store.erid.push(avd);
            this.requestLoading = false;
            this.isLoading = false;
          }
        });
      }
    }
  },
  computed: {
    availabilityDisplay: function availabilityDisplay() {
      var _this2 = this;

      // availability != 1
      if (this.isLoading) return "...";

      if (this.variation.availability.id > 1) {
        var tage = this.$store.erid.find(function (e) {
          if (e && e.id == _this2.variation.id) return e;
        }).d; // days not set properly

        if (999 == tage || null == tage || 0 == tage || 5 != this.variation.availability.id) return this.variation.availability.names.name;

        switch (!0) {
          case tage < 3:
            return this.txt1to3Days;

          case tage < 6:
            return this.txt3to5Days;

          case tage < 11:
            return this.txt5to8Days;

          case tage < 14:
            return this.txt1to2Weeks;

          case tage < 28:
            return this.txt2to4Weeks;

          case tage < 42:
            return this.txt4to6Weeks;

          case tage < 56:
          case tage < 70:
            return this.txt6to8Weeks;

          default:
            return this.txtDefaultDelivery;
        }
      } // availability = 1
      // if (this.avd.isSped) {
      //     // today is friday before 10 and no holiday, ships today!
      //     if(currentWeekDay == 5 && !isHoliday(dateTodayNow, "HE") && dateTodayNow.getHours() < 10)
      //          return this.txtShipsToday;
      //    
      //     
      //     if (isHoliday(dateTodayNow, "HE"))
      //         return this.variation.availability.names.name;
      //     if(dateTodayNow.getHours() < 16)
      //         return this.txtShipsToday; 
      //     var nextFriday = new Date(this.avd.time.now * 1000);
      //     var add = 0;
      //     if (dateTodayNow.getDay() == 5)
      //         var add = 7;
      //      nextFriday.setDate(dateTodayNow.getDate() + ((5 + 7 - dateTodayNow.getDay()) % 7) + add);
      //     // today is friday after 10, or not friday or friday + holiday 
      //     // next friday is (also) a holiday 
      //     // lost -> show default value
      //     if (isHoliday(nextFriday, "HE"))
      //         return this.variation.availability.names.name;
      //     // we now know, next friday is not a holiday
      //     // we also know, it's thursday
      //     // so we will ship tomorrow
      //     if(currentWeekDay == 4)
      //         return this.txtFrightShipsTomorow;
      //     // today is not friday or its friday and too late 
      //     // it is also not thursday
      //     // next friday, shipping is possible. so output that.
      //     return this.txtFrightNextFriday;
      // }
      // product is available
      // product is not freight
      // check for holiday on monday
      // check for holidays


      var dateTodayNow = new Date(1000 * this.avd.time.now);
      var dateTomorrow = new Date(1000 * this.avd.time.now + 86400000);
      var currentWeekDay = new Date(1000 * this.avd.time.now).getDay();
      var daysUntilMonday = 8 - currentWeekDay % 7; // 8 - 5 % 7 = 3 --> friday + 3 days =) monday

      var timestampMonday = 1000 * this.avd.time.now + 86400000 * daysUntilMonday;
      var dateMonday = new Date(timestampMonday);
      var mondayIsHoliday = Object(feiertagejs__WEBPACK_IMPORTED_MODULE_3__["isHoliday"])(dateMonday, "HE"); // <<--

      if (this.avd.time.now < this.avd.time.until && currentWeekDay > 0 && currentWeekDay <= 5 && !Object(feiertagejs__WEBPACK_IMPORTED_MODULE_3__["isHoliday"])(dateTodayNow, "HE")) // mo - fr, 0 - ~14h
        return this.txtShipsToday;
      if (this.avd.time.now > this.avd.time.until && currentWeekDay > 0 && currentWeekDay <= 4 && !Object(feiertagejs__WEBPACK_IMPORTED_MODULE_3__["isHoliday"])(dateTomorrow, "HE")) // mo - do, 14 - 0
        return this.txtShipsTomorrow; // Friday afternoon, saturday, sunday 00:00 - 23:59 -> ships on monday

      if ([5, 6, 0].includes(currentWeekDay) && !mondayIsHoliday) return this.txtShipsMondays; // if we forgot any case, default

      console.info("BKAvailability", "default");
      return this.variation.availability.names.name;
    },
    avDisplayHoliday: function avDisplayHoliday() {
      // Not available today, show default message
      if (this.txtShipsToday != this.availabilityDisplay && this.txtShipsTomorrow != this.availabilityDisplay && this.txtShipsMondays != this.availabilityDisplay) {
        return this.availabilityDisplay;
      } // let dateTodayNow = new Date(1000 * this.avd.time.now);
      // const currentDayOfYear = Math.floor((dateTodayNow - new Date(dateTodayNow.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
      // 
      // Easter
      // if (dateTodayNow.getFullYear() == 2024 && currentDayOfYear < 87)
      // return "<span>" + this.availabilityDisplay + "</span>" + this.txtEasterHint;
      // INFO Button for Freight-Goods to explain "Ships today" via Modal


      if (this.avd.isSped && !this.short) {
        var infoHint = '<svg data-toggle="modal" data-target="#freightInfo" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
        return "<span>" + this.availabilityDisplay + "</span>" + infoHint;
      }

      return this.availabilityDisplay;
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick(function () {
      if (_this3.$store.erid === undefined) _this3.$store.erid = [];

      _this3.requestAvailabilityData();
    });
  },
  watch: {
    variation: function variation() {
      this.requestAvailabilityData();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/BKAvailability.vue?vue&type=template&id=b40fd004&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/BKAvailability.vue?vue&type=template&id=b40fd004& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { class: { row: !_vm.short } }, [
    _c(
      "div",
      {
        class: {
          "col-12 d-flex align-items-center": !_vm.short,
          liveShippingInfo: _vm.short
        }
      },
      [
        _c("span", {
          staticClass: "availabilityText sofortLieferbar",
          class: { bkIcon: !_vm.short },
          domProps: { innerHTML: _vm._s(_vm.avDisplayHoliday) }
        })
      ]
    ),
    _vm._v(" "),
    !_vm.short
      ? _c(
          "div",
          {
            staticClass: "modal fade",
            attrs: {
              id: "freightInfo",
              tabindex: "-1",
              role: "dialog",
              "aria-labelledby": "freightInfoToggle",
              "aria-hidden": "true"
            }
          },
          [_vm._m(0)]
        )
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "modal-dialog", attrs: { role: "document" } },
      [
        _c("div", { staticClass: "modal-content" }, [
          _c("div", { staticClass: "modal-body d-flex flex-column" }, [
            _c("h3", { staticClass: "mb-2" }, [
              _vm._v("Lieferung per Spedition")
            ]),
            _vm._v(" "),
            _c("p", [
              _vm._v(
                "Das Produkt ist auf Lager und wird umgehend für den Versand vorbereitet. \n                        Die Spedition wird sich in den nächsten Tagen mit Ihnen in Verbindung setzen,\n                        um einen Liefertermin zu vereinbaren."
              )
            ]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-bkm btn-sm ml-auto mt-2",
                attrs: { type: "button", "data-dismiss": "modal" }
              },
              [_vm._v("Schließen")]
            )
          ])
        ])
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/BKAvailability.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/src/app/components/item/BKAvailability.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BKAvailability_vue_vue_type_template_id_b40fd004___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BKAvailability.vue?vue&type=template&id=b40fd004& */ "./resources/js/src/app/components/item/BKAvailability.vue?vue&type=template&id=b40fd004&");
/* harmony import */ var _BKAvailability_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BKAvailability.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/BKAvailability.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BKAvailability_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BKAvailability_vue_vue_type_template_id_b40fd004___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BKAvailability_vue_vue_type_template_id_b40fd004___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/BKAvailability.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/BKAvailability.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/BKAvailability.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BKAvailability_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./BKAvailability.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/BKAvailability.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BKAvailability_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/BKAvailability.vue?vue&type=template&id=b40fd004&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/BKAvailability.vue?vue&type=template&id=b40fd004& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BKAvailability_vue_vue_type_template_id_b40fd004___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./BKAvailability.vue?vue&type=template&id=b40fd004& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/BKAvailability.vue?vue&type=template&id=b40fd004&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BKAvailability_vue_vue_type_template_id_b40fd004___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BKAvailability_vue_vue_type_template_id_b40fd004___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-31.js.map