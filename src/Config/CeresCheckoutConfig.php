<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

class CeresCheckoutConfig extends PluginConfig
{
    /**
     * @var bool $showAllShippingProfiles Defines if all available shipping profiles are displayed in the checkout.
     *
     * @deprecated
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
