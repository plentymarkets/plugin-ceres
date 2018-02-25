<?php

namespace Ceres\Contexts;

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

    protected function initItemList( $searchResults, $options )
    {
        $this->currentPage      = $options['page'];
        $this->pageMax          = ceil( $searchResults['itemList']['total'] / $options['itemsPerPage'] );
        $this->itemsPerPage     = $options['itemsPerPage'];
        $this->itemCountPage    = count( $searchResults['itemList']['documents'] );
        $this->itemCountTotal   = $searchResults['itemList']['total'];
        $this->itemSorting      = $options['sorting'];

        $this->itemList         = $searchResults['itemList']['documents'];
        $this->facets           = $searchResults['facets'];
        $this->query            = ['items' => $this->itemsPerPage, 'sorting' => $this->itemSorting];

    }
}