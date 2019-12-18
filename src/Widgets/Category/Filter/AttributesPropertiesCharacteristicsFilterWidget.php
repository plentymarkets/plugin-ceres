<?php

namespace Ceres\Widgets\Category\Filter;

use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class AttributesPropertiesCharacteristicsFilterWidget extends FilterBaseWidget
{
    protected $allowedFacetTypes = ["dynamic"];
    protected $className = "attributes-properties-characteristics";
    
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::AttributesPropertiesCharacteristicsFilterWidget')
                                ->withLabel('Widget.attributesPropertiesCharacteristicsFilterLabel')
                                ->withPreviewImageUrl('/images/widgets/attributes-properties-characteristics-filter.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(700)
                                ->toArray();
    }
    
    public function getSettings()
    {
        return parent::getSettings();
    }
}
