<?php

namespace Ceres\Contexts;

use Ceres\Helper\ExternalSearch;
use Ceres\Helper\SearchOptions;
use IO\Services\ItemSearch\SearchPresets\VariationList;
use IO\Services\ItemSearch\Services\ItemSearchService;
use IO\Services\SessionStorageService;
use Plenty\Plugin\Translation\Translator;

trait ItemListContext
{
    public $currentPage;
    public $pageMax;
    public $itemsPerPage;
    public $itemCountPage;
    public $itemCountTotal;
    public $itemSorting;
    public $query;

    public $itemList;
    public $facets;

    /** @var SearchOptions */
    public $searchOptions;

    protected function initItemList( $defaultSearchFactories, $options, $scope = SearchOptions::SCOPE_CATEGORY )
    {
        $this->currentPage      = intval($options['page']);
        if ($this->currentPage <= 0)
        {
            $this->currentPage = 1;
        }

        $this->itemsPerPage     = intval($options['itemsPerPage']);
        if ($this->itemsPerPage <= 0)
        {
            $this->itemsPerPage = 10;
        }
        $this->itemSorting      = $options['sorting'];
        $this->query            = ['items' => $this->itemsPerPage, 'sorting' => $this->itemSorting];

        $this->searchOptions = SearchOptions::get( $scope );

        /** @var ItemSearchService $itemSearchService */
        $itemSearchService = pluginApp( ItemSearchService::class );

        if ( ExternalSearch::hasExternalSearch() )
        {
            /** @var ExternalSearch $externalSearch */
            $externalSearch = pluginApp( ExternalSearch::class );
            $externalSearch->page           = $this->currentPage;
            $externalSearch->itemsPerPage   = $this->itemsPerPage;
            $externalSearch->searchString   = $options['query'];
            $externalSearch->categoryId     = $options['categoryId'];
            $externalSearch->sorting        = $this->itemSorting;

            // emit event to perform external search
            ExternalSearch::getExternalResults( $externalSearch );

            if ( $externalSearch->hasResults() )
            {
                $resultVariationIds             = $externalSearch->getResults();
                $externalSearchFactories        = [];
                foreach( $resultVariationIds as $variationId )
                {
                    $externalSearchFactories[$variationId] = VariationList::getSearchFactory([
                        'variationIds'      => [$variationId],
                        'excludeFromCache'  => $scope === SearchOptions::SCOPE_SEARCH
                    ]);
                }

                $searchResults = $itemSearchService->getResults( $externalSearchFactories );

                foreach( $resultVariationIds as $variationId )
                {
                    $this->itemList[] = $searchResults[$variationId]['documents'][0];
                }
                $this->pageMax          = ceil( $externalSearch->getCountTotal() / $options['itemsPerPage'] );
                $this->itemCountPage    = count( $resultVariationIds );
                $this->itemCountTotal   = $externalSearch->getCountTotal();
                $this->facets           = [];

                return 0;
            }
        }

        $searchResults = $itemSearchService->getResults( $defaultSearchFactories );
        $this->itemCountTotal   = $searchResults['itemList']['total'];
        $this->itemCountTotal = $this->itemCountTotal >  10000 ? 10000 : $this->itemCountTotal;

        $this->pageMax          = ceil( $this->itemCountTotal / $options['itemsPerPage'] );
        $this->itemCountPage    = count( $searchResults['itemList']['documents'] );
        $this->itemList         = $searchResults['itemList']['documents'];
        $this->facets           = $searchResults['facets'];
    }
}