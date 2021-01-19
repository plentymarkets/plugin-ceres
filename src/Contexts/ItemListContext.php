<?php

namespace Ceres\Contexts;

use Ceres\Helper\ExternalSearch;
use Ceres\Helper\SearchOptions;
use IO\Services\ItemSearchAutocompleteService;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\Facets;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\SearchItems;
use Plenty\Modules\Webshop\ItemSearch\SearchPresets\VariationList;
use Plenty\Modules\Webshop\ItemSearch\Services\ItemSearchService;

trait ItemListContext
{
    public $currentPage;
    public $pageMax;
    public $itemsPerPage;
    public $itemCountPage;
    public $itemCountTotal;
    public $itemSorting;
    public $query;
    public $suggestionString;

    public $itemList = [];
    public $facets;

    /** @var SearchOptions */
    public $searchOptions;

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

            // emit event to perform external search
            ExternalSearch::getExternalResults($externalSearch);

            if ($externalSearch->hasResults()) {
                $variationIds = $externalSearch->getResults();

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
                        $variation = array_filter($searchResults['documents'], function($document) use ($variationId) {
                            return $document['id'] == $variationId;
                        });

                        if(count($variation) == 1) {
                            $this->itemList[] = array_pop($variation);
                        }
                    }
                }
                if($options['itemsPerPage'] == 0) {
                    $this->pageMax = 1;
                } else {
                    $this->pageMax = ceil($externalSearch->getCountTotal() / $options['itemsPerPage']);
                }
                $this->itemCountPage  = count($variationIds);
                $this->itemCountTotal = $externalSearch->getCountTotal();
                $this->facets         = [];

                return;
            }
        }

        $searchResults = $itemSearchService->getResults($defaultSearchFactories);

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
