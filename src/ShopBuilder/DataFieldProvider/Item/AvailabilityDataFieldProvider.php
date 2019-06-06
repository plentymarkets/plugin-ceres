<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class AvailabilityDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("availability", "Ceres::Widget.dataFieldAvailabilityText", "item_data_field('variation.availability.names.name')"); // itemData.variation.availability.mappedAvailability?
        $this->addField("availabilityIcon", "Ceres::Widget.dataFieldAvailabilityIcon", "item_data_field('variation.availability.icon')");
        $this->addField("avgDeliveryDays", "Ceres::Widget.dataFieldAvailabilityAvgDeliveryDays", "item_data_field('variation.availability.averageDays')");
        $this->addField("maxQuantity", "Ceres::Widget.dataFieldAvailabilityMaxOrderQuantity", "item_data_field('variation.maximumOrderQuantity')");
        $this->addField("minQuantity", "Ceres::Widget.dataFieldAvailabilityMinOrderQuantity", "item_data_field('variation.minimumOrderQuantity')");
        $this->addField("intervalQuantity", "Ceres::Widget.dataFieldAvailabilityIntervalOrderQuantity", "item_data_field('variation.intervalOrderQuantity')");
        $this->addField("releaseDate", "Ceres::Widget.dataFieldAvailabilityReleaseDate", "item_data_field('variation.releasedAt', 'moment')");
        $this->addField("availableUntil", "Ceres::Widget.dataFieldAvailabilityAvailableUntil", "item_data_field('variation.availableUntil', 'moment')");
    }
}