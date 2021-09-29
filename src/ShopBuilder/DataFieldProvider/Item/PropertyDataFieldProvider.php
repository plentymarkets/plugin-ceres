<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\Property\V2\Models\Property;
use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

/**
 * Class PropertyDataFieldProvider
 *
 * This class is a data field provider centered on the topic of properties.
 * It is used to enable placeholders for dynamic data in the ShopBuilder's text widget.
 * Please refer to the parent class for more information about DataFieldProviders.
 * Please refer to https://developers.plentymarkets.com/dev-doc/result-fields-ceres for more information about
 * the data fields.
 * @package Ceres\ShopBuilder\DataFieldProvider\Item
 */
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

    /**
     * Registers item data fields for use in the ShopBuilder.
     */
    function register()
    {
        if (is_null($this->propertyGroupId)) {
            $this->propertyGroupId = 'undefined';
        }

        $propertyId = $this->property->id;
        $groupId = $this->propertyGroupId;
        $this->addField("name_$propertyId", "Ceres::Widget.dataFieldPropertyName", "item_data_field('variationProperties.{id, $this->propertyGroupId}.properties.{id, $propertyId}.names.name')", false, true);
        $this->addField("name_{$propertyId}_{$groupId}", "Ceres::Widget.dataFieldPropertyName", "item_data_field('variationProperties.{id, $this->propertyGroupId}.properties.{id, $propertyId}.names.name')");

        if ($this->property->cast === 'file')
        {
            $this->addField("value_$propertyId", "Ceres::Widget.dataFieldPropertyValue", "item_data_field('variationProperties.{id, $this->propertyGroupId}.properties.{id, $propertyId}.values.value', null, 'href', 'a', 'file')", false, true);
            $this->addField("value_{$propertyId}_{$groupId}", "Ceres::Widget.dataFieldPropertyValue", "item_data_field('variationProperties.{id, $this->propertyGroupId}.properties.{id, $propertyId}.values.value', null, 'href', 'a', 'file')");
        }
        elseif ($this->property->cast === 'text' || $this->property->cast === 'html')
        {
            $this->addField("value_$propertyId", "Ceres::Widget.dataFieldPropertyValue", "item_data_field_html('variationProperties.{id, $this->propertyGroupId}.properties.{id, $propertyId}.values.value', 'escape')", true, true);
            $this->addField("value_{$propertyId}_{$groupId}", "Ceres::Widget.dataFieldPropertyValue", "item_data_field_html('variationProperties.{id, $this->propertyGroupId}.properties.{id, $propertyId}.values.value', 'escape')", true);
        }
        else
        {
            $this->addField("value_$propertyId", "Ceres::Widget.dataFieldPropertyValue", "item_data_field_html('variationProperties.{id, $this->propertyGroupId}.properties.{id, $propertyId}.values.value', 'escape')", false , true);
            $this->addField("value_{$propertyId}_{$groupId}", "Ceres::Widget.dataFieldPropertyValue", "item_data_field_html('variationProperties.{id, $this->propertyGroupId}.properties.{id, $propertyId}.values.value', 'escape')");
        }
    }
}
