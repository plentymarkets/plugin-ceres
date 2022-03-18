<?php

namespace Ceres\Widgets\OrderConfirmation;

use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class OrderDataWidget extends OrderConfirmationBaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.OrderConfirmation.OrderDataWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::OrderDataWidget")
            ->withLabel("Widget.orderDataLabel")
            ->withPreviewImageUrl("/images/widgets/order-data.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::ORDER_CONFIRMATION)
            ->withPosition(100)
            ->withSearchKeyWords([
                "order", "data", "bestelldaten", "bestellinformationen"
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

        $settings->createCheckboxGroup("addressFields")
            ->withDefaultValue(
                [
                    "title",
                    "contactPerson",
                    "name1",
                    "name2",
                    "name3",
                    "name4",
                    "address1",
                    "address2",
                    "address3",
                    "address4",
                    "postalCode",
                    "town",
                    "country"
                ]
            )
            ->withName("Widget.orderDataAddressFields")
            ->withCheckboxValues(
                ValueListFactory::make()
                    ->addEntry("title", "Widget.addressFieldTitle")
                    ->addEntry("contactPerson", "Widget.addressFieldContactPerson")
                    ->addEntry("name1", "Widget.addressFieldName1")
                    ->addEntry("name2", "Widget.addressFieldName2")
                    ->addEntry("name3", "Widget.addressFieldName3")
                    ->addEntry("name4", "Widget.addressFieldName4")
                    ->addEntry("address1", "Widget.addressFieldAddress1")
                    ->addEntry("address2", "Widget.addressFieldAddress2")
                    ->addEntry("address3", "Widget.addressFieldAddress3")
                    ->addEntry("postalCode", "Widget.addressFieldPostalCode")
                    ->addEntry("town", "Widget.addressFieldTown")
                    ->addEntry("country", "Widget.addressFieldCountry")
                    ->toArray()
            );

        $settings->createCheckbox("showCustomerId")
            ->withDefaultValue(false)
            ->withName("Widget.orderDataShowCustomerId");
        
        $settings->createCheckbox("outline")
            ->withDefaultValue(false)
            ->withName("Widget.orderDataOutlineLabel")
            ->withTooltip("Widget.orderDataOutlineTooltip");

        $settings->createSpacing();

        return $settings->toArray();
    }
}
