<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class UnitDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("content", "Ceres::Widget.dataFieldUnitsContent", "");
        $this->addField("length", "Ceres::Widget.dataFieldUnitsLength", "");
        $this->addField("width", "Ceres::Widget.dataFieldUnitsWidth", "");
        $this->addField("height", "Ceres::Widget.dataFieldUnitsHeight", "");
        $this->addField("weight", "Ceres::Widget.dataFieldUnitsWeight", "");
        $this->addField("weightNet", "Ceres::Widget.dataFieldUnitsWeightNet", "");
        $this->addField("vpe", "Ceres::Widget.dataFieldUnitsVPE", "");
    }
}