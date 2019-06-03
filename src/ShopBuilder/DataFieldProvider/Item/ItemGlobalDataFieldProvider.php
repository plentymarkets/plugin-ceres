<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class ItemGlobalDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("Ceres::Widget.dataFieldItemGlobalCondition", "{{ item_data_field('item.condition.names.name') }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalConditionApi", "{{ item_data_field('item.conditionApi.names.name') }}"); // not in result fields
        $this->addField("Ceres::Widget.dataFieldItemGlobalProducingCountry", "{{ item_data_field('item.producingCountry.names.name') }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalProducingCountryIso2", "{{ item_data_field('item.producingCountry.isoCode2') }}"); // not in result fields
        $this->addField("Ceres::Widget.dataFieldItemGlobalProducingCountryIso3", "{{ item_data_field('item.producingCountry.isoCode3') }}"); // not in result fields
        $this->addField("Ceres::Widget.dataFieldItemGlobalCustomsTariffNumber", "{{ item_data_field('item.customsTariffNumber') }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalRevenueAccount", "{{ item_data_field('item.revenueAccount') }}"); // not in result fields and it gives only an id
        $this->addField("Ceres::Widget.dataFieldItemGlobalAgeRestriction", "{{ AgeRestriction.getText(item.documents[0].data.item.ageRestriction) }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalStoreSpecial", "{{ item_data_field('item.storeSpecial') }}");// not in es
        $this->addField("Ceres::Widget.dataFieldItemGlobalRating", "");
    }
}