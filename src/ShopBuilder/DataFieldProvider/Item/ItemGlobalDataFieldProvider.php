<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class ItemGlobalDataFieldProvider extends DataFieldProvider
{
    function register()
    {
<<<<<<< HEAD
        $this->addField("Ceres::Widget.dataFieldItemGlobalCondition", "{{ item_data_field('item.condition.names.name') }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalConditionApi", "{{ item_data_field('item.conditionApi.names.name') }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalProducingCountry", "{{ item_data_field('item.producingCountry.names.name') }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalProducingCountryIso2", "{{ item_data_field('item.producingCountry.isoCode2') }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalProducingCountryIso3", "{{ item_data_field('item.producingCountry.isoCode3') }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalCustomsTariffNumber", "{{ item_data_field('item.customsTariffNumber') }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalRevenueAccount", "{{ item_data_field('item.revenueAccount') }}"); // it only gives an id
        $this->addField("Ceres::Widget.dataFieldItemGlobalAgeRestriction", "{{ AgeRestriction.getText('item.ageRestriction') }}"); // TODO
        $this->addField("Ceres::Widget.dataFieldItemGlobalStoreSpecial", "{{ item_data_field('item.storeSpecial') }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalRating", "");
=======
        $this->addField("condition", "Ceres::Widget.dataFieldItemGlobalCondition", "");
        $this->addField("conditionApi", "Ceres::Widget.dataFieldItemGlobalConditionApi", "");
        $this->addField("producingCountry", "Ceres::Widget.dataFieldItemGlobalProducingCountry", "");
        $this->addField("producingCountryIso2", "Ceres::Widget.dataFieldItemGlobalProducingCountryIso2", "");
        $this->addField("producingCountryIso2", "Ceres::Widget.dataFieldItemGlobalProducingCountryIso3", "");
        $this->addField("customTariffNumber", "Ceres::Widget.dataFieldItemGlobalCustomsTariffNumber", "");
        $this->addField("revenueAccount", "Ceres::Widget.dataFieldItemGlobalRevenueAccount", "");
        $this->addField("ageRestriction", "Ceres::Widget.dataFieldItemGlobalAgeRestriction", "");
        $this->addField("storeSpecial", "Ceres::Widget.dataFieldItemGlobalStoreSpecial", "");
        $this->addField("rating", "Ceres::Widget.dataFieldItemGlobalRating", "");
>>>>>>> sb_single_item/data_field_identifier
    }
}