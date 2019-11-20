<?php

namespace Ceres\Widgets\Checkout;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ContactWishWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Checkout.ContactWishWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ContactWishWidget")
            ->withLabel("Widget.contactWishLabel")
            ->withPreviewImageUrl("/images/widgets/contact-wish.svg")
            ->withType(WidgetTypes::CHECKOUT)
            ->withCategory(WidgetCategories::CHECKOUT)
            ->withPosition(300)
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
