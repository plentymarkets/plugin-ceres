<?php

namespace Ceres\Contexts;

use IO\Services\ItemLoader\Extensions\TwigLoaderPresets;
use IO\Services\ItemLoader\Services\ItemLoaderService;
use Plenty\Repositories\Models\PaginatedResult;

class CategoryItemContext extends CategoryContext implements ContextInterface
{
    public $page;
    public $pageMax;
    public $query;
    public $paginationType;
    public $paginatedResult;
    public $itemList;
    
    public function init($params, $templateContainer)
    {
        parent::init($params, $templateContainer);
        
        /** @var TwigLoaderPresets $twigLoaderPresets */
        $twigLoaderPresets = pluginApp(TwigLoaderPresets::class);
        $presets = $twigLoaderPresets->getGlobals();
        
        /** @var ItemLoaderService $itemLoaderService */
        $itemLoaderService = pluginApp(ItemLoaderService::class);
    
        $rowsPerPage = $this->ceresConfig->pagination->rowsPerPage;
        $columnsPerPage = $this->ceresConfig->pagination->columnsPerPage;
        
        $itemSort = $this->getParam('sorting', $this->ceresConfig->sorting->defaultSorting);
        $itemsPerPage = $this->getParam('itemsPerPage', $rowsPerPage[0] * $columnsPerPage);
        $this->page = $this->getParam('page', 1);
        
        $options = [
            'categoryId'        => $this->category->id,
            'page'              => $this->page,
            'items'             => $itemsPerPage,
            'sorting'           => $itemSort,
        ];
        
        /** @var PaginatedResult $categoryItems */
        $this->paginatedResult = $itemLoaderService->loadForTemplate('Ceres::ItemList.ItemListView', $presets['itemLoaderPresets']['categoryList'], $options);
        
        $this->pageMax = ceil($this->paginatedResult['total'] / $itemsPerPage);
        $this->query = ['items' => $itemsPerPage, 'sorting' => $itemSort];
        $this->itemList = $this->paginatedResult['documents'];
        $this->paginationType = $this->ceresConfig->pagination->position;
    }
}