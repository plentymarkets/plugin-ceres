<?php

namespace Ceres\Contexts;

use Ceres\Helper\ExternalSearch;
use Ceres\Helper\SearchOptions;
use IO\Services\ItemSearch\SearchPresets\VariationList;
use IO\Services\ItemSearch\Services\ItemSearchService;
use PayUponPickup\Services\SessionStorageService;
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
        $this->currentPage      = $options['page'];
        $this->itemsPerPage     = $options['itemsPerPage'];
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
        $this->pageMax          = ceil( $searchResults['itemList']['total'] / $options['itemsPerPage'] );
        $this->itemCountPage    = count( $searchResults['itemList']['documents'] );
        $this->itemCountTotal   = $searchResults['itemList']['total'];
        $this->itemList         = $searchResults['itemList']['documents'];
        
        if(count($searchResults['facets']))
        {
            foreach($searchResults['facets'] as $key => $facet)
            {
                if($facet['id'] == 'category')
                {
                    /** @var SessionStorageService $sessionStorage */
                    $sessionStorage = pluginApp(SessionStorageService::class);
                    
                    /** @var Translator $translator */
                    $translator = pluginApp(Translator::class);
                    $searchResults['facets'][$key]['name'] = $translator->trans('Ceres::Template.itemFilterCategory', [], $sessionStorage->getLang());
                }
            }
        }
        
        $this->facets           = $searchResults['facets'];
    }
}