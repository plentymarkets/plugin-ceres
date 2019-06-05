<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class VariationGlobalDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("name", "Ceres::Widget.dataFieldVariationGlobalName", "item_data_field('variation.name')");
        $this->addField("number", "Ceres::Widget.dataFieldVariationGlobalNumber", "item_data_field('variation.number')");
        $this->addField("numberExternal", "Ceres::Widget.dataFieldVariationGlobalNumberExternal", "item_data_field('variation.externalId')"); // TODO check
        $this->addField("model", "Ceres::Widget.dataFieldVariationGlobalModel", "item_data_field('variation.model')");
        $this->addField("position", "Ceres::Widget.dataFieldVariationGlobalPosition", "item_data_field('variation.position')");
    }
}