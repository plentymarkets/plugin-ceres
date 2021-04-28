<?php

namespace Ceres\Widgets\Item;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class TagsWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Item.TagsWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::TagsWidget")
            ->withLabel("Widget.tagsLabel")
            ->withPreviewImageUrl("/images/widgets/tags.svg")
            ->withType(WidgetTypes::ITEM)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(600)
            ->withSearchKeyWords([
                "item", "artikel", "article", "tag", "label"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();
        $settingsFactory->createSelect("tagAppearance")
            ->withName("Widget.widgetTagAppearance")
            ->withTooltip("Widget.widgetTagAppearance")
            ->withListBoxValues(
                ValueListFactory::make()
                 ->addEntry("", "Widget.widgetButtonSizeNormal")
                 ->addEntry("badge-pill", "Widget.widgetTagAppearancePill")
                 ->toArray()
            );
        $settingsFactory->createSelect("buttonSize")
            ->withName("Widget.widgetTagSizeLabel")
            ->withTooltip("Widget.widgetButtonSizeTooltip")
            ->withDefaultValue("h4")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("", "Widget.widgetButtonSizeSm")
                    ->addEntry("h4", "Widget.widgetButtonSizeNormal")
                    ->addEntry("h2", "Widget.widgetButtonSizeLg")
                    ->toArray()
            );
        $settingsFactory->createSpacing(false, true);
        return $settingsFactory->toArray();
    }
}
