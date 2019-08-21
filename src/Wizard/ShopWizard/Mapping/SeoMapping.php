<?php

namespace Ceres\Wizard\ShopWizard\Mapping;

/**
 * Class SeoMapping
 * @package Ceres\Wizard\ShopWizard\Mapping
 */
class SeoMapping
{
    private static $fieldsMapped = [
        "seo_robotsSearchResult" => [
            "field"    => "meta.robots_search_result",
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
