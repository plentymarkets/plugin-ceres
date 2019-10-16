<?php

namespace Ceres\Wizard\ShopWizard\Config;

/**
 * Class ItemViewConfig
 * @package Ceres\Wizard\ShopWizard\Config
 */
class ItemViewConfig
{
    private static $itemDisplayNames = [
        "itemDisplayItemName"              => "itemName",
        "itemDisplayVariationName"         => "variationName",
        "itemDisplayItemNameVariationName" => "itemNameVariationName",
    ];

    private static $itemNames = [
        "itemName0" => "0",
        "itemName1" => "1",
        "itemName2" => "2"
    ];

    private static $itemDecimals = [
        "itemDecimal0" => "0",
        "itemDecimal1" => "1",
        "itemDecimal2" => "2"
    ];

    private static $loadingAnimationTypes = [
        "loadingAnimationBars" => "bars",
        "loadingAnimationSpinner" => "spinner"
    ];

    private static $itemVariationTypes = [
        "itemVariationTypeAll"      => "all",
        "itemVariationTypeMain"     => "main",
        "itemVariationTypeChild"    => "child",
        "itemVariationTypeCombined" => "combined",
    ];

    private static $categoryDescriptionPositions = [
        "categoryDescriptionNone" => "none",
        "categoryDescription1"    => "description1",
        "categoryDescription2"    => "description2",
        "categoryDescriptionBoth" => "both",
    ];

    private static $cartItemData = [
        "basketItemId" => "basket.item.item_id",
        "basketItemDescriptionShort" => "basket.item.description_short",
        "basketItemDescriptionLong"  => "basket.item.description_long",
        "basketItemAvailability"     => "basket.item.availability",
        "basketItemCustomNumber"     => "basket.item.customNumber",
    ];

    private static $cartItemAdditionalInfo = [
        "addItemToBasketConfirmOverlay"       => "overlay",
        "addItemToBasketConfirmPreview"       => "preview",
        "addItemToBasketConfirmNoInformation" => "no_information"
    ];

    private static $cartPreviewPosition = [
        "cartPreviewTypeHover" => "hover",
        "cartPreviewTypeRight" => "right",
    ];

    /**
     * @return array
     */
    public static function getItemDisplayNames()
    {
        return self::$itemDisplayNames;
    }

    /**
     * @return array
     */
    public static function getItemNames()
    {
        return self::$itemNames;
    }

    /**
     * @return array
     */
    public static function getItemDecimals()
    {
        return self::$itemDecimals;
    }

    /**
     * @return array
     */
    public static function getLoadingAnimationTypes()
    {
        return self::$loadingAnimationTypes;
    }

    /**
     * @return array
     */
    public static function getItemVariationTypes()
    {
        return self::$itemVariationTypes;
    }

    /**
     * @return array
     */
    public static function getCategoryDescriptionPositions()
    {
        return self::$categoryDescriptionPositions;
    }

    /**
     * @return array
     */
    public static function getCartItemData()
    {
        return self::$cartItemData;
    }

    /**
     * @return array
     */
    public static function getCartItemAdditionalInfo()
    {
        return self::$cartItemAdditionalInfo;
    }

    /**
     * @return array
     */
    public static function getCartPreviewPosion()
    {
        return self::$cartPreviewPosition;
    }
}
