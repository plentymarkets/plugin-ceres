<?php

namespace Ceres\Contexts;

use IO\Services\ItemLoader\Extensions\TwigLoaderPresets;
use IO\Services\ItemLoader\Services\ItemLoaderService;
use Plenty\Repositories\Models\PaginatedResult;

class ItemSearchContext extends GlobalContext implements ContextInterface
{
    public $page;
    public $rowsPerPage;
    public $columnsPerPage;
    public $itemsPerPage;
    public $isSearch;
    public $sorting;
    public $searchString;
    public $paginatedResult;
    
    public function init($params, $templateContainer)
    {
        parent::init($params, $templateContainer);
    
        /** @var TwigLoaderPresets $twigLoaderPresets */
        $twigLoaderPresets = pluginApp(TwigLoaderPresets::class);
        $presets = $twigLoaderPresets->getGlobals();
    
        /** @var ItemLoaderService $itemLoaderService */
        $itemLoaderService = pluginApp(ItemLoaderService::class);
        
        $this->page = $this->request->get('page', 1);
        $this->rowsPerPage = $this->ceresConfig->pagination->getRowsPerPage();
        $this->columnsPerPage = $this->ceresConfig->pagination->getColumnsPerPage();
        $this->itemsPerPage = $this->request->get('items', $this->rowsPerPage[0] * $this->columnsPerPage);
        $this->isSearch = $this->templateService->isSearch();
        
        if($this->isSearch)
        {
            $this->sorting = $this->ceresConfig->sorting->getDefaultSortingSearch();
            $this->searchString = $this->request->get('query', '');
        }
        else
        {
            $this->sorting = $this->ceresConfig->sorting->getDefaultSorting();
        }

        $sorting = $this->request->get('sorting', '');
        if(strlen($sorting))
        {
            $this->sorting = $sorting;
        }
        
        $options = [
            'query'             => $this->searchString,
            'page'              => $this->page,
            'items'             => $this->itemsPerPage,
            'sorting'           => $this->sorting,
        ];
    
        $this->paginatedResult = $itemLoaderService->loadForTemplate('Ceres::ItemList.ItemListView', $presets['itemLoaderPresets']['search'], $options);
    }
}