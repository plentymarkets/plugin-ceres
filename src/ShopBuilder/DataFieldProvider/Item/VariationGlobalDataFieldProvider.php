<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class VariationGlobalDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("Ceres::Widget.dataFieldVariationGlobalName", "");
        $this->addField("Ceres::Widget.dataFieldVariationGlobalNumber", "");
        $this->addField("Ceres::Widget.dataFieldVariationGlobalNumberExternal", "");
        $this->addField("Ceres::Widget.dataFieldVariationGlobalModel", "");
        $this->addField("Ceres::Widget.dataFieldVariationGlobalPosition", "");
    }
}