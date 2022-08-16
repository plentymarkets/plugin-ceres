"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[43],{

/***/ "./resources/js/src/app/components/item/VariationSelect.vue":
/*!******************************************************************!*\
  !*** ./resources/js/src/app/components/item/VariationSelect.vue ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VariationSelect_vue_vue_type_template_id_4a939d05___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VariationSelect.vue?vue&type=template&id=4a939d05& */ "./resources/js/src/app/components/item/VariationSelect.vue?vue&type=template&id=4a939d05&");
/* harmony import */ var _VariationSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VariationSelect.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/VariationSelect.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VariationSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VariationSelect_vue_vue_type_template_id_4a939d05___WEBPACK_IMPORTED_MODULE_0__.render,
  _VariationSelect_vue_vue_type_template_id_4a939d05___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/VariationSelect.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/VariationSelect.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/VariationSelect.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/dom */ "./resources/js/src/app/helper/dom.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

    name: "variation-select",

    props: {
        forceContent:
        {
            type: Boolean,
            default: false
        }
    },

    inject: {
        itemId: {
            default: null
        }
    },

    data()
    {
        return {
            filteredVariationsCache: {},
            lastContentCount: 0
        };
    },

    mounted()
    {
        // initially check for valid selection and disable add to basket button
        this.$store.commit(`${this.itemId}/variationSelect/setIsVariationSelected`, !!this.currentSelection);
    },

    computed:
    {
        currentVariation() {
            return this.$store.getters[`${this.itemId}/currentItemVariation`];
        },

        currentVariationSelect() {
            return this.$store.state.items[this.itemId] && this.$store.state.items[this.itemId].variationSelect;
        },

        /**
         * returns true if any variation has no attributes
         */
        hasEmptyOption()
        {
            return this.variations.some(variation => !variation.attributes.length);
        },

        addPleaseSelectOption()
        {
            return App.config.item.showPleaseSelect;
        },

        /**
         * returns the variation, based on the selected attributes / unit
         * returns false if there are none or multiple results
         */
        currentSelection()
        {
            const filteredVariations = this.filterVariations(null, null, true);

            if (filteredVariations.length === 1)
            {
                return filteredVariations[0];
            }

            return false;
        },

        /**
         * returns all units, selectable by current selection
         * prop 'forceContent' with value true will return all units, without filtering
         */
        possibleUnits()
        {
            // use an object, to make the entries unique
            const possibleUnits = {};
            const variations = this.forceContent ? this.variations : this.filterVariations(null, null, null, true);

            for (const variation of variations)
            {
                possibleUnits[variation.unitCombinationId] = variation.unitName;
            }

            return possibleUnits;
        },

        possibleUnitCombinationIds()
        {
            return this.transformPossibleUnits(this.possibleUnits).map(value => value[0]);
        },

        isContentVisible()
        {
            return !this.forceContent && !!this.currentSelection || this.forceContent;
        },

        hasSelection()
        {
            return !(0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isNullOrUndefined)(this.selectedAttributes) && !Object.values(this.selectedAttributes).some((value) => value < 0);
        },

        attributes() {
            return this.currentVariationSelect && this.currentVariationSelect.attributes;
        },

        selectedAttributes() {
            return this.currentVariationSelect && this.currentVariationSelect.selectedAttributes;
        },

        selectedUnit() {
            return this.currentVariationSelect && this.currentVariationSelect.selectedUnit;
        },

        variations() {
            return this.currentVariationSelect && this.currentVariationSelect.variations;
        }
    },

    methods:
    {
        /**
         * select an attribute and check, if the selection is valid; if not, unsetInvalidSelection will be executed
         * @param {number} attributeId
         * @param {[number, string, null]} attributeValueId
         */
        selectAttribute(attributeId, attributeValueId)
        {
            attributeValueId = parseInt(attributeValueId) || null;

            if (this.selectedAttributes[attributeId] !== attributeValueId)
            {
                this.$store.commit(`${this.itemId}/variationSelect/selectItemAttribute`, { attributeId, attributeValueId });
                this.onSelectionChange(attributeId, attributeValueId, null);
            }
        },

        /**
         * select a unit and check, if the selection is valid; if not, unsetInvalidSelection will be executed
         * @param {[number, string]} unitId
         */
        selectUnit(unitId)
        {
            unitId = parseInt(unitId);
            this.$store.commit(`${this.itemId}/variationSelect/selectItemUnit`, unitId);
            this.onSelectionChange(null, null, unitId);
        },

        onSelectionChange(attributeId, attributeValueId, unitId)
        {
            if (this.currentSelection)
            {
                this.setVariation(this.currentSelection.variationId);
            }
            else if (!this.hasSelection)
            {
                // user switched back to "please select"
                this.setVariation(0);
            }
            else
            {
                this.unsetInvalidSelection(attributeId, attributeValueId, unitId);
            }

            this.lastContentCount = this.possibleUnitCombinationIds.length;
        },

        /**
         * changes the selected attributes / unit, to ensure a valid seelction
         * @param {[number, null]} attributeId
         * @param {[number, null]} attributeValueId
         * @param {[number, null]} unitId
         */
        unsetInvalidSelection(attributeId, attributeValueId, unitId)
        {
            const qualifiedVariations = this.getQualifiedVariations(attributeId, attributeValueId, unitId);
            const closestVariations = this.getClosestVariations(qualifiedVariations);
            
            // if the salable 'closestVariations' is undefined, take the not-salable one
            const closestVariation = closestVariations[0] || closestVariations[1];

            if (!closestVariation)
            {
                return;
            }

            const invalidSelection = this.getInvalidSelectionByVariation(closestVariation);

            this.correctSelection(invalidSelection);
        },

        getTooltip(attribute, attributeValue)
        {
            if(!this.isAttributeSelectionValid(attribute.attributeId, attributeValue.attributeValueId, true))
            {
                return this.getInvalidOptionTooltip(attribute.attributeId, attributeValue.attributeValueId);
            }
            else if(attribute.type === "image")
            {
                return this.$translate("Ceres::Template.singleItemAttributeTooltip", {
                    attribute: attribute.name,
                    value: attributeValue.name
                });
            }

            return "";
        },

        /**
         * returns a string for box tooltips, for not available options
         * @param {number} attributeId
         * @param {number} attributeValueId
         */
        getInvalidOptionTooltip(attributeId, attributeValueId)
        {
            const qualifiedVariations = this.getQualifiedVariations(attributeId, attributeValueId);
            const closestVariations   = this.getClosestVariations(qualifiedVariations);

            if (!closestVariations || closestVariations.length <= 0)
            {
                return "";
            }

            const invalidSelections = [
                !!closestVariations[0] ? this.getInvalidSelectionByVariation(closestVariations[0]) : null,
                !!closestVariations[1] ? this.getInvalidSelectionByVariation(closestVariations[1]) : null
            ];

            if (!!invalidSelections[0]
                && !!invalidSelections[1]
                && invalidSelections[0].attributesToReset.length > invalidSelections[1].attributesToReset.length)
            {
                // there is a non-salable variation with less changes
                return this.$translate("Ceres::Template.singleItemNotSalable");
            }

            const invalidSelection = invalidSelections[0] || invalidSelections[1];
            const names = [];

            for (const attribute of invalidSelection.attributesToReset)
            {
                if (attribute.attributeId !== attributeId)
                {
                    names.push("<b>" + attribute.name +"</b>");
                }
            }
            if (invalidSelection.newUnit)
            {
                names.push(
                    "<b>" + this.$translate("Ceres::Template.singleItemContent") + "</b>"
                );
            }

            if (!names.length)
            {
                return null;
            }

            return this.$translate("Ceres::Template.singleItemNotAvailableInSelection", { name: names.join(", ") });
        },

        /**
         * returns a list of variations, filtered by attribute or unit
         * @param {[number, null]} attributeId
         * @param {[number, null]} attributeValueId
         * @param {[number, null]} unitId
         */
        getQualifiedVariations(attributeId, attributeValueId, unitId)
        {
            if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isDefined)(attributeValueId))
            {
                return this.variations.filter(variation =>
                {
                    return (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isDefined)(variation.attributes.find(attribute =>
                        attribute.attributeId === attributeId && attribute.attributeValueId === attributeValueId));
                });
            }
            else if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isDefined)(unitId))
            {
                return this.variations.filter(variation => variation.unitCombinationId === unitId);
            }

            return this.variations.filter(variation => !variation.attributes.length);
        },

        /**
         * return a salable and a non-salable variation with the minimum number of changes on attributes compared to the current selection.
         * @param {array} qualifiedVariations
         */
        getClosestVariations(qualifiedVariations)
        {
            let closestSalableVariation, numberOfSalableChanges;
            let closestNonSalableVariation, numberOfNonSalableChanges;

            for (const variation of qualifiedVariations)
            {
                let changes = 0;

                if (variation.unitCombinationId !== this.selectedUnit && !(0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isNull)(this.selectedUnit))
                {
                    // when the unit dropdown isn't visible, it should have a lower weight for reset investigations
                    const unitWeight = this.possibleUnitCombinationIds.length > 1 && this.isContentVisible ? 0.9 : 0.1;

                    changes += unitWeight;
                }

                for (const attribute of variation.attributes)
                {
                    if (this.selectedAttributes[attribute.attributeId] !== attribute.attributeValueId)
                    {
                        changes++;
                    }
                }

                if(variation.isSalable && (!numberOfSalableChanges || changes < numberOfSalableChanges))
                {
                    closestSalableVariation = variation;
                    numberOfSalableChanges = changes;
                }
                else if (!variation.isSalable && (!numberOfNonSalableChanges || changes < numberOfNonSalableChanges))
                {
                    closestNonSalableVariation = variation;
                    numberOfNonSalableChanges = changes;
                }
            }

            return [closestSalableVariation, closestNonSalableVariation];
        },

        /**
         * returns object with array 'attributesToReset' and newUnit. The attributesToReset contains all attributes, which are not matching with the given variation
         * @param {object} variation
         */
        getInvalidSelectionByVariation(variation)
        {
            const attributesToReset = [];
            let newUnit = null;

            for (let selectedAttributeId in this.selectedAttributes)
            {
                selectedAttributeId = parseInt(selectedAttributeId);
                const variationAttribute = variation.attributes.find(attribute => attribute.attributeId === selectedAttributeId);

                if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isNull)(this.selectedAttributes[selectedAttributeId]))
                {
                    if (variationAttribute && variationAttribute.attributeValueId !== this.selectedAttributes[selectedAttributeId] || !variationAttribute)
                    {
                        const attributeToReset = this.attributes.find(attr => attr.attributeId === selectedAttributeId);

                        attributesToReset.push(attributeToReset);
                    }
                }
            }

            if (variation.unitCombinationId !== this.selectedUnit)
            {
                newUnit = variation.unitCombinationId;
            }

            return { attributesToReset, newUnit };
        },

        /**
         * resets all invalid attributes and change the unit, if required. Prints a message to the user if so.
         * @param {object} invalidSelection
         */
        correctSelection(invalidSelection)
        {
            const messages   = [];
            const attributes = JSON.parse(JSON.stringify(this.selectedAttributes));

            for (const attributeToReset of invalidSelection.attributesToReset)
            {
                messages.push(
                    this.$translate("Ceres::Template.singleItemNotAvailable", { name: attributeToReset.name })
                );

                attributes[attributeToReset.attributeId] = (!this.hasEmptyOption && App.config.item.showPleaseSelect) ? -1 : null;
            }

            if (invalidSelection.newUnit)
            {
                if (this.lastContentCount > 1 && this.possibleUnitCombinationIds.length > 1 && !(0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isNull)(this.selectedUnit))
                {
                    messages.push(
                        this.$translate("Ceres::Template.singleItemNotAvailable", { name:
                                this.$translate("Ceres::Template.singleItemContent")
                        })
                    );
                }

                this.$store.commit(`${this.itemId}/variationSelect/selectItemUnit`, invalidSelection.newUnit);
            }

            this.$store.commit(`${this.itemId}/variationSelect/setItemSelectedAttributes`, attributes);

            this.setVariation(this.currentSelection ? this.currentSelection.variationId : 0);

            NotificationService.warn(
                messages.join("<br>")
            ).closeAfter(5000);
        },

        /**
         * returns matching variations with current selection
         * attributes and unitId could be filled, to check a specific selection
         * @param {object} attributes
         * @param {number} unitId
         * @param {boolean} strict
         */
        filterVariations(attributes, unitId, strict, ignoreUnit)
        {
            attributes = attributes || this.selectedAttributes;
            unitId = unitId || this.selectedUnit;
            strict = !!strict;
            ignoreUnit = !!ignoreUnit;

            const key = JSON.stringify(attributes) + "_" + unitId + "_" + strict + "_" + ignoreUnit;

            if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isDefined)(this.filteredVariationsCache[key]))
            {
                return this.filteredVariationsCache[key];
            }

            const uniqueValues = [...new Set(Object.values(attributes))];
            const isEmptyOptionSelected = uniqueValues.length === 1 && (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isNull)(uniqueValues[0]);
            const filteredVariations = this.variations.filter(variation =>
            {
                // the selected unit is not matching
                if (!ignoreUnit && variation.unitCombinationId !== unitId)
                {
                    return false;
                }

                // the variation has no attributes (only checked, if any attribute has a selected value); or the variation has attributes and empty option is selected
                // requires more than 0 attributes
                if (((!isEmptyOptionSelected && !variation.attributes.length) || (isEmptyOptionSelected && variation.attributes.length))
                    && this.attributes.length > 0)
                {
                    return false;
                }

                for (const attributeId in attributes)
                {
                    const variationAttribute = variation.attributes.find(variationAttribute =>
                        variationAttribute.attributeId === parseInt(attributeId));

                    // an attribute is not matching with selection
                    if (variationAttribute &&
                        variationAttribute.attributeValueId !== attributes[attributeId] &&
                        (strict || !strict && !(0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isNull)(attributes[attributeId]) && attributes[attributeId] !== -1))
                    {
                        return false;
                    }
                }

                return true;
            });

            this.filteredVariationsCache[key] = filteredVariations;

            return filteredVariations;
        },

        /**
         * returns true, if the selection with a new attribute value would be valid
         * @param {number} attributeId
         * @param {[number, string, null]} attributeValueId
         * @param {boolean} filterSalableVariations
         */
        isAttributeSelectionValid(attributeId, attributeValueId, filterSalableVariations)
        {
            attributeValueId = parseInt(attributeValueId) || null;
            if (this.selectedAttributes[attributeId] === attributeValueId)
            {
                return true;
            }

            const selectedAttributes = JSON.parse(JSON.stringify(this.selectedAttributes));

            selectedAttributes[attributeId] = parseInt(attributeValueId) || null;

            const ignoreUnit = !(Object.keys(this.possibleUnits).length > 1 && this.isContentVisible);
            let variations = this.filterVariations(selectedAttributes, null, null, ignoreUnit);

            if (filterSalableVariations)
            {
                variations = variations.filter(variation => variation.isSalable)
            }

            return variations.length > 0;
        },

        /**
         * returns true, if the selection with a new unitId would be valid
         * @param {[number, string]} unitId
         */
        isUnitSelectionValid(unitId)
        {
            unitId = parseInt(unitId);
            if (this.selectedUnit === unitId)
            {
                return true;
            }

            return this
                .filterVariations(null, unitId)
                .filter(variation => variation.isSalable)
                .length > 0
        },

        /**
         * dispatch vuex action 'loadVariation' to archive a variation
         * dispatches a custom event named 'onVariationChanged'
         * @param {[string, number, null]} variationId
         */
        setVariation(variationId)
        {
            if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isDefined)(variationId) && this.currentSelection)
            {
                variationId = this.currentSelection.variationId;
            }

            if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isDefined)(variationId))
            {
                this.$store.dispatch(`${this.itemId}/loadVariation`, variationId).then(variation =>
                {
                    document.dispatchEvent(new CustomEvent("onVariationChanged",
                        {
                            detail:
                                {
                                    attributes: variation.attributes,
                                    documents: variation.documents,
                                    itemId: this.itemId
                                }
                        }));
                });
            }
        },

        isTextCut(content)
        {
            if (this.$refs.attributesContaner)
            {
                return (0,_helper_dom__WEBPACK_IMPORTED_MODULE_0__.textWidth)(content, "Custom-Font, Helvetica, Arial, sans-serif") > this.$refs.attributesContaner[0].clientWidth;
            }

            return false;
        },

        getSelectedAttributeValueName(attribute)
        {
            const selectedAttributeValueId =  this.selectedAttributes[attribute.attributeId];
            const selectedAttributeValue = attribute.values.find(attrValue => attrValue.attributeValueId === selectedAttributeValueId);

            if (selectedAttributeValue)
            {
                return selectedAttributeValue.name;
            }
            else if (App.config.item.showPleaseSelect && selectedAttributeValueId === -1)
            {
                return this.$translate("Ceres::Template.singleItemPleaseSelect");
            }
            return this.$translate("Ceres::Template.singleItemNoSelection");
        },

        transformPossibleUnits(possibleUnits)
        {
            return Object.entries(possibleUnits).sort((unitA, unitB) => {
                unitA = this.splitUnitName(unitA[1]);
                unitB = this.splitUnitName(unitB[1]);
                // order by unit
                if (unitA[1] < unitB[1]) {
                    return -1;
                }
                if (unitA[1] > unitB[1]) {
                    return 1;
                }
                // order by content (count)
                if (unitA[0] < unitB[0]) {
                    return -1;
                }
                if (unitA[0] > unitB[0]) {
                    return 1;
                }
                return 0;
            });
        },
        splitUnitName(unitName) {
            const unitNameSplit = unitName.split(" ");

            if (!isNaN(unitNameSplit[0])) {
                unitNameSplit[0] = unitNameSplit[0].replace(App.currencyPattern.separator_thousands, "");
                unitNameSplit[0] = parseInt(unitNameSplit[0]);
            }

            return unitNameSplit;
        }
    },

    watch:
    {
        currentSelection(value)
        {
            this.$store.commit(`${this.itemId}/variationSelect/setIsVariationSelected`, !!value);
        },
        variations()
        {
            // FIX unset variation cache after subsequent variations are loaded
            this.filteredVariationsCache = {};
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/item/VariationSelect.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/VariationSelect.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_VariationSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VariationSelect.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/VariationSelect.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_VariationSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/VariationSelect.vue?vue&type=template&id=4a939d05&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/VariationSelect.vue?vue&type=template&id=4a939d05& ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VariationSelect_vue_vue_type_template_id_4a939d05___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VariationSelect_vue_vue_type_template_id_4a939d05___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VariationSelect_vue_vue_type_template_id_4a939d05___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VariationSelect.vue?vue&type=template&id=4a939d05& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/VariationSelect.vue?vue&type=template&id=4a939d05&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/VariationSelect.vue?vue&type=template&id=4a939d05&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/VariationSelect.vue?vue&type=template&id=4a939d05& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "row" },
    [
      _vm.attributes.length ||
      (_vm.possibleUnitCombinationIds.length > 1 && _vm.isContentVisible)
        ? [
            _vm._l(_vm.attributes, function (attribute, index) {
              return _c(
                "div",
                { key: index, staticClass: "col-12 variation-select" },
                [
                  attribute.type === "dropdown"
                    ? _c(
                        "div",
                        {
                          ref: "attributesContaner",
                          refInFor: true,
                          staticClass: "input-unit",
                        },
                        [
                          _c(
                            "select",
                            {
                              staticClass: "custom-select",
                              attrs: {
                                id: "custom-select_" + attribute.name,
                                "data-testing": "variation-select-dropdown",
                              },
                              on: {
                                change: function ($event) {
                                  return _vm.selectAttribute(
                                    attribute.attributeId,
                                    $event.target.value
                                  )
                                },
                              },
                            },
                            [
                              _vm.addPleaseSelectOption || !_vm.hasSelection
                                ? _c("option", { domProps: { value: -1 } }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$translate(
                                          "Ceres::Template.singleItemPleaseSelect"
                                        )
                                      )
                                    ),
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.hasEmptyOption ||
                              _vm.selectedAttributes[attribute.attributeId] ===
                                null
                                ? _c(
                                    "option",
                                    {
                                      domProps: {
                                        value: null,
                                        selected:
                                          _vm.selectedAttributes[
                                            attribute.attributeId
                                          ] === null,
                                      },
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$translate(
                                            "Ceres::Template.singleItemNoSelection"
                                          )
                                        )
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm._l(attribute.values, function (value) {
                                return _c(
                                  "option",
                                  {
                                    key: value.attributeValueId,
                                    domProps: {
                                      value: value.attributeValueId,
                                      selected:
                                        value.attributeValueId ===
                                        _vm.selectedAttributes[
                                          attribute.attributeId
                                        ],
                                    },
                                  },
                                  [
                                    _vm.isAttributeSelectionValid(
                                      attribute.attributeId,
                                      value.attributeValueId,
                                      true
                                    )
                                      ? [
                                          _vm._v(
                                            "\n                            " +
                                              _vm._s(value.name) +
                                              "\n                        "
                                          ),
                                        ]
                                      : _vm.isAttributeSelectionValid(
                                          attribute.attributeId,
                                          value.attributeValueId,
                                          false
                                        )
                                      ? [
                                          _vm._v(
                                            "\n                            " +
                                              _vm._s(
                                                _vm.$translate(
                                                  "Ceres::Template.singleItemNotSalableAttribute",
                                                  { name: value.name }
                                                )
                                              ) +
                                              "\n                        "
                                          ),
                                        ]
                                      : [
                                          _vm._v(
                                            "\n                            " +
                                              _vm._s(
                                                _vm.$translate(
                                                  "Ceres::Template.singleItemInvalidAttribute",
                                                  { name: value.name }
                                                )
                                              ) +
                                              "\n                        "
                                          ),
                                        ],
                                  ],
                                  2
                                )
                              }),
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _c(
                            "label",
                            {
                              directives: [
                                {
                                  name: "tooltip",
                                  rawName: "v-tooltip",
                                  value: _vm.isTextCut(attribute.name),
                                  expression: "isTextCut(attribute.name)",
                                },
                              ],
                              attrs: {
                                for: "custom-select_" + attribute.name,
                                "data-toggle": "tooltip",
                                "data-placement": "top",
                                title: attribute.name,
                                "data-testing":
                                  "variation-select-dropdown-label",
                              },
                            },
                            [_vm._v(_vm._s(attribute.name))]
                          ),
                        ]
                      )
                    : attribute.type === "box" || attribute.type === "image"
                    ? _c("div", [
                        _c(
                          "span",
                          {
                            staticClass: "text-muted",
                            attrs: { "data-testing": "attribute-name" },
                          },
                          [_vm._v(_vm._s(attribute.name) + ":")]
                        ),
                        _vm._v(" "),
                        _c(
                          "b",
                          { attrs: { "data-testing": "attribute-value" } },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.getSelectedAttributeValueName(attribute)
                              )
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "v-s-boxes py-3",
                            class: { images: attribute.type === "image" },
                          },
                          [
                            _vm.addPleaseSelectOption
                              ? _c(
                                  "div",
                                  {
                                    staticClass:
                                      "v-s-box bg-white empty-option",
                                    class: {
                                      active:
                                        _vm.selectedAttributes[
                                          attribute.attributeId
                                        ] === -1,
                                      invalid: !_vm.isAttributeSelectionValid(
                                        attribute.attributeId,
                                        -1
                                      ),
                                    },
                                    attrs: {
                                      "data-testing": "variation-select-box",
                                    },
                                    on: {
                                      click: function ($event) {
                                        return _vm.selectAttribute(
                                          attribute.attributeId,
                                          -1
                                        )
                                      },
                                    },
                                  },
                                  [
                                    _c("span", { staticClass: "mx-3" }, [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$translate(
                                            "Ceres::Template.singleItemPleaseSelect"
                                          )
                                        )
                                      ),
                                    ]),
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.hasEmptyOption
                              ? _c(
                                  "div",
                                  {
                                    staticClass:
                                      "v-s-box bg-white empty-option",
                                    class: {
                                      active:
                                        _vm.selectedAttributes[
                                          attribute.attributeId
                                        ] === null,
                                      invalid: !_vm.isAttributeSelectionValid(
                                        attribute.attributeId,
                                        null,
                                        true
                                      ),
                                    },
                                    attrs: {
                                      "data-testing": "variation-select-box",
                                    },
                                    on: {
                                      click: function ($event) {
                                        return _vm.selectAttribute(
                                          attribute.attributeId,
                                          null
                                        )
                                      },
                                    },
                                  },
                                  [
                                    _c("span", { staticClass: "mx-3" }, [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$translate(
                                            "Ceres::Template.singleItemNoSelection"
                                          )
                                        )
                                      ),
                                    ]),
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm._l(attribute.values, function (value) {
                              return _c(
                                "div",
                                {
                                  directives: [
                                    {
                                      name: "tooltip",
                                      rawName: "v-tooltip",
                                      value: true,
                                      expression: "true",
                                    },
                                  ],
                                  key: value.attributeValueId,
                                  staticClass: "v-s-box bg-white",
                                  class: {
                                    active:
                                      value.attributeValueId ===
                                      _vm.selectedAttributes[
                                        attribute.attributeId
                                      ],
                                    invalid: !_vm.isAttributeSelectionValid(
                                      attribute.attributeId,
                                      value.attributeValueId,
                                      true
                                    ),
                                  },
                                  attrs: {
                                    "data-testing": "variation-select-box",
                                    "data-html": "true",
                                    "data-toggle": "tooltip",
                                    "data-placement": "top",
                                    "data-original-title": _vm.getTooltip(
                                      attribute,
                                      value
                                    ),
                                  },
                                  on: {
                                    click: function ($event) {
                                      return _vm.selectAttribute(
                                        attribute.attributeId,
                                        value.attributeValueId
                                      )
                                    },
                                  },
                                },
                                [
                                  attribute.type === "box"
                                    ? _c("span", { staticClass: "mx-3" }, [
                                        _vm._v(_vm._s(value.name)),
                                      ])
                                    : _c("img", {
                                        staticClass: "p-1",
                                        attrs: {
                                          src: value.imageUrl,
                                          alt: value.name,
                                        },
                                      }),
                                ]
                              )
                            }),
                          ],
                          2
                        ),
                      ])
                    : _vm._e(),
                ]
              )
            }),
            _vm._v(" "),
            _vm.possibleUnitCombinationIds.length > 1 && _vm.isContentVisible
              ? _c("div", { staticClass: "col-12 variation-select" }, [
                  _c("div", { staticClass: "input-unit" }, [
                    _c(
                      "select",
                      {
                        staticClass: "custom-select",
                        attrs: {
                          id: "unit-combination-ids-select",
                          "data-testing": "variation-select-unit",
                        },
                        on: {
                          change: function ($event) {
                            return _vm.selectUnit($event.target.value)
                          },
                        },
                      },
                      _vm._l(
                        _vm.possibleUnitCombinationIds,
                        function (unitCombinationId) {
                          return _c(
                            "option",
                            {
                              key: unitCombinationId,
                              domProps: {
                                value: unitCombinationId,
                                selected:
                                  parseInt(unitCombinationId) ===
                                  _vm.selectedUnit,
                              },
                            },
                            [
                              _vm.isUnitSelectionValid(unitCombinationId)
                                ? [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(
                                          _vm.possibleUnits[unitCombinationId]
                                        ) +
                                        "\n                        "
                                    ),
                                  ]
                                : [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(
                                          _vm.$translate(
                                            "Ceres::Template.singleItemInvalidAttribute",
                                            {
                                              name: _vm.possibleUnits[
                                                unitCombinationId
                                              ],
                                            }
                                          )
                                        ) +
                                        "\n                        "
                                    ),
                                  ],
                            ],
                            2
                          )
                        }
                      ),
                      0
                    ),
                    _vm._v(" "),
                    _c(
                      "label",
                      {
                        attrs: {
                          for: "unit-combination-ids-select",
                          "data-testing": "variation-select-unit-label",
                        },
                      },
                      [
                        _vm._v(
                          _vm._s(
                            _vm.$translate("Ceres::Template.singleItemContent")
                          )
                        ),
                      ]
                    ),
                  ]),
                ])
              : _vm._e(),
          ]
        : [_vm._t("default")],
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-43.js.map