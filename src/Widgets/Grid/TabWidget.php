<?php

namespace Ceres\Widgets\Grid;

use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class TabWidget extends GridWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Grid.TabWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::TabWidget")
            ->withLabel("Widget.tabLabel")
            ->withPreviewImageUrl("/images/widgets/tab.svg")
            ->withType(WidgetTypes::STRUCTURE)
            ->withCategory(WidgetCategories::STRUCTURE)
            ->withPosition(500)
            ->withSearchKeyWords([
                "grid", "struktur", "tab", "reiter"
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
        $settings->createAppearance();

        $container = $settings->createVerticalContainer("tabs")
            ->withList(1)
            ->withDefaultValue(
                [
                    [
                        "title" => "Tab 1",
                        "uuid" => "3a0ca715-ff40-4446-8393-07f663ce45a2"
                    ],
                    [
                        "title" => "Tab 2",
                        "uuid" => "ac25da98-b0f4-4db3-bc8b-4c5a0fcf3150"
                    ]
                ]
            )
            ->withName("Widget.tabNewTabLabel");

        $container->children->createText("title")
            ->withName("Widget.tabNewTabInputName")
            ->withTooltip("Widget.tabNewTabInputTooltip");

        $container->children->createUUID("uuid");

        $settings->createSpacing();

        return $settings->toArray();
    }
}
