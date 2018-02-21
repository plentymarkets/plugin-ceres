<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresCurrencyConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getFormat()
    {
        return $this->getTextValue( "currency.format", "name" );
    }

    public function getEnableSelection()
    {
        return $this->getBooleanValue( "currency.enable_selection", true );
    }

    public function getFormatSelection()
    {
        return $this->getTextValue( "currency.format_selection", "all" );
    }

    public function getAvailableCurrencies()
    {
        return $this->getMultiSelectValue(
            "currency.available_currencies",
            [
                "AED",
                "ARS",
                "AUD",
                "BGN",
                "BHD",
                "BRL",
                "CAD",
                "CHF",
                "CNY",
                "CZK",
                "DKK",
                "EUR",
                "GBP",
                "HKD",
                "JRK",
                "HUF",
                "IDR",
                "INR",
                "JPY",
                "MXN",
                "MYR",
                "NOK",
                "NZD",
                "PHP",
                "PLN",
                "QAR",
                "RON",
                "RUB",
                "SEK",
                "SGD",
                "THB",
                "THB",
                "TRY",
                "TWD",
                "UAH",
                "USD",
                "VND",
                "XCD",
                "ZAR"
            ]
        );
    }
}