<?php

namespace Ceres\Wizard\ShopWizard\Config;

/**
 * Class OnlineStoreConfig
 * @package Ceres\Wizard\ShopWizard\Config
 */
class OnlineStoreConfig
{
    private static $categoryTypes = [
        "storeCategoryTypeItem"    => "item",
        "storeCategoryTypeContent" => "content",
        "storeCategoryTypeBlog"    => "blog"
    ];

    private static $categoryTreeDepths = [
        "categoryTreeDepth1" => 1,
        "categoryTreeDepth2" => 2,
        "categoryTreeDepth3" => 3,
        "categoryTreeDepth4" => 4,
        "categoryTreeDepth5" => 5,
        "categoryTreeDepth6" => 6
    ];
    
    private static $toTopButtonPosition = [
        "back2TopRight"  => "right",
        "back2TopBottom" => "bottom"
    ];
    
    private static $confirmationLinkExpiration = [
        "confirmationLinkExpirationAlways" => "always",
        "confirmationLinkExpiration30"     => '30',
        "confirmationLinkExpiration90"     => '90'
    ];
    
    private static $globalMaxAge = [
        "globalMaxAge1Hour"    => "1",
        "globalMaxAge6Hours"   => "6",
        "globalMaxAge12Hours"  => "12",
        "globalMaxAge24Hours"  => "24",
        "globalMaxAge1Week"    => "168",
        "globalMaxAgeInfinite" => "-1"
    ];
    
    private static $itemBundles = [
        "itemBundlesDoNot"   => "1",
        "itemBundlesList"    => "2",
        "itemBundlesReplace" => "0"
    ];

    public static $sessionLifetimeOptions = [
        "sessionLifetimeUntilBrowserIsClosed" => "0",
        "sessionLifetimeHundredDays"  => "8640000",
    ];

    
    /**
     * @return array
     */
    public static function getCategoryTypes()
    {
        return self::$categoryTypes;
    }

    public static function getCategoryTreeDepths()
    {
        return self::$categoryTreeDepths;
    }
    
    /**
     * @return array
     */
    public static function getToTopButtonPosition()
    {
        return self::$toTopButtonPosition;
    }
    
    /**
     * @return array
     */
    public static function getConfirmationLinkExpiration()
    {
        return self::$confirmationLinkExpiration;
    }
    
    /**
     * @return array
     */
    public static function getUserHashMaxAge()
    {
        return self::$globalMaxAge;
    }
    
    /**
     * @return array
     */
    public static function getItemBundles()
    {
        return self::$itemBundles;
    }

    /**
     * @return array
     */
    public static function getSessionLifetimeOptions()
    {
        return self::$sessionLifetimeOptions;
    }
}