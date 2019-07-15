<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 02/07/2019
 * Time: 12:43
 */

namespace Ceres\Wizard\ShopWizard\Config;


class ItemViewConfig
{

    public static $itemDisplayNames = [
        "itemDisplayItemName" => "itemName",
        "itemDisplayVariationName" => "variationName",
        "itemDisplayItemNameVariationName" => "itemNameVariationName",
    ];


    public static $itemNames = [
        "itemName0" => "0",
        "itemName1" => "1",
        "itemName2" => "2"
    ];

    public static function getItemDisplayNames()
    {
        return self::$itemDisplayNames;
    }

    public static function getItemNames()
    {
        return self::$itemNames;
    }
}