<?php

namespace Ceres\Contexts;

use Ceres\Config\CeresConfig;
use IO\Helper\ContextInterface;
use IO\Services\BasketService;
use IO\Services\CategoryService;
use IO\Services\CheckoutService;
use IO\Services\CustomerService;
use IO\Services\ItemCrossSellingService;
use IO\Services\ItemLastSeenService;
use IO\Services\NotificationService;
use IO\Services\SessionStorageService;
use IO\Services\TemplateService;
use IO\Services\UrlService;
use IO\Services\WebstoreConfigurationService;
use Plenty\Modules\ShopBuilder\Helper\ShopBuilderRequest;
use Plenty\Plugin\Http\Request;

class GlobalContext implements ContextInterface
{
    protected $params = [];

    /** @var CeresConfig $ceresConfig  */
    public $ceresConfig = null;

    /** @var Request $request */
    protected $request;

    public $lang;
    public $metaLang;
    public $forceNoIndex;
    public $template = [];
    public $templateName;
    public $categories;
    public $categoryBreadcrumbs;
    public $notifications;
    public $basket;
    public $webstoreConfig;
    public $currencyData;
    public $showNetPrices;
    public $homepageURL;
    public $splitItemBundle;
    public $templateEvent;
    public $isShopBuilder;

    public function init($params)
    {
        $this->params = $params;

        /** @var SessionStorageService $sessionStorageService */
        $sessionStorageService = pluginApp(SessionStorageService::class);

        /** @var CategoryService $categoryService */
        $categoryService = pluginApp(CategoryService::class);

        /** @var TemplateService $templateService */
        $templateService = pluginApp(TemplateService::class);

        /** @var ItemCrossSellingService $crossSellingService */
        $crossSellingService = pluginApp(ItemCrossSellingService::class);

        /** @var WebstoreConfigurationService $webstoreConfigService */
        $webstoreConfigService = pluginApp(WebstoreConfigurationService::class);

        /** @var ItemLastSeenService $itemLastSeenService */
        $itemLastSeenService = pluginApp(ItemLastSeenService::class);

        /** @var BasketService $basketService */
        $basketService = pluginApp(BasketService::class);

        /** @var CheckoutService $checkoutService */
        $checkoutService = pluginApp(CheckoutService::class);

        /** @var CustomerService $customerService */
        $customerService = pluginApp(CustomerService::class);

        /** @var ShopBuilderRequest $shopBuilderRequest */
        $shopBuilderRequest = pluginApp(ShopBuilderRequest::class);

        $this->ceresConfig = pluginApp(CeresConfig::class);
        $this->webstoreConfig = $webstoreConfigService->getWebstoreConfig();

        $this->request = pluginApp(Request::class);

        $this->lang = $sessionStorageService->getLang();
        $this->homepageURL = pluginApp(UrlService::class)->getHomepageURL();
        $this->metaLang = 'de';
        if($this->lang == 'en')
        {
            $this->metaLang = $this->lang;
        }

        $this->forceNoIndex = $templateService->isNoIndexForced();

        if($templateService->isCategory() || $templateService->isItem())
        {
            $this->categoryBreadcrumbs = $categoryService->getHierarchy(0, false, true);
            $crossSellingService->setType($this->ceresConfig->itemLists->crossSellingType);
            $crossSellingService->setSorting($this->ceresConfig->itemLists->crossSellingSorting);
        }

        $this->categories = $categoryService->getNavigationTree($this->ceresConfig->header->showCategoryTypes, $this->lang, 6, $customerService->getContactClassId());
        $this->notifications = pluginApp(NotificationService::class)->getNotifications();

        $this->basket = $basketService->getBasketForTemplate();

        $this->currencyData = $checkoutService->getCurrencyData();

        $this->showNetPrices = $customerService->showNetPrices();

        $this->splitItemBundle = $webstoreConfigService->getWebstoreConfig()->dontSplitItemBundle;

        $this->templateEvent = $templateService->getCurrentTemplate();

        $this->isShopBuilder = $shopBuilderRequest->isShopBuilder();
    }

    protected function getParam($key, $defaultValue = null)
    {
        if(is_null($this->params[$key]))
        {
            return $defaultValue;
        }

        return $this->params[$key];
    }
}