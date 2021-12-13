<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresBasketConfig
 *
 * PluginConfig class, including all plugin settings for the basket.
 *
 * @package Ceres\Config
 */
class CeresBasketConfig extends PluginConfig
{
    /**
     * @var array $itemData Visible fields of the basket list items.
     */
    public $itemData;

    /**
     * @var array $data Visible entries of the basket totals.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $data;

    /**
     * @var array $previewData Visible entries of the basket (preview) totals.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $previewData;


    /**
     * @var mixed $variations No usage.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $variations;

    /**
     * @var string $addItemToBasketConfirm Type to display the basket addition. Possible values: 'overlay', 'preview', 'no_information'.
     */
    public $addItemToBasketConfirm;

    /**
     * @var string $previewType Type to display the basket preview. Possible values: 'hover', 'right'.
     */
    public $previewType;

    /**
     * @var boolean $showShippingCountrySelect Defines if the country selection is shown in the basket.
     */
    public $showShippingCountrySelect;

    /**
     * @var mixed $splitBundles No usage.
     */
    public $splitBundles;

    /**
     * @inheritDoc
     */
    protected function getPluginName() :string
    {
        return 'Ceres';
    }

    /**
     * @inheritDoc
     */
    protected function load()
    {
        $this->itemData = $this->getMultiSelectValue(
            'basket.item_data',
            [
                'basket.item.item_id',
                'basket.item.description_short',
                'basket.item.description_long',
                'basket.item.availability',
                'basket.item.customNumber'
            ],
            [
                'basket.item.item_id',
                'basket.item.description_short',
                'basket.item.availability',
                'basket.item.customNumber'
            ]
        );

        $this->data = $this->getMultiSelectValue(
            'basket.data',
            [
                'basket.value_of_items_gross',
                'basket.value_of_items_net',
                'basket.shipping_costs_gross',
                'basket.shipping_costs_net',
                'basket.vat',
                'basket.order_total_gross',
                'basket.order_total_net'
            ]
        );

        $this->previewData = $this->getMultiSelectValue(
            'basket.preview_data',
            [
                'basket.value_of_items_gross',
                'basket.value_of_items_net',
                'basket.shipping_costs_gross',
                'basket.shipping_costs_net',
                'basket.vat',
                'basket.order_total_gross',
                'basket.order_total_net',
                "basket.rebate",
                "basket.promotion_coupon",
                "basket.additional_costs",
                "basket.sales_coupon",
                "basket.open_amount"
            ]
        );

        $this->addItemToBasketConfirm = $this->getTextValue('basket.add_item_to_basket_confirm', 'overlay');

        $this->previewType = $this->getTextValue('basket.preview_type', 'right');

        $this->showShippingCountrySelect = $this->getBooleanValue('basket.show_shipping_country_select', true);

        $this->splitBundles = $this->getTextValue('basket.split_bundles', 'onlyBundleItem');
    }
}
