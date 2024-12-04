<?php

namespace Ceres\Widgets\Item;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use Plenty\Modules\ContentBuilder\Factories\Settings\ValueListFactory;

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
            ->withType(WidgetTypes::SINGLE_ITEM)
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
        $settingsFactory->createSpacing();

        $settingsFactory->createSelect("selectType")
            ->withDefaultValue("dropdown")
            ->withName("Widget.selectionSelectTypeLabel")
            ->withTooltip("Widget.selectionSelectTypeTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("dropdown", "Widget.selectionSelectTypeDropdown")
                    ->addEntry("radio", "Widget.selectionSelectTypeRadio")
                    ->addEntry("checkbox", "Widget.selectionSelectTypeCheckbox")
                    ->toArray());

        return $settingsFactory->toArray();
    }
}
