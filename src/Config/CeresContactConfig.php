<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresContactConfig
 *
 * PluginConfig class, including all plugin settings for contact view.
 *
 * @deprecated since 4.4.0. This class will be removed in 6.0.0.
 * @package Ceres\Config
 */
class CeresContactConfig extends PluginConfig
{
    /**
     * @var string $shopMail Contact form email address.
     *
     * @deprecated since 4.4.0. Will be removed in 6.0.0.
     */
    public $shopMail;

    /**
     * @var string $mailCC Email address for copy of the contact request (CC).
     *
     * @deprecated since 4.4.0. Will be removed in 6.0.0.
     */
    public $mailCC;

    /**
     * @var string $mailBCC Email address for blind copy of the contact request (BCC).
     *
     * @deprecated since 4.4.0. Will be removed in 6.0.0.
     */
    public $mailBCC;

    /**
     * @var array $showData Contact data to show.
     *
     * @deprecated since 4.4.0. Will be removed in 6.0.0.
     */
    public $showData;

    /**
     * @var string $apiKey Google Maps API key.
     *
     * @deprecated since 4.4.0. Will be removed in 6.0.0.
     */
    public $apiKey;

    /**
     * @var int $mapZoom Google Maps zoom level.
     *
     * @deprecated since 4.4.0. Will be removed in 6.0.0.
     */
    public $mapZoom;

    /**
     * @var bool $mapShowInMobile Show map in mobile view.
     *
     * @deprecated since 4.4.0. Will be removed in 6.0.0.
     */
    public $mapShowInMobile;

    /**
     * @var bool $enableConfirmingPrivacyPolicy Enable to display checkbox for confirming privacy policy.
     *
     * @deprecated since 4.4.0. Will be removed in 6.0.0.
     */
    public $enableConfirmingPrivacyPolicy;

    /**
     * @inheritDoc
     */
    protected function getPluginName(): string
    {
        return 'Ceres';
    }

    /**
     * @inheritDoc
     */
    protected function load()
    {
        $this->shopMail = $this->getTextValue('contact.shop_mail', '', 'your@email.com');
        $this->mailCC = $this->getTextValue('contact.shop_mail_cc', '');
        $this->mailBCC = $this->getTextValue('contact.shop_mail_bcc', '');

        $this->showData = $this->getMultiSelectValue(
            'contact.show_data',
            [
                'name',
                'ceo',
                'city',
                'country',
                'email',
                'fax',
                'fon',
                'hotline',
                'street',
                'vatNumber',
                'zip',
                'timezone',
                'opening_times'
            ],
            [
                'street',
                'zip',
                'city',
                'hotline',
                'email',
                'opening_times'
            ]
        );

        $this->apiKey = $this->getTextValue('contact.api_key', '', 'API key');

        $this->mapZoom = $this->getIntegerValue('contact.map_zoom', 16);

        $this->mapShowInMobile = $this->getBooleanValue('contact.map_show_in_mobile', false);

        $this->enableConfirmingPrivacyPolicy = $this->getBooleanValue('contact.enable_confirming_privacy_policy', true);
    }
}
