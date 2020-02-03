<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

class CeresCheckoutConfig extends PluginConfig
{
    public $showAllShippingProfiles;

    protected function getPluginName()
    {
        return 'Ceres';
    }

    protected function load()
    {
        $this->showAllShippingProfiles = $this->getBooleanValue('checkout.show_all_shipping_profiles', false);
    }
}
