<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

/**
 * Class ManufacturerDataFieldProvider
 *
 * This class is a data field provider centered on the topic of manufacturers.
 * It is used to enable placeholders for dynamic data in the ShopBuilder's text widget.
 * Please refer to the parent class for more information about DataFieldProviders.
 * Please refer to https://developers.plentymarkets.com/dev-doc/result-fields-ceres for more information about
 * the data fields.
 * @package Ceres\ShopBuilder\DataFieldProvider\Item
 */
class ManufacturerDataFieldProvider extends DataFieldProvider
{
    /**
     * Registers item data fields for use in the ShopBuilder.
     */
    function register()
    {
        $this->addField("name", "Ceres::Widget.dataFieldManufacturerName", "item_data_field('item.manufacturer.name')");
        $this->addField("externalName", "Ceres::Widget.dataFieldManufacturerExternalName", "item_data_field('item.manufacturer.externalName')");
        $this->addField("logo", "Ceres::Widget.dataFieldManufacturerLogo", "item_data_field('item.manufacturer.logo', null, 'src', 'img')");
    }
}
