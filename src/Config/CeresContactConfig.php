<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresContactConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getShopMail()
    {
        return $this->getTextValue( "contact.shop_mail", "");
    }

    public function getOpeningTimes()
    {
        return $this->getTextValue("contact.opening_times", "Montag - Freitag, 00:00 - 24:00" );
    }

    public function getOpeningTimes_en()
    {
        return $this->getTextValue("contact.en.opening_times", "Monday - Friday, 00:00 - 24:00" );
    }

    public function getShowData()
    {
        return $this->getMultiSelectValue(
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
    }

    public function getApiKey()
    {
        return $this->getTextValue( "contact.api_key", "" );
    }

    public function getMapZoom()
    {
        return $this->getIntegerValue( "contact.map_zoom", 16 );
    }

    public function getMapShowInMobile()
    {
        return $this->getBooleanValue( "contact.map_show_in_mobile", false );
    }
}