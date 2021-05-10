<?php

namespace Ceres\Wizard\ShopWizard\Mapping;

/**
 * Class SearchMapping
 * @package Ceres\Wizard\ShopWizard\Mapping
 */
class SearchMapping
{
    private static $fieldsMapped = [
        "search_defaultSortingSearch" => [
            "field"    => "sort.defaultSortingSearch",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "search_prioritySearch1" => [
            "field"    => "sorting.prioritySearch1",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "search_prioritySearch2" => [
            "field"    => "sorting.prioritySearch2",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "search_prioritySearch3" => [
            "field"    => "sorting.prioritySearch3",
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
