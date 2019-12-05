<?php

namespace Ceres\Widgets\Basket;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ShippingCountryWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Basket.ShippingCountryWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ShippingCountryWidget")
            ->withLabel("Widget.shippingCountryLabel")
            ->withPreviewImageUrl("/images/widgets/shipping-country.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::BASKET)
            ->withPosition(300)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();
        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
