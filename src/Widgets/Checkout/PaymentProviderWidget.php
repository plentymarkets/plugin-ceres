<?php

namespace Ceres\Widgets\Checkout;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class PaymentProviderWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Checkout.PaymentProviderWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::PaymentProviderWidget")
            ->withLabel("Widget.paymentProviderLabel")
            ->withPreviewImageUrl("/images/widgets/payment-select.svg")
            ->withType(WidgetTypes::CHECKOUT)
            ->withCategory(WidgetCategories::CHECKOUT)
            ->withPosition(200)
            ->withMaxPerPage(1)
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
