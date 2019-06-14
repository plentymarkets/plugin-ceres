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

        };
    },

    computed:
    {
        units()
        {
            console.log("call units()");
            // TODO: gibt alle existierenden Einheiten des Artikels zurück
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
            console.log("call initializeState()");
            // TODO: setze die vorausgewählten Daten (Attribute und Unit)
        },

        selectAttribute()
        {
            console.log("call selectAttribute()");
            // TODO: Selektiert ein Attribut
        },

        selectUnit()
        {
            console.log("call selectUnit()");
            // TODO: Selektiert eine Einheit
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
