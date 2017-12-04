const ApiService = require("services/ApiService");

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
            inputValue: "",
            selectedFile: null
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
        },

        selectedFileName()
        {
            if (this.selectedFile)
            {
                return this.selectedFile.name;
            }

            return "";
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
        ]),

        setPropertyFile(event)
        {
            if (event.srcElement && event.srcElement.files && event.srcElement.files.length > 0)
            {
                this.selectedFile = event.srcElement.files[0];
                this.setVariationOrderProperty({propertyId: this.property.property.id, value: this.selectedFile});

                this.test(this.selectedFile);

                // var fileData = new FormData();

                // fileData.append("test", event.srcElement.files[0]);

                // fileData.append("username", "Groucho");
                // fileData.append("accountnum", 123456);

                // ApiService.post("/rest/io/order/property/file", fileData, {processData: false, contentType: false})
                //     .always(response =>
                //     {
                //         console.log(response);
                //     });
            }
        },

        test(file)
        {
            
            // var fd = new FormData();
            // fd.append("afile", file);
            // fd.append("username", "Groucho");
            // fd.append("accountnum", 123456);

            // fetch("http://master.plentymarkets.com/rest/io/order/property/file",
            //     {
            //         method: "POST",
            //         body: fd
            //     }).then(response =>
            //     {
            //         console.log("response:", response);
            //     });

            var fd = new FormData();
            fd.append("fileData", file);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://master.plentymarkets.com/rest/io/order/property/file', true);

            xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                    var percentComplete = (e.loaded / e.total) * 100;
                    console.log(percentComplete + '% uploaded');
                }
            };
            xhr.onload = function () {
                if (this.status == 200) {
                    var resp = JSON.parse(this.response);
                    console.log('Server got:', resp);
                    var image = document.createElement('img');
                    image.src = resp.dataUrl;
                    document.body.appendChild(image);
                };
            };
            xhr.send(fd);
        },

        clearSelectedFile()
        {
            this.selectedFile = null;
        }
    }
});
