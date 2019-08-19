<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 09/08/2019
 * Time: 15:10
 */

namespace Ceres\Wizard\ShopWizard\Mapping;


class SeoMapping
{
    public static $fieldsMapped = [
        "seo_robotsSearchResult" => [
            "field" => "meta.robots_search_result",
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