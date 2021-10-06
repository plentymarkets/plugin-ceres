<?php

namespace Ceres\Widgets\Basket;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class CouponWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Basket.CouponWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::CouponWidget")
            ->withLabel("Widget.couponLabel")
            ->withPreviewImageUrl("/images/widgets/coupon.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::BASKET)
            ->withPosition(200)
            ->withSearchKeyWords([
                "coupon", "gutschein", "rabatt"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();
        $settingsFactory->createAppearance();
        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
