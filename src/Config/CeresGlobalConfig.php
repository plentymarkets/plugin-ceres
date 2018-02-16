<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresGlobalConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getShippingCostsCategoryId()
    {
        return $this->getIntegerValue( "global.shippingCostsCategoryId", 0 );
    }

    public function getDefaultContactClassB2B()
    {
        return $this->getIntegerValue( "global.default_contact_class_b2b", null );
    }

    public function getEnableOldUrlPattern()
    {
        return $this->getBooleanValue( "global.enableOldUrlPattern", false );
    }

    public function getGoogleRecaptchaApiKey()
    {
        return $this->getTextValue( "global.google_recaptcha_api_key", "" );
    }


}