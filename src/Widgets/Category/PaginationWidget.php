<?php

namespace Ceres\Widgets\Category;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class PaginationWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Category.PaginationWidget";
    
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::PaginationWidget')
                                ->withLabel('Widget.paginationLabel')
                                ->withPreviewImageUrl('/images/widgets/pagination.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(500)
                                ->toArray();
    }
    
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);
        
        $settings->createCustomClass();
        
        $settings->createAppearance()
                 ->withDefaultValue('primary');
        
        $settings->createCheckbox('showFirstPage')
                 ->withDefaultValue(false)
                 ->withName('Widget.paginationShowFirstPageLabel');
        
        $settings->createCheckbox('showLastPage')
                 ->withDefaultValue(false)
                 ->withName('Widget.paginationShowLastPageLabel');
        
        $settings->createSlider('pageLimit')
                 ->withDefaultValue(1)
                 ->withName('Widget.paginationPageLimitLabel')
                 ->withInterval(1)
                 ->withMax(10);
        
        $settings->createAlignment();
        
        $settings->createSpacing();
        
        return $settings->toArray();
    }
}
