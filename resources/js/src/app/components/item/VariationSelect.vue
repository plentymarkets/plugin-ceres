<template>
    <div class="row">
        <template v-if="attributes.length || (possibleUnitCombinationIds.length > 1 && isContentVisible)">
            <div class="col-12 variation-select" v-for="(attribute, index) in attributes" :key="index">
                <!-- dropdown -->
                <div class="input-unit" ref="attributesContaner" v-if="attribute.type === 'dropdown'">
                    <select :id="'custom-select_' + attribute.name" class="custom-select" @change="selectAttribute(attribute.attributeId, $event.target.value)" data-testing="variation-select-dropdown">
                        <option :value="-1" v-if="addPleaseSelectOption || !hasSelection">{{ $translate("Ceres::Template.singleItemPleaseSelect") }}</option>
                        <option
                                :value="null" v-if="hasEmptyOption || selectedAttributes[attribute.attributeId] === null"
                                :selected="selectedAttributes[attribute.attributeId] === null">{{ $translate("Ceres::Template.singleItemNoSelection") }}</option>
                        <option
                                v-for="value in attribute.values"
                                :value="value.attributeValueId"
                                :selected="value.attributeValueId === selectedAttributes[attribute.attributeId]"
                                :key="value.attributeValueId">
                            <template v-if="isAttributeSelectionValid(attribute.attributeId, value.attributeValueId, true)">
                                {{ value.name }}
                            </template>
                            <template v-else-if="isAttributeSelectionValid(attribute.attributeId, value.attributeValueId, false)">
                                {{ $translate("Ceres::Template.singleItemNotSalableAttribute", { "name": value.name }) }}
                            </template>
                            <template v-else>
                                {{ $translate("Ceres::Template.singleItemInvalidAttribute", { "name": value.name }) }}
                            </template>
                        </option>
                    </select>
                    <label :for="'custom-select_' + attribute.name" v-tooltip="isTextCut(attribute.name)" data-toggle="tooltip" data-placement="top" :title="attribute.name" data-testing="variation-select-dropdown-label">{{ attribute.name }}</label>
                </div>
                <!-- /dropdown -->

                <!-- box and image -->
                <div v-else-if="attribute.type === 'box' || attribute.type === 'image'">
                    <span class="text-muted" data-testing="attribute-name">{{ attribute.name }}:</span> <b data-testing="attribute-value">{{ getSelectedAttributeValueName(attribute) }}</b>
                    <div class="v-s-boxes py-3" :class="{ 'images': attribute.type === 'image' }">
                        <div class="v-s-box bg-white empty-option"
                             data-testing="variation-select-box"
                             v-if="addPleaseSelectOption"
                             @click="selectAttribute(attribute.attributeId, -1)"
                             :class="{ 'active': selectedAttributes[attribute.attributeId] === -1, 'invalid': !isAttributeSelectionValid(attribute.attributeId, -1) }">
                            <span class="mx-3">{{ $translate("Ceres::Template.singleItemPleaseSelect") }}</span>
                        </div>
                        <div class="v-s-box bg-white empty-option"
                             data-testing="variation-select-box"
                             v-if="hasEmptyOption"
                             @click="selectAttribute(attribute.attributeId, null)"
                             :class="{ 'active': selectedAttributes[attribute.attributeId] === null, 'invalid': !isAttributeSelectionValid(attribute.attributeId, null, true) }">
                            <span class="mx-3">{{ $translate("Ceres::Template.singleItemNoSelection") }}</span>
                        </div>

                        <div class="v-s-box bg-white"
                             data-testing="variation-select-box"
                             v-for="value in attribute.values"
                             @click="selectAttribute(attribute.attributeId, value.attributeValueId)"
                             :class="{ 'active': value.attributeValueId === selectedAttributes[attribute.attributeId], 'invalid': !isAttributeSelectionValid(attribute.attributeId, value.attributeValueId, true) }"
                             v-tooltip="true" data-html="true" data-toggle="tooltip" data-placement="top" :data-original-title="getTooltip(attribute, value)"
                             :key="value.attributeValueId">
                            <span class="mx-3" v-if="attribute.type === 'box'">{{ value.name }}</span>
                            <img class="p-1" v-else :src="value.imageUrl" :alt="value.name">
                        </div>
                    </div>
                </div>
                <!-- /box and image -->
            </div>

            <!-- units -->
            <div class="col-12 variation-select" v-if="possibleUnitCombinationIds.length > 1 && isContentVisible">
                <div class="input-unit">
                    <select id="unit-combination-ids-select" class="custom-select" @change="selectUnit($event.target.value)" data-testing="variation-select-unit">
                        <option
                                v-for="unitCombinationId in possibleUnitCombinationIds"
                                :value="unitCombinationId"
                                :selected="parseInt(unitCombinationId) === selectedUnit"
                                :key="unitCombinationId">
                            <template v-if="isUnitSelectionValid(unitCombinationId)">
                                {{ possibleUnits[unitCombinationId] }}
                            </template>
                            <template v-else>
                                {{ $translate("Ceres::Template.singleItemInvalidAttribute", { "name": possibleUnits[unitCombinationId] }) }}
                            </template>
                        </option>
                    </select>
                    <label for="unit-combination-ids-select" data-testing="variation-select-unit-label">{{ $translate("Ceres::Template.singleItemContent") }}</label>
                </div>
            </div>
            <!-- /units -->
        </template>

        <template v-else>
            <slot></slot>
        </template>
    </div>
</template>

<script>
import { textWidth } from "../../helper/dom";
import { isDefined, isNull, isNullOrUndefined } from "../../helper/utils";

const NotificationService = require("../../services/NotificationService");

export default {

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
            return !isNullOrUndefined(this.selectedAttributes) && !Object.values(this.selectedAttributes).some((value) => value < 0);
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
            if (isDefined(attributeValueId))
            {
                return this.variations.filter(variation =>
                {
                    return isDefined(variation.attributes.find(attribute =>
                        attribute.attributeId === attributeId && attribute.attributeValueId === attributeValueId));
                });
            }
            else if (isDefined(unitId))
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

                if (variation.unitCombinationId !== this.selectedUnit && !isNull(this.selectedUnit))
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

                if (!isNull(this.selectedAttributes[selectedAttributeId]))
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
                if (this.lastContentCount > 1 && this.possibleUnitCombinationIds.length > 1 && !isNull(this.selectedUnit))
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

            if (isDefined(this.filteredVariationsCache[key]))
            {
                return this.filteredVariationsCache[key];
            }

            const uniqueValues = [...new Set(Object.values(attributes))];
            const isEmptyOptionSelected = uniqueValues.length === 1 && isNull(uniqueValues[0]);
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
                        (strict || !strict && !isNull(attributes[attributeId]) && attributes[attributeId] !== -1))
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
            if (!isDefined(variationId) && this.currentSelection)
            {
                variationId = this.currentSelection.variationId;
            }

            if (isDefined(variationId))
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
                return textWidth(content, "Custom-Font, Helvetica, Arial, sans-serif") > this.$refs.attributesContaner[0].clientWidth;
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
}
</script>
