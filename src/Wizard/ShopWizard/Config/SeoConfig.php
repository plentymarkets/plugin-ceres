<?php

namespace Ceres\Wizard\ShopWizard\Config;

/**
 * Class SeoConfig
 * @package Ceres\Wizard\ShopWizard\Config
 */
class SeoConfig
{
    private static $metaRobotsOptions = [
        "robotsAll"             => "all",
        "robotsIndex"           => "index",
        "robotsNofollow"        => "nofollow",
        "robotsNoindex"         => "noindex",
        "robotsNoindexNofollow" => "noindex, nofollow"
    ];

    private static $availabilitiesOptions = [
        "availabilityNotSet"               => "",
        "availabilityInStock"              => "http://schema.org/InStock",
        "availabilityOutOfStock"           => "http://schema.org/OutOfStock",
        "availabilityPreOrder"             => "http://schema.org/PreOrder",
        "availabilityDiscontinued"         => "http://schema.org/Discontinued",
        "availabilityInStoreOnly"          => "http://schema.org/InStoreOnly",
        "availabilityLimitedAvailability"  => "http://schema.org/LimitedAvailability",
        "availabilityOnlineOnly"           => "http://schema.org/OnlineOnly",
        "availabilityPreSale"              => "http://schema.org/PreSale",
        "availabilitySoldOut"              => "http://schema.org/SoldOut",
    ];

    private static $siteMapOptions = [
        "siteMapContentCategory" => "contentCategory",
        "siteMapItemCategory"    => "itemCategory",
        "siteMapItem"            => "item",
        "siteMapBlog"            => "blog",
    ];

    private static $brandOptions = [
        "brandNotSet"               => "1",
        "manufacturerExtern"        => "2",
        "brandSetPropertyOnArticle" => "3",
    ];

    private static $manufacturerOptions = [
        "manufacturerNotSet"        => "1",
        "manufacturerExtern"        => "2",
        "manufacturerName"          => "3",
    ];

    private static $gtinOptions = [
        "gtinNotSet"                => "1",
        "gtinSetFirst"              => "2",
        "gtinSet"                   => "3",
    ];

    private static $gtin8Options = [
        "gtin8NotSet"                => "1",
        "gtin8SetFirst"              => "2",
        "gtin8Set"                   => "3",
    ];

    private static $gtin13Options = [
        "gtin13NotSet"                => "1",
        "gtin13SetFirst"              => "2",
        "gtin13Set"                   => "3",
    ];

    private static $isbnOptions = [
        "isbnNotSet"                  => "1",
        "isbnSetFirst"                => "2",
        "isbnSet"                     => "3",
    ];

    private static $mpnOptions = [
        "mpnNotSet"                  => "1",
        "externalVariationId"        => "2",
        "mpnSet"                     => "3",
    ];

    private static $skuOptions = [
        "skuVariationID"              => "1",
        "skuVariationNr"              => "2",
        "skuVarPropSet"               => "3",
        "skuItemID"                   => "4",
    ];

    /**
     * @return array
     */
    public static function getMetaRobotsOptions()
    {
        return self::$metaRobotsOptions;
    }

    /**
     * @return array
     */
    public static function getAvailabilitiesOptions()
    {
        return self::$availabilitiesOptions;
    }

    /**
     * @return array
     */
    public static function getSiteMapOptions()
    {
        return self::$siteMapOptions;
    }

    /**
     * @return array
     */
    public static function getBrandOptions()
    {
        return self::$brandOptions;
    }

    /**
     * @return array
     */
    public static function getManufacturerOptions()
    {
        return self::$manufacturerOptions;
    }

    /**
     * @return array
     */
    public static function getGtinOptions()
    {
        return self::$gtinOptions;
    }

    /**
     * @return array
     */
    public static function getGtin8Options()
    {
        return self::$gtin8Options;
    }

    /**
     * @return array
     */
    public static function getGtin13Options()
    {
        return self::$gtin13Options;
    }

    /**
     * @return array
     */
    public static function getIsbnOptions()
    {
        return self::$isbnOptions;
    }

    /**
     * @return array
     */
    public static function getMpnOptions()
    {
        return self::$mpnOptions;
    }

    /**
     * @return array
     */
    public static function getSkuOptions()
    {
        return self::$skuOptions;
    }
}
