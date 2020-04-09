<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

class CeresGlobalConfig extends PluginConfig
{
    public $favicon;
    public $shippingCostsCategoryId;
    public $defaultContactClassB2B;
    public $enableOldUrlPattern;
    public $googleRecaptchaVersion;
    public $googleRecaptchaApiKey;
    public $googleRecaptchaSecret;
    public $googleRecaptchaThreshold;
    public $googleMapsApiKey;
    public $registrationRequirePrivacyPolicyConfirmation;
    public $blockCookies;
    public $userDataHashMaxAge;

    protected function getPluginName()
    {
        return 'Ceres';
    }

    protected function load()
    {
        $this->favicon                  = $this->getTextValue( 'global.favicon', '' );
        $this->shippingCostsCategoryId  = $this->getIntegerValue( 'global.shippingCostsCategoryId', 0 );
        $this->defaultContactClassB2B   = $this->getIntegerValue( 'global.default_contact_class_b2b', null );
        $this->enableOldUrlPattern      = $this->getBooleanValue( 'global.enableOldUrlPattern', false );

        // This setting was moved from deprecated contact config
        // TODO: rename config key in version 5.0.0
        $this->googleMapsApiKey         = $this->getTextValue( 'contact.api_key', '', 'API key' );
        $this->googleRecaptchaVersion   = $this->getIntegerValue( 'global.google_recaptcha_version', 2 );
        $this->googleRecaptchaApiKey    = $this->getTextValue( 'global.google_recaptcha_api_key', '' );
        $this->googleRecaptchaSecret    = $this->getTextValue('global.google_recaptcha_secret', '');
        $this->googleRecaptchaThreshold = $this->getConfigValue('google_recaptcha_threshold', 0.5);
        $this->registrationRequirePrivacyPolicyConfirmation = $this->getBooleanValue( 'global.registration_require_privacy_policy_confirmation', true );
        $this->blockCookies             = $this->getBooleanValue( 'global.block_cookies', false );
        $this->userDataHashMaxAge       = $this->getIntegerValue('global.user_data_hash_max_age', 24);
    }
}
