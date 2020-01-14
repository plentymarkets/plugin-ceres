<?php

namespace Ceres\Wizard\ShopWizard\Config;

use Ceres\Config\CeresCurrencyConfig;

/**
 * Class CurrencyConfig
 * @package Ceres\Wizard\ShopWizard\Config
 */
class CurrencyConfig
{
    private static $currencyFormat = [
        "currencyFormatName"   => "name",
        "currencyFormatSymbol" => "symbol"
    ];

    private static $currencyFormatSelection = [
        "currencyFormatName"   => "name",
        "currencyFormatSymbol" => "symbol",
        "currencyFormatAll"    => "all"
    ];

    private $currenciesAvailable = [];

    /**
     * CurrencyConfig constructor.
     */
    public function __construct()
    {
        $this->currenciesAvailable = $this->setAvailableCurrencies();
    }

    /**
     * @return array
     */
    private function setAvailableCurrencies(): array
    {
        $currenciesConfig = pluginApp(CeresCurrencyConfig::class);
        $currenciesList = $currenciesConfig->availableCurrencies;
        $availableCurrencies = [];

        foreach ($currenciesList as $currencyItem) {
            $currencyKey = "currencyAvailable{$currencyItem}";
            $availableCurrencies[$currencyKey] = $currencyItem;
        }

        return $availableCurrencies;
    }
    
    /**
     * @return array
     */
    public static function getCurrencyFormat()
    {
        return self::$currencyFormat;
    }
    
    /**
     * @return array
     */
    public static function getCurrencyFormatSelection()
    {
        return self::$currencyFormatSelection;
    }
}
