<template>
    <div class="privacy-settings d-flex flex-column">
        <div class="privacy-settings-body overflow-auto">
            <div class="card consent-group" :class="{cardClass, 'mb-3': index < consentGroup.length - 1}" :style="cardStyle" v-for="(consentGroup, index) in consentGroups">
                <div class="card-body mb-0" @click.stop="toggleConsent(consentGroup.key + '.*')">
                    <p class="card-title h4 d-flex">
                        <span class="flex-fill">
                            <template v-if="consentGroup.label.length > 0">
                                {{ consentGroup.label }}
                            </template>
                            <template v-else>
                                {{ $translate("Ceres::Template.privacySettingsDefaultGroup") }}
                            </template>
                            ({{ consentGroup.consents.length }})
                        </span>
                        <span class="custom-control custom-switch custom-control-appearance" v-if="!consentGroup.necessary">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       :checked="isConsented(consentGroup.key + '.*')">
                                <label class="custom-control-label"></label>
                        </span>
                        <span class="badge badge-primary bg-appearance" v-else>{{ $translate("Ceres::Template.privacySettingsNecessary") }}</span>
                    </p>
                    <p class="card-text" v-if="consentGroup.description.length > 0">{{ consentGroup.description }}</p>
                </div>
                <div class="card-body mt-0">
                    <div v-if="expandedGroups[consentGroup.key]">
                        <div v-for="consent in consentGroup.consents" class="card consent bg-light mb-3"
                             :class="{'border-primary border-appearance active': isConsented(consentGroup.key + '.' + consent.key) || consent.necessary || consentGroup.necessary}">

                            <div class="card-body" @click.stop="toggleConsent(consentGroup.key + '.' + consent.key)">
                                <p class="d-flex mb-0 font-weight-bold">
                                    <span class="flex-fill">{{ consent.label }}</span>
                                    <span v-if="!consentGroup.necessary && !consent.necessary" class="custom-control custom-switch custom-control-appearance">
                                                <input type="checkbox"
                                                       class="custom-control-input"
                                                       :checked="isConsented(consentGroup.key + '.' + consent.key)">
                                                <label class="custom-control-label"></label>
                                    </span>
                                </p>
                            </div>
                            <table v-if="consent.provider.length > 0 || consent.description.length > 0 || consent.policyUrl.length > 0 || consent.lifespan.length > 0" class="table table-responsive-md table-sm table-striped mb-0">
                                <tbody>
                                <tr v-if="consent.provider.length > 0">
                                    <td class="pl-3">{{ $translate("Ceres::Template.privacySettingsProvider") }}</td>
                                    <td class="pr-3">{{ consent.provider }}</td>
                                </tr>
                                <tr v-if="consent.description.length > 0">
                                    <td class="pl-3">{{ $translate("Ceres::Template.privacySettingsDescription") }}</td>
                                    <td class="pr-3">{{ consent.description }}</td>
                                </tr>
                                <tr v-if="consent.policyUrl.length > 0">
                                    <td class="pl-3">{{ $translate("Ceres::Template.privacySettingsPolicyUrl") }}</td>
                                    <td class="pr-3">
                                        <a class="text-primary text-appearance" :href="consent.policyUrl" target="_blank">{{ consent.policyUrl }}</a>
                                    </td>
                                </tr>
                                <tr v-if="consent.lifespan.length > 0">
                                    <td class="pl-3">{{ $translate("Ceres::Template.privacySettingsLifespan") }}</td>
                                    <td class="pr-3">{{ consent.lifespan }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <a
                        href="#"
                        class="card-link text-primary text-appearance"
                        @click="setGroupVisibility(consentGroup.key, true, $event)"
                        v-if="!expandedGroups[consentGroup.key]"
                        data-testing="privacy-settings-show-more-information">
                        {{ $translate("Ceres::Template.privacySettingsMoreInformation") }}
                    </a>
                    <a
                        href="#"
                        class="card-link text-primary text-appearance"
                        @click="setGroupVisibility(consentGroup.key, false, $event)"
                        v-else
                        data-testing="privacy-settings-hide-more-information">>
                        {{ $translate("Ceres::Template.privacySettingsLessInformation") }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    props: {
        consentGroups: {
            type: Object
        },
        cardClass: {
            type: String
        },
        cardStyle: {
            type: String
        }
    },

    data()
    {
        return {
            expandedGroups: {}
        };
    },

    methods:
    {
        ...mapMutations([
            "toggleConsent"
        ]),

        isConsented(key, defaultValue)
        {
            return this.$store.getters.isConsented(key, defaultValue);
        },

        setGroupVisibility(groupKey, value, event)
        {
            event.preventDefault();
            event.stopPropagation();
            this.$set(this.expandedGroups, groupKey, value);
        }
    }
}
</script>
