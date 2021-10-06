<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class CollapseWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Common.CollapseWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::CollapseWidget")
            ->withLabel("Widget.collapseLabel")
            ->withPreviewImageUrl("/images/widgets/collapse.svg")
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::TEXT)
            ->withPosition(1300)
            ->withSearchKeyWords([
                "faq", "fragen", "questions"
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

        $collapseBox = $settings->createVerticalContainer("collapseBox")
            ->withName("Widget.collapseBoxLabel")
            ->withList(1);

        $collapseBox->children->createText("headline")
            ->withDefaultValue("")
            ->withName("Widget.collapseBoxHeadlineLabel")
            ->withTooltip("Widget.collapseBoxHeadlineTooltip");

        $collapseBox->children->createCodeEditor("text")
            ->withDefaultValue("")
            ->withName("Widget.collapseBoxTextareaLabel")
            ->withTooltip("Widget.collapseBoxTextareaTooltip");

        $settings->createSpacing();

        return $settings->toArray();
    }
}
