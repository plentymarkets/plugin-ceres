<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class AvailabilityDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("availability", "Ceres::Widget.dataFieldAvailabilityText", "");
        $this->addField("availabilityIcon", "Ceres::Widget.dataFieldAvailabilityIcon", "");
        $this->addField("avgDeliveryDays", "Ceres::Widget.dataFieldAvailabilityAvgDeliveryDays", "");
        $this->addField("maxQuantity", "Ceres::Widget.dataFieldAvailabilityMaxOrderQuantity", "");
        $this->addField("minQuantity", "Ceres::Widget.dataFieldAvailabilityMinOrderQuantity", "");
        $this->addField("intervalQuantity", "Ceres::Widget.dataFieldAvailabilityIntervalOrderQuantity", "");
        $this->addField("releaseDate", "Ceres::Widget.dataFieldAvailabilityReleaseDate", "");
        $this->addField("availableUntil", "Ceres::Widget.dataFieldAvailabilityAvailableUntil", "");
    }
}