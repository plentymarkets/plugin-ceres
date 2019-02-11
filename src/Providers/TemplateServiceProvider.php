<?php

namespace Ceres\Providers;

use Ceres\Caching\NavigationCacheSettings;
use Ceres\Caching\SideNavigationCacheSettings;
use Ceres\Config\CeresConfig;
use Ceres\Contexts\CategoryContext;
use Ceres\Contexts\CategoryItemContext;
use Ceres\Contexts\GlobalContext;
use Ceres\Contexts\ItemSearchContext;
use Ceres\Contexts\ItemWishListContext;
use Ceres\Contexts\OrderConfirmationContext;
use Ceres\Contexts\OrderReturnContext;
use Ceres\Contexts\PasswordResetContext;
use Ceres\Contexts\SingleItemContext;
use Ceres\Extensions\TwigLayoutContainerInternal;
use Ceres\Extensions\TwigStyleScriptTagFilter;
use Ceres\Hooks\CeresAfterBuildPlugins;
use IO\Extensions\Functions\Partial;
use IO\Helper\CategoryKey;
use IO\Helper\CategoryMap;
use IO\Helper\RouteConfig;
use IO\Helper\TemplateContainer;
use IO\Services\ContentCaching\Services\Container;
use IO\Services\ItemSearch\Helper\ResultFieldTemplate;
use Plenty\Modules\Plugin\Events\AfterBuildPlugins;
use Plenty\Plugin\ServiceProvider;
use Plenty\Plugin\Templates\Twig;
use Plenty\Plugin\Events\Dispatcher;
use Plenty\Plugin\ConfigRepository;

/**
 * Class TemplateServiceProvider
 * @package Ceres\Providers
 */
class TemplateServiceProvider extends ServiceProvider
{
    const EVENT_LISTENER_PRIORITY = 100;

    private static $templateKeyToViewMap =
    [
        'tpl.home'                          => ['Homepage.Homepage',                      GlobalContext::class],
        'tpl.category.content'              => ['Category.Content.CategoryContent',       CategoryContext::class],
        'tpl.category.item'                 => ['Category.Item.CategoryItem',             CategoryItemContext::class],
        'tpl.category.blog'                 => ['PageDesign.PageDesign',                  GlobalContext::class],
        'tpl.category.container'            => ['PageDesign.PageDesign',                  GlobalContext::class],
        'tpl.item'                          => ['Item.SingleItemWrapper',                 SingleItemContext::class],
        'tpl.basket'                        => ['Basket.Basket',                          GlobalContext::class],
        'tpl.checkout'                      => ['Checkout.CheckoutView',                  GlobalContext::class],
        'tpl.checkout.category'             => ['Checkout.CheckoutCategory',              CategoryContext::class],
        'tpl.my-account'                    => ['MyAccount.MyAccount',                    GlobalContext::class],
        'tpl.my-account.category'           => ['MyAccount.MyAccountCategory',            CategoryContext::class],
        'tpl.confirmation'                  => ['Checkout.OrderConfirmation',             OrderConfirmationContext::class],
        'tpl.login'                         => ['Customer.Login',                         GlobalContext::class],
        'tpl.register'                      => ['Customer.Register',                      GlobalContext::class],
        'tpl.guest'                         => ['Customer.Guest',                         GlobalContext::class],
        'tpl.password-reset'                => ['Customer.ResetPassword',                 PasswordResetContext::class],
        'tpl.contact'                       => ['Customer.Contact',                       GlobalContext::class],
        'tpl.search'                        => ['ItemList.ItemListView',                  ItemSearchContext::class],
        'tpl.wish-list'                     => ['WishList.WishListView',                  ItemWishListContext::class],
        'tpl.order.return'                  => ['OrderReturn.OrderReturnView',            OrderReturnContext::class],
        'tpl.order.return.confirmation'     => ['OrderReturn.OrderReturnConfirmation',    GlobalContext::class],
        'tpl.cancellation-rights'           => ['StaticPages.CancellationRights',         GlobalContext::class],
        'tpl.cancellation-form'             => ['StaticPages.CancellationForm',           GlobalContext::class],
        'tpl.legal-disclosure'              => ['StaticPages.LegalDisclosure',            GlobalContext::class],
        'tpl.privacy-policy'                => ['StaticPages.PrivacyPolicy',              GlobalContext::class],
        'tpl.terms-conditions'              => ['StaticPages.TermsAndConditions',         GlobalContext::class],
        'tpl.item-not-found'                => ['StaticPages.ItemNotFound',               GlobalContext::class],
        'tpl.page-not-found'                => ['StaticPages.PageNotFound',               GlobalContext::class],
        'tpl.newsletter.opt-out'            => ['Newsletter.NewsletterOptOut',            GlobalContext::class]
    ];

    public function register(){
        $this->getApplication()->singleton( CeresConfig::class );
    }
    
    public function boot(Twig $twig, Dispatcher $eventDispatcher, ConfigRepository $config)
    {
        // Register Twig String Loader to use function: template_from_string
        $twig->addExtension('Twig_Extension_StringLoader');
        $twig->addExtension(TwigStyleScriptTagFilter::class);
        $twig->addExtension(TwigLayoutContainerInternal::class);

        $eventDispatcher->listen('IO.tpl.*', function (TemplateContainer $templateContainer, $templateData = []) {
            if ( !$templateContainer->hasTemplate() )
            {
                $this->setTemplateAndContext($templateContainer);
            }
        }, self::EVENT_LISTENER_PRIORITY);

        $eventDispatcher->listen('IO.ctx.*', function (TemplateContainer $templateContainer, $templateData = []) {
            $this->setTemplateAndContext($templateContainer);
        }, self::EVENT_LISTENER_PRIORITY);

        $eventDispatcher->listen( 'IO.ResultFields.*', function(ResultFieldTemplate $templateContainer) {
            $templateContainer->setTemplates([
                ResultFieldTemplate::TEMPLATE_LIST_ITEM     => 'Ceres::ResultFields.ListItem',
                ResultFieldTemplate::TEMPLATE_SINGLE_ITEM   => 'Ceres::ResultFields.SingleItem',
                ResultFieldTemplate::TEMPLATE_BASKET_ITEM   => 'Ceres::ResultFields.BasketItem',
                ResultFieldTemplate::TEMPLATE_AUTOCOMPLETE_ITEM_LIST => 'Ceres::ResultFields.AutoCompleteListItem',
                ResultFieldTemplate::TEMPLATE_CATEGORY_TREE => 'Ceres::ResultFields.CategoryTree'
            ]);
        }, self::EVENT_LISTENER_PRIORITY);

        /**
         * @deprecated this event is not in use and will be removed
         */
        $eventDispatcher->listen('init.categories', function (CategoryMap $categoryMap) use (&$config) {
            $categoryMap->setCategoryMap(array(
                CategoryKey::HOME => $config->get("Ceres.global.category.home"),
                CategoryKey::PAGE_NOT_FOUND => $config->get("Ceres.global.category.page_not_found"),
                CategoryKey::ITEM_NOT_FOUND => $config->get("Ceres.global.category.item_not_found")
            ));

        }, self::EVENT_LISTENER_PRIORITY);

        $eventDispatcher->listen('IO.init.templates', function (Partial $partial){

            pluginApp(Container::class)->register('Ceres::PageDesign.Partials.Header.NavigationList.twig', NavigationCacheSettings::class);
            pluginApp(Container::class)->register('Ceres::PageDesign.Partials.Header.SideNavigation.twig', SideNavigationCacheSettings::class);

            $partial->set('head', 'Ceres::PageDesign.Partials.Head');
            $partial->set('header', 'Ceres::PageDesign.Partials.Header.Header');
            $partial->set('footer', 'Ceres::PageDesign.Partials.Footer');
            $partial->set('page-design', 'Ceres::PageDesign.PageDesign');

        }, self::EVENT_LISTENER_PRIORITY);

        $eventDispatcher->listen(AfterBuildPlugins::class, CeresAfterBuildPlugins::class);
    }

    /**
     * @param TemplateContainer $templateContainer
     */
    private function setTemplateAndContext( $templateContainer )
    {
        $templateEvent  = $templateContainer->getTemplateKey();
        $template = substr($templateEvent, 4);
        if ( RouteConfig::getCategoryId( $template ) > 0 )
        {
            $templateEvent .= '.category';
        }

        $templateConfig = self::$templateKeyToViewMap[$templateEvent];
        $templateContainer->setTemplate( 'Ceres::' . $templateConfig[0] );
        $templateContainer->setContext( $templateConfig[1] );
    }
}
