<template>
    <label class="input-unit file-input" v-tooltip data-toggle="tooltip" :title="fileNames">
        <label :for="formFieldId">
            {{ label }}<span v-if="isRequired">*</span>
        </label>
        <span class="input-unit-preview">{{fileNames}}</span>
        <span class="input-unit-btn">
            <i class="fa fa-ellipsis-h"></i>
        </span>
        <input type="file"
                ref="fileInput"
                :multiple="allowMultiple"
                :name="formFieldId" :id="formFieldId"
                :disabled="allowedFileExtensions.trim().length === 0"
                :accept="allowedFileExtensions"
                @change="collectFiles">
    </label>
</template>

<script>

export default {

    name: "form-attachment",

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

    mounted()
    {
        this.$nextTick(() =>
        {
            if (this.isRequired)
            {
                this.$refs.fileInput.setAttribute("data-validate", "file");
            }
        });
    },

    methods:
    {
        collectFiles(e) {
            this.filesChanged(e.target.files);
            
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
            
        },

        filesChanged(fileList)
        {
            this.$emit('files-changed', fileList);
        }
    },

    computed:
    {
        fileNames()
        {
            return this.selectedFiles;
        }
    }

}
</script>
