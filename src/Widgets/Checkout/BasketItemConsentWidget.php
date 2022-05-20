<?php

namespace Ceres\Widgets\Checkout;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\WidgetTypes;

class BasketItemConsentWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Checkout.BasketItemConsentWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::BasketItemConsentWidget")
            ->withLabel("Widget.basketItemConsentLabel")
            ->withPreviewImageUrl("/images/widgets/basket-item-consent.svg")
            ->withType(WidgetTypes::CHECKOUT)
            ->withCategory(WidgetCategories::CHECKOUT)
            ->withPosition(600)
            ->withSearchKeyWords([
                "checkout", "bestellvorgang", "bestellung", "zahlungsmittel", "zahlung", "payment", "einverständnis", "consent"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createAppearance();

        $settings->createNumber("propertyId")
            ->withDefaultValue(null)
            ->withName("Widget.basketItemConsentPropertyIdLabel")
            ->withTooltip("Widget.basketItemConsentPropertyIdTooltip");

        $settings->createSpacing(false, true);

        return $settings->toArray();
    }
}
