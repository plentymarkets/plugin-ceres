<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresGlobalConfig
 *
 * PluginConfig class, including all global plugin settings.
 *
 * @package Ceres\Config
 */
class CeresGlobalConfig extends PluginConfig
{
    /**
     * @var string $favicon Favicon of the online store.
     */
    public $favicon;

    /**
     * @var int $shippingCostsCategoryId Category to display shipping information.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $shippingCostsCategoryId;

    /**
     * @var bool Enable Callisto route pattern for items.
     */
    public $enableOldUrlPattern;

    /**
     * @var int $googleRecaptchaVersion Google reCAPTCHA version.
     */
    public $googleRecaptchaVersion;

    /**
     * @var string $googleRecaptchaApiKey Google reCAPTCHA website key.
     */
    public $googleRecaptchaApiKey;

    /**
     * @var float $googleRecaptchaThreshold Google reCAPTCHA v3 threshold.
     */
    public $googleRecaptchaThreshold;

    /**
     * @var string $googleRecaptchaConsentGroup Google reCAPTCHA cookie group.
     */
    public $googleRecaptchaConsentGroup;

    /**
     * @var string $googleMapsApiKey Google Maps API key.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $googleMapsApiKey;

    /**
     * @var bool $registrationRequirePrivacyPolicyConfirmation Require acceptance of privacy policy for customer registration.
     */
    public $registrationRequirePrivacyPolicyConfirmation;

    /**
     * @var bool $blockCookies Block unaccepted cookies.
     */
    public $blockCookies;

    /**
     * @var int $userDataHashMaxAge Validity of URLs to change password and email address.
     */
    public $userDataHashMaxAge;

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
        $this->favicon                     = $this->getTextValue( 'global.favicon', '' );
        $this->shippingCostsCategoryId     = $this->getIntegerValue( 'global.shippingCostsCategoryId', 0 );
        $this->enableOldUrlPattern         = $this->getBooleanValue( 'global.enableOldUrlPattern', false );

        // This setting was moved from deprecated contact config
        // TODO: rename config key in version 5.0.0
        $this->googleMapsApiKey            = $this->getTextValue( 'contact.api_key', '', 'API key' );
        $this->googleRecaptchaVersion      = $this->getIntegerValue( 'global.google_recaptcha_version', 2 );
        $this->googleRecaptchaApiKey       = $this->getTextValue( 'global.google_recaptcha_api_key', '' );
        $this->googleRecaptchaThreshold    = $this->getConfigValue('google_recaptcha_threshold', 0.5);
        $this->googleRecaptchaConsentGroup = $this->getTextValue('global.google_recaptcha_consentGroup', 'media');
        $this->registrationRequirePrivacyPolicyConfirmation = $this->getBooleanValue( 'global.registration_require_privacy_policy_confirmation', true );
        $this->blockCookies                = $this->getBooleanValue( 'global.block_cookies', true );
        $ttl = $this->getIntegerValue('global.user_data_hash_max_age', 1);
        $this->userDataHashMaxAge = $ttl == -1 ? 168 : $ttl;
    }
}
