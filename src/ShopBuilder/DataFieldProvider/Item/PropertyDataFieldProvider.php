<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\Property\Models\Property;
use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class PropertyDataFieldProvider extends DataFieldProvider
{
    /** @var Property */
    private $property;
    
    public function __construct(Property $property)
    {
        $this->property = $property;
    }
    
    function register()
    {
        $propertyId = $this->property->id;
        $this->addField("name_$propertyId", "Ceres::Widget.dataFieldPropertyName", "item_data_field('variationProperties.{property.id, $propertyId}.property.names.name')");
        $this->addField("value_$propertyId", "Ceres::Widget.dataFieldPropertyValue", "item_data_field_html('variationProperties.{propertyId, $propertyId}.values.value', 'escape')");
    }
}