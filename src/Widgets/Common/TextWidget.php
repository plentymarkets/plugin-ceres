<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class TextWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.TextWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::TextWidget")
            ->withLabel("Widget.textLabel")
            ->withPreviewImageUrl("/images/widgets/text.svg")
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::TEXT)
            ->withPosition(800)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createAppearance(true)
            ->withDefaultValue("none");

        $settings->createCodeEditor("text")
            ->withName("Widget.textCodeEditorLabel");

        $settings->createSpacing();

        return $settings->toArray();
    }
}
