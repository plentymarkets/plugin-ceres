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

        filterVariations()
        {
            console.log("call filterVariations()");
            // TODO: gibt die Varianten in 2 Arrays zurück. Basierend auf der aktuellen Auswahl
        },

        isAttributeSelectionValid()
        {
            console.log("call isAttributeSelectionValid()");
            // TODO: gibt true oder false zurück, ob die Auswahl basierend auf dem Attribut möglich wäre
        },

        isUnitSelectionValid()
        {
            console.log("call isUnitSelectionValid()");
            // TODO: gibt true oder false zurück, ob die Auswahl basierend auf der Einheit möglich wäre
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
