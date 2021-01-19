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
use Plenty\Modules\System\Models\WebstoreConfiguration;

/**
 * Context class with data, required on all views in the shop.
 */
class GlobalContext implements ContextInterface
{
    /**
     * @var array Passthrough variables from the controller.
     */
    protected $params = [];

    /**
     * @var CeresConfig The configuration for the shop.
     */
    public $ceresConfig = null;

    /**
     * @var Request The http request.
     */
    protected $request;

    /**
     * @var string The language code of the current language.
     */
    public $lang;

    /**
     * @var string
     * @deprecated since 5.0.20 will be removed in 6.0.0
     */
    public $metaLang;

    /**
     * @var bool Defines if the meta data should have the attrribute content set to "NOINDEX".
     */
    public $forceNoIndex;

    /**
     * @var array
     * @deprecated since 5.0.20 will be removed in 6.0.0
     */
    public $template = [];

    /**
     * @deprecated since 5.0.20 will be removed in 6.0.0
     */
    public $templateName;

    /**
     * @var array Categories for the navigation.
     */
    public $categories;

    /**
     * @var array List of all parent categories including current category.
     */
    public $categoryBreadcrumbs;

    /**
     * @var array List of all notifications store in the session.
     */
    public $notifications;

    /**
     * @var array The basket object.
     */
    public $basket;

    /**
     * @var WebstoreConfiguration The webstore configuration.
     */
    public $webstoreConfig;

    /**
     * @var array The name and the symbol for the currently selected currency.
     */
    public $currencyData;

    /**
     * @var bool Defines if net prices should be shown.
     */
    public $showNetPrices;

    /**
     * @deprecated since 4.3
     * Use ShopUrls::$home instead
     */
    public $homepageURL;

    /**
     * @var string Represents the system setting for splitting bundles.
     */
    public $splitItemBundle;

    /**
     * @deprecated since 4.5
     * Use ShopUrls::getTemplateType() instead
     */
    public $templateEvent;

    /**
     * @var bool Defines if the shop is opened in shop builder mode.
     */
    public $isShopBuilder;

    /**
     * @var bool Defines if the shop is load in safe mode.
     */
    public $isSafeMode;

    /**
     * @var array Array of CSS classes to apply to the body.
     */
    public $bodyClasses;

    /**
     * @var string Hash of the latest plugin deployment.
     */
    public $buildHash;

    /**
     * @var string Key for the assets to be load.
     */
    public $assetName = "ceres-checkout";

    /**
     * @inheritDoc
     */
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

        if (!is_null($categoryService->getCurrentCategory()))
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

    /**
     * Get value from $params, filtered by the key.
     * @param string|int $key Key to search for in the $params.
     * @param mixed $defaultValue Optional: If set, the method will return the $defaultValue, when there is no value for the given $key. (Default: null)
     * @return string|null
     */
    protected function getParam($key, $defaultValue = null)
    {
        if(is_null($this->params[$key]))
        {
            return $defaultValue;
        }

        return $this->params[$key];
    }
}
