<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresCheckoutConfig extends PluginConfig
{
    public $showAllShippingProfiles;

    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");

        $this->showAllShippingProfiles = $this->getBooleanValue( "checkout.show_all_shipping_profiles", false);
    }
}
