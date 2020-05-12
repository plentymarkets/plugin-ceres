<?php

namespace Ceres\Contexts;

use Ceres\Config\CeresConfig;
use Ceres\Helper\BuildHash;
use IO\Extensions\Constants\ShopUrls;
use IO\Helper\ContextInterface;
use IO\Helper\Utils;
use IO\Services\BasketService;
use IO\Services\CategoryService;
use IO\Services\CheckoutService;
use IO\Services\NotificationService;
use IO\Services\TemplateService;
use Plenty\Modules\ShopBuilder\Helper\ShopBuilderRequest;
use Plenty\Modules\Webshop\Contracts\ContactRepositoryContract;
use Plenty\Modules\Webshop\Contracts\WebstoreConfigurationRepositoryContract;
use Plenty\Plugin\Application;
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

    /**
     * @deprecated since 4.3
     * Use IO\Extensions\Constants\ShopUrls::$home instead
     */
    public $homepageURL;
    public $splitItemBundle;

    /**
     * @deprecated since 4.5
     * Use IO\Extensions\Constants\ShopUrls::getTemplateType() instead
     */
    public $templateEvent;
    public $isShopBuilder;
    public $isSafeMode;
    public $bodyClasses;
    public $buildHash;
    public $assetName = "ceres-checkout";

    public function init($params)
    {
        $this->params = $params;

        /** @var CategoryService $categoryService */
        $categoryService = pluginApp(CategoryService::class);

        /** @var TemplateService $templateService */
        $templateService = pluginApp(TemplateService::class);

        /** @var WebstoreConfigurationRepositoryContract $webstoreConfigurationRepository */
        $webstoreConfigurationRepository = pluginApp(WebstoreConfigurationRepositoryContract::class);

        /** @var BasketService $basketService */
        $basketService = pluginApp(BasketService::class);

        /** @var CheckoutService $checkoutService */
        $checkoutService = pluginApp(CheckoutService::class);

        /** @var ContactRepositoryContract $contactRepository */
        $contactRepository = pluginApp(ContactRepositoryContract::class);

        /** @var ShopBuilderRequest $shopBuilderRequest */
        $shopBuilderRequest = pluginApp(ShopBuilderRequest::class);

        /** @var NotificationService $notificationService */
        $notificationService = pluginApp(NotificationService::class);

        /** @var ShopUrls $shopUrls */
        $shopUrls = pluginApp(ShopUrls::class);

        /** @var Application $app */
        $app = pluginApp(Application::class);

        $this->ceresConfig = pluginApp(CeresConfig::class);
        $this->webstoreConfig = $webstoreConfigurationRepository->getWebstoreConfiguration();

        $this->request = pluginApp(Request::class);

        $this->lang = Utils::getLang();

        $this->homepageURL = $shopUrls->home;
        $this->metaLang = 'de';
        if($this->lang == 'en')
        {
            $this->metaLang = $this->lang;
        }

        $this->forceNoIndex = $templateService->isNoIndexForced();

        if($templateService->isCategory() || $templateService->isItem())
        {
            $this->categoryBreadcrumbs = $categoryService->getHierarchy(0, false, true);
        }

        $this->categories = $categoryService->getNavigationTree(
            $this->ceresConfig->header->showCategoryTypes,
            $this->lang,
            $this->ceresConfig->header->menuLevels,
            $contactRepository->getContactClassId()
        );

        $this->notifications = $notificationService->getNotifications();

        $this->basket = $basketService->getBasketForTemplate();

        $this->currencyData = $checkoutService->getCurrencyData();

        $this->showNetPrices = $contactRepository->showNetPrices();

        $this->splitItemBundle = $webstoreConfigurationRepository->getWebstoreConfiguration()->dontSplitItemBundle;

        $this->templateEvent = $templateService->getCurrentTemplate();

        $this->isShopBuilder = $shopBuilderRequest->isShopBuilder();

        $this->isSafeMode = $app->isTemplateSafeMode();

        $this->bodyClasses = [];
        $templateClass = str_replace('tpl', 'page', $this->templateEvent);
        $templateClass = str_replace('.', '-', $templateClass);

        /* page-item is a bootstrap class */
        if($templateClass === "page-item")
        {
            $templateClass = "page-singleitem";
        }

        $this->bodyClasses[] = $templateClass;

        $this->buildHash = BuildHash::get();
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
