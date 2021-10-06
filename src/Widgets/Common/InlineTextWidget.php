<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class InlineTextWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Common.InlineTextWidget";
    
    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::InlineTextWidget")
            ->withLabel("Widget.textLabel")
            ->withPreviewImageUrl("/images/widgets/text-inline.svg")
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::TEXT)
            ->withPosition(800)
            ->withSearchKeyWords([
                "text", "inline", "editor",
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
        $settings->createSpacing();

        return $settings->toArray();
    }
}
