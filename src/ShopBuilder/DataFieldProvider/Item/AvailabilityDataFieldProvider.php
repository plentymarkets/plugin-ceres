<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class AvailabilityDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("Ceres::Widget.dataFieldAvailabilityText", "{{ item_data_field('variation.availability.names.name') }}"); // itemData.variation.availability.mappedAvailability?
        $this->addField("Ceres::Widget.dataFieldAvailabilityIcon", "");
        $this->addField("Ceres::Widget.dataFieldAvailabilityAvgDeliveryDays", "");
        $this->addField("Ceres::Widget.dataFieldAvailabilityMaxOrderQuantity", "{{ item_data_field('variation.maximumOrderQuantity') }}");
        $this->addField("Ceres::Widget.dataFieldAvailabilityMinOrderQuantity", "{{ item_data_field('variation.minimumOrderQuantity') }}");
        $this->addField("Ceres::Widget.dataFieldAvailabilityIntervalOrderQuantity", "{{ item_data_field('variation.intervalOrderQuantity') }}");
        $this->addField("Ceres::Widget.dataFieldAvailabilityReleaseDate", "{{ item_data_field('variation.releasedAt') }}");
        $this->addField("Ceres::Widget.dataFieldAvailabilityAvailableUntil", "");
    }
}