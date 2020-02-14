import Vue from "vue";
import { mapMutations } from "vuex";
import TranslationService from "../../services/TranslationService";

Vue.component("customer-sign-input", {

    template: `
    <div class="input-unit">
        <input type="text" @change="setCustomerSign($event.srcElement.value)" :id="'customer-sign_' + _uid" :maxlength="maxLength">
        <label :for="'customer-sign_' + _uid">
            ${ TranslationService.translate("Ceres::Template.checkoutCustomerSign") }
        </label>
    </div>`,

    props:
    {
        maxLength:
        {
            type: Number,
            default: 128
        }
    },

    methods: {
        ...mapMutations([
            "setCustomerSign"
        ])
    }
});
