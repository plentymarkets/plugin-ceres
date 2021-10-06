<?php

namespace Ceres\Widgets\Grid;

use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class TwoColumnWidget extends GridWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Grid.TwoColumnWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::TwoColumnWidget")
            ->withLabel("Widget.gridTwoColumnLabel")
            ->withPreviewImageUrl("/images/widgets/grid-2-col.svg")
            ->withType(WidgetTypes::STRUCTURE)
            ->withCategory(WidgetCategories::STRUCTURE)
            ->withPosition(300)
            ->withSearchKeyWords([
                "grid", "struktur", "spalten", "columns", "2"
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
        $settings->createSelect("layout")
            ->withDefaultValue("oneToOne")
            ->withName("Widget.gridTwoColumnLayoutDesktopLabel")
            ->withTooltip("Widget.gridTwoColumnLayoutDesktopTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("oneToOne", "Widget.gridTwoColumnLayoutOneToOne")
                    ->addEntry("twoToOne", "Widget.gridTwoColumnLayoutTwoToOne")
                    ->addEntry("oneToTwo", "Widget.gridTwoColumnLayoutOneToTwo")
                    ->addEntry("fiveToSeven", "Widget.gridTwoColumnLayoutFiveToSeven")
                    ->addEntry("sevenToFive", "Widget.gridTwoColumnLayoutSevenToFive")
                    ->addEntry("nineToThree", "Widget.gridTwoColumnLayoutNineToThree")
                    ->addEntry("threeToNine", "Widget.gridTwoColumnLayoutThreeToNine")
                    ->addEntry("stacked", "Widget.gridTwoColumnLayoutStacked")
                    ->toArray()
            );

        $settings->createSelect("layoutTablet")
            ->withDefaultValue("oneToOne")
            ->withName("Widget.gridTwoColumnLayoutTabletLabel")
            ->withTooltip("Widget.gridTwoColumnLayoutTabletTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("oneToOne", "Widget.gridTwoColumnLayoutOneToOne")
                    ->addEntry("twoToOne", "Widget.gridTwoColumnLayoutTwoToOne")
                    ->addEntry("oneToTwo", "Widget.gridTwoColumnLayoutOneToTwo")
                    ->addEntry("fiveToSeven", "Widget.gridTwoColumnLayoutFiveToSeven")
                    ->addEntry("sevenToFive", "Widget.gridTwoColumnLayoutSevenToFive")
                    ->addEntry("nineToThree", "Widget.gridTwoColumnLayoutNineToThree")
                    ->addEntry("threeToNine", "Widget.gridTwoColumnLayoutThreeToNine")
                    ->addEntry("stackedTablet", "Widget.gridTwoColumnLayoutStacked")
                    ->toArray()
            );

        $settings->createSelect("layoutMobile")
            ->withDefaultValue("stackedMobile")
            ->withName("Widget.gridTwoColumnLayoutMobileLabel")
            ->withTooltip("Widget.gridTwoColumnLayoutMobileTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("oneToOne", "Widget.gridTwoColumnLayoutOneToOne")
                    ->addEntry("stackedMobile", "Widget.gridTwoColumnLayoutStacked")
                    ->toArray()
            );

        return $settings->toArray();
    }
}
