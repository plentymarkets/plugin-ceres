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

        isCurrentSelectionValid()
        {
            console.log("call isCurrentSelectionValid()");
            // TODO: gibt zurück, ob die aktuelle Auswahl von Attributen und Einheit gültig ist.
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
         * select an attribute
         * @param {number} attributeId
         * @param {[number, string, null]} attributeValueId
         */
        selectAttribute(attributeId, attributeValueId)
        {
            const selectedAttributes = JSON.parse(JSON.stringify(this.selectedAttributes));

            selectedAttributes[attributeId] = parseInt(attributeValueId) || null;

            this.$store.commit("setItemSelectedAttributes", selectedAttributes);
        },

        /**
         * select a unit
         * @param {[number, string]} unitId
         */
        selectUnit(unitId)
        {
            this.$store.commit("setItemSelectedUnit", parseInt(unitId));
        },

        /**
         * returns an object with two arrays (matching, notMatching), matching contains all variations, matching with current selection; notMatching contains all not matching variations
         * attributes and unitId could be filled, to check a specific selection
         * @param {object} attributes
         * @param {number} unitId
         */
        filterVariations(attributes, unitId)
        {
            attributes = attributes || this.selectedAttributes;
            unitId = unitId || this.selectedUnit;

            const matching = [];
            const notMatching = [];

            for (const variation of this.variations)
            {
                let isMatching = true;

                // the selected unit is not matching
                if (variation.unitCombinationId !== unitId)
                {
                    notMatching.push(variation);
                    continue;
                }

                // the variation has no attributes
                if (!variation.attributes.length)
                {
                    notMatching.push(variation);
                    continue;
                }

                for (const attributeId in attributes)
                {
                    const variationAttribute = variation.attributes.find(variationAttribute => variationAttribute.attributeId === parseInt(attributeId));

                    // an attribute is not matching with selection
                    if (variationAttribute && variationAttribute.attributeValueId !== attributes[attributeId])
                    {
                        notMatching.push(variation);
                        isMatching = false;
                        continue;
                    }
                }

                if (isMatching)
                {
                    matching.push(variation);
                }
            }

            return { matching, notMatching };
        },

        /**
         * returns true, if the selection with a new attribute value would be valid
         * @param {number} attributeId
         * @param {[number, string, null]} attributeValueId
         */
        isAttributeSelectionValid(attributeId, attributeValueId)
        {
            const selectedAttributes = JSON.parse(JSON.stringify(this.selectedAttributes));

            selectedAttributes[attributeId] = parseInt(attributeValueId) || null;
            return !!this.filterVariations(selectedAttributes).matching.length;
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

            return !!this.filterVariations(null, unitId).matching.length;
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
