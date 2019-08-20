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
        "paginationStep_columnsPerPage" => [
            "field"    => "pagination.columnsPerPage",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "paginationStep_rowsPerPage" => [
            "field"    => "pagination.rowsPerPage",
            "type"     => "concatenated",
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
    ];
    
    /**
     * @return array
     */
    public static function getFieldsMapped()
    {
        return self::$fieldsMapped;
    }
}
