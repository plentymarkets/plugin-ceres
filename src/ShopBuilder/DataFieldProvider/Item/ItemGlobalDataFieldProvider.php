<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class ItemGlobalDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("Ceres::Widget.dataFieldItemGlobalCondition", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalConditionApi", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalManufacturer", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalManufacturerExternalName", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalProducingCountry", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalProducingCountryIso2", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalProducingCountryIso3", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalCustomsTariffNumber", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalRevenueAccount", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalAgeRestriction", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalStoreSpecial", "");
        $this->addField("Ceres::Widget.dataFieldItemGlobalRating", "");
    }
}