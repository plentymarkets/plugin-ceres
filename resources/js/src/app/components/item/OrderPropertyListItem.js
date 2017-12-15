const ApiService = require("services/ApiService");

Vue.component("order-property-list-item", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-order-property-list-item"
        },
        group: Object,
        property: Object
    },

    data()
    {
        return {
            inputValue: "",
            selectedFile: null,
            waiting: false
        };
    },

    computed:
    {
        inputType()
        {
            const orderPropertyGroupingType = this.group ? this.group.orderPropertyGroupingType : null;
            const valueType = this.property.valueType;

            if (valueType === "empty")
            {
                if (!orderPropertyGroupingType || orderPropertyGroupingType === "none" || orderPropertyGroupingType === "multi")
                {
                    return "checkbox";
                }

                return "radio";
            }

            return valueType;
        },

        selectedFileName()
        {
            if (this.selectedFile)
            {
                return this.selectedFile.name;
            }

            return "";
        },

        hasError()
        {
            if (this.variationMarkInvalidProperties && this.inputType === "radio")
            {
                return this.variationMissingProperties.find(property => property.property.id === this.property.id);
            }

            return this.variationMarkInvalidProperties && !this.property.value;
        },

        ...Vuex.mapState({
            isBasketLoading: state => state.basket.isBasketLoading,
            variationMarkInvalidProperties: state => state.item.variationMarkInvalidProperties
        }),

        ...Vuex.mapGetters([
            "variationMissingProperties"
        ])
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
                this.$emit("radio-change", this.property.id);
            }

            this.setVariationOrderProperty({propertyId: this.property.id, value: value});
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
            "setVariationOrderProperty",
            "setIsBasketLoading"
        ]),

        setPropertyFile(event)
        {
            if (event.srcElement && event.srcElement.files && event.srcElement.files.length > 0)
            {
                this.selectedFile = event.srcElement.files[0];
                this.uploadPropertyFile(this.selectedFile);
            }
        },

        uploadPropertyFile(file)
        {
            this.setIsBasketLoading(true);
            this.waiting = true;

            const fileData = new FormData();

            fileData.append("fileData", file);

            ApiService.post("/rest/io/order/property/file", fileData, {processData: false, contentType: false, cache: false, async: true, timeout: 60000})
                .done(response =>
                {
                    this.setVariationOrderProperty({propertyId: this.property.id, value: response.key});
                })
                .fail(error =>
                {
                    this.clearSelectedFile();
                })
                .always(response =>
                {
                    this.setIsBasketLoading(false);
                    this.waiting = false;
                });
        },

        clearSelectedFile()
        {
            this.selectedFile = null;
            this.setVariationOrderProperty({propertyId: this.property.id, value: null});
        }
    }
});
