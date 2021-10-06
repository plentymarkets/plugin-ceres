<?php

namespace Ceres\Widgets\Customer;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class AddressWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Customer.AddressWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::AddressWidget")
            ->withLabel("Widget.addressLabel")
            ->withPreviewImageUrl("/images/widgets/address.svg")
            ->withType(WidgetTypes::CUSTOMER)
            ->withCategory(WidgetCategories::CUSTOMER)
            ->withPosition(200)
            ->withSearchKeyWords([
                "adresse", "address", "customer", "kunde", "kundendaten"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();
        $settingsFactory->createAppearance();

        $settingsFactory->createSelect("addressDefaultSalutation")
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

        $settingsFactory->createSelect("addressType")
            ->withName("Widget.addressType")
            ->withTooltip("Widget.addressTypeTooltip")
            ->withDefaultValue("1")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("1", "Widget.addressInvoice")
                    ->addEntry("2", "Widget.addressShipping")
                    ->toArray()
            );

        $settingsFactory->createSelect("addressLayout")
            ->withName("Widget.addressLayout")
            ->withTooltip("Widget.addressLayoutTooltip")
            ->withDefaultValue("DE")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("DE", "Widget.addressLayoutDE")
                    ->addEntry("GB", "Widget.addressLayoutGB")
                    ->toArray()
            );

        foreach(['1', '2'] as $addressType) {
            foreach(['DE', 'GB'] as $addressLayout) {
                $translationSuffix = $addressType === '1' ? "Invoice" : "Shipping";
                $fieldPrefix = $addressType === '1' ? "billing_address." : "delivery_address.";

                $addressFields = $settingsFactory->createCheckboxGroup("addressFields".$translationSuffix.$addressLayout)
                    ->withName("Widget.addressFields".$translationSuffix.$addressLayout)
                    ->withCondition("addressType === '$addressType' && addressLayout === '$addressLayout'")
                    ->withCheckboxValues(
                        $this->makeAddressFieldsValueList($fieldPrefix, false, $addressLayout)
                    );

                if($addressLayout === 'DE' || $addressType === '2') {
                    $addressFields->withDefaultValue([$fieldPrefix."name1", $fieldPrefix."salutation", $fieldPrefix."email"]);
                } else {
                    $addressFields->withDefaultValue([$fieldPrefix."name1", $fieldPrefix."address2", $fieldPrefix."salutation", $fieldPrefix."email"]);
                }

                $settingsFactory->createCheckboxGroup("addressRequiredFields".$translationSuffix.$addressLayout)
                    ->withName("Widget.addressRequiredFields".$translationSuffix.$addressLayout)
                    ->withDefaultValue([])
                    ->withCondition("addressType === '$addressType' && addressLayout === '$addressLayout'")
                    ->withCheckboxValues(
                        $this->makeAddressFieldsValueList($fieldPrefix, true, $addressLayout)
                    );
            }
        }

        $settingsFactory->createSpacing();

        return $settingsFactory->toArray();
    }

    private function makeAddressFieldsValueList($fieldPrefix = 'billing_address.', $requiredFields = false, $addressLayout = "DE")
    {
        $fieldList = ValueListFactory::make();

        if(!$requiredFields) {
            // Field "company" will be required on dynamic conditions
            $fieldList->addEntry($fieldPrefix."name1", "Widget.addressFieldName1");
        }

        $fieldList
            ->addEntry($fieldPrefix."email", "Widget.addressField".($addressLayout === 'GB' ? 'En' : '')."EMail")
            ->addEntry($fieldPrefix."vatNumber", "Widget.addressField".($addressLayout === 'GB' ? 'En' : '')."VatNumber")
            ->addEntry($fieldPrefix."contactPerson", "Widget.addressField".($addressLayout === 'GB' ? 'En' : '')."ContactPerson")
            ->addEntry($fieldPrefix."salutation", "Widget.addressField".($addressLayout === 'GB' ? 'En' : '')."Salutation")
            ->addEntry($fieldPrefix."title", "Widget.addressField".($addressLayout === 'GB' ? 'En' : '')."Title");

        if($fieldPrefix === 'billing_address.') {
            $fieldList->addEntry($fieldPrefix."birthday", "Widget.addressField".($addressLayout === 'GB' ? 'En' : '')."Birthday");
        }

        $fieldList->addEntry($fieldPrefix."name4", "Widget.addressField".($addressLayout === 'GB' ? 'En' : '')."Name4");

        if($addressLayout === "GB") {
            // Address 2 (= house no) is mandatory for german addresses and cannot be deactivated
            $fieldList->addEntry($fieldPrefix."address2", "Widget.addressField".($addressLayout === 'GB' ? 'En' : '')."Address2");
        }

        $fieldList
            ->addEntry($fieldPrefix."address3", "Widget.addressField".($addressLayout === 'GB' ? 'En' : '')."Address3")
            ->addEntry($fieldPrefix."address4", "Widget.addressField".($addressLayout === 'GB' ? 'En' : '')."Address4");

        if($addressLayout === "DE") {
            // states can only be activated for german addresses
            $fieldList->addEntry($fieldPrefix."stateId", "Widget.addressField".($addressLayout === 'GB' ? 'En' : '')."StateId");
        }

        return $fieldList
            ->addEntry($fieldPrefix."phoneNumber", "Widget.addressField".($addressLayout === 'GB' ? 'En' : '')."PhoneNumber")
            ->toArray();
    }
}
