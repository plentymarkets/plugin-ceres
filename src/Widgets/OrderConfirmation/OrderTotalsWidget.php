<?php

namespace Ceres\Widgets\OrderConfirmation;

use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class OrderTotalsWidget extends OrderConfirmationBaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.OrderConfirmation.OrderTotalsWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::OrderTotalsWidget")
            ->withLabel("Widget.basketTotalsLabel")
            ->withPreviewImageUrl("/images/widgets/basket-totals.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::ORDER_CONFIRMATION)
            ->withPosition(300)
            ->withSearchKeyWords([
                "bestellsumme", "order", "totals", "summe"
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

        $settings->createCheckboxGroup("visibleFields")
            ->withDefaultValue([
                "orderValueNet",
                "orderValueGross",
                "rebate",
                "shippingCostsNet",
                "shippingCostsGross",
                "promotionCoupon",
                "totalSumNet",
                "vats",
                "totalSumGross",
                "salesCoupon",
                "openAmount",
                "additionalCosts"
            ])
            ->withName("Widget.basketTotalsVisibleFields")
            ->withCheckboxValues(
                ValueListFactory::make()
                    ->addEntry("orderValueNet", "Widget.showBasketValueNet")
                    ->addEntry("orderValueGross", "Widget.showBasketValueGross")
                    ->addEntry("rebate", "Widget.showBasketTotalsRebate")
                    ->addEntry("shippingCostsNet", "Widget.showBasketShippingCostsNet")
                    ->addEntry("shippingCostsGross", "Widget.showBasketShippingCostsGross")
                    ->addEntry("promotionCoupon", "Widget.showBasketPromotionCoupon")
                    ->addEntry("totalSumNet", "Widget.showBasketTotalSumNet")
                    ->addEntry("vats", "Widget.showBasketVats")
                    ->addEntry("additionalCosts", "Widget.showBasketAdditionalCosts")
                    ->addEntry("totalSumGross", "Widget.showBasketTotalSumGross")
                    ->addEntry("salesCoupon", "Widget.showBasketSalesCoupon")
                    ->addEntry("openAmount", "Widget.showBasketOpenAmount")
                    ->toArray()
            );

        $settings->createSpacing(false, true);

        return $settings->toArray();
    }
}
