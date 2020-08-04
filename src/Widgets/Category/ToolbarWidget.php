<?php

namespace Ceres\Widgets\Category;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ToolbarWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Category.ToolbarWidget";
    
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::ToolbarWidget')
                                ->withLabel('Widget.toolbarLabel')
                                ->withPreviewImageUrl('/images/widgets/toolbar.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(100)
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

        $settings->createSpacing();
        
        return $settings->toArray();
    }
}
