<?php

namespace Ceres\Contexts;

use Ceres\Helper\ExternalSearch;
use Ceres\Helper\SearchOptions;
use IO\Services\ItemSearchAutocompleteService;
use Plenty\Modules\ContentCache\CacheBlocks\Contracts\CacheTagRepositoryContract;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\Facets;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\SearchItems;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\VariationList;
use Plenty\Modules\Webshop\ItemSearch\Services\ItemSearchService;
use Plenty\Plugin\Log\Loggable;

/**
 * Trait ItemListContext
 *
 * Trait to extend a context, including all properties to handle item data.
 *
 * @package Ceres\Contexts
 */
trait ItemListContext
{
    use Loggable;

    /**
     * @var int $currentPage Current page of items.
     */
    public $currentPage;

    /**
     * @var int $pageMax Last page for items.
     */
    public $pageMax;

    /**
     * @var int $itemsPerPage How many items are included in one page.
     */
    public $itemsPerPage;

    /**
     * @var int $itemCountPage
     * @deprecated since 5.0.20 will be removed in 6.0.0
     */
    public $itemCountPage;

    /**
     * @var int $itemCountTotal Count of all items in the item result.
     */
    public $itemCountTotal;

    /**
     * @var string $itemSorting Sorting key for the item result.
     */
    public $itemSorting;

    /**
     * @var array $query Contains items per page count and the sorting key for the item result.
     */
    public $query;

    /**
     * @var string $suggestionString Suggestion for the shop search.
     */
    public $suggestionString;

    /**
     * @var array $itemList Item result.
     */
    public $itemList = [];

    /**
     * @var array $facets Facets that were selected to filter the item result.
     */
    public $facets;

    /**
     * @var SearchOptions $searchOptions
     */
    public $searchOptions;

    /**
     * @param array $defaultSearchFactories Search factories to request the item data.
     * @param array $options Search options to filter the item data.
     * @param string $scope The scope where the search is executed from.
     */
    protected function initItemList($defaultSearchFactories, $options, $scope = SearchOptions::SCOPE_CATEGORY)
    {
        $this->currentPage = intval($options['page']);
        $this->itemsPerPage = intval($options['itemsPerPage']);
        $this->itemSorting = $options['sorting'];
        $this->query = ['items' => $this->itemsPerPage, 'sorting' => $this->itemSorting];

        $this->searchOptions = SearchOptions::get($scope);

        /** @var ItemSearchService $itemSearchService */
        $itemSearchService = pluginApp(ItemSearchService::class);

        if (ExternalSearch::hasExternalSearch()) {
            /** @var ExternalSearch $externalSearch */
            $externalSearch = pluginApp(ExternalSearch::class);
            $externalSearch->page = $this->currentPage;
            $externalSearch->itemsPerPage = $this->itemsPerPage;
            $externalSearch->searchString = $options['query'];
            $externalSearch->categoryId = $options['categoryId'];
            $externalSearch->sorting = $this->itemSorting;

            $successfully = true;
            try {
                // emit event to perform external search
                ExternalSearch::getExternalResults($externalSearch);
            } catch (\Exception $exception) {
                $successfully = false;
                $this->getLogger(__METHOD__)->error('Error on executing external search.', [
                    'message' => $exception->getMessage(),
                    'options' => $options
                ]);
                $this->getLogger(__METHOD__)->logException($exception, 10);
            }


            if ($successfully && $externalSearch->hasResults()) {
                $this->pageMax = 1;
                $this->itemCountTotal = 0;
                $this->itemCountPage = 0;
                $this->facets = [];

                $documents = $externalSearch->getDocuments();
                if (count($documents)) {
                    $this->itemList = $documents;
                    $this->itemCountTotal = $externalSearch->getCountTotal();
                    $this->itemCountPage = count($documents);
                    if ($options['itemsPerPage'] == 0) {
                        $this->pageMax = 1;
                    } else {
                        $this->pageMax = ceil($externalSearch->getCountTotal() / $options['itemsPerPage']);
                    }
                    return;
                }

                $variationIds = $externalSearch->getResults();
                // only search when external search returns an result
                if (count($variationIds)) {
                    $externalSearchFactory = VariationList::getSearchFactory(
                        [
                            'variationIds' => $variationIds,
                            'excludeFromCache' => $scope === SearchOptions::SCOPE_SEARCH
                        ]
                    );
                    $searchResults = $itemSearchService->getResults($externalSearchFactory);
                    if (isset($searchResults['documents']) && count(
                            $searchResults['documents']
                        )) {
                        foreach ($variationIds as $variationId) {
                            $variation = array_filter(
                                $searchResults['documents'],
                                function ($document) use ($variationId) {
                                    return $document['id'] == $variationId;
                                }
                            );

                            if (count($variation) == 1) {
                                $this->itemList[] = array_pop($variation);
                            }
                        }
                    }
                    if ($options['itemsPerPage'] == 0) {
                        $this->pageMax = 1;
                    } else {
                        $this->pageMax = ceil($externalSearch->getCountTotal() / $options['itemsPerPage']);
                    }
                    $this->itemCountPage = count($variationIds);
                    $this->itemCountTotal = $externalSearch->getCountTotal();
                    $this->facets = [];
                }
                return;
            }
        }

        /** @var CacheTagRepositoryContract $cacheTagRepository */
        $cacheTagRepository = pluginApp(CacheTagRepositoryContract::class);
        $searchResults = $cacheTagRepository->makeTaggable(
            'itemList',
            function() use ($itemSearchService, $defaultSearchFactories) {
                return $itemSearchService->getResults($defaultSearchFactories);
            },
            'item'
        );

        //try to get result for the "did you mean?" search if there is no result for the original search string
        if ($scope === SearchOptions::SCOPE_SEARCH && (int)$searchResults['itemList']['total'] === 0) {
            $originalSearchString = $options['query'];
            /** @var ItemSearchAutocompleteService $itemSearchAutocompleteService */
            $itemSearchAutocompleteService = pluginApp(ItemSearchAutocompleteService::class);
            $options['query'] = $itemSearchAutocompleteService->getDidYouMeanSuggestionSearchString(
                $originalSearchString,
                $searchResults['itemList']['suggestions']
            );

            if (strlen($options['query']) && $options['query'] !== $originalSearchString) {
                $this->suggestionString = $options['query'];
                $searchResults = $itemSearchService->getResults(
                    [
                        'itemList' => SearchItems::getSearchFactory($options),
                        'facets' => Facets::getSearchFactory($options)
                    ]
                );
            }
        }

        $this->itemCountTotal = $searchResults['itemList']['total'];
        $this->itemCountTotal = $this->itemCountTotal > 10000 ? 10000 : $this->itemCountTotal;

        if($options['itemsPerPage'] == 0) {
                $this->pageMax = 1;
        } else {
            $this->pageMax = ceil($this->itemCountTotal / $options['itemsPerPage']);
        }

        $this->itemCountPage = count($searchResults['itemList']['documents']);
        $this->itemList = $searchResults['itemList']['documents'];
        $this->facets = $searchResults['facets'];
    }
}
