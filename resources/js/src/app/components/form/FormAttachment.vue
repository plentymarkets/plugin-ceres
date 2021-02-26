<template>
    <label class="input-unit file-input"
            ref="inputUnit"
            v-tooltip
            data-toggle="tooltip"
            :title="selectedFiles">
        <label :for="formFieldId">
            {{ label }}<span v-if="isRequired">*</span>
        </label>

        <span class="input-unit-preview"
                :class="{ 'disabled': !!selectedFiles }"
                data-testing="form-attachment-file-name">
            {{ selectedFiles }}
        </span>

        <span class="input-unit-btn"
                v-if="!selectedFiles">
            <i class="fa fa-ellipsis-h"></i>
        </span>

        <span class="input-unit-btn"
                v-else
                @click.prevent="clearSelectedFiles()"
                data-testing="remove-attached-file">
            <i class="fa fa-times"></i>
        </span>
        
        <input type="file"
            ref="fileInput"
            :multiple="allowMultiple"
            :name="formFieldId" :id="formFieldId"
            :disabled="allowedFileExtensions.trim().length === 0 || !!selectedFiles"
            :accept="allowedFileExtensions"
            @change="collectFiles"
            data-testing="form-attachment-input">
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

    props:
    {
        allowMultiple: Boolean,
        allowedFileExtensions: String,
        isRequired: Boolean,
        formFieldId: String,
        label: String
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            if (this.isRequired)
            {
                this.$refs.inputUnit.setAttribute("data-validate", "file");
            }
        });
    },

    methods:
    {
        collectFiles(event)
        {
            const fileList = event.target.files;

            this.selectedFiles = Array.from(fileList)
                .map(file => file.name)
                .join(", ");

            this.$emit('files-changed', fileList);
        },

        clearSelectedFiles()
        {
            this.selectedFiles = null;
            this.$refs.fileInput.value = "";
        }
    }
}
</script>
