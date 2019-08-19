<?php
/**
 * Created by PhpStorm.
 * User  => Victor Albulescu
 * Date  => 08/08/2019
 * Time  => 13:59
 */

namespace Ceres\Wizard\ShopWizard\Config;


class SeoConfig
{
    public static $metaRobotsOptions = [
        "robotsAll" => "all",
        "robotsIndex" => "index",
        "robotsNofollow" => "nofollow",
        "robotsNoindex" => "noindex",
        "robotsNoindexNofollow" => "noindex, nofollow"
    ];

    public static $availabilitiesOptions = [
        "availabilityNotSet"  => "",
        "availabilityInStock"  => "http://schema.org/InStock",
        "availabilityOutOfStock"  => "http://schema.org/OutOfStock",
        "availabilityPreOrder"  => "http://schema.org/PreOrder",
        "availabilityDiscontinued"  => "http://schema.org/Discontinued",
        "availabilityInStoreOnly"  => "http://schema.org/InStoreOnly",
        "availabilityLimitedAvailability"  => "http://schema.org/LimitedAvailability",
        "availabilityOnlineOnly"  => "http://schema.org/OnlineOnly",
        "availabilityPreSale"  => "http://schema.org/PreSale",
        "availabilitySoldOut"  => "http://schema.org/SoldOut",
    ];

    public static $siteMapOptions = [
        "siteMapContentCategory" => "contentCategory",
        "siteMapItemCategory" => "itemCategory",
        "siteMapItem" => "item",
        "siteMapBlog" => "blog",
    ];
    public static function getMetaRobotsOptions()
    {
        return self::$metaRobotsOptions;
    }

    public static function getAvailabilitiesOptions()
    {
        return self::$availabilitiesOptions;
    }

    public static function getSiteMapOptions()
    {
        return self::$siteMapOptions;
    }
}