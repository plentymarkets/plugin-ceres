<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresGlobalConfig extends PluginConfig
{
    public $favicon;
    public $shippingCostsCategoryId;
    public $defaultContactClassB2B;
    public $enableOldUrlPattern;
    public $googleRecaptchaApiKey;
    public $registrationRequirePrivacyPolicyConfirmation;

    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");

        $this->favicon                  = $this->getTextValue( "global.favicon", "" );
        $this->shippingCostsCategoryId  = $this->getIntegerValue( "global.shippingCostsCategoryId", 0 );
        $this->defaultContactClassB2B   = $this->getIntegerValue( "global.default_contact_class_b2b", null );
        $this->enableOldUrlPattern      = $this->getBooleanValue( "global.enableOldUrlPattern", false );
        $this->googleRecaptchaApiKey    = $this->getTextValue( "global.google_recaptcha_api_key", "" );
        $this->registrationRequirePrivacyPolicyConfirmation = $this->getBooleanValue( "global.registration_require_privacy_policy_confirmation", true );
    }
}