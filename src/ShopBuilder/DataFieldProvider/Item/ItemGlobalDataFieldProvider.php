<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class ItemGlobalDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("condition", "Ceres::Widget.dataFieldItemGlobalCondition", "item_data_field('item.condition.names.name')");
        $this->addField("conditionApi", "Ceres::Widget.dataFieldItemGlobalConditionApi", "item_data_field('item.conditionApi.names.name')");
        $this->addField("producingCountry", "Ceres::Widget.dataFieldItemGlobalProducingCountry", "item_data_field('item.producingCountry.names.name')");
        $this->addField("producingCountryIso2", "Ceres::Widget.dataFieldItemGlobalProducingCountryIso2", "item_data_field('item.producingCountry.isoCode2')");
        $this->addField("producingCountryIso3", "Ceres::Widget.dataFieldItemGlobalProducingCountryIso3", "item_data_field('item.producingCountry.isoCode3')");
        $this->addField("customTariffNumber", "Ceres::Widget.dataFieldItemGlobalCustomsTariffNumber", "item_data_field('item.customsTariffNumber')");
        $this->addField("revenueAccount", "Ceres::Widget.dataFieldItemGlobalRevenueAccount", "item_data_field('item.revenueAccount')");
        $this->addField("ageRestriction", "Ceres::Widget.dataFieldItemGlobalAgeRestriction", "item_data_field('item.ageRestriction', 'ageRestriction', null)");
        $this->addField("storeSpecial", "Ceres::Widget.dataFieldItemGlobalStoreSpecial", "item_data_field('item.storeSpecial.names.name')");
        // $this->addField("rating", "Ceres::Widget.dataFieldItemGlobalRating", "");
    }
}