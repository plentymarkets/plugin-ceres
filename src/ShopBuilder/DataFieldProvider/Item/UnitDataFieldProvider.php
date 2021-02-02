<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

/**
 * Class UnitDataFieldProvider
 *
 * This class is a data field provider centered on the topic of units.
 * It is used to enable placeholders for dynamic data in the ShopBuilder's text widget.
 * Please refer to the parent class for more information about DataFieldProviders.
 * Please refer to https://developers.plentymarkets.com/dev-doc/result-fields-ceres for more information about
 * the data fields.
 * @package Ceres\ShopBuilder\DataFieldProvider\Item
 */
class UnitDataFieldProvider extends DataFieldProvider
{
    /**
     * Registers item data fields for use in the ShopBuilder.
     */
    function register()
    {
        $this->addField("content", "Ceres::Widget.dataFieldUnitsContent", "item_data_field('unit.content')");
        $this->addField("unit", "Ceres::Widget.dataFieldUnitsContentUnit", "item_data_field('unit.names.name')");
        $this->addField("length", "Ceres::Widget.dataFieldUnitsLength", "item_data_field('variation.lengthMM')");
        $this->addField("width", "Ceres::Widget.dataFieldUnitsWidth", "item_data_field('variation.widthMM')");
        $this->addField("height", "Ceres::Widget.dataFieldUnitsHeight", "item_data_field('variation.heightMM')");
        $this->addField("weight", "Ceres::Widget.dataFieldUnitsWeight", "item_data_field('variation.weightG')");
        $this->addField("weightNet", "Ceres::Widget.dataFieldUnitsWeightNet", "item_data_field('variation.weightNetG')");
        $this->addField("vpe", "Ceres::Widget.dataFieldUnitsVPE", "item_data_field('variation.unitsContained')");
    }
}
