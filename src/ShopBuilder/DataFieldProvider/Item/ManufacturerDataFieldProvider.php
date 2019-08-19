<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class ManufacturerDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("name", "Ceres::Widget.dataFieldManufacturerName", "item_data_field('item.manufacturer.name')");
        $this->addField("externalName", "Ceres::Widget.dataFieldManufacturerExternalName", "item_data_field('item.manufacturer.externalName')");
        $this->addField("logo", "Ceres::Widget.dataFieldManufacturerLogo", "item_data_field('item.manufacturer.logo', null, 'src', 'img')");
    }
}