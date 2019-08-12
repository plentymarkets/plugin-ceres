<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 09/08/2019
 * Time: 15:08
 */

namespace Ceres\Wizard\ShopWizard\Mapping;


class SearchMapping
{
    public static $fieldsMapped = [
        "search_defaultSortingSearch" => [
            "field" => "sort.defaultSortingSearch",
            "type" => "string",
            "global" => false,
            "optional" => true,
        ],
        "search_prioritySearch1" => [
            "field" => "sorting.prioritySearch1",
            "type" => "string",
            "global" => false,
            "optional" => true,
        ],
        "search_prioritySearch2" => [
            "field" => "sorting.prioritySearch2",
            "type" => "string",
            "global" => false,
            "optional" => true,
        ],
        "search_prioritySearch3" => [
            "field" => "sorting.prioritySearch3",
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