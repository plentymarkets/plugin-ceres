<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

/**
 * Class ItemGlobalDataFieldProvider
 *
 * This class is a data field provider centered on the topic of basic item data.
 * It is used to enable placeholders for dynamic data in the ShopBuilder's text widget.
 * Please refer to the parent class for more information about DataFieldProviders.
 * Please refer to https://developers.plentymarkets.com/dev-doc/result-fields-ceres for more information about
 * the data fields.
 * @package Ceres\ShopBuilder\DataFieldProvider\Item
 */
class ItemGlobalDataFieldProvider extends DataFieldProvider
{
    /**
     * Registers item data fields for use in the ShopBuilder.
     */
    function register()
    {
        $this->addField("itemId", "Ceres::Widget.dataFieldItemGlobalItemId", "item_data_field('item.id')");
        $this->addField("condition", "Ceres::Widget.dataFieldItemGlobalCondition", "item_data_field('item.condition.names.name')");
        $this->addField("conditionApi", "Ceres::Widget.dataFieldItemGlobalConditionApi", "item_data_field('item.conditionApi.names.name')");
        $this->addField("producingCountry", "Ceres::Widget.dataFieldItemGlobalProducingCountry", "item_data_field('item.producingCountry.names.name')");
        $this->addField("producingCountryIso2", "Ceres::Widget.dataFieldItemGlobalProducingCountryIso2", "item_data_field('item.producingCountry.isoCode2')");
        $this->addField("producingCountryIso3", "Ceres::Widget.dataFieldItemGlobalProducingCountryIso3", "item_data_field('item.producingCountry.isoCode3')");
        $this->addField("revenueAccount", "Ceres::Widget.dataFieldItemGlobalRevenueAccount", "item_data_field('item.revenueAccount')");
        $this->addField("ageRestriction", "Ceres::Widget.dataFieldItemGlobalAgeRestriction", "item_data_field('item.ageRestriction', 'ageRestriction', null)");
        $this->addField("storeSpecial", "Ceres::Widget.dataFieldItemGlobalStoreSpecial", "item_data_field('item.storeSpecial.names.name')");
        // $this->addField("rating", "Ceres::Widget.dataFieldItemGlobalRating", "");
    }
}
