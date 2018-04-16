<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresContactConfig extends PluginConfig
{
    public $shopMail;
    public $openingTimes;
    public $openingTimes_en;
    public $showData;
    public $apiKey;
    public $mapZoom;
    public $mapShowInMobile;
    public $enableConfirmingPrivacyPolicy;

    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");

        $this->shopMail = $this->getTextValue( "contact.shop_mail", "");

        $this->openingTimes = $this->getTextValue("contact.opening_times", "Montag - Freitag, 00:00 - 24:00" );

        $this->openingTimes_en = $this->getTextValue("contact.en.opening_times", "Monday - Friday, 00:00 - 24:00" );

        $this->showData = $this->getMultiSelectValue(
            "contact.show_data",
            [
                "name",
                "ceo",
                "city",
                "country",
                "email",
                "fax",
                "fon",
                "hotline",
                "street",
                "vatNumber",
                "zip",
                "timezone",
                "opening_times"
            ],
            [
                "street",
                "zip",
                "city",
                "hotline",
                "email",
                "opening_times"
            ]
        );

        $this->apiKey = $this->getTextValue( "contact.api_key", "" );

        $this->mapZoom = $this->getIntegerValue( "contact.map_zoom", 16 );

        $this->mapShowInMobile = $this->getBooleanValue( "contact.map_show_in_mobile", false );

        $this->enableConfirmingPrivacyPolicy = $this->getBooleanValue( "contact.enable_confirming_privacy_policy", true );
    }
}