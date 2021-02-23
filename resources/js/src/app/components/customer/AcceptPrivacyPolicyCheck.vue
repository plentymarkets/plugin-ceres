<template>
    <div class="form-check" :class="{ 'error': showError }">
        <input class="form-check-input" type="checkbox" :id="'privacy-policy-accept' + _uid" :checked="value" @change="onValueChanged($event.target.checked)" data-testing="privacy-policy-accept-register">
        <label class="form-check-label" :for="'privacy-policy-accept' + _uid">
            <span v-html="labelHtml"></span><!--
            --><sup>*</sup>
        </label>
    </div>
</template>

<script>
export default {

    name: "accept-privacy-policy-check",

    props: {
        value: Boolean ,
        showError: Boolean
    },

    computed: {
        labelHtml()
        {
            const contactPrivacyPolicy = this.$translate("Ceres::Template.contactPrivacyPolicy", {"hyphen": "&shy;"});
            const html = `
                <!----><a href="${ App.urls.privacyPolicy }" target="_blank" class="text-appearance">
                    <span>${ contactPrivacyPolicy }</span>
                </a><!---->
            `;

            return this.$translate("Ceres::Template.contactAcceptPrivacyPolicy", {policy: html});
        }
    },

    methods:
    {
        onValueChanged(value)
        {
            this.$emit("input", value);
        }
    }
}
</script>