Vue.component("order-property-list-item", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-order-property-list-item"
        },
        property: Object
    },

    data()
    {
        return {
            inputValue: ""
        };
    },

    computed:
    {
        inputType()
        {
            const orderPropertyGroupingType = this.property.group ? this.property.group.orderPropertyGroupingType : null;
            const valueType = this.property.property.valueType;

            if (valueType === "empty")
            {
                if (!orderPropertyGroupingType || orderPropertyGroupingType === "none" || orderPropertyGroupingType === "multi")
                {
                    return "checkbox";
                }

                return "radio";
            }

            return valueType;
        }
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
        onInputValueChanged(value)
        {
            if (this.inputType === "int")
            {
                value = this.validateInt(value);
            }
            else if (this.inputType === "float")
            {
                value = this.validateFloat(value);
            }
            else if (this.inputType === "checkbox")
            {
                if (!value)
                {
                    value = null;
                }
            }
            else if (this.inputType === "radio")
            {
                this.$emit("radio-change", this.property.property.id);
            }

            this.setVariationOrderProperty({propertyId: this.property.property.id, value: value});
        },

        validateInt(value)
        {
            value = parseInt(value);

            if (isNaN(value))
            {
                value = null;
            }

            this.inputValue = value;

            return value;
        },

        validateFloat(value)
        {
            value = parseFloat(value.replace(App.config.decimalSeperator, "."));

            if (isNaN(value))
            {
                value = null;
            }
            else
            {
                value = value.toString().replace(".", App.config.decimalSeperator);
            }

            this.inputValue = value;

            return value;
        },

        ...Vuex.mapMutations([
            "setVariationOrderProperty"
        ])
    }
});
