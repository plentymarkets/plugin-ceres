<?php

namespace Ceres\Contexts;

use Ceres\Config\CeresConfig;
use IO\Services\CategoryService;
use IO\Services\ItemCrossSellingService;
use IO\Services\SessionStorageService;
use IO\Services\TemplateService;

class GlobalContext implements ContextInterface
{
    /** @var CeresConfig $ceresConfig  */
    public $ceresConfig = null;
    public $lang = '';
    public $metaLang = '';
    public $template = [];
    public $categories = null;
    public $fixNavBarPos;
    public $basketAddInformation;
    public $shippingCat;
    public $categoryBreadcrumbs = [];
    public $showCategoryTypes;
    
    public function init($params)
    {
        $this->ceresConfig = pluginApp(CeresConfig::class);
        
        /** @var SessionStorageService $sessionStorageService */
        $sessionStorageService = pluginApp(SessionStorageService::class);
        
        /** @var CategoryService $categoryService */
        $categoryService = pluginApp(CategoryService::class);
        
        /** @var TemplateService $templateService */
        $templateService = pluginApp(TemplateService::class);
        
        /** @var ItemCrossSellingService $crossSellingService */
        $crossSellingService = pluginApp(ItemCrossSellingService::class);
        
        $this->lang = $sessionStorageService->getLang();
        $this->metaLang = 'de';
        if($this->lang == 'en')
        {
            $this->metaLang = $this->lang;
        }
        
        $this->fixNavBarPos = $this->ceresConfig->header->getFixedNavbar();
        $this->basketAddInformation = $this->ceresConfig->basket->getAddItemToBasketConfirm();
        $this->shippingCat = $this->ceresConfig->global->getShippingCostsCategoryId();
        
        if($templateService->isCurrentTemplate('category') || $templateService->isCurrentTemplate('item'))
        {
            $this->categoryBreadcrumbs = $categoryService->getHierarchy();
            $crossSellingService->setType($this->ceresConfig->itemLists->getCrossSellingType());
        }
        
        $this->showCategoryTypes = $this->ceresConfig->header->getShowCategoryTypes();
        
        $this->categories = $categoryService->getNavigationTree($this->ceresConfig->header->getShowCategoryTypes(), $this->lang, 6);
        
    }
}