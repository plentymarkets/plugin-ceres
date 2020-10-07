<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\Property\Models\Property;
use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class PropertyDataFieldProvider extends DataFieldProvider
{
    /** @var Property */
    private $property;

    private $propertyGroupId;

    public function __construct(Property $property, $propertyGroupId)
    {
        $this->property = $property;
        $this->propertyGroupId = $propertyGroupId;
    }

    function register()
    {
        if (is_null($this->propertyGroupId)) {
            $this->propertyGroupId = 'undefined';
        }

        $propertyId = $this->property->id;
        $this->addField("name_$propertyId", "Ceres::Widget.dataFieldPropertyName", "item_data_field('variationProperties.{id, $this->propertyGroupId}.properties.{id, $propertyId}.names.name')");

        if($this->property->cast === 'file')
        {
            $this->addField("value_$propertyId", "Ceres::Widget.dataFieldPropertyValue", "item_data_field('variationProperties.{id, $this->propertyGroupId}.properties.{id, $propertyId}.values.value', null, 'href', 'a', 'file')");
        }
        else
        {
            $this->addField("value_$propertyId", "Ceres::Widget.dataFieldPropertyValue", "item_data_field_html('variationProperties.{id, $this->propertyGroupId}.properties.{id, $propertyId}.values.value', 'escape')");
        }
    }
}
