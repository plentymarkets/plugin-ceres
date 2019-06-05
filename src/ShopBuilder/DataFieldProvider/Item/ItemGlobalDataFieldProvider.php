<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class ItemGlobalDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("condition", "Ceres::Widget.dataFieldItemGlobalCondition", "");
        $this->addField("conditionApi", "Ceres::Widget.dataFieldItemGlobalConditionApi", "");
        $this->addField("producingCountry", "Ceres::Widget.dataFieldItemGlobalProducingCountry", "");
        $this->addField("producingCountryIso2", "Ceres::Widget.dataFieldItemGlobalProducingCountryIso2", "");
        $this->addField("producingCountryIso3", "Ceres::Widget.dataFieldItemGlobalProducingCountryIso3", "");
        $this->addField("customTariffNumber", "Ceres::Widget.dataFieldItemGlobalCustomsTariffNumber", "");
        $this->addField("revenueAccount", "Ceres::Widget.dataFieldItemGlobalRevenueAccount", "");
        $this->addField("ageRestriction", "Ceres::Widget.dataFieldItemGlobalAgeRestriction", "");
        $this->addField("storeSpecial", "Ceres::Widget.dataFieldItemGlobalStoreSpecial", "");
        $this->addField("rating", "Ceres::Widget.dataFieldItemGlobalRating", "");
    }
}