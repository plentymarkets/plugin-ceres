<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class UnitDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("content", "Ceres::Widget.dataFieldUnitsContent", "item_data_field('unit.content')");
        $this->addField("length", "Ceres::Widget.dataFieldUnitsLength", "item_data_field('variation.lengthMM')");
        $this->addField("width", "Ceres::Widget.dataFieldUnitsWidth", "item_data_field('variation.widthMM')");
        $this->addField("height", "Ceres::Widget.dataFieldUnitsHeight", "item_data_field('variation.heightMM')");
        $this->addField("weight", "Ceres::Widget.dataFieldUnitsWeight", "item_data_field('variation.weightG')");
        $this->addField("weightNet", "Ceres::Widget.dataFieldUnitsWeightNet", "item_data_field('variation.weightNetG')");
        $this->addField("vpe", "Ceres::Widget.dataFieldUnitsVPE", "item_data_field('unit.names.name')");
    }
}