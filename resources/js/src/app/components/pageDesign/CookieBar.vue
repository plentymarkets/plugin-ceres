<template>
    <!-- v-show is required to prevent CLS for ssr -->
    <div class="cookie-bar out bk_cc bkr-cc" v-show="!$ceres.isSSR"  :class="{ 'in': isVisible }">
            <div class="container" v-if="isVisible">
                <div class="row p-3" v-show="!isExpanded" :class="classes" :style="styles">
                    <div class="col-12 px-4 col-md-12 text-center">
                        <p class="cookieBeaverContainer mt-4">
                          <img class="cookieBeaver" src="https://cdn.bio-kinder.de/frontend/images/biokindertheme/icons/cookie_biber.png" />
                        </p>
                        <h2>Cookies akzeptieren</h2>
                        <p>
                          Wir nutzen Cookies auf unserer Website. Einige von diesen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.
                          Sie haben die Möglichkeit, die Einstellungen der Cookies anzupassen.
                          Weitere Informationen zu den von uns verwendeten Cookies und Ihren Rechten als Nutzer finden Sie in unserer <a class="d-inline-block read_more" href="/privacy-policy/">Daten­schutz­erklärung</a> und unserem <a class="d-inline-block read_more" href="/legal-disclosure/">{{ $translate("Ceres::Template.legalDisclosure") }}</a>.
                        </p>
                    </div>
                    <div class="col-12 col-md-12 text-center py-4 py-md-4">
                        <button @click.prevent.stop="isExpanded = true" class="btn btn-default btn-appearance d-inline-block">Einstellungen</button>
                        <button onclick="consentGiven(window.ConsentManager.hasResponse())" class="btn btn-primary btn-appearance d-inline-block" @click="acceptAll(); close()" v-html="'Einverstanden, zum Shop &rarr;'"></button>
                    </div>

                </div>
                <div class="row p-3" v-if="isExpanded" :class="classes" :style="styles">
                    <div class="col-12 mb-3">
                        <privacy-settings :consent-groups="consentGroups"></privacy-settings>
                    </div>
                    <div class="col-12 col-md-12 text-center">
                        <button onclick="consentGiven(window.ConsentManager.hasResponse())" v-html="$translate('Ceres::Template.cookieBarSave')" class="btn btn-default mr-2" @click="storeConsents(); close()"></button>
                        <button onclick="consentGiven(window.ConsentManager.hasResponse())" class="btn btn-primary btn-appearance cookiesAccept" v-html='$translate("Ceres::Template.cookieBarAcceptAll")' @click="acceptAll(); close()"></button>
                    </div>
                    <div class="col-12 col-md-6">
                      <a class="text-appearance d-inline-block mb-3" v-html="$translate('Ceres::Template.cookieBarBack')" @click.prevent.stop="isExpanded = false"></a>
                    </div>
                </div>
            </div>

            <div v-else>
                <a @click.prevent.stop="isCollapsed = false" :aria-label="$translate('Ceres::Template.cookieBarPrivacySettings')">
                    <i class="fa fa-shield float-none"></i>
                    <span class="d-inline-block" v-html="$translate('Ceres::Template.cookieBarPrivacySettings')"></span>
                </a>
            </div>
        </div>
</template>

<script>
import { mapMutations } from "vuex";
import { ComponentIdMixin } from "../../mixins/componentId.mixin";

export default {
    props:
    {
        styles: String,
        classes: String,
        consentGroups: Object,
        showRejectAll: {
            type: Boolean,
            default: true
        }
    },

    mixins: [ComponentIdMixin], // Experimental mixin, may be removed in the future.

    data()
    {
        return {
            isCollapsed: true,
            isExpanded: false
        };
    },

    computed:
    {
        isVisible()
        {
            return App.isShopBuilder || !this.$store.state.consents.hasResponse || !this.isCollapsed;
        },

        isShopBuilder()
        {
            return App.isShopBuilder;
        },

        text()
        {
            const links = {
                gtc: "<a class=\"text-appearance\" href=\"" + App.urls.gtc + "\" target=\"_blank\">" + this.$translate("Ceres::Template.checkoutGtc") + "</a>",
                cancellation: "<a class=\"text-appearance\" href=\"" + App.urls.cancellationRights + "\" target=\"_blank\">" + this.$translate("Ceres::Template.checkoutCancellationRight", {"hyphen": "&shy;"}) + "</a>",
                policy: "<a class=\"text-appearance\" href=\"" + App.urls.privacyPolicy + "\" target=\"_blank\">" + this.$translate("Ceres::Template.checkoutPrivacyPolicy", {"hyphen": "&shy;"}) + "</a>",
                legal: "<a class=\"text-appearance\" href=\"" + App.urls.legalDisclosure + "\" target=\"_blank\">" + this.$translate('Ceres::Template.footerLegalDisclosure') + "</a>"
            };

            return this.$translate("Ceres::Template.cookieBarHintText", links);
        }
    },

    methods:
    {
        ...mapMutations([
            "storeConsents",
            "acceptAll",
            "denyAll"
        ]),

        close()
        {
            this.isCollapsed = true;
            this.isExpanded = false;
        },

        open()
        {
            this.isCollapsed = false;
        },

        isConsented(groupKey)
        {
            return this.$store.getters.isConsented(groupKey + ".*");
        },

        toggleConsent(groupKey)
        {
            this.$store.commit("toggleConsent", groupKey + ".*");
        }
    }
}
</script>
