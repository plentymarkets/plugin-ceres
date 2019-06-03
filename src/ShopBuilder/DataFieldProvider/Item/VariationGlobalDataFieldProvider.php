<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class VariationGlobalDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("Ceres::Widget.dataFieldVariationGlobalName", "{{ item_data_field('variation.name') }}");
        $this->addField("Ceres::Widget.dataFieldVariationGlobalNumber", "{{ item_data_field('variation.number') }}");
        $this->addField("Ceres::Widget.dataFieldVariationGlobalNumberExternal", "{{ item_data_field('variation.externalId') }}"); // TODO check
        $this->addField("Ceres::Widget.dataFieldVariationGlobalModel", "{{ item_data_field('variation.model') }}");
        $this->addField("Ceres::Widget.dataFieldVariationGlobalPosition", "{{ item_data_field('variation.position') }}");
    }
}