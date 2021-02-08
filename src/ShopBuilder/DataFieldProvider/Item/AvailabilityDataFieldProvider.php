<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

/**
 * Class AvailabilityDataFieldProvider
 *
 * This class is a data field provider centered on the topic of availability.
 * It is used to enable placeholders for dynamic data in the ShopBuilder's text widget.
 * Please refer to the parent class for more information about DataFieldProviders.
 * Please refer to https://developers.plentymarkets.com/dev-doc/result-fields-ceres for more information about
 * the data fields.
 *
 * @package Ceres\ShopBuilder\DataFieldProvider\Item
 */
class AvailabilityDataFieldProvider extends DataFieldProvider
{
    /**
     * Registers item data fields for use in the ShopBuilder.
     */
    function register()
    {
        $this->addField("availability", "Ceres::Widget.dataFieldAvailabilityText", "item_data_field('variation.availability.names.name')"); // itemData.variation.availability.mappedAvailability?
        $this->addField("availabilityIcon", "Ceres::Widget.dataFieldAvailabilityIcon", "item_data_field('variation.availability.iconPath', null, 'src', 'img')");
        $this->addField("avgDeliveryDays", "Ceres::Widget.dataFieldAvailabilityAvgDeliveryDays", "item_data_field('variation.availability.averageDays')");
        $this->addField("maxQuantity", "Ceres::Widget.dataFieldAvailabilityMaxOrderQuantity", "item_data_field('variation.maximumOrderQuantity')");
        $this->addField("minQuantity", "Ceres::Widget.dataFieldAvailabilityMinOrderQuantity", "item_data_field('variation.minimumOrderQuantity')");
        $this->addField("intervalQuantity", "Ceres::Widget.dataFieldAvailabilityIntervalOrderQuantity", "item_data_field('variation.intervalOrderQuantity')");
        $this->addField("releaseDate", "Ceres::Widget.dataFieldAvailabilityReleaseDate", "item_data_field('variation.releasedAt', 'moment')");
        $this->addField("availableUntil", "Ceres::Widget.dataFieldAvailabilityAvailableUntil", "item_data_field('variation.availableUntil', 'moment')");
    }
}
