<?php

namespace Ceres\Widgets\Login;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class RegistrationWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Login.RegistrationWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::RegistrationWidget")
            ->withLabel("Widget.registrationLabel")
            ->withPreviewImageUrl("/images/widgets/registration.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::CUSTOMER)
            ->withPosition(100)
            ->withSearchKeyWords([
                "registrierung", "registration"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);
        $settings->createCustomClass();
        $settings->createAppearance();

        $settings->createSelect("addressDefaultSalutation")
            ->withName("Widget.addressDefaultSalutation")
            ->withTooltip("Widget.addressDefaultSalutationTooltip")
            ->withDefaultValue("male")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("male", "Widget.addressDefaultSalutationValueMale")
                    ->addEntry("female", "Widget.addressDefaultSalutationValueFemale")
                    ->addEntry("diverse", "Widget.addressDefaultSalutationValueDiverse")
                    ->addEntry("company", "Widget.addressDefaultSalutationValueCompany")
                    ->toArray()
            );

        $settings->createSelect("addressLayout")
            ->withName("Widget.addressLayout")
            ->withTooltip("Widget.addressLayoutTooltip")
            ->withDefaultValue("DE")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("DE", "Widget.addressLayoutDE")
                    ->addEntry("GB", "Widget.addressLayoutGB")
                    ->toArray()
            );

        $settings->createCheckboxGroup("shownFieldsDe")
            ->withCondition("addressLayout === 'DE'")
            ->withDefaultValue(
                [
                    "billing_address.name1",
                    "billing_address.salutation"
                ]
            )
            ->withName("Widget.registrationShownFieldsDe")
            ->withCheckboxValues(
                ValueListFactory::make()
                    ->addEntry("billing_address.name1", "Widget.addressFieldName1")
                    ->addEntry("billing_address.vatNumber", "Widget.addressFieldVatNumber")
                    ->addEntry("billing_address.contactPerson", "Widget.addressFieldContactPerson")
                    ->addEntry("billing_address.salutation", "Widget.addressFieldSalutation")
                    ->addEntry("billing_address.title", "Widget.addressFieldTitle")
                    ->addEntry("billing_address.birthday", "Widget.addressFieldBirthday")
                    ->addEntry("billing_address.name4", "Widget.addressFieldName4")
                    ->addEntry("billing_address.address3", "Widget.addressFieldAddress3")
                    ->addEntry("billing_address.address4", "Widget.addressFieldAddress4")
                    ->addEntry("billing_address.stateId", "Widget.addressFieldStateId")
                    ->addEntry("billing_address.phoneNumber", "Widget.addressFieldPhoneNumber")
                    ->toArray()
            );

        $settings->createCheckboxGroup("requiredFieldsDe")
            ->withCondition("addressLayout === 'DE'")
            ->withDefaultValue([])
            ->withName("Widget.registrationRequiredFieldsDe")
            ->withCheckboxValues(
                ValueListFactory::make()
                    ->addEntry("billing_address.vatNumber", "Widget.addressFieldVatNumber")
                    ->addEntry("billing_address.salutation", "Widget.addressFieldSalutation")
                    ->addEntry("billing_address.title", "Widget.addressFieldTitle")
                    ->addEntry("billing_address.contactPerson", "Widget.addressFieldContactPerson")
                    ->addEntry("billing_address.birthday", "Widget.addressFieldBirthday")
                    ->addEntry("billing_address.name4", "Widget.addressFieldName4")
                    ->addEntry("billing_address.address3", "Widget.addressFieldAddress3")
                    ->addEntry("billing_address.address4", "Widget.addressFieldAddress4")
                    ->addEntry("billing_address.stateId", "Widget.addressFieldStateId")
                    ->addEntry("billing_address.phoneNumber", "Widget.addressFieldPhoneNumber")
                    ->toArray()
            );

        $settings->createCheckboxGroup("shownFieldsGb")
            ->withCondition("addressLayout === 'GB'")
            ->withDefaultValue(
                [
                    "billing_address.name1",
                    "billing_address.address2",
                    "billing_address.salutation"
                ]
            )
            ->withName("Widget.registrationShownFieldsGb")
            ->withCheckboxValues(
                ValueListFactory::make()
                    ->addEntry("billing_address.name1", "Widget.addressFieldEnName1")
                    ->addEntry("billing_address.vatNumber", "Widget.addressFieldEnVatNumber")
                    ->addEntry("billing_address.contactPerson", "Widget.addressFieldEnContactPerson")
                    ->addEntry("billing_address.salutation", "Widget.addressFieldEnSalutation")
                    ->addEntry("billing_address.title", "Widget.addressFieldEnTitle")
                    ->addEntry("billing_address.birthday", "Widget.addressFieldEnBirthday")
                    ->addEntry("billing_address.name4", "Widget.addressFieldEnName4")
                    ->addEntry("billing_address.address2", "Widget.addressFieldEnAddress2")
                    ->addEntry("billing_address.address3", "Widget.addressFieldEnAddress3")
                    ->addEntry("billing_address.address4", "Widget.addressFieldEnAddress4")
                    ->addEntry("billing_address.phoneNumber", "Widget.addressFieldEnPhoneNumber")
                    ->toArray()
            );

        $settings->createCheckboxGroup("requiredFieldsGb")
            ->withCondition("addressLayout === 'GB'")
            ->withDefaultValue([])
            ->withName("Widget.registrationRequiredFieldsGb")
            ->withCheckboxValues(
                ValueListFactory::make()
                    ->addEntry("billing_address.vatNumber", "Widget.addressFieldEnVatNumber")
                    ->addEntry("billing_address.salutation", "Widget.addressFieldEnSalutation")
                    ->addEntry("billing_address.title", "Widget.addressFieldEnTitle")
                    ->addEntry("billing_address.contactPerson", "Widget.addressFieldEnContactPerson")
                    ->addEntry("billing_address.birthday", "Widget.addressFieldEnBirthday")
                    ->addEntry("billing_address.name4", "Widget.addressFieldEnName4")
                    ->addEntry("billing_address.address2", "Widget.addressFieldEnAddress2")
                    ->addEntry("billing_address.address3", "Widget.addressFieldEnAddress3")
                    ->addEntry("billing_address.address4", "Widget.addressFieldEnAddress4")
                    ->addEntry("billing_address.phoneNumber", "Widget.addressFieldEnPhoneNumber")
                    ->toArray()
            );

        $settings->createButtonSize();
        $settings->createSpacing(false, true);

        return $settings->toArray();
    }
}
