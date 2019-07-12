<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 02/07/2019
 * Time: 12:43
 */

namespace Ceres\Wizard\ShopWizard\Helpers;


class ConfigHelper
{
    public static $categoryTypes = [
        "storeCategoryTypeItem" => "item",
        "storeCategoryTypeContent" => "content",
        "storeCategoryTypeBlog" => "blog"
    ];

    public static $toTopButtonPosition = [
        "back2TopRight" => "right",
        "back2TopBottom" => "bottom"
    ];

    public static $confirmationLinkExpiration = [
        "confirmationLinkExpirationAlways" => "always",
        "confirmationLinkExpiration30" => '30',
        "confirmationLinkExpiration90" => '90'
    ];


    public static $globalMaxAge = [
        "globalMaxAge1Hour" => "1",
        "globalMaxAge6Hours" => "6",
        "globalMaxAge12Hours" => "12",
        "globalMaxAge24Hours" => "24",
        "globalMaxAge1Week" => "168",
        "globalMaxAgeInfinite" => "-1"
    ];

    public static $itemBundles = [
        "itemBundlesDoNot" => "1",
        "itemBundlesList" => "2",
        "itemBundlesReplace" => "0"
    ];

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

    public static function getCategoryTypes()
    {
        return self::$categoryTypes;
    }

    public static function getToTopButtonPosition()
    {
        return self::$toTopButtonPosition;
    }

    public static function getConfirmationLinkExpiration()
    {
        return self::$confirmationLinkExpiration;
    }

    public static function getUserHashMaxAge()
    {
        return self::$globalMaxAge;
    }

    public static function getItemBundles()
    {
        return self::$itemBundles;
    }

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