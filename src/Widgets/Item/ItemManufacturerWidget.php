<?php

namespace Ceres\Widgets\Item;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;

class ItemManufacturerWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Item.ItemManufacturerWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ItemManufacturerWidget")
            ->withLabel("Widget.itemManufacturerLabel")
            ->withPreviewImageUrl("/images/widgets/item-bundle.svg")
            ->withType(WidgetTypes::ITEM)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(400)
            ->withSearchKeyWords([
                "item", "artikel", "bundle", "manufacturer"
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

        $settingsFactory->createSelect("selectionType")
            ->withDefaultValue("manufacturer")
            ->withName("Widget.selectionSelectTypeLabel")
            ->withTooltip("Widget.selectionSelectTypeTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("manufacturer", "Widget.selectionSelectTypeManufacturer")
                    ->addEntry("eu-responsible", "Widget.selectionSelectTypeEuResponsible")
                    ->toArray()
            );

        $settingsFactory->createSpacing();

        return $settingsFactory->toArray();
    }
}
