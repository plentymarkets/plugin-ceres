<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\Property\Models\Property;
use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

/**
 * Class PropertyListDataFieldProvider
 * @package Ceres\ShopBuilder\DataFieldProvider\Item
 */
class PropertyListDataFieldProvider extends DataFieldProvider
{
    /**
     * @var array
     */
    private $properties;
    
    /** @var int */
    private $propertyGroupId;
    
    /**
     * PropertyListDataFieldProvider constructor.
     * @param $properties
     * @param $propertyGroupId
     */
    public function __construct($properties, $propertyGroupId)
    {
        $this->properties = $properties;
        $this->propertyGroupId = $propertyGroupId;
    }
    
    function register()
    {
        if(count($this->properties))
        {
            $propertyGroupId = $this->propertyGroupId;
            if(!is_null($propertyGroupId))
            {
                $this->addField("name_$propertyGroupId", "Ceres::Widget.dataFieldPropertyGroupName", "item_data_field('variationPropertyGroups.{id, $propertyGroupId}.names.name')");
            }
            
            /** @var Property $property */
            foreach ($this->properties as $property)
            {
                $this->addChildProvider(
                    $property->names->first()->name,
                    PropertyDataFieldProvider::class,
                    ['property' => $property]
                );
            }
        }
    }
}