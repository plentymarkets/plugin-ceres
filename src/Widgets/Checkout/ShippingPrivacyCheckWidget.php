<?php

namespace Ceres\Widgets\Checkout;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ShippingPrivacyCheckWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Checkout.ShippingPrivacyCheckWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ShippingPrivacyCheckWidget")
            ->withLabel("Widget.shippingPrivacyCheckLabel")
            ->withPreviewImageUrl("/images/widgets/shipping-privacy-check.svg")
            ->withType(WidgetTypes::CHECKOUT)
            ->withCategory(WidgetCategories::CHECKOUT)
            ->withPosition(500)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createSpacing(false, true);

        return $settings->toArray();
    }
}
