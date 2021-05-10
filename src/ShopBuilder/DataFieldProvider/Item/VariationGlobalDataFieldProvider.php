<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

/**
 * Class VariationGlobalDataFieldProvider
 *
 * This class is a data field provider centered on the topic of basic variation data.
 * It is used to enable placeholders for dynamic data in the ShopBuilder's text widget.
 * Please refer to the parent class for more information about DataFieldProviders.
 * Please refer to https://developers.plentymarkets.com/dev-doc/result-fields-ceres for more information about
 * the data fields.
 * @package Ceres\ShopBuilder\DataFieldProvider\Item
 */
class VariationGlobalDataFieldProvider extends DataFieldProvider
{
    /**
     * Registers item data fields for use in the ShopBuilder.
     */
    function register()
    {
        $this->addField("variationId", "Ceres::Widget.dataFieldVariationGlobalVariationId", "item_data_field('variation.id')");
        $this->addField("name", "Ceres::Widget.dataFieldVariationGlobalName", "item_data_field('variation.name')");
        $this->addField("number", "Ceres::Widget.dataFieldVariationGlobalNumber", "item_data_field('variation.number')");
        $this->addField("numberExternal", "Ceres::Widget.dataFieldVariationGlobalNumberExternal", "item_data_field('variation.externalId')"); // TODO check
        $this->addField("model", "Ceres::Widget.dataFieldVariationGlobalModel", "item_data_field('variation.model')");
        $this->addField("position", "Ceres::Widget.dataFieldVariationGlobalPosition", "item_data_field('variation.position')");
        $this->addField("customTariffNumber", "Ceres::Widget.dataFieldVariationGlobalCustomsTariffNumber", "item_data_field('variation.customsTariffNumber')");
    }
}
