<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class UnitDataFieldProvider extends DataFieldProvider
{
    function register()
    {
<<<<<<< HEAD
        $this->addField("Ceres::Widget.dataFieldUnitsContent", "{{ item_data_field('unit.content') }}");
        $this->addField("Ceres::Widget.dataFieldUnitsLength", "{{ item_data_field('variation.lengthMM') }}");
        $this->addField("Ceres::Widget.dataFieldUnitsWidth", "{{ item_data_field('variation.widthMM') }}");
        $this->addField("Ceres::Widget.dataFieldUnitsHeight", "{{ item_data_field('variation.heightMM') }}");
        $this->addField("Ceres::Widget.dataFieldUnitsWeight", "{{ item_data_field('variation.weightG') }}");
        $this->addField("Ceres::Widget.dataFieldUnitsWeightNet", "{{ item_data_field('variation.weightNetG') }}");
        $this->addField("Ceres::Widget.dataFieldUnitsVPE", "{{ item_data_field('unit.names.name') }}");
=======
        $this->addField("content", "Ceres::Widget.dataFieldUnitsContent", "");
        $this->addField("length", "Ceres::Widget.dataFieldUnitsLength", "");
        $this->addField("width", "Ceres::Widget.dataFieldUnitsWidth", "");
        $this->addField("height", "Ceres::Widget.dataFieldUnitsHeight", "");
        $this->addField("weight", "Ceres::Widget.dataFieldUnitsWeight", "");
        $this->addField("weightNet", "Ceres::Widget.dataFieldUnitsWeightNet", "");
        $this->addField("vpe", "Ceres::Widget.dataFieldUnitsVPE", "");
>>>>>>> sb_single_item/data_field_identifier
    }
}