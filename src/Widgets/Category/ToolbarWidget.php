<?php

namespace Ceres\Widgets\Category;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ToolbarWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Category.ToolbarWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::ToolbarWidget')
                                ->withLabel('Widget.toolbarLabel')
                                ->withPreviewImageUrl('/images/widgets/toolbar.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(100)
                                ->withSearchKeyWords([
                                    "item", "artikel", "article", "produkt", "category", "kategorie", "toolbar"
                                ])
                                ->withAllowedNestingTypes(
                                    [
                                        WidgetTypes::STRUCTURE,
                                        WidgetTypes::STATIC,
                                        WidgetTypes::DEFAULT,
                                        WidgetTypes::TOOLBAR,
                                        WidgetTypes::CATEGORY_ITEM
                                    ]
                                )
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

        $settings->createAppearance()
                 ->withDefaultValue('primary');

        $settings->createIcon()
                 ->withDefaultValue('fa-sliders');

        $settings->createText('text')
                 ->withName('Widget.toolbarTextLabel')
                 ->withTooltip('Widget.toolbarTextTooltip');

        $settings->createCheckbox('autoFormat')
                 ->withDefaultValue(false)
                 ->withName('Widget.toolbarAutoFormatLabel')
                 ->withTooltip('Widget.toolbarAutoFormatTooltip');

        $settings->createCheckbox('outline')
                 ->withDefaultValue(false)
                 ->withName('Widget.toolbarOutlineLabel')
                 ->withTooltip('Widget.toolbarOutlineTooltip');

        $settings->createSpacing();

        return $settings->toArray();
    }
}
