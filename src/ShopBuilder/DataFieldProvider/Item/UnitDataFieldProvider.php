<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class UnitDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("Ceres::Widget.dataFieldUnitsContent", "");
        $this->addField("Ceres::Widget.dataFieldUnitsLength", "");
        $this->addField("Ceres::Widget.dataFieldUnitsWidth", "");
        $this->addField("Ceres::Widget.dataFieldUnitsHeight", "");
        $this->addField("Ceres::Widget.dataFieldUnitsWeight", "");
        $this->addField("Ceres::Widget.dataFieldUnitsWeightNet", "");
        $this->addField("Ceres::Widget.dataFieldUnitsVPE", "");
    }
}