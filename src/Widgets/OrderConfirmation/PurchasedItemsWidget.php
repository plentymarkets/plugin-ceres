<?php

namespace Ceres\Widgets\OrderConfirmation;

use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use Ceres\Widgets\OrderConfirmation\OrderConfirmationBaseWidget;

class PurchasedItemsWidget extends OrderConfirmationBaseWidget
{
    protected $template = "Ceres::Widgets.OrderConfirmation.PurchasedItemsWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::PurchasedItemsWidget")
            ->withLabel("Widget.purchasedItemsLabel")
            ->withPreviewImageUrl("/images/widgets/purchased-items.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::ORDER_CONFIRMATION)
            ->withPosition(100)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createAppearance();
        $settings->createSpacing();

        return $settings->toArray();
    }
}
