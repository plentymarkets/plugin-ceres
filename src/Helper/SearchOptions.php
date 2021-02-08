<?php

namespace Ceres\Helper;

use Ceres\Config\CeresConfig;
use IO\Services\ItemService;
use Plenty\Plugin\Translation\Translator;

/**
 * Class SearchOptions
 *
 * Helper class for getting item search options
 * @package Ceres\Helper
 */
class SearchOptions
{
    /** @var string */
    const SCOPE_SEARCH = 'search';
    /** @var string */
    const SCOPE_CATEGORY = 'category';

    /** @var string[] A translation map for the sorting options */
    const TRANSLATION_MAP = [
        "default.recommended_sorting" => "itemRecommendedSorting",
        "texts.name1_asc" => "itemName_asc",
        "texts.name1_desc" => "itemName_desc",
        "sorting.price.avg_asc" => "itemPrice_asc",
        "sorting.price.avg_desc" => "itemPrice_desc",
        "variation.createdAt_desc" => "itemVariationCreateTimestamp_desc",
        "variation.createdAt_asc" => "itemVariationCreateTimestamp_asc",
        "variation.availability.averageDays_asc" => "itemAvailabilityAverageDays_asc",
        "variation.availability.averageDays_desc" => "itemAvailabilityAverageDays_desc",
        "variation.number_asc" => "itemVariationCustomNumber_asc",
        "variation.number_desc" => "itemVariationCustomNumber_desc",
        "variation.updatedAt_asc" => "itemVariationLastUpdateTimestamp_asc",
        "variation.updatedAt_desc" => "itemVariationLastUpdateTimestamp_desc",
        "item.manufacturer.externalName_asc" => "itemProducerName_asc",
        "item.manufacturer.externalName_desc" => "itemProducerName_desc",
        "item.score" => "itemRelevance",
        "item.random" => "itemRandom",
        "variation.position_asc" => "itemVariationTopseller_asc",
        "variation.position_desc" => "itemVariationTopseller_desc",
    ];

    /** @var array $itemsPerPage Get all itemsPerPage settings */
    public $itemsPerPage = [];
    /** @var int $defaultItemsPerPage Get the default itemsPerPage setting */
    public $defaultItemsPerPage = 0;
    /** @var array $sorting Get all sorting settings */
    public $sorting = [];
    /** @var string $defaultSorting Get the default sorting setting */
    public $defaultSorting = '';

    /**
     * Get an instance of the class containing item search options for the scope
     * @param string $scope Either 'category' or 'search'
     *
     * @return SearchOptions
     */
    public static function get($scope)
    {
        /** @var SearchOptions $instance */
        $instance = pluginApp(SearchOptions::class);

        /** @var Translator $translator */
        $translator = pluginApp(Translator::class);

        $externalSearchOptions = ExternalSearchOptions::getExternalSearchOptions();
        if ($externalSearchOptions->hasOptions()) {
            $instance->itemsPerPage = $externalSearchOptions->getItemsPerPage();
            $instance->defaultItemsPerPage = $externalSearchOptions->getDefaultItemsPerPage();

            $sortingOptions = $externalSearchOptions->getSortingOptions();
            foreach ($sortingOptions as $optionKey => $optionValue) {
                $instance->sorting[$optionKey] = $translator->trans($optionValue);
            }
            $instance->defaultSorting = $externalSearchOptions->getDefaultSortingOption();
        } else {
            /** @var CeresConfig $ceresConfig */
            $ceresConfig = pluginApp(CeresConfig::class);

            $instance->itemsPerPage = [];
            foreach ($ceresConfig->pagination->rowsPerPage as $rowPerPage) {
                $instance->itemsPerPage[] = $rowPerPage * $ceresConfig->pagination->columnsPerPage;
            }
            $instance->defaultItemsPerPage = $instance->itemsPerPage[0];

            if ($scope === self::SCOPE_SEARCH) {
                $instance->defaultSorting = $ceresConfig->sorting->defaultSortingSearch;
            } else {
                $instance->defaultSorting = $ceresConfig->sorting->defaultSorting;
            }

            if (!in_array($instance->defaultSorting, $ceresConfig->sorting->data)) {
                $instance->sorting[$instance->defaultSorting] = $translator->trans(
                    "Ceres::Template." . self::TRANSLATION_MAP[$instance->defaultSorting]
                );
            }

            foreach ($ceresConfig->sorting->data as $sortingOption) {
                $instance->sorting[$sortingOption] = $translator->trans(
                    "Ceres::Template." . self::TRANSLATION_MAP[$sortingOption]
                );
            }

            /** @var ItemService $itemService */
            $itemService = pluginApp(ItemService::class);
            foreach ($itemService->getAdditionalItemSorting() as $sortingKey => $sortingValue) {
                $instance->sorting[$sortingKey] = $translator->trans($sortingValue);
            }
        }

        return $instance;
    }

    /**
     * Validate an array of item search options inputted by user.
     * @param array $itemListOptions User inputted item search options.
     * @param string $scope The scope of the item search options.
     * @return mixed
     */
    public static function validateItemListOptions($itemListOptions, $scope)
    {
        if (!array_key_exists($itemListOptions['sorting'], SearchOptions::TRANSLATION_MAP)) {
            // Get all sorting strings
            $sortingStrings = self::get($scope);
            if (!array_key_exists($itemListOptions['sorting'], $sortingStrings->sorting)) {
                $itemListOptions['sorting'] = $sortingStrings->defaultSorting;
            }
        }

        if ((int)$itemListOptions['page'] <= 0) {
            $itemListOptions['page'] = 1;
        }

        if ((int)$itemListOptions['itemsPerPage'] <= 0) {
            /** @var CeresConfig $ceresConfig */
            $ceresConfig = pluginApp(CeresConfig::class);
            $defaultItemsPerPage = $ceresConfig->pagination->itemsPerPage;
            $itemListOptions['itemsPerPage'] = $defaultItemsPerPage;
        }

        if ((int)$itemListOptions['priceMin'] < 0) {
            $itemListOptions['priceMin'] = 0;
        }

        if ((int)$itemListOptions['priceMax'] < 0) {
            $itemListOptions['priceMax'] = 0;
        }

        return $itemListOptions;
    }
}
