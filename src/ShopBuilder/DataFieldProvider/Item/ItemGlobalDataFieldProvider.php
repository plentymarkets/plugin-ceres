<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class ItemGlobalDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("Ceres::Widget.dataFieldItemGlobalCondition", "{{ item_data_field('item.condition.names.name') }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalConditionApi", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalProducingCountry", "{{ item_data_field('item.producingCountry.names.name') }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalProducingCountryIso2", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalProducingCountryIso3", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalCustomsTariffNumber", "{{ item_data_field('item.customsTariffNumber') }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalRevenueAccount", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalAgeRestriction", "{{ AgeRestriction.getText(item.documents[0].data.item.ageRestriction) }}");
        $this->addField("Ceres::Widget.dataFieldItemGlobalStoreSpecial", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalRating", "");
    }
}