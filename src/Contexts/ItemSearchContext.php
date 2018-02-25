<?php

namespace Ceres\Contexts;

use IO\Services\ItemSearch\SearchPresets\Facets;
use IO\Services\ItemSearch\SearchPresets\SearchItems;
use IO\Services\ItemSearch\Services\ItemSearchService;

class ItemSearchContext extends GlobalContext implements ContextInterface
{
    use ItemListContext;

    public $isSearch;
    public $searchString;

    public function init($params, $templateContainer)
    {
        parent::init($params, $templateContainer);

        $itemListOptions = [
            'page'          => $this->getParam( 'page', 1 ),
            'itemsPerPage'  => $this->getParam( 'itemsPerPage', $this->ceresConfig->pagination->rowsPerPage[0] * $this->ceresConfig->pagination->columnsPerPage ),
            'sorting'       => $this->getParam( 'sorting', $this->ceresConfig->sorting->defaultSortingSearch ),
            'facets'        => $this->getParam( 'facets', '' ),
            'query'         => $this->getParam( 'query', '' )
        ];

        /** @var ItemSearchService $itemSearchService */
        $itemSearchService = pluginApp( ItemSearchService::class );
        $searchResults = $itemSearchService->getResults([
            'itemList' => SearchItems::getSearchFactory( $itemListOptions ),
            'facets'   => Facets::getSearchFactory( $itemListOptions )
        ]);

        $this->initItemList( $searchResults, $itemListOptions );

        $this->isSearch = true;
        $this->searchString = $itemListOptions['query'];
    }
}