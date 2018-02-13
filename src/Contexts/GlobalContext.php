<?php

namespace Ceres\Contexts;

use Plenty\Plugin\Http\Request;
use Ceres\Config\CeresConfig;
use IO\Services\CategoryService;
use IO\Services\ItemCrossSellingService;
use IO\Services\SessionStorageService;
use IO\Services\TemplateService;

class GlobalContext implements ContextInterface
{
    /** @var Request $request */
    protected $request = null;
    
    /** @var SessionStorageService $sessionStorageService */
    protected $sessionStorageService = null;
    
    /** @var CategoryService $categoryService */
    protected $categoryService = null;
    
    /** @var TemplateService $templateService */
    protected $templateService = null;
    
    /** @var ItemCrossSellingService $crossSellingService */
    protected $crossSellingService = null;
    
    /** @var CeresConfig $ceresConfig  */
    public $ceresConfig = null;
    
    public $lang;
    public $metaLang;
    public $template = [];
    public $categories;
    public $fixNavBarPos;
    public $basketAddInformation;
    public $shippingCat;
    public $categoryBreadcrumbs;
    public $showCategoryTypes;
    
    public function init($params)
    {
        $this->request = pluginApp(Request::class);
        $this->sessionStorageService = pluginApp(SessionStorageService::class);
        $this->categoryService = pluginApp(CategoryService::class);
        $this->templateService = pluginApp(TemplateService::class);
        $this->crossSellingService = pluginApp(ItemCrossSellingService::class);
    
        $this->ceresConfig = pluginApp(CeresConfig::class);
        
        $this->lang = $this->sessionStorageService->getLang();
        $this->metaLang = 'de';
        if($this->lang == 'en')
        {
            $this->metaLang = $this->lang;
        }
        
        $this->fixNavBarPos = $this->ceresConfig->header->getFixedNavbar();
        $this->basketAddInformation = $this->ceresConfig->basket->getAddItemToBasketConfirm();
        $this->shippingCat = $this->ceresConfig->global->getShippingCostsCategoryId();
        
        if($this->templateService->isCategory() || $this->templateService->isItem())
        {
            $this->categoryBreadcrumbs = $this->categoryService->getHierarchy();
            $this->crossSellingService->setType($this->ceresConfig->itemLists->getCrossSellingType());
        }
        
        $this->showCategoryTypes = $this->ceresConfig->header->getShowCategoryTypes();
        
        $this->categories = $this->categoryService->getNavigationTree($this->ceresConfig->header->getShowCategoryTypes(), $this->lang, 6);
        
    }
}