<?php

namespace Ceres\Widgets\Grid;

use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ThreeColumnWidget extends GridWidget
{
    protected $template = "Ceres::Widgets.Grid.ThreeColumnWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ThreeColumnWidget")
            ->withLabel("Widget.gridThreeColumnLabel")
            ->withPreviewImageUrl("/images/widgets/grid-3-col.svg")
            ->withType(WidgetTypes::STRUCTURE)
            ->withCategory(WidgetCategories::STRUCTURE)
            ->withPosition(200)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createSelect("layout")
            ->withDefaultValue("oneToOneToOne")
            ->withName("Widget.gridThreeColumnLayoutLabel")
            ->withTooltip("Widget.gridThreeColumnLayoutTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("oneToOneToOne", "Widget.gridThreeColumnLayoutOneToOneToOne")
                    ->addEntry("twoToOneToOne", "Widget.gridThreeColumnLayoutTwoToOneToOne")
                    ->addEntry("oneToTwoToOne", "Widget.gridThreeColumnLayoutOneToTwoToOne")
                    ->addEntry("oneToOneToTwo", "Widget.gridThreeColumnLayoutOneToOneToTwo")
                    ->addEntry("twoToOneStacked", "Widget.gridThreeColumnLayoutTwoToOneStacked")
                    ->addEntry("oneStackedToTwo", "Widget.gridThreeColumnLayoutOneStackedToTwo")
                    ->toArray()
            );

        return $settings->toArray();
    }
}
