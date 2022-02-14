<?php

namespace Ceres\Widgets\OrderConfirmation;

use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use Ceres\Widgets\Helper\BaseWidget;


class SoftLoginWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.OrderConfirmation.SoftLoginWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::SoftLoginWidget")
            ->withLabel("Widget.categoryOrderConfirmationSoftlogin")
            ->withPreviewImageUrl("/images/widgets/soft-login.svg")
            ->withType(WidgetTypes::SOFT_LOGIN)
            ->withCategory(WidgetCategories::SOFT_LOGIN)
            ->withPosition(100)
            ->withSearchKeyWords([
                "bestellbestätigung", "softlogin"
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
        $settings->createSpacing();

        return $settings->toArray();
    }
}
