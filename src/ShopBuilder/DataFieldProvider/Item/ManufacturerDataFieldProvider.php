<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class ManufacturerDataFieldProvider extends DataFieldProvider
{
    function register()
    {
<<<<<<< HEAD
        $this->addField("Ceres::Widget.dataFieldItemManufacturerName", "{{ item_data_field('item.manufacturer.name') }}");
        $this->addField("Ceres::Widget.dataFieldItemManufacturerExternalName", "{{ item_data_field('item.manufacturer.externalName') }}");
=======
        $this->addField("name", "Ceres::Widget.dataFieldManufacturerName", "");
        $this->addField("externalName", "Ceres::Widget.dataFieldManufacturerExternalName", "");
>>>>>>> sb_single_item/data_field_identifier
    }
}