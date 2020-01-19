<?php

namespace Ceres\Widgets\Category\Filter;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class SelectedFilterWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Category.Filter.SelectedFilterWidget";
    
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::SelectedFilterWidget')
                                ->withLabel('Widget.selectedFilterWidgetLabel')
                                ->withPreviewImageUrl('/images/widgets/selected-filter.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(600)
                                ->toArray();
    }
    
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);
        
        $settings->createCustomClass();
        
        $settings->createCustomClass()
                 ->withDefaultValue('none');
        
        $settings->createAlignment();
        
        $settings->createSpacing();
        
        return $settings->toArray();
    }
}
