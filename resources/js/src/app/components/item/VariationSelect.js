import { isNull } from "util";
import { isDefined } from "../../helper/utils";

Vue.component("variation-select", {

    props: {
        template:
        {
            type: String,
            default: "#vue-variation-select"
        }
    },

    data()
    {
        return {
            initialVariationId: null
        };
    },

    computed:
    {
        /**
         * return all available units with id, present on the variations
         */
        units()
        {
            const units = {};

            for (const variation of this.variations)
            {
                units[variation.unitCombinationId] = variation.unitName;
            }

            return units;
        },

        hasEmptyOption()
        {
            console.log("call hasEmptyOption()");
        },

        /**
         * returns true, if the current selection of attributes and unit will resolve a variation
         */
        isCurrentSelectionValid()
        {
            return this.filterVariations().length === 1;
        },

        ...Vuex.mapState({
            currentVariation: state => state.item.variation.documents[0].data,
            attributes: state => state.item.attributes,
            variations: state => state.item.variations,
            selectedAttributes: state => state.item.selectedAttributes,
            selectedUnit: state => state.item.selectedUnit
        })
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.initializeState();
        });
    },

    methods:
    {
        /**
         * initializes the selected attributes and unit, based on the initial variation
         */
        initializeState()
        {
            this.initialVariationId = this.currentVariation.variation.id;
            const initialVariation  = this.variations.find(variation => this.initialVariationId === parseInt(variation.variationId));
            const initialUnit       = initialVariation.unitCombinationId;
            const attributes        = {};

            for (const attribute of this.attributes)
            {
                const variationAttribute = initialVariation.attributes.find(variationAttribute => variationAttribute.attributeId === attribute.attributeId);

                attributes[attribute.attributeId] = variationAttribute ? variationAttribute.attributeValueId : null;
            }

            this.$store.commit("setItemSelectedAttributes", attributes);
            this.$store.commit("setItemSelectedUnit", initialUnit);
        },

        /**
         * select an attribute and check, if the selection is valid; if not, unsetInvalidSelection will be executed
         * @param {number} attributeId
         * @param {[number, string, null]} attributeValueId
         */
        selectAttribute(attributeId, attributeValueId)
        {
            attributeValueId = parseInt(attributeValueId) || null;
            const selectedAttributes = JSON.parse(JSON.stringify(this.selectedAttributes));

            selectedAttributes[attributeId] = attributeValueId;

            this.$store.commit("setItemSelectedAttributes", selectedAttributes);

            if (this.isCurrentSelectionValid)
            {
                this.setVariation();
            }
            else
            {
                this.unsetInvalidSelection(attributeId, attributeValueId);
            }
        },

        /**
         * select a unit and check, if the selection is valid; if not, unsetInvalidSelection will be executed
         * @param {[number, string]} unitId
         */
        selectUnit(unitId)
        {
            unitId = parseInt(unitId);
            this.$store.commit("setItemSelectedUnit", unitId);

            if (this.isCurrentSelectionValid)
            {
                this.setVariation();
            }
            else
            {
                this.unsetInvalidSelection(null, null, unitId);
            }
        },

        unsetInvalidSelection(attributeId, attributeValueId, unitId)
        {
            let qualifiedVariations;

            if (isDefined(attributeValueId))
            {
                qualifiedVariations = this.variations.filter(variation =>
                {
                    return isDefined(variation.attributes.find(attribute =>
                        attribute.attributeId === attributeId && attribute.attributeValueId === attributeValueId));
                });
            }
            else if (isDefined(unitId))
            {
                qualifiedVariations = this.variations.filter(variation => variation.unitCombinationId === unitId);
            }
            else
            {
                // variations without attributes
                return;
            }

            let bestChoice;
            let numberOfRequiredChanges;

            for (const variation of qualifiedVariations)
            {
                let changes = 0;

                if (variation.unitCombinationId !== this.selectedUnit)
                {
                    changes++;
                }

                for (const attribute of variation.attributes)
                {
                    if (this.selectedAttributes[attribute.attributeId] !== attribute.attributeValueId)
                    {
                        changes++;
                    }
                }

                if (!numberOfRequiredChanges || changes < numberOfRequiredChanges)
                {
                    bestChoice = variation;
                    numberOfRequiredChanges = changes;
                }
            }

            const attributes = JSON.parse(JSON.stringify(this.selectedAttributes));

            for (const attribute of bestChoice.attributes)
            {
                if (this.selectedAttributes[attribute.attributeId] !== attribute.attributeValueId)
                {
                    attributes[attribute.attributeId] = null;
                }
            }
            if (bestChoice.unitCombinationId !== this.selectedUnit)
            {
                this.$store.commit("setItemSelectedUnit", bestChoice.unitCombinationId);
            }

            this.$store.commit("setItemSelectedAttributes", attributes);

            if (this.isCurrentSelectionValid)
            {
                this.setVariation();
            }
        },

        /**
         * returns matching variations with current selection
         * attributes and unitId could be filled, to check a specific selection
         * @param {object} attributes
         * @param {number} unitId
         */
        filterVariations(attributes, unitId)
        {
            attributes = attributes || this.selectedAttributes;
            unitId = unitId || this.selectedUnit;

            const matching = [];

            const uniqueValues = [...new Set(Object.values(attributes))];
            const isEmptyOptionSelected = uniqueValues.length === 1 && isNull(uniqueValues[0]);

            for (const variation of this.variations)
            {
                let isMatching = true;

                // the selected unit is not matching
                if (variation.unitCombinationId !== unitId)
                {
                    continue;
                }

                // the variation has no attributes (only checked, if any attribute has a selected value)
                if (!isEmptyOptionSelected && !variation.attributes.length)
                {
                    continue;
                }

                for (const attributeId in attributes)
                {
                    const variationAttribute = variation.attributes.find(variationAttribute => variationAttribute.attributeId === parseInt(attributeId));

                    // an attribute is not matching with selection
                    if (variationAttribute && variationAttribute.attributeValueId !== attributes[attributeId] && attributes[attributeId] !== null)
                    {
                        isMatching = false;
                    }
                }

                if (isMatching)
                {
                    matching.push(variation);
                }
            }

            return matching;
        },

        /**
         * returns true, if the selection with a new attribute value would be valid
         * @param {number} attributeId
         * @param {[number, string, null]} attributeValueId
         */
        isAttributeSelectionValid(attributeId, attributeValueId)
        {
            attributeValueId = parseInt(attributeValueId) || null;
            if (this.selectedAttributes[attributeId] === attributeValueId)
            {
                return true;
            }

            const selectedAttributes = JSON.parse(JSON.stringify(this.selectedAttributes));

            selectedAttributes[attributeId] = parseInt(attributeValueId) || null;
            return !!this.filterVariations(selectedAttributes).length;
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

            return !!this.filterVariations(null, unitId).length;
        },

        setVariation()
        {
            console.log("call setVariation()");
            // TODO:  lädt die ausgewählte Varriante
        },

        isTextCut()
        {
            console.log("call isTextCut()");
            // TODO: prüft, ob der Name vom Attribute komplett angezeigt wird
        }
    }
});
