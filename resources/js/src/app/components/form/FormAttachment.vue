<template>
    <div class="input-unit file-input"
         ref="inputUnit"
         v-tooltip
         data-toggle="tooltip"
         :title="selectedFiles">
        <label :for="formFieldId">
            {{ label }}<span v-if="isRequired">*</span>
        </label>

        <span class="input-unit-preview">{{ selectedFiles }}</span>

        <span class="input-unit-btn">
            <i class="fa fa-ellipsis-h"></i>
        </span>
        
        <input type="file"
            :multiple="allowMultiple"
            :name="formFieldId" :id="formFieldId"
            :disabled="allowedFileExtensions.trim().length === 0"
            :accept="allowedFileExtensions"
            @change="collectFiles">
    </div>
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
        }
    }
}
</script>
