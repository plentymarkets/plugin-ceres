<?php

namespace Ceres\Widgets\Item;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class AddToWishListWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Item.AddToWishListWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::AddToWishListWidget")
            ->withLabel("Widget.addToWishListLabel")
            ->withPreviewImageUrl("/images/widgets/add-to-wishlist.svg")
            ->withType(WidgetTypes::ITEM)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(200)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();
        $settingsFactory->createAppearance(true);
        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
