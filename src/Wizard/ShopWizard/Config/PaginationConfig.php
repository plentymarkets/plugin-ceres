<?php

namespace Ceres\Wizard\ShopWizard\Config;

/**
 * Class PaginationConfig
 * @package Ceres\Wizard\ShopWizard\Config
 */
class PaginationConfig
{
    private static $paginationPositions = [
        "paginationPositionTop"       => "top",
        "paginationPositionBottom"    => "bottom",
        "paginationPositionTopBottom" => "top_bottom",
    ];
    
    private static $rowsPerPage = [
        "rowsPerPage5"  => "5",
        "rowsPerPage10" => "10",
        "rowsPerPage15" => "15",
        "rowsPerPage20" => "20",
        "rowsPerPage25" => "25",
    ];
    
    private static $itemSortingByRules = [
        "recommendedSorting"     => "default.recommended_sorting",
        "topsellerAsc"           => "variation.position_asc",
        "topsellerDesc"          => "variation.position_desc",
        "nameAsc"                => "texts.name1_asc",
        "nameDesc"               => "texts.name1_desc",
        "priceAsc"               => "sorting.price.avg_asc",
        "priceDesc"              => "sorting.price.avg_desc",
        "variationCreatedAtDesc" => "variation.createdAt_desc",
        "variationCreatedAtAsc"  => "variation.createdAt_asc",
        "availabilityAsc"        => "variation.availability.averageDays_asc",
        "availabilityDesc"       => "variation.availability.averageDays_desc",
        "variationNumberAsc"     => "variation.number_asc",
        "variationNumberDesc"    => "variation.number_desc",
        "variationUpdatedAtAsc"  => "variation.updatedAt_asc",
        "variationUpdatedAtDesc" => "variation.updatedAt_desc",
        "manufacturerAsc"        => "item.manufacturer.externalName_asc",
        "manufacturerDesc"       => "item.manufacturer.externalName_desc",

    ];
    
    private static $sortingCategory = [
        "sortingPriorityCategoryItemIdAsc"                => "item.id_asc",
        "sortingPriorityCategoryItemIdDesc"               => "item.id_desc",
        "sortingPriorityCategoryNameAsc"                  => "texts.name_asc",
        "sortingPriorityCategoryNameDesc"                 => "texts.name_desc",
        "sortingPriorityCategoryPriceAsc"                 => "sorting.price.avg_asc",
        "sortingPriorityCategoryPriceDesc"                => "sorting.price.avg_desc",
        "sortingPriorityCategoryVariationCreatedAtDesc"   => "variation.createdAt_desc",
        "sortingPriorityCategoryVariationCreatedAtAsc"    => "variation.createdAt_asc",
        "sortingPriorityCategoryVariationIdAsc"           => "variation.id_asc",
        "sortingPriorityCategoryVariationIdDesc"          => "variation.id_desc",
        "sortingPriorityCategoryVariationNumberAsc"       => "variation.number_asc",
        "sortingPriorityCategoryVariationNumberDesc"      => "variation.number_desc",
        "sortingPriorityCategoryAvailabilityAsc"          => "variation.availability.averageDays_asc",
        "sortingPriorityCategoryAvailabilityDesc"         => "variation.availability.averageDays_desc",
        "sortingPriorityCategoryVariationUpdatedAtAsc"    => "variation.updatedAt_asc",
        "sortingPriorityCategoryVariationUpdatedAtDesc"   => "variation.updatedAt_desc",
        "sortingPriorityCategoryVariationPositionAsc"     => "variation.position_asc",
        "sortingPriorityCategoryVariationPositionDesc"    => "variation.position_desc",
        "sortingPriorityCategoryManufacturerAsc"          => "item.manufacturer.externalName_asc",
        "sortingPriorityCategoryManufacturerDesc"         => "item.manufacturer.externalName_desc",
        "sortingPriorityCategoryManufacturerPositionAsc"  => "item.manufacturer.position_asc",
        "sortingPriorityCategoryManufacturerPositionDesc" => "item.manufacturer.position_desc",
        "sortingPriorityCategoryStockAsc"                 => "stock.net_asc",
        "sortingPriorityCategoryStockDesc"                => "stock.net_desc",
        "sortDataRandom"                                  => "item.random",
    ];
    
    private static $secondSortingCategory = [
        "sortingPriorityCategoryNotSelected" => "notSelected"
    ];
    
    /**
     * @return array
     */
    public static function getPaginationPositions()
    {
        return self::$paginationPositions;
    }
    
    /**
     * @return array
     */
    public static function getRowsPerPage()
    {
        return self::$rowsPerPage;
    }
    
    /**
     * @return array
     */
    public static function getItemSortingByRules()
    {
        return self::$itemSortingByRules;
    }
    
    /**
     * @return array
     */
    public static function getSortingCategoryRules()
    {
        return self::$sortingCategory;
    }
    
    /**
     * @return array
     */
    public static function getSecondSortingCategoryRules()
    {
        return array_merge(self::$secondSortingCategory, self::$sortingCategory);
    }
}
