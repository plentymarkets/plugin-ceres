<template>
    <!-- v-show is required to prevent CLS for ssr -->
    <div
        v-show="!$ceres.isSSR"   
        class="cookie-bar"
        :class="{
            'out': !isVisible,
            'border-top bg-white': isVisible,
            'fixed-bottom': !isShopBuilder || false
        }"
    >
        <div class="container-max" v-if="isVisible">
            <div class="row py-3" v-show="!isExpanded" :class="classes" :style="styles">
                <div class="col-12 col-md-8">

                    <p v-html="text"></p>

                    <div>
                        <template v-for="consentGroup in consentGroups">
                            <span v-if="consentGroup.consents.length > 0"
                                  class="custom-control custom-switch custom-control-appearance d-md-inline-block mr-3"
                                  :key="consentGroup.key">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       :id="_uid + '-group-' + consentGroup.key"
                                       :disabled="consentGroup.necessary"
                                       :checked="isConsented(consentGroup.key) || consentGroup.necessary"
                                       @change="toggleConsent(consentGroup.key)">
                                <label class="custom-control-label" :for="_uid + '-group-' + consentGroup.key">
                                    <template v-if="consentGroup.label.length > 0">
                                        {{ consentGroup.label }}
                                    </template>
                                    <template v-else>
                                        {{ $translate("Ceres::Template.privacySettingsDefaultGroup") }}
                                    </template>
                                </label>
                            </span>
                        </template>
                        
                        <a href="#" class="text-primary text-appearance d-block d-md-inline-block" data-testing="cookie-bar-show-more-information" @click.prevent.stop="isExpanded=true">{{ $translate("Ceres::Template.cookieBarMoreSettings") }}</a>
                    </div>

                </div>
                <div class="col-12 col-md-4 pt-3 pt-md-0">
                    <button
                        class="btn btn-primary btn-block btn-appearance"
                        @click="acceptAll(); close()"
                        data-testing="cookie-bar-accept-all">
                        {{ $translate("Ceres::Template.cookieBarAcceptAll") }}
                    </button>
                    <button
                        class="btn btn-default btn-block"
                        @click="storeConsents(); close()"
                        data-testing="cookie-bar-save">
                        {{ $translate("Ceres::Template.cookieBarSave") }}
                    </button>
                </div>

            </div>
            <div class="row py-3" v-if="isExpanded" :class="classes" :style="styles">
                <div class="col-12 mb-3">
                    <privacy-settings :consent-groups="consentGroups"></privacy-settings>
                </div>
                <div class="col-12 col-md-6">
                    <a
                        href="#"
                        class="text-primary text-appearance d-inline-block mb-3"
                        data-testing="cookie-bar-hide-more-information"
                        @click.prevent.stop="isExpanded = false">
                        {{ $translate("Ceres::Template.cookieBarBack") }}
                    </a>
                </div>
                <div class="col-6 col-md-3">
                    <button
                        class="btn btn-block btn-primary btn-appearance"
                        @click="acceptAll(); close()"
                        data-testing="cookie-bar-expanded-accept-all">
                        {{ $translate("Ceres::Template.cookieBarAcceptAll") }}
                    </button>
                </div>
                <div class="col-6 col-md-3">
                    <button
                        class="btn btn-block btn-block btn-default"
                        @click="storeConsents(); close()"
                        data-testing="cookie-bar-expanded-save">
                        {{ $translate("Ceres::Template.cookieBarSave") }}
                    </button>
                </div>
            </div>
        </div>

        <div v-else>
            <button class="btn btn-primary btn-appearance" @click.prevent.stop="isCollapsed = false" :aria-label="$translate('Ceres::Template.cookieBarPrivacySettings')">
                <i class="fa fa-shield float-none"></i>
                <span class="d-none d-sm-inline-block">{{ $translate("Ceres::Template.cookieBarPrivacySettings") }}</span>
            </button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    props:
    {
        styles: String,
        classes: String,
        consentGroups: Object
    },

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
            "acceptAll"
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
