<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class LinkWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.LinkWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::LinkWidget")
            ->withLabel("Widget.linkLabel")
            ->withPreviewImageUrl("/images/widgets/link.svg")
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::TEXT)
            ->withPosition(900)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createAppearance();

        $settings->createButtonSize();

        $settings->createCheckbox("block")
            ->withDefaultValue(false)
            ->withName("Widget.linkBlock");

        $settings->createIcon();

        $settings->createText("text")
            ->withName("Widget.linkTextLabel")
            ->withTooltip("Widget.linkTextTooltip");

        $settings->createUrl("url")
            ->withName("Widget.linkUrlLabel")
            ->withTooltip("Widget.linkUrlTooltip")
            ->withInternalLinks(
                ValueListFactory::make()
                    ->addEntry("return", "Widget.urlReturnLabel")
                    ->addEntry("tracking", "Widget.urlTrackingLabel")
                    ->toArray()
            );

        $settings->createSpacing();

        return $settings->toArray();
    }
}
