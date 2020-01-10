import Vue from "vue";
import { mapMutations } from "vuex";
import TranslationService from "../../services/TranslationService";

Vue.component("customer-sign-input", {

    template: `
    <div class="input-unit">
        <input type="text" @change="setCustomerSign($event.srcElement.value)" :id="'customer-sign_' + _uid">
        <label :for="'customer-sign_' + _uid">
            ${ TranslationService.translate("Ceres::Template.checkoutCustomerSignMessage") }
        </label>
    </div>`,

    methods: {
        ...mapMutations([
            "setCustomerSign"
        ])
    }
});
