<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class AvailabilityDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("Ceres::Widget.dataFieldAvailabilityText", "");
        $this->addField("Ceres::Widget.dataFieldAvailabilityIcon", "");
        $this->addField("Ceres::Widget.dataFieldAvailabilityAvgDeliveryDays", "");
        $this->addField("Ceres::Widget.dataFieldAvailabilityMaxOrderQuantity", "");
        $this->addField("Ceres::Widget.dataFieldAvailabilityMinOrderQuantity", "");
        $this->addField("Ceres::Widget.dataFieldAvailabilityIntervalOrderQuantity", "");
        $this->addField("Ceres::Widget.dataFieldAvailabilityReleaseDate", "");
        $this->addField("Ceres::Widget.dataFieldAvailabilityAvailableUntil", "");
    }
}