<?php

namespace Ceres\Wizard\ShopWizard\Mapping;

/**
 * Class CurrenciesMapping
 * @package Ceres\Wizard\ShopWizard\Mapping
 */
class CurrenciesMapping
{
    private static $fieldsMapped = [
        "currencies_currencyFormat" => [
            "field"    => "currency.format",
            "type"     => "string",
            "global"   => false,
            "optional" => false,
        ],
        "currencies_currencyFormatSelection" => [
            "field"    => "currency.format_selection",
            "type"     => "string",
            "global"   => false,
            "optional" => false,
        ],
        "currencies_allowCurrencyChange" => [
            "field"    => "currency.enable_selection",
            "type"     => "boolean",
            "global"   => false,
            "optional" => false,
        ],
        "currencies_availableCurrencies" => [
            "field"    => "currency.available_currencies",
            "type"     => "concatenated",
            "global"   => false,
            "optional" => false,
        ],
        "displayInfo_itemDisplayName" => [
            "field"    => "item.displayName",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
    ];
    
    /**
     * @return array
     */
    public static function getFieldsMapped()
    {
        return self::$fieldsMapped;
    }
}
