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
                    $this->pageMax = ($options['itemsPerPage'] == 0)
                        ? 1
                        : ceil($externalSearch->getCountTotal() / $options['itemsPerPage']);
                    return;
                }
    
                $variationIds = $externalSearch->getResults();
                if (count($variationIds)) {
                    $externalSearchFactory = VariationList::getSearchFactory([
                        'variationIds' => $variationIds,
                        'excludeFromCache' => $scope === SearchOptions::SCOPE_SEARCH,
                        'withoutAdditionalResultFields' => true
                    ]);
                    $searchResults = $itemSearchService->getResults($externalSearchFactory);
    
                    if (isset($searchResults['documents']) && count($searchResults['documents'])) {
                        $matchedDocuments = [];
                        foreach ($variationIds as $variationId) {
                            $variation = array_filter(
                                $searchResults['documents'],
                                fn($doc) => $doc['id'] == $variationId
                            );
                            if (count($variation) === 1) {
                                $matchedDocuments[] = array_pop($variation);
                            }
                        }
                        $this->itemList = $matchedDocuments;
    
                        $this->itemCountPage = count($matchedDocuments);
                        $this->itemCountTotal = $externalSearch->getCountTotal();
                        $this->pageMax = ($options['itemsPerPage'] == 0)
                            ? 1
                            : ceil($externalSearch->getCountTotal() / $options['itemsPerPage']);
                        $this->facets = [];
                    }
                    return;
                }
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
    
        if ($scope === SearchOptions::SCOPE_SEARCH && (int)$searchResults['itemList']['total'] === 0) {
            $originalSearchString = $options['query'];
            $itemSearchAutocompleteService = pluginApp(ItemSearchAutocompleteService::class);
            $options['query'] = $itemSearchAutocompleteService->getDidYouMeanSuggestionSearchString(
                $originalSearchString,
                $searchResults['itemList']['suggestions']
            );
    
            if (strlen($options['query']) && $options['query'] !== $originalSearchString) {
                $this->suggestionString = $options['query'];
                $searchResults = $itemSearchService->getResults([
                    'itemList' => SearchItems::getSearchFactory($options),
                    'facets' => Facets::getSearchFactory($options)
                ]);
            }
        }
    
        $this->itemCountTotal = min($searchResults['itemList']['total'], 10000);
        $this->pageMax = ($options['itemsPerPage'] == 0)
            ? 1
            : ceil($this->itemCountTotal / $options['itemsPerPage']);
    
        $this->itemList = $searchResults['itemList']['documents'];
        $this->itemCountPage = count($this->itemList);
        $this->facets = $searchResults['facets'];
    }
    
}
