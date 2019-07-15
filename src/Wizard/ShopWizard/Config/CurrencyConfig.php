<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 12/07/2019
 * Time: 15:51
 */

namespace Ceres\Wizard\ShopWizard\Config;


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

    public static $currenciesAvailable = [
        "currencyAvailableAED" => "AED",
        "currencyAvailableARS" => "ARS",
        "currencyAvailableAUD" => "AUD",
        "currencyAvailableBGN" => "BGN",
        "currencyAvailableBHD" => "BHD",
        "currencyAvailableBRL" => "BRL",
        "currencyAvailableCAD" => "CAD",
        "currencyAvailableCHF" => "CHF",
        "currencyAvailableCNY" => "CNY",
        "currencyAvailableCZK" => "CZK",
        "currencyAvailableDKK" => "DKK",
        "currencyAvailableEUR" => "EUR",
        "currencyAvailableGBP" => "GBP",
        "currencyAvailableHKD" => "HKD",
        "currencyAvailableHRK" => "HRK",
        "currencyAvailableHUF" => "HUF",
        "currencyAvailableIDR" => "IDR",
        "currencyAvailableINR" => "INR",
        "currencyAvailableJPY" => "JPY",
        "currencyAvailableMXN" => "MXN",
        "currencyAvailableMYR" => "MYR",
        "currencyAvailableNOK" => "NOK",
        "currencyAvailableNZD" => "NZD",
        "currencyAvailablePHP" => "PHP",
        "currencyAvailablePLN" => "PLN",
        "currencyAvailableQAR" => "QAR",
        "currencyAvailableRON" => "RON",
        "currencyAvailableRUB" => "RUB",
        "currencyAvailableSEK" => "SEK",
        "currencyAvailableSGD" => "SGD",
        "currencyAvailableTHB" => "THB",
        "currencyAvailableTRY" => "TRY",
        "currencyAvailableTWD" => "TWD",
        "currencyAvailableUAH" => "UAH",
        "currencyAvailableUSD" => "USD",
        "currencyAvailableVND" => "VND",
        "currencyAvailableXCD" => "XCD",
        "currencyAvailableZAR" => "ZAR"
    ];

    public static function getCurrencyFormat()
    {
        return self::$currencyFormat;
    }

    public static function getCurrencyFormatSelection()
    {
        return self::$currencyFormatSelection;
    }

    public static function getAvailableCurrencies()
    {
        return self::$currenciesAvailable;
    }
}