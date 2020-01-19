<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class SeparatorWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.SeparatorWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::SeparatorWidget")
            ->withLabel("Widget.separatorLabel")
            ->withPreviewImageUrl("/images/widgets/separator.svg")
            ->withType(WidgetTypes::STRUCTURE)
            ->withCategory(WidgetCategories::STRUCTURE)
            ->withPosition(1100)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();

        $settings->createSetting("margin")
            ->withType("spacing")
            ->withName("Widget.separatorMargin")
            ->withOption("units",
                [
                    "px","rem"
                ]
            )
            ->withOption("direction", "vertical");

        return $settings->toArray();
    }
}
