<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 12/07/2019
 * Time: 15:51
 */

namespace Ceres\Wizard\ShopWizard\Config;


use Ceres\Config\CeresCurrencyConfig;

class CurrencyConfig
{
    public static $currencyFormat = [
        "currencyFormatName" => "name",
        "currencyFormatSymbol" => "symbol"
    ];

    public static $currencyFormatSelection = [
        "currencyFormatName" => "name",
        "currencyFormatSymbol" => "symbol",
        "currencyFormatAll" => "all"
    ];

    public $currenciesAvailable = [];

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
    public static function getCurrencyFormat()
    {
        return self::$currencyFormat;
    }

    public static function getCurrencyFormatSelection()
    {
        return self::$currencyFormatSelection;
    }

    public function getAvailableCurrencies()
    {
        return $this->currenciesAvailable;
    }
}