<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class VariationGlobalDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("name", "Ceres::Widget.dataFieldVariationGlobalName", "");
        $this->addField("number", "Ceres::Widget.dataFieldVariationGlobalNumber", "");
        $this->addField("numberExternal", "Ceres::Widget.dataFieldVariationGlobalNumberExternal", "");
        $this->addField("model", "Ceres::Widget.dataFieldVariationGlobalModel", "");
        $this->addField("position", "Ceres::Widget.dataFieldVariationGlobalPosition", "");
    }
}