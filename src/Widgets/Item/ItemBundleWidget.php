<?php

namespace Ceres\Widgets\Item;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ItemBundleWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Item.ItemBundleWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ItemBundleWidget")
            ->withLabel("Widget.itemBundleLabel")
            ->withPreviewImageUrl("/images/widgets/item-bundle.svg")
            ->withType(WidgetTypes::SINGLE_ITEM)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(400)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();
        $settingsFactory->createAppearance();
        $settingsFactory->createSpacing();

        return $settingsFactory->toArray();
    }
}
