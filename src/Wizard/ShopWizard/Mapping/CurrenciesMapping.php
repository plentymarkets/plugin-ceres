<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 09/08/2019
 * Time: 14:42
 */

namespace Ceres\Wizard\ShopWizard\Mapping;


class CurrenciesMapping
{
    public static $fieldsMapped = [
        "currencies_currencyFormat" => [
            "field" => "currency.format",
            "type" => "string",
            "global" => false,
            "optional" => false,
        ],
        "currencies_currencyFormatSelection" => [
            "field" => "currency.format_selection",
            "type" => "string",
            "global" => false,
            "optional" => false,
        ],
        "currencies_allowCurrencyChange" => [
            "field" => "currency.enable_selection",
            "type" => "boolean",
            "global" => false,
            "optional" => false,
        ],
        "currencies_availableCurrencies" => [
            "field" => "currency.available_currencies",
            "type" => "concatenated",
            "global" => false,
            "optional" => false,
        ],
        "displayInfo_itemDisplayName" => [
            "field" => "item.displayName",
            "type" => "string",
            "global" => false,
            "optional" => true,
        ],
    ];

    public static function getFieldsMapped()
    {
        return self::$fieldsMapped;
    }
}