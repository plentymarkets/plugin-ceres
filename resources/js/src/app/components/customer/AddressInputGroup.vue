<template>
    <div class="row">
        <!-- DHLPackingStationDE -->
        <template v-if="value.showPickupStation && selectedCountry.isoCode2 === 'DE' && addressType === '2'">
            <div class="col-12">
                <div class="row">
                    <div v-if="isInOptionalFields('de', 'delivery_address.salutation')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            v-validate="isInRequiredFields('de', 'delivery_address.salutation')">
                            <salutation-select :id="'txtSalutation' + _uid" :address-type="addressType" :address-data="value" :enabled-address-fields="optionalAddressFields" @input="emitInputEvent($event.field, $event.value)"></salutation-select>
                            <label :for="'txtSalutation' + _uid">
                                {{ transformTranslation("Ceres::Template.addressSalutation", "de", "delivery_address.salutation") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <div
                        class="col-12 col-sm-6"
                        v-if="isInOptionalFields('de', 'delivery_address.salutation') && value.gender === 'company' || isInOptionalFields('de', 'delivery_address.name1') && !isInOptionalFields('de', 'delivery_address.salutation')">
                        <div class="input-unit" data-model="name1" data-validate="text">
                            <input type="text" name="company" :id="'txtCompany' + _uid" :value="value.name1" @input="emitInputEvent('name1', $event.target.value)" data-testing="packing-station-de-company">
                            <label :for="'txtCompany' + _uid">{{ $translate("Ceres::Template.addressCompany") }}*</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <div v-if="isInOptionalFields('de', 'delivery_address.title')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="title"
                            v-validate:text="isInRequiredFields('de', 'delivery_address.title')">
                            <input type="text" name="title" :id="'txtTitle' + _uid" :value="value.title" @input="emitInputEvent('title', $event.target.value)">
                            <label :for="'txtTitle' + _uid">
                                {{ transformTranslation("Ceres::Template.addressTitle", "de", "delivery_address.title") }}
                            </label>
                        </div>
                    </div>

                    <template v-if="areNameFieldsShown('de', 'delivery_address')">
                        <!-- First name -->
                        <div class="col-12 col-sm-4">
                            <div class="input-unit" data-model="name2" v-validate:text="areNameFieldsRequired('de', 'delivery_address')">
                                <input type="text" name="firstName" :id="'txtFirstName' + _uid" :value="value.name2" @input="emitInputEvent('name2', $event.target.value)" data-testing="packing-station-de-firstname">
                                <label :for="'txtFirstName' + _uid">{{ $translate("Ceres::Template.addressFirstName") }}<template v-if="areNameFieldsRequired('de', 'delivery_address')">*</template></label>
                            </div>
                        </div>

                        <!-- Last name -->
                        <div class="col-12 col-sm-4">
                            <div class="input-unit" data-model="name3" v-validate:text="areNameFieldsRequired('de', 'delivery_address')">
                                <input type="text" name="lastName" :id="'txtLastName' + _uid" :value="value.name3" @input="emitInputEvent('name3', $event.target.value)" data-testing="packing-station-de-lastname">
                                <label :for="'txtLastName' + _uid">{{ $translate("Ceres::Template.addressLastName") }}<template v-if="areNameFieldsRequired('de', 'delivery_address')">*</template></label>
                            </div>
                        </div>
                    </template>

                    <div v-else class="col-12 col-sm-8">
                        <div
                            class="input-unit"
                            data-model="contactPerson"
                            v-validate:text="isInRequiredFields('de', 'delivery_address.contactPerson')">
                            <input type="text" name="lastName" :id="'txtContactPerson' + _uid" :value="value.contactPerson" @input="emitInputEvent('contactPerson', $event.target.value)">
                            <label :for="'txtContactPerson' + _uid">
                                {{ transformTranslation("Ceres::Template.addressContactPerson", "de", "delivery_address.contactPerson") }}
                            </label>
                        </div>
                    </div>

                    <!-- Additional name -->
                    <div v-if="isInOptionalFields('de', 'delivery_address.name4')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="name4"
                            v-validate:text="isInRequiredFields('de', 'delivery_address.name4')">
                            <input type="text" name="decorateName" :id="'txtAdditionalName' + _uid" :value="value.name4" @input="emitInputEvent('name4', $event.target.value)">
                            <label :for="'txtAdditionalName' + _uid">
                                {{ transformTranslation("Ceres::Template.addressAdditionalName", "de", "delivery_address.name4") }}
                            </label>
                        </div>
                    </div>

                    <!-- Phone number -->
                    <div v-if="isInOptionalFields('de', 'delivery_address.phoneNumber')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="telephone"
                            v-validate:text="isInRequiredFields('de', 'delivery_address.phoneNumber')">
                            <input type="text" name="telephone" :id="'txtTelephone' + _uid" :value="value.telephone" @input="emitInputEvent('telephone', $event.target.value)">
                            <label :for="'txtTelephone' + _uid">
                                {{ transformTranslation("Ceres::Template.addressTelephone", "de", "delivery_address.phoneNumber") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12" v-if="isParcelOrOfficeAvailable">
                <div class="row">
                    <div class="col-12">
                        <input type="checkbox" name="togglePickup" :checked="value.showPickupStation" @change="togglePickupStation($event.target.checked)" :id="'showPickup' + _uid">
                        <label :for="'showPickup' + _uid">{{ $translate("Ceres::Template.addressToPickupStation") }}</label>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <!-- Packstation, Postfiliale -->
                    <div class="col-12 col-sm-8">
                        <div class="input-unit" data-validate="" data-model="address1">
                            <select :id="'address1' + _uid" class="custom-select" :value="value.address1" @change="emitInputEvent('address1', $event.target.value)">
                                <option v-if="isParcelBoxAvailable" value="PACKSTATION" :selected="isPickupStation">{{ $translate("Ceres::Template.addressPackingStation") }}</option>
                                <option v-if="isPostOfficeAvailable" value="POSTFILIALE" :selected="isPostOffice">{{ $translate("Ceres::Template.addressPostOffice") }}</option>
                            </select>
                            <label for="'address1' + _uid">{{ $translate("Ceres::Template.addressPickupLocation") }}</label>
                        </div>
                    </div>

                    <!-- Packstationsnummer, Filialnummer -->
                    <div class="col-12 col-sm-4">
                        <div class="input-unit" data-validate="text" data-model="address2">
                            <input type="text" name="housenumber" autocomplete="address-line2" :id="'txtNumber' + _uid" :value="value.address2" @input="emitInputEvent('address2', $event.target.value)">
                            <label v-if="isPickupStation" :for="'txtNumber' + _uid">{{ $translate("Ceres::Template.addressPackingStationNumber") }}*</label>
                            <label v-if="isPostOffice" :for="'txtNumber' + _uid">{{ $translate("Ceres::Template.addressPostOfficeNumber") }}*</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <!-- PostNummer -->
                    <div class="col-12 col-sm-6">
                        <div class="input-unit" data-validate="text" data-model="postNumber">
                            <input type="text" name="postnumber" :id="'postnumber' + _uid"
                                    :value="value.postNumber" @input="emitInputEvent('postNumber', $event.target.value)" data-testing="packing-station-de-postnumber">
                            <label :for="'postnumber' + _uid">{{ $translate("Ceres::Template.addressPostNummer") }}*</label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('de', 'delivery_address.address4')" class="col-12 col-sm-6">
                        <div
                            class="input-unit"
                            data-model="address4"
                            v-validate:text="isInRequiredFields('de', 'delivery_address.address4')">
                            <input type="text" name="decorateAddress" :id="'decorateAddress1' + _uid"
                                    :value="value.address4" @input="emitInputEvent('address4', $event.target.value)">
                            <label :for="'decorateAddress1' + _uid">
                                {{ transformTranslation("Ceres::Template.addressAdditionalAddress2", "de", "delivery_address.address4") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-4">
                <div class="input-unit" data-validate="text" data-model="postalCode">
                    <input type="text" name="zip" :id="'txtZip' + _uid" :value="value.postalCode" @input="emitInputEvent('postalCode', $event.target.value)" data-testing="packing-station-de-postalcode">
                    <label :for="'txtZip' + _uid">{{ $translate("Ceres::Template.addressZip") }}*</label>
                </div>
            </div>

            <div class="col-12 col-sm-4">
                <div class="input-unit" data-validate="text" data-model="town">
                    <input type="text" name="town" :id="'txtPlace' + _uid" :value="value.town" @input="emitInputEvent('town', $event.target.value)" data-testing="packing-station-de-town">
                    <label :for="'txtPlace' + _uid">{{ $translate("Ceres::Template.addressPlace") }}*</label>
                </div>
            </div>

            <div class="col-12 col-sm-4" data-testing="address-country-select">
                <country-select
                    :selected-country-id="value.countryId"
                    :selected-state-id="value.stateId"
                    @country-changed="onSelectedCountryChanged($event)"
                    @state-changed="emitInputEvent('stateId', $event)"
                    :address-type="addressType"
                    :optional-address-fields="optionalAddressFields"
                    :required-address-fields="requiredAddressFields">
                </country-select>
            </div>

            <slot name="custom-address-fields"></slot>

            <!-- MailInput -->
            <div class="col-12">
                <hr class="mt-0">
                <div class="row">
                    <div class="col-12" v-if="isInOptionalFields('de', 'delivery_address.email')">
                        <div class="input-unit" data-model="email" v-validate:text="isInRequiredFields('de', 'delivery_address.email')">
                            <input type="mail" name="email" :id="'email' + _uid" :value="value.email" @input="emitInputEvent('email', $event.target.value)" data-testing="packing-station-de-email-input">
                            <label :for="'email' + _uid">{{ transformTranslation("Ceres::Template.addressMail", "de", "delivery_address.email") }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <!-- BillingAddressDE -->
        <template v-else-if="localeToShow == 'DE' && addressType === '1'">
            <div class="col-12">
                <div class="row">
                    <div v-if="isInOptionalFields('de', 'billing_address.salutation')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            v-validate="isInRequiredFields('de', 'billing_address.salutation')">
                            <salutation-select :id="'txtSalutation' + _uid" :address-type="addressType" :address-data="value" :enabled-address-fields="optionalAddressFields" :default-salutation="defaultSalutation" @input="emitInputEvent($event.field, $event.value)"></salutation-select>
                            <label :for="'txtSalutation' + _uid">
                                {{ transformTranslation("Ceres::Template.addressSalutation", "de", "billing_address.salutation") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <div
                        class="col-12 col-sm-6"
                        v-if="isInOptionalFields('de', 'billing_address.salutation') && value.gender === 'company' || isInOptionalFields('de', 'billing_address.name1') && !isInOptionalFields('de', 'billing_address.salutation')">
                        <div class="input-unit" data-validate="text" data-model="name1">
                            <input type="text" name="company" :id="'txtCompany' + _uid" :value="value.name1" @input="emitInputEvent('name1', $event.target.value)" data-autofocus data-testing="billing-address-de-company">
                            <label :for="'txtCompany' + _uid">{{ $translate("Ceres::Template.addressCompany") }}*</label>
                        </div>
                    </div>

                    <div class="col-12 col-sm-6">
                        <vat-id
                            :is-required="isInRequiredFields('de', 'billing_address.vatNumber')"
                            :selected-country-id="value.countryId"
                            @input="emitInputEvent('vatNumber', $event)"
                            :value="value.vatNumber || ''"
                            :show-input="(isInOptionalFields('de', 'billing_address.salutation') && value.gender === 'company' &&  isInOptionalFields('de', 'billing_address.vatNumber')) ||
                            (!isInOptionalFields('de', 'billing_address.salutation') && isInOptionalFields('de', 'billing_address.name1') && isInOptionalFields('de', 'billing_address.vatNumber'))">
                        </vat-id>
                    </div>
                </div>
            </div>

            <div class="col-12" data-testing="billing-address-de-name-inputs">
                <div class="row">
                    <div v-if="isInOptionalFields('de', 'billing_address.title')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="title"
                            v-validate:text="isInRequiredFields('de', 'billing_address.title')">
                            <input type="text" name="title" :id="'txtTitle' + _uid" :value="value.title"  @input="emitInputEvent('title', $event.target.value)" data-autofocus data-testing="billing-address-de-title">
                            <label :for="'txtTitle' + _uid">
                                {{ transformTranslation("Ceres::Template.addressTitle", "de", "billing_address.title") }}
                            </label>
                        </div>
                    </div>

                    <template v-if="areNameFieldsShown('de', 'billing_address')">
                        <div class="col-12 col-sm-4">
                            <div class="input-unit" data-model="name2" v-validate:text="areNameFieldsRequired('de', 'billing_address')">
                                <input type="text" name="firstName" :id="'txtFirstName' + _uid" :value="value.name2"  @input="emitInputEvent('name2', $event.target.value)" data-autofocus data-testing="billing-address-de-firstname">
                                <label :for="'txtFirstName' + _uid">{{ $translate("Ceres::Template.addressFirstName") }}<template v-if="areNameFieldsRequired('de', 'billing_address')">*</template></label>
                            </div>
                        </div>
                        <div class="col-12 col-sm-4">
                            <div class="input-unit" data-model="name3" v-validate:text="areNameFieldsRequired('de', 'billing_address')">
                                <input type="text" name="lastName" :id="'txtLastName' + _uid" :value="value.name3" @input="emitInputEvent('name3', $event.target.value)" data-testing="billing-address-de-lastname">
                                <label :for="'txtLastName' + _uid">{{ $translate("Ceres::Template.addressLastName") }}<template v-if="areNameFieldsRequired('de', 'billing_address')">*</template></label>
                            </div>
                        </div>
                    </template>

                    <div v-else class="col-12 col-sm-8">
                        <div
                            class="input-unit"
                            data-model="contactPerson"
                            v-validate:text="isInRequiredFields('de', 'billing_address.contactPerson')">
                            <input type="text" name="lastName" :id="'txtContactPerson' + _uid" :value="value.contactPerson" @input="emitInputEvent('contactPerson', $event.target.value)">
                            <label :for="'txtContactPerson' + _uid">
                                {{ transformTranslation("Ceres::Template.addressContactPerson", "de", "billing_address.contactPerson") }}
                            </label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('de', 'billing_address.name4')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="name4"
                            v-validate:text="isInRequiredFields('de', 'billing_address.name4')">
                            <input type="text" name="decorateName" :id="'txtAdditionalName' + _uid" :value="value.name4" @input="emitInputEvent('name4', $event.target.value)">
                            <label :for="'txtAdditionalName' + _uid">
                                {{ transformTranslation("Ceres::Template.addressAdditionalName", "de", "billing_address.name4") }}
                            </label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('de', 'billing_address.birthday')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="birthday"
                            v-validate:date="isInRequiredFields('de', 'billing_address.birthday') || !!value.birthday && !!value.birthday.length">
                            <input type="date" min="1901-12-14" :max="new Date().toISOString().split('T')[0]" name="birthday" :placeholder="$translate('Ceres::Template.addressBirthdatePlaceholder')" :id="'txtBirthdate' + _uid" :value="value.birthday" @input="emitInputEvent('birthday', $event.target.value)">
                            <label :for="'txtBirthdate' + _uid">
                                {{ transformTranslation("Ceres::Template.addressBirthdate", "de", "billing_address.birthday") }}
                            </label>
                        </div>
                    </div>
                    <div v-if="isInOptionalFields('de', 'billing_address.phoneNumber')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="telephone"
                            v-validate:text="isInRequiredFields('de', 'billing_address.phoneNumber')">
                            <input type="text" name="telephone" :id="'txtTelephone' + _uid" :value="value.telephone" @input="emitInputEvent('telephone', $event.target.value)">
                            <label :for="'txtTelephone' + _uid">
                                {{ transformTranslation("Ceres::Template.addressTelephone", "de", "billing_address.phoneNumber") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12" data-testing="billing-address-de-street-inputs">
                <div class="row">
                    <div class="col-12 col-sm-8">
                        <div class="input-unit" data-validate="text" data-model="address1">
                            <input type="text" name="street" autocomplete="address-line1" :id="'txtStreet' + _uid" :value="value.address1" @input="emitInputEvent('address1', $event.target.value)" data-testing="billing-address-de-street">
                            <label :for="'txtStreet' + _uid">{{ $translate("Ceres::Template.addressStreet") }}*</label>
                        </div>
                    </div>

                    <div class="col-12 col-sm-4">
                        <div class="input-unit" data-validate="text" data-model="address2">
                            <input type="text" name="housenumber" autocomplete="address-line2" :id="'txtNumber' + _uid" :value="value.address2" @input="emitInputEvent('address2', $event.target.value)" data-testing="billing-address-de-house-number">
                            <label :for="'txtNumber' + _uid">{{ $translate("Ceres::Template.addressNumber") }}*</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <div v-if="isInOptionalFields('de', 'billing_address.address3')" class="col-12 col-sm-6">
                        <div
                            class="input-unit"
                            data-model="address3"
                            v-validate:text="isInRequiredFields('de', 'billing_address.address3')">
                            <input type="text" name="decorateAddress" :id="'decorateAddress0' + _uid" :value="value.address3" @input="emitInputEvent('address3', $event.target.value)">
                            <label :for="'decorateAddress0' + _uid">
                                {{ transformTranslation("Ceres::Template.addressAdditionalAddress1", "de", "billing_address.address3") }}
                            </label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('de', 'billing_address.address4')" class="col-12 col-sm-6">
                        <div
                            class="input-unit"
                            data-model="address4"
                            v-validate:text="isInRequiredFields('de', 'billing_address.address4')">
                            <input type="text" name="decorateAddress" :id="'decorateAddress1' + _uid" :value="value.address4" @input="emitInputEvent('address4', $event.target.value)">
                            <label :for="'decorateAddress1' + _uid">
                                {{ transformTranslation("Ceres::Template.addressAdditionalAddress2", "de", "billing_address.address4") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-4">
                <div class="input-unit" data-validate="text" data-model="postalCode">
                    <input type="text" name="zip" :id="'txtZip' + _uid" :value="value.postalCode" @input="emitInputEvent('postalCode', $event.target.value)" data-testing="billing-address-de-zip">
                    <label :for="'txtZip' + _uid">{{ $translate("Ceres::Template.addressZip") }}*</label>
                </div>
            </div>

            <div class="col-12 col-sm-4">
                <div class="input-unit" data-validate="text" data-model="town">
                    <input type="text" name="town" :id="'txtPlace' + _uid" :value="value.town" @input="emitInputEvent('town', $event.target.value)" data-testing="billing-address-de-town">
                    <label :for="'txtPlace' + _uid">{{ $translate("Ceres::Template.addressPlace") }}*</label>
                </div>
            </div>

            <div class="col-12 col-sm-4" data-testing="address-country-select">
                <country-select
                    :selected-country-id="value.countryId"
                    :selected-state-id="value.stateId"
                    @country-changed="onSelectedCountryChanged($event)"
                    @state-changed="emitInputEvent('stateId', $event)"
                    :address-type="addressType"
                    :optional-address-fields="optionalAddressFields"
                    :required-address-fields="requiredAddressFields">
                </country-select>
            </div>

            <slot name="custom-address-fields"></slot>

            <!-- MailInput -->
            <div class="col-12">
                <hr class="mt-0">
                <div class="row">
                    <div class="col-12" v-if="isInOptionalFields('de', 'billing_address.email')">
                        <div class="input-unit" data-model="email" v-validate:text="isInRequiredFields('de', 'billing_address.email')">
                            <input type="mail" name="email" :id="'email' + _uid" :value="value.email" @input="emitInputEvent('email', $event.target.value)" data-testing="billing-address-de-email-input">
                            <label :for="'email' + _uid">{{ transformTranslation("Ceres::Template.addressMail", "de", "billing_address.email") }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <!-- BillingAddressGB -->
        <template v-else-if="localeToShow == 'GB' && addressType === '1'">
            <div class="col-12">
                <div class="row">
                    <div v-if="isInOptionalFields('gb', 'billing_address.salutation')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            v-validate="isInRequiredFields('gb', 'billing_address.salutation')">
                            <salutation-select :id="'txtSalutation' + _uid" :address-type="addressType" :address-data="value" :enabled-address-fields="optionalAddressFields" @input="emitInputEvent($event.field, $event.value)"></salutation-select>
                            <label :for="'txtSalutation' + _uid">
                                {{ transformTranslation("Ceres::Template.addressSalutation", "gb", "billing_address.salutation") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <div
                        class="col-12 col-sm-6"
                        v-if="isInOptionalFields('gb', 'billing_address.salutation') && value.gender === 'company' || isInOptionalFields('gb', 'billing_address.name1') && !isInOptionalFields('gb', 'billing_address.salutation')">
                        <div class="input-unit" data-validate="text" data-model="name1">
                            <input type="text" name="company" :id="'txtCompany' + _uid" :value="value.name1" @input="emitInputEvent('name1', $event.target.value)" data-autofocus>
                            <label :for="'txtCompany' + _uid">{{ $translate("Ceres::Template.addressCompany") }}*</label>
                        </div>
                    </div>

                    <div class="col-12 col-sm-6">
                        <vat-id
                            :is-required="isInRequiredFields('gb', 'billing_address.vatNumber')"
                            :selected-country-id="value.countryId"
                            @input="emitInputEvent('vatNumber', $event)"
                            :value="value.vatNumber || ''"
                            :show-input="(isInOptionalFields('gb', 'billing_address.salutation') && value.gender === 'company' &&  isInOptionalFields('gb', 'billing_address.vatNumber')) ||
                            (!isInOptionalFields('gb', 'billing_address.salutation') && isInOptionalFields('gb', 'billing_address.name1') && isInOptionalFields('gb', 'billing_address.vatNumber'))">
                        </vat-id>
                    </div>
                </div>
            </div>


            <div class="col-12">
                <div class="row">
                    <div v-if="isInOptionalFields('gb', 'billing_address.title')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="title"
                            v-validate:text="isInRequiredFields('gb', 'billing_address.title')">
                            <input type="text" name="title" :id="'txtTitle' + _uid" :value="value.title" @input="emitInputEvent('title', $event.target.value)" data-autofocus>
                            <label :for="'txtTitle' + _uid">
                                {{ transformTranslation("Ceres::Template.addressTitle", "gb", "billing_address.title") }}
                            </label>
                        </div>
                    </div>

                    <template v-if="areNameFieldsShown('gb', 'billing_address')">
                        <div class="col-12 col-sm-4">
                            <div class="input-unit" data-model="name2" v-validate:text="areNameFieldsRequired('gb', 'billing_address')">
                                <input type="text" name="firstName" :id="'txtFirstName' + _uid" :value="value.name2" @input="emitInputEvent('name2', $event.target.value)" data-model="name2" data-autofocus>
                                <label :for="'txtFirstName' + _uid">{{ $translate("Ceres::Template.addressFirstName") }}<template v-if="areNameFieldsRequired('gb', 'billing_address')">*</template></label>
                            </div>
                        </div>

                        <div class="col-12 col-sm-4">
                            <div class="input-unit" data-model="name3" v-validate:text="areNameFieldsRequired('gb', 'billing_address')">
                                <input type="text" name="lastName" :id="'txtLastName' + _uid" :value="value.name3" @input="emitInputEvent('name3', $event.target.value)" data-model="name3">
                                <label :for="'txtLastName' + _uid">{{ $translate("Ceres::Template.addressLastName") }}<template v-if="areNameFieldsRequired('gb', 'billing_address')">*</template></label>
                            </div>
                        </div>
                    </template>

                    <div v-else class="col-12 col-sm-8">
                        <div
                            class="input-unit"
                            data-model="contactPerson"
                            v-validate:text="isInRequiredFields('gb', 'billing_address.contactPerson')">
                            <input type="text" name="lastName" :id="'txtContactPerson' + _uid" :value="value.contactPerson" @input="emitInputEvent('contactPerson', $event.target.value)">
                            <label :for="'txtContactPerson' + _uid">
                                {{ transformTranslation("Ceres::Template.addressContactPerson", "gb", "billing_address.contactPerson") }}
                            </label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('gb', 'billing_address.name4')" class="col-sm-4">
                        <div
                            class="input-unit"
                            data-model="name4"
                            v-validate:text="isInRequiredFields('gb', 'billing_address.name4')">
                            <input type="text" name="decorateName" :id="'txtAdditionalName' + _uid" :value="value.name4" @input="emitInputEvent('name4', $event.target.value)">
                            <label :for="'txtAdditionalName' + _uid">
                                {{ transformTranslation("Ceres::Template.addressGBNameAffix", "gb", "billing_address.name4") }}
                            </label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('gb', 'billing_address.birthday')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="birthday"
                            v-validate:date="isInRequiredFields('gb', 'billing_address.birthday') || !!value.birthday && !!value.birthday.length">
                            <input type="date" min="1901-12-14" :max="new Date().toISOString().split('T')[0]" name="birthday" :placeholder="$translate('Ceres::Template.addressBirthdatePlaceholder')" :id="'txtBirthdate' + _uid" :value="value.birthday" @input="emitInputEvent('birthday', $event.target.value)">
                            <label :for="'txtBirthdate' + _uid">
                                {{ transformTranslation("Ceres::Template.addressBirthdate", "gb", "billing_address.birthday") }}
                            </label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('gb', 'billing_address.phoneNumber')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="telephone"
                            v-validate:text="isInRequiredFields('gb', 'billing_address.phoneNumber')">
                            <input type="text" name="telephone" :id="'txtTelephone' + _uid" :value="value.telephone" @input="emitInputEvent('telephone', $event.target.value)">
                            <label :for="'txtTelephone' + _uid">
                                {{ transformTranslation("Ceres::Template.addressTelephone", "gb", "billing_address.phoneNumber") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12" data-testing="invoice-addresses-street-select-gb">
                <div class="row">
                    <div class="col-12 col-sm-12">
                        <div class="input-unit" data-validate="text" data-model="address1">
                            <input type="text" name="street" autocomplete="address-line1" :id="'txtStreet' + _uid" :value="value.address1" @input="emitInputEvent('address1', $event.target.value)">
                            <label :for="'txtStreet' + _uid">{{ $translate("Ceres::Template.addressENAddressLine1") }}*</label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('gb', 'billing_address.address2')" class="col-12 col-sm-12">
                        <div
                            class="input-unit"
                            data-model="address2"
                            v-validate:text="isInRequiredFields('gb', 'billing_address.address2')">
                            <input type="text" name="housenumber" autocomplete="address-line2" :id="'txtNumber' + _uid" :value="value.address2" @input="emitInputEvent('address2', $event.target.value)">
                            <label :for="'txtNumber' + _uid">
                                {{ transformTranslation("Ceres::Template.addressENAddressLine2", "gb", "billing_address.address2") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <div v-if="isInOptionalFields('gb', 'billing_address.address3')" class="col-12 col-sm-12">
                        <div
                            class="input-unit"
                            data-model="address3"
                            v-validate:text="isInRequiredFields('gb', 'billing_address.address3')">
                            <input type="text" name="buildingName" :id="'decorateAddress0' + _uid" :value="value.address3"  @input="emitInputEvent('address3', $event.target.value)">
                            <label :for="'decorateAddress0' + _uid">
                                {{ transformTranslation("Ceres::Template.addressENAddressLine3", "gb", "billing_address.address3") }}
                            </label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('gb', 'billing_address.address4')" class="col-12 col-sm-12">
                        <div
                            class="input-unit"
                            data-model="address4"
                            v-validate:text="isInRequiredFields('gb', 'billing_address.address4')">
                            <input type="text" name="buildingName" :id="'decorateAddress0' + _uid" :value="value.address4"  @input="emitInputEvent('address4', $event.target.value)">
                            <label :for="'decorateAddress0' + _uid">
                                {{ transformTranslation("Ceres::Template.addressENAddressLine4", "gb", "billing_address.address4") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>


            <div class="col-12 col-sm-4">
                <div class="input-unit" data-validate="text" data-model="town">
                    <input type="text" name="town" :id="'txtPlace' + _uid" :value="value.town"  @input="emitInputEvent('town', $event.target.value)">
                    <label :for="'txtPlace' + _uid">{{ $translate("Ceres::Template.addressPlace") }}*</label>
                </div>
            </div>

            <div class="col-12 col-sm-4">
                <div class="input-unit" data-validate="text" data-model="postalCode">
                    <input type="text" name="zip" :id="'txtZip' + _uid" :value="value.postalCode"  @input="emitInputEvent('postalCode', $event.target.value)">
                    <label :for="'txtZip' + _uid">{{ $translate("Ceres::Template.addressZip") }}*</label>
                </div>
            </div>

            <div class="col-12 col-sm-4" data-testing="address-country-select">
                <country-select
                    :selected-country-id="value.countryId"
                    :selected-state-id="value.stateId"
                    @country-changed="onSelectedCountryChanged($event)"
                    @state-changed="emitInputEvent('stateId', $event)"
                    :address-type="addressType"
                    :optional-address-fields="optionalAddressFields"
                    :required-address-fields="requiredAddressFields">
                </country-select>
            </div>

            <slot name="custom-address-fields"></slot>

            <!-- MailInput -->
            <div class="col-12">
                <hr class="mt-0">
                <div class="row">
                    <div class="col-12" v-if="isInOptionalFields('gb', 'billing_address.email')">
                        <div class="input-unit" data-model="email" v-validate:text="isInRequiredFields('gb', 'billing_address.email')">
                            <input type="mail" name="email" :id="'email' + _uid" :value="value.email" @input="emitInputEvent('email', $event.target.value)" data-testing="billing-address-gb-email-input">
                            <label :for="'email' + _uid">{{ transformTranslation("Ceres::Template.addressMail", "gb", "billing_address.email") }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <!-- DeliveryAddressDE -->
        <template v-else-if="localeToShow == 'DE' && addressType === '2'">
            <div class="col-12">
                <div class="row">
                    <div v-if="isInOptionalFields('de', 'delivery_address.salutation')" class="col-12 col-sm-4">
                        <div class="input-unit" v-validate="isInRequiredFields('de', 'delivery_address.salutation')">
                            <salutation-select :id="'txtSalutation' + _uid" :address-type="addressType" :address-data="value" :enabled-address-fields="optionalAddressFields" @input="emitInputEvent($event.field, $event.value)"></salutation-select>
                            <label :for="'txtSalutation' + _uid">
                                {{ transformTranslation("Ceres::Template.addressSalutation", "de", "delivery_address.salutation") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <div class="col-12 col-sm-6"
                        v-if="isInOptionalFields('de', 'delivery_address.salutation') && value.gender === 'company' || isInOptionalFields('de', 'delivery_address.name1') && !isInOptionalFields('de', 'delivery_address.salutation')">
                        <div class="input-unit" data-validate="text" data-model="name1">
                            <input type="text" name="company" :id="'txtCompany' + _uid" :value="value.name1" @input="emitInputEvent('name1', $event.target.value)" data-autofocus>
                            <label :for="'txtCompany' + _uid">{{ $translate("Ceres::Template.addressCompany") }}*</label>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6">
                        <vat-id
                            :is-required="isInRequiredFields('de', 'delivery_address.vatNumber')"
                            :selected-country-id="value.countryId"
                            @input="emitInputEvent('vatNumber', $event)"
                            :value="value.vatNumber || ''"
                            :show-input="(isInOptionalFields('de', 'delivery_address.salutation') && value.gender === 'company' &&  isInOptionalFields('de', 'delivery_address.vatNumber')) ||
                            (!isInOptionalFields('de', 'delivery_address.salutation') && isInOptionalFields('de', 'delivery_address.name1') && isInOptionalFields('de', 'delivery_address.vatNumber'))">
                        </vat-id>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <div v-if="isInOptionalFields('de', 'delivery_address.title')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="title"
                            v-validate:text="isInRequiredFields('de', 'delivery_address.title')">
                            <input type="text" name="title" :id="'txtTitle' + _uid" :value="value.title" @input="emitInputEvent('title', $event.target.value)" data-autofocus>
                            <label :for="'txtTitle' + _uid">
                                {{ transformTranslation("Ceres::Template.addressTitle", "de", "delivery_address.title") }}
                            </label>
                        </div>
                    </div>

                    <template v-if="areNameFieldsShown('de', 'delivery_address')">
                        <div class="col-12 col-sm-4">
                            <div class="input-unit" data-model="name2" v-validate:text="areNameFieldsRequired('de', 'delivery_address')">
                                <input type="text" name="firstName" :id="'txtFirstName' + _uid" :value="value.name2" @input="emitInputEvent('name2', $event.target.value)" data-autofocus data-testing="delivery-address-de-firstname">
                                <label :for="'txtFirstName' + _uid">{{ $translate("Ceres::Template.addressFirstName") }}<template v-if="areNameFieldsRequired('de', 'delivery_address')">*</template></label>
                            </div>
                        </div>

                        <div class="col-12 col-sm-4">
                            <div class="input-unit" data-model="name3" v-validate:text="areNameFieldsRequired('de', 'delivery_address')">
                                <input type="text" name="lastName" :id="'txtLastName' + _uid" :value="value.name3" @input="emitInputEvent('name3', $event.target.value)" data-testing="delivery-address-de-lastname">
                                <label :for="'txtLastName' + _uid">{{ $translate("Ceres::Template.addressLastName") }}<template v-if="areNameFieldsRequired('de', 'delivery_address')">*</template></label>
                            </div>
                        </div>
                    </template>

                    <div v-else class="col-12 col-sm-8">
                        <div
                            class="input-unit"
                            data-model="contactPerson"
                            v-validate:text="isInRequiredFields('de', 'delivery_address.contactPerson')">
                            <input type="text" name="lastName" :id="'txtContactPerson' + _uid" :value="value.contactPerson" @input="emitInputEvent('contactPerson', $event.target.value)">
                            <label :for="'txtContactPerson' + _uid">
                                {{ transformTranslation("Ceres::Template.addressContactPerson", "de", "delivery_address.contactPerson") }}
                            </label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('de', 'delivery_address.name4')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="name4"
                            v-validate:text="isInRequiredFields('de', 'delivery_address.name4')">
                            <input type="text" name="decorateName" :id="'txtAdditionalName' + _uid" :value="value.name4" @input="emitInputEvent('name4', $event.target.value)">
                            <label :for="'txtAdditionalName' + _uid">
                                {{ transformTranslation("Ceres::Template.addressAdditionalName", "de", "delivery_address.name4") }}
                            </label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('de', 'delivery_address.phoneNumber')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="telephone"
                            v-validate:text="isInRequiredFields('de', 'delivery_address.phoneNumber')">
                            <input type="text" name="telephone" :id="'txtTelephone' + _uid" :value="value.telephone" @input="emitInputEvent('telephone', $event.target.value)">
                            <label :for="'txtTelephone' + _uid">
                                {{ transformTranslation("Ceres::Template.addressTelephone", "de", "delivery_address.phoneNumber") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12" v-if="isParcelOrOfficeAvailable">
                <div class="row">
                    <div class="col-12">
                        <input type="checkbox" name="togglePickup" :checked="value.showPickupStation" @change="togglePickupStation($event.target.checked)" :id="'showPickup' + _uid">
                        <label :for="'showPickup' + _uid">{{ $translate("Ceres::Template.addressToPickupStation") }}</label>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <div class="col-12 col-sm-8">
                        <div class="input-unit" data-validate="text" data-model="address1">
                            <input type="text" name="street" autocomplete="address-line1" :id="'txtStreet' + _uid" :value="value.address1" @input="emitInputEvent('address1', $event.target.value)" data-testing="delivery-address-de-street">
                            <label :for="'txtStreet' + _uid">{{ $translate("Ceres::Template.addressStreet") }}*</label>
                        </div>
                    </div>

                    <div class="col-12 col-sm-4">
                        <div class="input-unit" data-validate="text" data-model="address2">
                            <input type="text" name="housenumber" autocomplete="address-line2" :id="'txtNumber' + _uid" :value="value.address2" @input="emitInputEvent('address2', $event.target.value)" data-testing="delivery-address-de-housenumber">
                            <label :for="'txtNumber' + _uid">{{ $translate("Ceres::Template.addressNumber") }}*</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <div v-if="isInOptionalFields('de', 'delivery_address.address3')" class="col-12 col-sm-6">
                        <div
                            class="input-unit"
                            data-model="address3"
                            v-validate:text="isInRequiredFields('de', 'delivery_address.address3')">
                            <input type="text" name="decorateAddress" :id="'decorateAddress0' + _uid"
                                    :value="value.address3" @input="emitInputEvent('address3', $event.target.value)">
                            <label :for="'decorateAddress0' + _uid">
                                {{ transformTranslation("Ceres::Template.addressAdditionalAddress1", "de", "delivery_address.address3") }}
                            </label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('de', 'delivery_address.address4')" class="col-12 col-sm-6">
                        <div
                            class="input-unit"
                            data-model="address4"
                            v-validate:text="isInRequiredFields('de', 'delivery_address.address4')">
                            <input type="text" name="decorateAddress" :id="'decorateAddress1' + _uid"
                                    :value="value.address4" @input="emitInputEvent('address4', $event.target.value)">
                            <label :for="'decorateAddress1' + _uid">
                                {{ transformTranslation("Ceres::Template.addressAdditionalAddress2", "de", "delivery_address.address4") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-4">
                <div class="input-unit" data-validate="text" data-model="postalCode">
                    <input type="text" name="zip" :id="'txtZip' + _uid" :value="value.postalCode" @input="emitInputEvent('postalCode', $event.target.value)" data-testing="delivery-address-de-zip">
                    <label :for="'txtZip' + _uid">{{ $translate("Ceres::Template.addressZip") }}*</label>
                </div>
            </div>

            <div class="col-12 col-sm-4">
                <div class="input-unit" data-validate="text" data-model="town">
                    <input type="text" name="town" :id="'txtPlace' + _uid" :value="value.town" @input="emitInputEvent('town', $event.target.value)" data-testing="delivery-address-de-town">
                    <label :for="'txtPlace' + _uid">{{ $translate("Ceres::Template.addressPlace") }}*</label>
                </div>
            </div>

            <div class="col-12 col-sm-4" data-testing="address-country-select">
                <country-select
                    :selected-country-id="value.countryId"
                    :selected-state-id="value.stateId"
                    @country-changed="onSelectedCountryChanged($event)"
                    @state-changed="emitInputEvent('stateId', $event)"
                    :address-type="addressType"
                    :optional-address-fields="optionalAddressFields"
                    :required-address-fields="requiredAddressFields">
                </country-select>
            </div>

            <slot name="custom-address-fields"></slot>

            <!-- MailInput -->
            <div class="col-12">
                <hr class="mt-0">
                <div class="row">
                    <div class="col-12" v-if="isInOptionalFields('de', 'delivery_address.email')">
                        <div class="input-unit" data-model="email" v-validate:text="isInRequiredFields('de', 'delivery_address.email')">
                            <input type="mail" name="email" :id="'email' + _uid" :value="value.email" @input="emitInputEvent('email', $event.target.value)" data-testing="delivery-address-de-email-input">
                            <label :for="'email' + _uid">{{ transformTranslation("Ceres::Template.addressMail", "de", "delivery_address.email") }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <!-- DeliveryAddressGB -->
        <template v-else-if="localeToShow == 'GB' && addressType === '2'">
            <div class="col-12">
                <div class="row">
                    <div v-if="isInOptionalFields('gb', 'delivery_address.salutation')" class="col-12 col-sm-4">
                        <div class="input-unit" v-validate="isInRequiredFields('gb', 'delivery_address.salutation')">
                            <salutation-select :id="'txtSalutation' + _uid" :address-type="addressType" :address-data="value" :enabled-address-fields="optionalAddressFields" @input="emitInputEvent($event.field, $event.value)"></salutation-select>
                            <label :for="'txtSalutation' + _uid">
                                {{ transformTranslation("Ceres::Template.addressSalutation", "gb", "delivery_address.salutation") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <div class="col-12 col-sm-6"
                        v-if="isInOptionalFields('gb', 'delivery_address.salutation') && value.gender === 'company' || isInOptionalFields('gb', 'delivery_address.name1') && !isInOptionalFields('gb', 'delivery_address.salutation')">
                        <div class="input-unit" data-validate="text" data-model="name1">
                            <input type="text" name="company" :id="'txtCompany' + _uid" :value="value.name1" @input="emitInputEvent('name1', $event.target.value)" data-autofocus>
                            <label :for="'txtCompany' + _uid">{{ $translate("Ceres::Template.addressCompany") }}*</label>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6">
                        <vat-id
                            :is-required="isInRequiredFields('gb', 'delivery_address.vatNumber')"
                            :selected-country-id="value.countryId"
                            @input="emitInputEvent('vatNumber', $event)"
                            :value="value.vatNumber || ''"
                            :show-input="(isInOptionalFields('gb', 'delivery_address.salutation') && value.gender === 'company' &&  isInOptionalFields('gb', 'delivery_address.vatNumber')) ||
                            (!isInOptionalFields('gb', 'delivery_address.salutation') && isInOptionalFields('gb', 'delivery_address.name1') && isInOptionalFields('gb', 'delivery_address.vatNumber'))">
                        </vat-id>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <div v-if="isInOptionalFields('gb', 'delivery_address.title')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="title"
                            v-validate:text="isInRequiredFields('gb', 'delivery_address.title')">
                            <input type="text" name="title" :id="'txtTitle' + _uid" :value="value.title"  @input="emitInputEvent('title', $event.target.value)" data-autofocus>
                            <label :for="'txtTitle' + _uid">
                                {{ transformTranslation("Ceres::Template.addressTitle", "gb", "delivery_address.title") }}
                            </label>
                        </div>
                    </div>

                    <template v-if="areNameFieldsShown('gb', 'delivery_address')">
                        <div class="col-12 col-sm-4">
                            <div class="input-unit" data-model="name2" v-validate:text="areNameFieldsRequired('gb', 'delivery_address')">
                                <input type="text" name="firstName" :id="'txtFirstName' + _uid" :value="value.name2" @input="emitInputEvent('name2', $event.target.value)" data-autofocus>
                                <label :for="'txtFirstName' + _uid">{{ $translate("Ceres::Template.addressFirstName") }}<template v-if="areNameFieldsRequired('gb', 'delivery_address')">*</template></label>
                            </div>
                        </div>

                        <div class="col-12 col-sm-4">
                            <div class="input-unit" data-model="name3" v-validate:text="areNameFieldsRequired('gb', 'delivery_address')">
                                <input type="text" name="lastName" :id="'txtLastName' + _uid" :value="value.name3" @input="emitInputEvent('name3', $event.target.value)">
                                <label :for="'txtLastName' + _uid">{{ $translate("Ceres::Template.addressLastName") }}<template v-if="areNameFieldsRequired('gb', 'delivery_address')">*</template></label>
                            </div>
                        </div>
                    </template>

                    <div v-else class="col-12 col-sm-8">
                        <div
                            class="input-unit"
                            data-model="contactPerson"
                            v-validate:text="isInRequiredFields('gb', 'delivery_address.contactPerson')">
                            <input type="text" name="lastName" :id="'txtContactPerson' + _uid" :value="value.contactPerson" @input="emitInputEvent('contactPerson', $event.target.value)">
                            <label :for="'txtContactPerson' + _uid">
                                {{ transformTranslation("Ceres::Template.addressContactPerson", "gb", "delivery_address.contactPerson") }}
                            </label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('gb', 'delivery_address.name4')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="name4"
                            v-validate:text="isInRequiredFields('gb', 'delivery_address.name4')">
                            <input type="text" name="decorateName" :id="'txtAdditionalName' + _uid" :value="value.name4" @input="emitInputEvent('name4', $event.target.value)">
                            <label :for="'txtAdditionalName' + _uid">
                                {{ transformTranslation("Ceres::Template.addressGBNameAffix", "gb", "delivery_address.name4") }}
                            </label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('gb', 'delivery_address.phoneNumber')" class="col-12 col-sm-4">
                        <div
                            class="input-unit"
                            data-model="telephone"
                            v-validate:text="isInRequiredFields('gb', 'delivery_address.phoneNumber')">
                            <input type="text" name="telephone" :id="'txtTelephone' + _uid" :value="value.telephone" @input="emitInputEvent('telephone', $event.target.value)">
                            <label :for="'txtTelephone' + _uid">
                                {{ transformTranslation("Ceres::Template.addressTelephone", "gb", "delivery_address.phoneNumber") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-12 col-sm-8">
                        <div class="input-unit" data-validate="text" data-model="address1">
                            <input type="text" name="street" autocomplete="address-line1" :id="'txtStreet' + _uid" :value="value.address1" @input="emitInputEvent('address1', $event.target.value)">
                            <label :for="'txtStreet' + _uid">{{ $translate("Ceres::Template.addressENAddressLine1") }}*</label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('gb', 'delivery_address.address2')" class="col-12 col-sm-12">
                        <div
                            class="input-unit"
                            data-model="address2"
                            v-validate:text="isInRequiredFields('gb', 'delivery_address.address2')">
                            <input type="text" name="housenumber" autocomplete="address-line2" :id="'txtNumber' + _uid" :value="value.address2" @input="emitInputEvent('address2', $event.target.value)">
                            <label :for="'txtNumber' + _uid">
                                {{ transformTranslation("Ceres::Template.addressENAddressLine2", "gb", "delivery_address.address2") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <div v-if="isInOptionalFields('gb', 'delivery_address.address3')" class="col-12 col-sm-6">
                        <div
                            class="input-unit"
                            data-model="address3"
                            v-validate:text="isInRequiredFields('gb', 'delivery_address.address3')">
                            <input type="text" name="buildingName" :id="'decorateAddress0' + _uid" :value="value.address3" @input="emitInputEvent('address3', $event.target.value)">
                            <label :for="'decorateAddress0' + _uid">
                                {{ transformTranslation("Ceres::Template.addressENAddressLine3", "gb", "delivery_address.address3") }}
                            </label>
                        </div>
                    </div>

                    <div v-if="isInOptionalFields('gb', 'delivery_address.address4')" class="col-12 col-sm-12">
                        <div
                            class="input-unit"
                            data-model="address4"
                            v-validate:text="isInRequiredFields('gb', 'delivery_address.address4')">
                            <input type="text" name="buildingName" :id="'decorateAddress1' + _uid" :value="value.address4" @input="emitInputEvent('address4', $event.target.value)">
                            <label :for="'decorateAddress1' + _uid">
                                {{ transformTranslation("Ceres::Template.addressENAddressLine4", "gb", "delivery_address.address4") }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>


            <div class="col-12 col-sm-4">
                <div class="input-unit" data-validate="text" data-model="town">
                    <input type="text" name="town" :id="'txtPlace' + _uid" :value="value.town" @input="emitInputEvent('town', $event.target.value)">
                    <label :for="'txtPlace' + _uid">{{ $translate("Ceres::Template.addressPlace") }}*</label>
                </div>
            </div>

            <div class="col-12 col-sm-4">
                <div class="input-unit" data-validate="text" data-model="postalCode">
                    <input type="text" name="zip" :id="'txtZip' + _uid" :value="value.postalCode" @input="emitInputEvent('postalCode', $event.target.value)">
                    <label :for="'txtZip' + _uid">{{ $translate("Ceres::Template.addressZip") }}*</label>
                </div>
            </div>

            <div class="col-12 col-sm-4" data-testing="address-country-select">
                <country-select
                    :selected-country-id="value.countryId"
                    :selected-state-id="value.stateId"
                    @country-changed="onSelectedCountryChanged($event)"
                    @state-changed="emitInputEvent('stateId', $event)"
                    :address-type="addressType"
                    :optional-address-fields="optionalAddressFields"
                    :required-address-fields="requiredAddressFields">
                </country-select>
            </div>

            <slot name="custom-address-fields"></slot>

            <!-- MailInput -->
            <div class="col-12">
                <hr class="mt-0">
                <div class="row">
                    <div class="col-12" v-if="isInOptionalFields('gb', 'delivery_address.email')">
                        <div class="input-unit" data-model="email" v-validate:text="isInRequiredFields('gb', 'delivery_address.email')">
                            <input type="mail" name="email" :id="'email' + _uid" :value="value.email" @input="emitInputEvent('email', $event.target.value)" data-testing="delivery-address-gb-email-input">
                            <label :for="'email' + _uid">{{ transformTranslation("Ceres::Template.addressMail", "gb", "delivery_address.email") }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { mapState } from "vuex";
import SalutationSelect from "./SalutationSelect.vue";
import CountrySelect from "../customer/CountrySelect.vue";
import VatId from "./VatId.vue";

export default {

    name: "address-input-group",

    components:
    {
        SalutationSelect,
        CountrySelect,
        VatId
    },

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
            default: App.config.addresses.defaultSalutation
        }
    },

    computed:
    {
        isMyAccount()
        {
            return App.templateType === "my-account";
        },

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
            const translation = this.$translate(translationKey);
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
}
</script>
