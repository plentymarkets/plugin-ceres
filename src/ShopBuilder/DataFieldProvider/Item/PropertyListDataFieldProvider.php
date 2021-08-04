<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\Property\V2\Models\Property;
use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

/**
 * Class PropertyListDataFieldProvider
 *
 * This class is a data field provider centered on the topic of property groups.
 * It is used to enable placeholders for dynamic data in the ShopBuilder's text widget.
 * Please refer to the parent class for more information about DataFieldProviders.
 * Please refer to https://developers.plentymarkets.com/dev-doc/result-fields-ceres for more information about
 * the data fields.
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

    /**
     * Registers item data fields for use in the ShopBuilder.
     */
    function register()
    {
        if(count($this->properties))
        {
            $propertyGroupId = $this->propertyGroupId;
            if(!is_null($propertyGroupId))
            {
                $this->addField("name_$propertyGroupId", "Ceres::Widget.dataFieldPropertyGroupName", "item_data_field('variationProperties.{id, $propertyGroupId}.name')");
            }

            /** @var Property $property */
            foreach ($this->properties as $property)
            {
                $this->addChildProvider(
                    $property->names->first()->name,
                    PropertyDataFieldProvider::class, [
                        'property' => $property,
                        'propertyGroupId' => $propertyGroupId
                    ]
                );
            }
        }
    }
}
