<?php

namespace Ceres\Widgets\Grid;

use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class FourColumnWidget extends GridWidget
{
    protected $template = "Ceres::Widgets.Grid.FourColumnWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::FourColumnWidget")
            ->withLabel("Widget.gridFourColumnLabel")
            ->withPreviewImageUrl("/images/widgets/grid-4-col.svg")
            ->withType(WidgetTypes::STRUCTURE)
            ->withCategory(WidgetCategories::STRUCTURE)
            ->withPosition(100)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();

        return $settings->toArray();
    }
}
