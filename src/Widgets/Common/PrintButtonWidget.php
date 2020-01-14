<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class PrintButtonWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.PrintButtonWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::PrintButtonWidget")
            ->withLabel("Widget.printButtonLabel")
            ->withPreviewImageUrl("/images/widgets/print-button.svg")
            ->withType(WidgetTypes::STATIC)
            ->withPosition(300)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createAppearance();
        $settings->createButtonSize();
        $settings->createSpacing();

        return $settings->toArray();
    }
}
