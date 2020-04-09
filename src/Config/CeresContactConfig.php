<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresContactConfig
 * @package Ceres\Config
 *
 * @deprecated since 4.4.0. This class will be removed in 5.0.0
 */
class CeresContactConfig extends PluginConfig
{
    public $shopMail;
    public $mailCC;
    public $mailBCC;
    public $showData;
    public $apiKey;
    public $mapZoom;
    public $mapShowInMobile;
    public $enableConfirmingPrivacyPolicy;

    protected function getPluginName()
    {
        return 'Ceres';
    }

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
