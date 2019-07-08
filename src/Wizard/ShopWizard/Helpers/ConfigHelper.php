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
}