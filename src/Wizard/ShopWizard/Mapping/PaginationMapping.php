<?php

namespace Ceres\Wizard\ShopWizard\Mapping;

/**
 * Class PaginationMapping
 * @package Ceres\Wizard\ShopWizard\Mapping
 */
class PaginationMapping
{
    private static $fieldsMapped = [
        "paginationStep_displayPagination" => [
            "field"    => "pagination.position",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "paginationStep_showFirstPage" => [
            "field"    => "pagination.showFirstPage",
            "type"     => "boolean",
            "global"   => false,
            "optional" => true,
        ],
        "paginationStep_showLastPage" => [
            "field"    => "pagination.showLastPage",
            "type"     => "boolean",
            "global"   => false,
            "optional" => true,
        ],
        "paginationStep_itemsPerPage" => [
            "field"    => "pagination.itemsPerPage",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "pagination_itemSortBy" => [
            "field"    => "sort.data",
            "type"     => "concatenated",
            "global"   => false,
            "optional" => true,
        ],
        "pagination_defaultSorting" => [
            "field"    => "sort.defaultSorting",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "pagination_sortingCat1" => [
            "field"    => "sorting.priorityCategory1",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "pagination_sortingCat2" => [
            "field"    => "sorting.priorityCategory2",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "pagination_sortingCat3" => [
            "field"    => "sorting.priorityCategory3",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "pagination_sortingMonthlySales" => [
            "field"    => "itemSortByMonthlySales",
            "type"     => "integer",
            "global"   => true,
            "optional" => true,
        ],
        "pagination_sortingDynamicInherit" => [
            "field"    => "sorting.dynamicInherit",
            "type"     => "concatenated",
            "global"   => false,
            "optional" => true,
        ],
        "pagination_sortingDynamicPrio1" => [
            "field"    => "sorting.dynamicPrio1",
            "type"     => "string",
            "global"   => false,
            "optional" => false,
        ],
        "pagination_sortingDynamicPrio2" => [
            "field"    => "sorting.dynamicPrio2",
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
