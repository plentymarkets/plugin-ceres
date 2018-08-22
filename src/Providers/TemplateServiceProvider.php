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
use Ceres\Extensions\TwigStyleScriptTagFilter;
use Ceres\Hooks\CeresAfterBuildPlugins;
use IO\Extensions\Functions\Partial;
use IO\Helper\CategoryKey;
use IO\Helper\CategoryMap;
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
        'tpl.home'                      => ['Homepage.Homepage',                    GlobalContext::class],     // provide template to use for homepage
        'tpl.category.content'          => ['Category.Content.CategoryContent',     CategoryContext::class],   // provide template to use for content categories
        'tpl.category.item'             => ['Category.Item.CategoryItem',           CategoryItemContext::class],          // provide template to use for item categories
        'tpl.category.blog'             => ['PageDesign.PageDesign',                GlobalContext::class],               // provide template to use for blog categories
        'tpl.category.container'        => ['PageDesign.PageDesign',                GlobalContext::class],               // provide template to use for container categories
        'tpl.item'                      => ['Item.SingleItemWrapper',               SingleItemContext::class],                 // provide template to use for single items
        'tpl.basket'                    => ['Basket.Basket',                        GlobalContext::class],                       // provide template to use for basket
        'tpl.checkout'                  => ['Checkout.CheckoutView',                GlobalContext::class],               // provide template to use for checkout
        'tpl.my-account'                => ['MyAccount.MyAccount',                  GlobalContext::class],                 // provide template to use for my-account
        'tpl.confirmation'              => ['Checkout.OrderConfirmation',           OrderConfirmationContext::class],          // provide template to use for confirmation
        'tpl.login'                     => ['Customer.Login',                       GlobalContext::class],                      // provide template to use for login
        'tpl.register'                  => ['Customer.Register',                    GlobalContext::class],                   // provide template to use for register
        'tpl.guest'                     => ['Customer.Guest',                       GlobalContext::class],                      // provide template to use for guest
        'tpl.password-reset'            => ['Customer.ResetPassword',               PasswordResetContext::class],              // provide template to use for password-reset
        'tpl.contact'                   => ['Customer.Contact',                     GlobalContext::class],                    // provide template to use for contact
        'tpl.search'                    => ['ItemList.ItemListView',                ItemSearchContext::class],               // provide template to use for item search
        'tpl.wish-list'                 => ['WishList.WishListView',                ItemWishListContext::class],               // provide template to use for wishlist
        'tpl.order.return'              => ['OrderReturn.OrderReturnView',          OrderReturnContext::class],         // provide template to use for order return
        'tpl.order.return.confirmation' => ['OrderReturn.OrderReturnConfirmation',  GlobalContext::class], // provide template to use for order return confirmation
        'tpl.cancellation-rights'       => ['StaticPages.CancellationRights',       GlobalContext::class],      // provide template to use for cancellation rights
        'tpl.cancellation-form'         => ['StaticPages.CancellationForm',         GlobalContext::class],        // provide template to use for cancellation form
        'tpl.legal-disclosure'          => ['StaticPages.LegalDisclosure',          GlobalContext::class],         // provide template to use for legal disclosure
        'tpl.privacy-policy'            => ['StaticPages.PrivacyPolicy',            GlobalContext::class],           // provide template to use for privacy policy
        'tpl.terms-conditions'          => ['StaticPages.TermsAndConditions',       GlobalContext::class],      // provide template to use for terms and conditions
        'tpl.item-not-found'            => ['StaticPages.ItemNotFound',             GlobalContext::class],            // provide template to use for item not found
        'tpl.page-not-found'            => ['StaticPages.PageNotFound',             GlobalContext::class]             // provide template to use for page not found
    ];

    public function register(){
        $this->getApplication()->singleton( CeresConfig::class );
    }
    
    public function boot(Twig $twig, Dispatcher $eventDispatcher, ConfigRepository $config)
    {
        // Register Twig String Loader to use function: template_from_string
        $twig->addExtension('Twig_Extension_StringLoader');
        $twig->addExtension(TwigStyleScriptTagFilter::class);
        
        $eventDispatcher->listen('IO.tpl.*', function (TemplateContainer $templateContainer, $templateData = []) {
            if ( !$templateContainer->hasTemplate() )
            {
                $templateName = self::$templateKeyToViewMap[$templateContainer->getTemplateKey()][0];
                $templateContainer->setTemplate('Ceres::' . $templateName);
            }
        }, self::EVENT_LISTENER_PRIORITY);
        
        $eventDispatcher->listen('IO.ctx.*', function (TemplateContainer $templateContainer, $templateData = []) {
            $templateContextClass = self::$templateKeyToViewMap[$templateContainer->getTemplateKey()][1];
            if(!strlen($templateContextClass))
            {
                $templateContextClass = GlobalContext::class;
            }
            $templateContainer->setContext( $templateContextClass );
        }, self::EVENT_LISTENER_PRIORITY);

        $eventDispatcher->listen( 'IO.ResultFields.*', function(ResultFieldTemplate $templateContainer) {
            $templateContainer->setTemplates([
                ResultFieldTemplate::TEMPLATE_LIST_ITEM     => 'Ceres::ResultFields.ListItem',
                ResultFieldTemplate::TEMPLATE_SINGLE_ITEM   => 'Ceres::ResultFields.SingleItem',
                ResultFieldTemplate::TEMPLATE_BASKET_ITEM   => 'Ceres::ResultFields.BasketItem',
                ResultFieldTemplate::TEMPLATE_AUTOCOMPLETE_ITEM_LIST => 'Ceres::ResultFields.AutoCompleteListItem'
            ]);
        }, self::EVENT_LISTENER_PRIORITY);

        // provide mapped category IDs - DEPRECATED?
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
}
