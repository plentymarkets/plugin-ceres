<?php

namespace Ceres\Widgets\Item;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ItemDataTableWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Item.ItemDataTableWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ItemDataTableWidget")
            ->withLabel("Widget.itemDataTableLabel")
            ->withPreviewImageUrl("/images/widgets/item-data-table.svg")
            ->withType(WidgetTypes::ITEM)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(600)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();

        $settingsFactory->createSelect("itemInformation")
            ->withName("Widget.itemDataTableDisplayedInformation")
            ->withDefaultValue("item.id")
            ->withList(1)
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("item.id", "Widget.itemDataTableItemId")
                    ->addEntry("item.condition.names.name", "Widget.itemDataTableItemCondition")
                    ->addEntry("item.ageRestriction", "Widget.itemDataTableItemAgeRating")
                    ->addEntry("variation.externalId", "Widget.itemDataTableItemExternalId")
                    ->addEntry("variation.model", "Widget.itemDataTableItemVariationModel")
                    ->addEntry("item.manufacturer.externalName", "Widget.itemDataTableItemManufacturer")
                    ->addEntry("item.producingCountry.names.name", "Widget.itemDataTableItemProducerCountry")
                    ->addEntry("unit.names.name", "Widget.itemDataTableItemVariationBaseContent")
                    ->addEntry("variation.weightG", "Widget.itemDataTableItemWeightG")
                    ->addEntry("variation.weightNetG", "Widget.itemDataTableItemWeightNetG")
                    ->addEntry("item.variationDimensions", "Widget.itemDataTableItemVariationDimensions")
                    ->addEntry("variation.customsTariffNumber", "Widget.itemDataTableItemCustomsTariffNumber")
                    ->toArray()
            );

        $settingsFactory->createSpacing();

        return $settingsFactory->toArray();
    }
}
