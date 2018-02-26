<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresCurrencyConfig extends PluginConfig
{
    public $format;
    public $enableSelection;
    public $formatSelection;
    public $availableCurrencies;

    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");

        $this->format = $this->getTextValue( "currency.format", "name" );

        $this->enableSelection = $this->getBooleanValue( "currency.enable_selection", true );

        $this->formatSelection = $this->getTextValue( "currency.format_selection", "all" );

        $this->availableCurrencies = $this->getMultiSelectValue(
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