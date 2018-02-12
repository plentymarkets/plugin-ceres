<?php

namespace Ceres\Contexts;

use IO\Services\ItemLoader\Extensions\TwigLoaderPresets;
use IO\Services\ItemLoader\Services\ItemLoaderService;
use IO\Services\WebstoreConfigurationService;
use Plenty\Modules\Category\Models\Category;
use Plenty\Repositories\Models\PaginatedResult;

class CategoryContext extends GlobalContext implements ContextInterface
{
    /** @var Category */
    public $category = null;
    
    public $itemSort;
    public $orderBy;
    public $rowsPerPage;
    public $columnsPerPage;
    public $itemsPerPage;
    public $page;
    public $pageMax;
    public $query;
    public $paginationType;
    public $showHeaderNavBar;
    public $loadingAnimationType;
    public $showCategoryImage;
    public $showCategoryDescription;
    public $paginatedResult;
    public $itemList;
    public $domainSsl;
    public $headerCompanyName;
    public $metaRobots;
    public $formattedMetaRobots;
    
    public function init($params)
    {
        parent::init($params);
        
        $this->category = $params['category'];
    
        /** @var WebstoreConfigurationService $webStoreConfigService */
        $webStoreConfigService = pluginApp(WebstoreConfigurationService::class);
        
        /** @var TwigLoaderPresets $twigLoaderPresets */
        $twigLoaderPresets = pluginApp(TwigLoaderPresets::class);
        $presets = $twigLoaderPresets->getGlobals();
    
        /** @var ItemLoaderService $itemLoaderService */
        $itemLoaderService = pluginApp(ItemLoaderService::class);
        
        $this->itemSort = $this->request->get('sorting', $this->ceresConfig->sorting->getDefaultSorting());
        $this->orderBy = ''; // TODO not used?
        $this->rowsPerPage = $this->ceresConfig->pagination->getRowsPerPage();
        $this->columnsPerPage = $this->ceresConfig->pagination->getColumnsPerPage();
        $this->itemsPerPage = $this->request->get('items', $this->rowsPerPage[0] * $this->columnsPerPage);
        $this->page = $this->request->get('page', 1);
    
        $options = [
            'categoryId'        => $this->category->id,
            'page'              => $this->page,
            'items'             => $this->itemsPerPage,
            'sorting'           => $this->itemSort,
        ];
    
        /** @var PaginatedResult $categoryItems */
        $this->paginatedResult = $itemLoaderService->loadForTemplate('Ceres::ItemList.ItemListView', $presets['itemLoaderPresets']['categoryList'], $options);
        
        $this->pageMax = ceil($this->paginatedResult['total'] / $this->itemsPerPage);
        $this->query = ['items' => $this->itemsPerPage, 'sorting' => $this->itemSort];
        $this->itemList = $this->paginatedResult['documents'];
        $this->paginationType = $this->ceresConfig->pagination->getPosition();
        $this->showHeaderNavBar = $this->ceresConfig->header->getShowNavbars();
        $this->loadingAnimationType = $this->ceresConfig->item->getLoadingAnimationType();
        $this->showCategoryImage = $this->ceresConfig->item->getShowCategoryImage();
        $this->showCategoryDescription = $this->ceresConfig->item->getShowCategoryDescription();
        $this->domainSsl = $webStoreConfigService->getWebstoreConfig()->domainSsl;
        $this->headerCompanyName = $this->ceresConfig->header->getCompanyName();
        $this->metaRobots = $this->category->details[0]->metaRobots;
        $this->formattedMetaRobots = str_replace('_', ', ', $this->metaRobots);
    }
}