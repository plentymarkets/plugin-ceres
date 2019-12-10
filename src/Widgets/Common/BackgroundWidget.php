<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class BackgroundWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.BackgroundWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::BackgroundWidget")
            ->withLabel("Widget.backgroundLabel")
            ->withPreviewImageUrl("/images/widgets/background.svg")
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::IMAGE)
            ->withPosition(700)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();

        $settings->createSlider("opacity")
            ->withDefaultValue(100)
            ->withName("Widget.backgroundOpacityLabel")
            ->withOption("inputInterval", 1)
            ->withOption("inputMax", 100);

        $settings->createHeight();
        
        $this->createBackgroundSourceSettings($settings);

        $settings->createSpacing(true, true);

        return $settings->toArray();
    }

    private function createBackgroundSourceSettings($settings)
    {
        $settings->createSelect("sourceType")
            ->withDefaultValue("default-caption")
            ->withName("Widget.backgroundSourceTypeLabel")
            ->withTooltip("Widget.backgroundSourceTypeTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("category-image1", "Widget.backgroundSourceTypeCategoryImage1")
                    ->addEntry("category-image2", "Widget.backgroundSourceTypeCategoryImage2")
                    ->addEntry("custom-image", "Widget.backgroundSourceTypeCustomImage")
                    ->addEntry("color", "Widget.backgroundSourceTypeCategoryColor")
                    ->toArray()
            );

        $settings->createUrl("customImagePath")
            ->withCondition("sourceType === 'custom-image'");

        $settings->createAppearance()
            ->withCondition("sourceType === 'color'");
    }
}
