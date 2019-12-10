<?php

namespace Ceres\Widgets\Category\Filter;

use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class PriceFilterWidget extends FilterBaseWidget
{
    protected $allowedFacetTypes = ["price"];
    protected $className = "price";
    
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::PriceFilterWidget')
                                ->withLabel('Widget.priceFilterLabel')
                                ->withPreviewImageUrl('/images/widgets/price-filter.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(900)
                                ->toArray();
    }
    
    public function getSettings()
    {
        return parent::getSettings();
    }
}
