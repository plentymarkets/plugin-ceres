import TranslationService from "../../services/TranslationService";
import Vue from "vue";
import { mapState } from "vuex";

Vue.component("address-input-group", {

    delimiters: ["${", "}"],

    props:
    {
        defaultCountry: {
            type: String,
            default: "DE"
        },
        addressType: String,
        modalType: String,
        template: String,
        value: {
            type: Object,
            default()
            {
                return {};
            }
        },
        optionalAddressFields: {
            type: Object,
            default: () =>
            {
                return {
                    de:[],
                    uk:[]
                };
            }
        },
        requiredAddressFields: {
            type: Object,
            default: () =>
            {
                return {
                    de:[],
                    uk:[]
                };
            }
        },
        defaultSalutation: {
            type: String,
            default: "male"
        }
    },

    computed:
    {
        isPickupStation()
        {
            return this.value && this.value.address1 === "PACKSTATION" && this.isParcelBoxAvailable;
        },

        isPostOffice()
        {
            return this.value && this.value.address1 === "POSTFILIALE" && this.isPostOfficeAvailable;
        },

        isParcelOrOfficeAvailable()
        {
            return (this.isParcelBoxAvailable || this.isPostOfficeAvailable) && this.selectedCountry && this.selectedCountry.isoCode2 === "DE" && this.addressType === "2";
        },

        ...mapState({
            isParcelBoxAvailable: state => state.checkout.shipping.isParcelBoxAvailable,
            isPostOfficeAvailable: state => state.checkout.shipping.isPostOfficeAvailable
        })
    },

    data()
    {
        return {
            stateList  : [],
            countryLocaleList: ["DE", "GB"],
            localeToShow: this.defaultCountry,
            selectedCountry: null
        };
    },

    methods:
    {
        /**
         * Update the address input group to show.
         * @param shippingCountry
         */
        onSelectedCountryChanged(shippingCountry)
        {
            this.selectedCountry = shippingCountry;

            if (this.countryLocaleList.indexOf(shippingCountry.isoCode2) >= 0)
            {
                this.localeToShow = shippingCountry.isoCode2;
            }
            else
            {
                this.localeToShow = this.defaultCountry;
            }

            this.emitInputEvent("countryId", shippingCountry.id);

            if (this.isPickupStation || this.isPostOffice)
            {
                this.togglePickupStation(false);
            }
        },

        togglePickupStation(showPickupStation)
        {
            const emitInputs =
                {
                    address1: "",
                    address2: "",
                    address3: "",
                    showPickupStation: showPickupStation
                };

            if (showPickupStation)
            {
                emitInputs.address1 = this.isParcelBoxAvailable ? "PACKSTATION" : "POSTFILIALE";
            }

            for (const input in emitInputs)
            {
                this.emitInputEvent(input, emitInputs[input]);
            }
        },

        /**
         * @param {string} field
         * @param {number} value
         */
        emitInputEvent(field, value)
        {
            this.$emit("input", { field, value });
        },

        isInOptionalFields(locale, key)
        {
            return this.optionalAddressFields[locale].includes(key);
        },

        isInRequiredFields(locale, key)
        {
            return (this.requiredAddressFields && this.requiredAddressFields[locale] && this.requiredAddressFields[locale].includes(key));
        },

        transformTranslation(translationKey, locale, addressKey)
        {
            const translation = TranslationService.translate(translationKey);
            const isRequired = this.isInRequiredFields(locale, addressKey);

            return translation + (isRequired ? "*" : "");
        },

        areNameFieldsShown(locale, keyPrefix)
        {
            const isSalutationActive = this.isInOptionalFields(locale, `${keyPrefix}.salutation`);
            const isContactPersonActive = this.isInOptionalFields(locale, `${keyPrefix}.contactPerson`);
            const isName1Active = this.isInOptionalFields(locale, `${keyPrefix}.name1`);
            const isSelectedSalutationCompany = this.value.gender === "company";

            const condition1 = isSalutationActive && isContactPersonActive && isSelectedSalutationCompany;
            const condition2 = !isSalutationActive && isName1Active && isContactPersonActive;

            return !(condition1 || condition2);
        },

        areNameFieldsRequired(locale, keyPrefix)
        {
            const isSalutationActive = this.isInOptionalFields(locale, `${keyPrefix}.salutation`);
            const isName1Active = this.isInOptionalFields(locale, `${keyPrefix}.name1`);
            const isContactPersonRequired = this.isInRequiredFields(locale, `${keyPrefix}.contactPerson`);
            const isSelectedSalutationCompany = this.value.gender === "company";

            const condition1 = isSalutationActive && !isSelectedSalutationCompany;
            const condition2 = isSalutationActive && isSelectedSalutationCompany && isContactPersonRequired;
            const condition3 = !isSalutationActive && isName1Active && isContactPersonRequired;
            const condition4 = !isSalutationActive && !isName1Active;

            return condition1 || condition2 || condition3 || condition4;
        }
    }
});
