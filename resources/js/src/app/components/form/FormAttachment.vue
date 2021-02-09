<template>
    <label class="input-unit file-input" v-tooltip data-toggle="tooltip" :title="selectedFiles">
        <label :for="formFieldId">
            {{ label }}<span v-if="isRequired">*</span>
        </label>
        <span class="input-unit-preview">{{ selectedFiles }}</span>
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

    data() {
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

    mounted() {
        this.$nextTick(() =>
        {
            if (this.isRequired) {
                this.$refs.fileInput.setAttribute("data-validate", "file");
            }
        });
    },

    methods: {
        collectFiles(event) {
            const fileList = event.target.files;

            this.selectedFiles = Array.from(fileList)
                .map(file => file.name)
                .join(", ");

            this.$emit('files-changed', fileList);
        }
    }
}
</script>
