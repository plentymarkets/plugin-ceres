<template>
    <label class="input-unit file-input order-property-input" v-tooltip data-toggle="tooltip" :title="showFileNames">
        <label :for="formFieldId">
            {{ label }}<span v-if="isRequired">*</span>
        </label>
        <span class="input-unit-preview">{{showFileNames}}</span>
        <span class="input-unit-btn">
            <i class="fa fa-ellipsis-h"></i>
        </span>
        <input ref="fileInput" type="file"
                :multiple="allowMultiple"
                :name="formFieldId" :id="formFieldId"
                :disabled="allowedFileExtensions.trim().length === 0"
                :accept="allowedFileExtensions"
                @change="collectFiles">
    </label>
</template>

<script>

export default {

    name: "mail-attachment",

    data()
    {
        return {
            selectedFiles: ""
        };
    },

    props: {
        allowMultiple: {
            type: Boolean
        },
        allowedFileExtensions: {
            type: String
        },
        isRequired: {
            type: Boolean
        },
        formFieldId: {
            type: String 
        },
        label: {
            type: String
        }
    },

    methods:
    {
        collectFiles(e) {
            let fileNames = "";

            for (var i = 0; i < e.target.files.length; i++)
            {
                if (i>0)
                {
                    fileNames += ", "
                }

                fileNames = fileNames + e.target.files[i].name;
            }
            
            this.selectedFiles = fileNames;
        }
    },

    computed:
    {
        showFileNames()
        {
            return this.selectedFiles;
        }
    }

}
</script>
