<?php

namespace Ceres\Widgets\Basket;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class BasketTotalsWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Basket.BasketTotalsWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::BasketTotalsWidget")
            ->withLabel("Widget.basketTotalsLabel")
            ->withPreviewImageUrl("/images/widgets/basket-totals.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::BASKET)
            ->withPosition(300)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createCheckboxGroup("visibleFields")
            ->withName("Widget.basketTotalsVisibleFields")
            ->withDefaultValue([
                "basketValueNet",
                "basketValueGross",
                "rebate",
                "shippingCostsNet",
                "shippingCostsGross",
                "promotionCoupon",
                "totalSumNet",
                "vats",
                "totalSumGross",
                "salesCoupon",
                "openAmount"
            ])
            ->withCheckboxValues(
                ValueListFactory::make()
                    ->addEntry("basketValueNet", "Widget.showBasketValueNet")
                    ->addEntry("basketValueGross", "Widget.showBasketValueGross")
                    ->addEntry("rebate", "Widget.showBasketTotalsRebate")
                    ->addEntry("shippingCostsNet", "Widget.showBasketShippingCostsNet")
                    ->addEntry("shippingCostsGross", "Widget.showBasketShippingCostsGross")
                    ->addEntry("promotionCoupon", "Widget.showBasketPromotionCoupon")
                    ->addEntry("totalSumNet", "Widget.showBasketTotalSumNet")
                    ->addEntry("vats", "Widget.showBasketVats")
                    ->addEntry("totalSumGross", "Widget.showBasketTotalSumGross")
                    ->addEntry("salesCoupon", "Widget.showBasketSalesCoupon")
                    ->addEntry("openAmount", "Widget.showBasketOpenAmount")
                    ->toArray()
            );

        $settings->createSpacing(false, true);

        return $settings->toArray();
    }
}
