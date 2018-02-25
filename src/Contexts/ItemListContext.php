<?php

namespace Ceres\Contexts;

use IO\Services\ItemSearch\Helper\ExternalSearch;
use IO\Services\ItemSearch\SearchPresets\VariationList;
use IO\Services\ItemSearch\Services\ItemSearchService;

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

    protected function initItemList( $defaultSearchFactories, $options )
    {
        $this->currentPage      = $options['page'];
        $this->itemsPerPage     = $options['itemsPerPage'];
        $this->itemSorting      = $options['sorting'];
        $this->query            = ['items' => $this->itemsPerPage, 'sorting' => $this->itemSorting];

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
            $resultVariationIds             = $externalSearch->results;
            $externalSearchFactories        = [];
            foreach( $resultVariationIds as $variationId )
            {
                $externalSearchFactories[$variationId] = VariationList::getSearchFactory([
                    'variationIds' => [$variationId]
                ]);
            }

            $searchResults = $itemSearchService->getResults( $externalSearchFactories );

            foreach( $resultVariationIds as $variationId )
            {
                $this->itemList[] = $searchResults[$variationId]['documents'][0];
            }
            $this->pageMax          = ceil( $externalSearch->countTotal / $options['itemsPerPage'] );
            $this->itemCountPage    = count( $resultVariationIds );
            $this->itemCountTotal   = $externalSearch->countTotal;
            $this->facets           = [];
        }
        else
        {
            $searchResults = $itemSearchService->getResults( $defaultSearchFactories );
            $this->pageMax          = ceil( $searchResults['itemList']['total'] / $options['itemsPerPage'] );
            $this->itemCountPage    = count( $searchResults['itemList']['documents'] );
            $this->itemCountTotal   = $searchResults['itemList']['total'];
            $this->itemList         = $searchResults['itemList']['documents'];
            $this->facets           = $searchResults['facets'];
        }
    }
}