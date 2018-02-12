<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresBasketConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getItemData()
    {
        return $this->getMultiSelectValue(
            "basket.item_data",
            [
                "basket.item.item_id",
                "basket.item.description_short",
                "basket.item.description_long",
                "basket.item.availability",
                "basket.item.customNumber"
            ],
            [
                "basket.item.item_id",
                "basket.item.description_short",
                "basket.item.availability",
                "basket.item.customNumber"
            ]
        );
    }

    public function getData()
    {
        return $this->getMultiSelectValue(
            "basket.data",
            [
                "basket.value_of_items_gross",
                "basket.value_of_items_net",
                "basket.shipping_costs_gross",
                "basket.shipping_costs_net",
                "basket.vat",
                "basket.order_total_gross",
                "basket.order_total_net"
            ]
        );
    }

    public function getPreviewData()
    {
        return $this->getMultiSelectValue(
            "basket.data",
            [
                "basket.value_of_items_gross",
                "basket.value_of_items_net",
                "basket.shipping_costs_gross",
                "basket.shipping_costs_net",
                "basket.vat",
                "basket.order_total_gross",
                "basket.order_total_net"
            ]
        );
    }

    public function getVariations()
    {
        return $this->getBooleanValue( "basket.variations", false );
    }

    public function getAddItemToBasketConfirm()
    {
        return $this->getTextValue( "basket.add_item_to_basket_confirm", "overlay" );
    }
}