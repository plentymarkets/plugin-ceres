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

    protected static $itemDisplayNames = [
        "itemDisplayItemName" => "itemName",
        "itemDisplayVariationName" => "variationName",
        "itemDisplayItemNameVariationName" => "itemNameVariationName",
    ];


    protected static $itemNames = [
        "itemName0" => "0",
        "itemName1" => "1",
        "itemName2" => "2"
    ];

    protected static $itemDecimals = [
        "itemDecimal0" => "0",
        "itemDecimal1" => "1",
        "itemDecimal2" => "2"
    ];

    public static $loadingAnimationTypes = [
        "loadingAnimationBars" => "bars",
        "loadingAnimationSpinner" => "spinner"
    ];

    public static $itemVariationTypes = [
        "itemVariationTypeAll" => "all",
        "itemVariationTypeMain" => "main",
        "itemVariationTypeChild" => "child",
        "itemVariationTypeCombined" => "combined",
    ];

    public static $categoryDescriptionPositions = [
        "categoryDescriptionNone" => "none",
        "categoryDescription1" => "description1",
        "categoryDescription2" => "description2",
        "categoryDescriptionBoth" => "both",
    ];

    public static $cartItemData = [
        "basketItemId" => "basket.item.item_id",
        "basketItemDescriptionShort" => "basket.item.description_short",
        "basketItemDescriptionLong" => "basket.item.description_long",
        "basketItemAvailability" => "basket.item.availability",
        "basketItemCustomNumber" => "basket.item.customNumber",
    ];

    public static $cartItemAdditionalInfo = [
        "addItemToBasketConfirmOverlay" => "overlay",
        "addItemToBasketConfirmPreview" => "preview",
        "addItemToBasketConfirmNoInformation" => "no_information"
    ];

    public static $cartPreviewPosition = [
        "cartPreviewTypeHover" => "hover",
        "cartPreviewTypeRight" => "preview",
    ];

    public static function getItemDisplayNames()
    {
        return self::$itemDisplayNames;
    }

    public static function getItemNames()
    {
        return self::$itemNames;
    }

    public static function getItemDecimals()
    {
        return self::$itemDecimals;
    }

    public static function getLoadingAnimationTypes()
    {
        return self::$loadingAnimationTypes;
    }

    public static function getItemVariationTypes()
    {
        return self::$itemVariationTypes;
    }

    public static function getCategoryDescriptionPositions()
    {
        return self::$categoryDescriptionPositions;
    }

    public static function getCartItemData()
    {
        return self::$cartItemData;
    }

    public static function getCartItemAdditionalInfo()
    {
        return self::$cartItemAdditionalInfo;
    }

    public static function getCartPreviewPosion()
    {
        return self::$cartPreviewPosition;
    }
}