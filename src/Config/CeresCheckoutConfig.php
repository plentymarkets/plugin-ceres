<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

class CeresCheckoutConfig extends PluginConfig
{
    public $showAllShippingProfiles;
    
    /**
     * @inheritDoc
     */
    protected function getPluginName()
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
