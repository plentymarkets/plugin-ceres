<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresBasketConfig extends PluginConfig
{
    public $itemData;
    public $data;
    public $previewData;
    public $variations;
    public $addItemToBasketConfirm;
    public $previewType;
    public $showShippingCountrySelect;

    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");

        $this->itemData = $this->getMultiSelectValue(
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

        $this->data = $this->getMultiSelectValue(
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

        $this->previewData = $this->getMultiSelectValue(
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

        $this->addItemToBasketConfirm = $this->getTextValue( "basket.add_item_to_basket_confirm", "overlay" );

        $this->previewType = $this->getTextValue( "basket.preview_type", "right" );
        
        $this->showShippingCountrySelect = $this->getBooleanValue('basket.show_shipping_country_select', true);
    }
}
