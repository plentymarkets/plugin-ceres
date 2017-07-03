<?php
namespace Ceres\Providers;


use Ceres\Caching\HomepageCacheSettings;
use Ceres\Caching\NavigationCacheSettings;
use Ceres\Caching\SideNavigationCacheSettings;
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
        'tpl.home'               => 'Homepage.Homepage',                // provide template to use for homepage
        'tpl.category.content'   => 'Category.Content.CategoryContent', // provide template to use for content categories
        'tpl.category.item'      => 'Category.Item.CategoryItem',       // provide template to use for item categories
        'tpl.category.blog'      => 'PageDesign.PageDesign',            // provide template to use for blog categories
        'tpl.category.container' => 'PageDesign.PageDesign',            // provide template to use for container categories
        'tpl.item'               => 'Item.SingleItem',                  // provide template to use for single items
        'tpl.basket'             => 'Basket.Basket',                    // provide template to use for basket
        'tpl.checkout'           => 'Checkout.Checkout',                // provide template to use for checkout
        'tpl.my-account'         => 'MyAccount.MyAccount',              // provide template to use for my-account
        'tpl.confirmation'       => 'Checkout.OrderConfirmation',       // provide template to use for confirmation
        'tpl.login'              => 'Customer.Login',                   // provide template to use for login
        'tpl.register'           => 'Customer.Register',                // provide template to use for register
        'tpl.guest'              => 'Customer.Guest',                   // provide template to use for guest
        'tpl.search'             => 'ItemList.ItemListView',            // provide template to use for item search
        'tpl.cancellation-rights'=> 'StaticPages.CancellationRights',   // provide template to use for cancellation rights
        'tpl.legal-disclosure'   => 'StaticPages.LegalDisclosure',      // provide template to use for legal disclosure
        'tpl.privacy-policy'     => 'StaticPages.PrivacyPolicy',        // provide template to use for privacy policy
        'tpl.terms-conditions'   => 'StaticPages.TermsAndConditions',   // provide template to use for terms and conditions
        'tpl.item-not-found'     => 'StaticPages.ItemNotFound',         // provide template to use for item not found
        'tpl.page-not-found'     => 'StaticPages.PageNotFound'          // provide template to use for page not found
    ];

    public function register(){}
    
    public function boot(Twig $twig, Dispatcher $eventDispatcher, ConfigRepository $config)
    {
        // Register Twig String Loader to use function: template_from_string
        $twig->addExtension('Twig_Extension_StringLoader');

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

            pluginApp(Container::class)->register('Ceres::Homepage.DefaultHomepage.twig', HomepageCacheSettings::class);
            pluginApp(Container::class)->register('Ceres::PageDesign.Partials.Header.NavigationList.twig', NavigationCacheSettings::class);
            pluginApp(Container::class)->register('Ceres::PageDesign.Partials.Header.SideNavigation.twig', SideNavigationCacheSettings::class);

            $partial->set('head', 'Ceres::PageDesign.Partials.Head');
            $partial->set('header', 'Ceres::PageDesign.Partials.Header.Header');
            $partial->set('footer', 'Ceres::PageDesign.Partials.Footer');
            $partial->set('page-design', 'Ceres::PageDesign.PageDesign');

        }, self::EVENT_LISTENER_PRIORITY);
    }
}
