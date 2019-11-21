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
}
