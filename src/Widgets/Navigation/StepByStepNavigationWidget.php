<?php

namespace Ceres\Widgets\Navigation;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\WidgetTypes;

class StepByStepNavigationWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Navigation.StepByStepNavigationWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::StepByStepNavigationWidget")
            ->withLabel("Widget.stepByStepNavigationLabel")
            ->withPreviewImageUrl("/images/widgets/step-by-step-navigation.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::NAVIGATION)
            ->withPosition(100)
            ->withSearchKeyWords([
                "navigation", "step by step", "schrittweise"
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
        $settings->createAppearance(true);

        $settings->createSelect("source")
            ->withDefaultValue("image2Path")
            ->withName("Widget.stepByStepNavigationSourceLabel")
            ->withTooltip("Widget.stepByStepNavigationSourceTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("imagePath", "Widget.stepByStepNavigationImage1")
                    ->addEntry("image2Path", "Widget.stepByStepNavigationImage2")
                    ->addEntry("none", "Widget.stepByStepNavigationImageNone")
                    ->toArray()
            );

        $settings->createSelect("maxLevel")
            ->withDefaultValue(3)
            ->withName("Widget.stepByStepNavigationMaxLevelLabel")
            ->withTooltip("Widget.stepByStepNavigationMaxLevelTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry(1, "Widget.widgetNum1")
                    ->addEntry(2, "Widget.widgetNum2")
                    ->addEntry(3, "Widget.widgetNum3")
                    ->addEntry(4, "Widget.widgetNum4")
                    ->addEntry(5, "Widget.widgetNum5")
                    ->addEntry(6, "Widget.widgetNum6")
                    ->toArray()
            );

        $settings->createSelect("numberOfColumns")
            ->withDefaultValue(4)
            ->withName("Widget.stepByStepNavigationNumberOfColumnsLabel")
            ->withTooltip("Widget.stepByStepNavigationNumberOfColumnsTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry(1, "Widget.widgetNum1")
                    ->addEntry(2, "Widget.widgetNum2")
                    ->addEntry(3, "Widget.widgetNum3")
                    ->addEntry(4, "Widget.widgetNum4")
                    ->toArray()
            );

        $settings->createNumber("numberOfRows")
            ->withName("Widget.stepByStepNavigationNumberOfRowsLabel")
            ->withTooltip("Widget.stepByStepNavigationNumberOfRowsTooltip")
            ->withDefaultValue(2);

        $settings->createSpacing(false, true);

        return $settings->toArray();
    }
}
