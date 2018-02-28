<?php
namespace Ceres\Providers;


use Ceres\Caching\HomepageCacheSettings;
use Ceres\Caching\NavigationCacheSettings;
use Ceres\Caching\SideNavigationCacheSettings;
use Ceres\Config\CeresConfig;
use Ceres\Extensions\TwigStyleScriptTagFilter;
use IO\Extensions\Functions\Partial;
use IO\Helper\CategoryKey;
use IO\Helper\CategoryMap;
use IO\Helper\TemplateContainer;
use IO\Services\ContentCaching\Services\Container;
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

    private static $templateKeyToViewMap = [
        'tpl.home'                      => 'Homepage.Homepage',                   // provide template to use for homepage
        'tpl.category.content'          => 'Category.Content.CategoryContent',    // provide template to use for content categories
        'tpl.category.item'             => 'Category.Item.CategoryItem',          // provide template to use for item categories
        'tpl.category.blog'             => 'PageDesign.PageDesign',               // provide template to use for blog categories
        'tpl.category.container'        => 'PageDesign.PageDesign',               // provide template to use for container categories
        'tpl.item'                      => 'Item.SingleItemWrapper',                 // provide template to use for single items
        'tpl.basket'                    => 'Basket.Basket',                       // provide template to use for basket
        'tpl.checkout'                  => 'Checkout.CheckoutView',               // provide template to use for checkout
        'tpl.my-account'                => 'MyAccount.MyAccount',                 // provide template to use for my-account
        'tpl.confirmation'              => 'Checkout.OrderConfirmation',          // provide template to use for confirmation
        'tpl.login'                     => 'Customer.Login',                      // provide template to use for login
        'tpl.register'                  => 'Customer.Register',                   // provide template to use for register
        'tpl.guest'                     => 'Customer.Guest',                      // provide template to use for guest
        'tpl.password-reset'            => 'Customer.ResetPassword',              // provide template to use for password-reset
        'tpl.contact'                   => 'Customer.Contact',                    // provide template to use for contact
        'tpl.search'                    => 'ItemList.ItemListView',               // provide template to use for item search
        'tpl.wish-list'                 => 'WishList.WishListView',               // provide template to use for wishlist
        'tpl.order.return'              => 'OrderReturn.OrderReturnView',         // provide template to use for order return
        'tpl.order.return.confirmation' => 'OrderReturn.OrderReturnConfirmation', // provide template to use for order return confirmation
        'tpl.static-page-container'     => 'StaticPages.StaticPageMain',          // provide template to use for cancellation rights
        'tpl.cancellation-rights'       => 'StaticPages.StaticPagesContent.CancellationRightsContent',          // provide template to use for cancellation rights
        'tpl.cancellation-form'         => 'StaticPages.StaticPagesContent.CancellationFormContent',          // provide template to use for cancellation form
        'tpl.legal-disclosure'          => 'StaticPages.StaticPagesContent.LegalDisclosureContent',          // provide template to use for legal disclosure
        'tpl.privacy-policy'            => 'StaticPages.StaticPagesContent.PrivacyPolicyContent',          // provide template to use for privacy policy
        'tpl.terms-conditions'          => 'StaticPages.StaticPagesContent.TermsAndConditionsContent',          // provide template to use for terms and conditions
        'tpl.item-not-found'            => 'StaticPages.ItemNotFound',          // provide template to use for item not found
        'tpl.page-not-found'            => 'StaticPages.PageNotFound'           // provide template to use for page not found
    ];

    public function register(){
        $this->getApplication()->singleton( CeresConfig::class );
    }
    
    public function boot(Twig $twig, Dispatcher $eventDispatcher, ConfigRepository $config)
    {
        // Register Twig String Loader to use function: template_from_string
        $twig->addExtension('Twig_Extension_StringLoader');
        $twig->addExtension(TwigStyleScriptTagFilter::class);

        $eventDispatcher->listen('IO.tpl.*', function (TemplateContainer $templateContainer) {
                $templateContainer->setTemplate('Ceres::' . self::$templateKeyToViewMap[$templateContainer->getTemplateKey()]);

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
    }
}
