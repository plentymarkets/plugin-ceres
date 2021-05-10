<?php

namespace Ceres\Widgets\Grid;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class StickyContainerWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Grid.StickyContainerWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::StickyContainerWidget")
            ->withLabel("Widget.stickyContainerLabel")
            ->withPreviewImageUrl("/images/widgets/sticky-container.svg")
            ->withType(WidgetTypes::STRUCTURE)
            ->withCategory(WidgetCategories::STRUCTURE)
            ->withPosition(400)
            ->withSearchKeyWords([
                "grid", "struktur", "container", "sticky"
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

        $settings->createSelect("stickTo")
            ->withDefaultValue("stickToParent")
            ->withName("Widget.stickyContainerStickLabel")
            ->withTooltip("Widget.stickyContainerStickTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("stickToParent", "Widget.stickyContainerStickToParent")
                    ->addEntry("stickToBody", "Widget.stickyContainerStickToBody")
                    ->toArray()
            );

        return $settings->toArray();
    }
}
