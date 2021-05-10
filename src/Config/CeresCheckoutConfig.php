<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresCheckoutConfig
 *
 * PluginConfig class, including all plugin settings for checkout.
 *
 * @deprecated will be removed in 6.0.0.
 * @package Ceres\Config
 */
class CeresCheckoutConfig extends PluginConfig
{
    /**
     * @var bool $showAllShippingProfiles Defines if all available shipping profiles are displayed in the checkout.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $showAllShippingProfiles;

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
        $this->showAllShippingProfiles = $this->getBooleanValue('checkout.show_all_shipping_profiles', false);
    }
}
