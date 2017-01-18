<?php // strict

namespace Ceres\Providers;

use IO\Extensions\Functions\Partial;
use Plenty\Plugin\ServiceProvider;
use Plenty\Plugin\Templates\Twig;
use Plenty\Plugin\Events\Dispatcher;
use Plenty\Plugin\ConfigRepository;

use IO\Helper\TemplateContainer;
use IO\Helper\CategoryMap;
use IO\Helper\CategoryKey;

class TemplateServiceProvider extends ServiceProvider
{
    public function register(){}
    
    public function boot(Twig $twig, Dispatcher $eventDispatcher, ConfigRepository $config)
    {
        // Register Twig String Loader to use function: template_from_string
        $twig->addExtension('Twig_Extension_StringLoader');

        // provide template to use for homepage
        $eventDispatcher->listen('tpl.home', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCeres::Homepage.Homepage");
        }, 100);
        
        // provide template to use for content categories
        $eventDispatcher->listen('tpl.category.content', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCeres::Category.Content.CategoryContent");
        }, 100);

        // provide template to use for item categories
        $eventDispatcher->listen('tpl.category.item', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCeres::Category.Item.CategoryItem");
        }, 100);

        // provide template to use for blog categories
        $eventDispatcher->listen('tpl.category.blog', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCeres::PageDesign.PageDesign");
        }, 100);

        // provide template to use for container categories
        $eventDispatcher->listen('tpl.category.container', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCeres::PageDesign.PageDesign");
        }, 100);

        // provide template to use for single items
        $eventDispatcher->listen('tpl.item', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCeres::Item.SingleItem");
        }, 100);

        // provide template to use for basket
        $eventDispatcher->listen('tpl.basket', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCeres::Basket.Basket");
        }, 100);

        // provide template to use for checkout
        $eventDispatcher->listen('tpl.checkout', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCeres::Checkout.Checkout");
        }, 100);

        // provide template to use for my-account
        $eventDispatcher->listen('tpl.my-account', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCeres::MyAccount.MyAccount");
        }, 100);

        // provide template to use for confirmation
        $eventDispatcher->listen('tpl.confirmation', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCeres::Checkout.OrderConfirmation");
        }, 100);

        // provide template to use for login
        $eventDispatcher->listen('tpl.login', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCeres::Customer.Login");
        }, 100);

        // provide template to use for register
        $eventDispatcher->listen('tpl.register', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCeres::Customer.Register");
        }, 100);

        // provide template to use for guest
        $eventDispatcher->listen('tpl.guest', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCeres::Customer.Guest");
        }, 100);
    
        // provide template to use for item search
        $eventDispatcher->listen('tpl.search', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCeres::ItemList.ItemListView");
        }, 100);

        // provide template to use for cancellation rights
        $eventDispatcher->listen('tpl.cancellation-rights', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCeres::StaticPages.CancellationRights");
        }, 100);

        // provide template to use for legal disclosure
        $eventDispatcher->listen('tpl.legal-disclosure', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCeres::StaticPages.LegalDisclosure");
        }, 100);

        // provide template to use for privacy policy
        $eventDispatcher->listen('tpl.privacy-policy', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCeres::StaticPages.PrivacyPolicy");
        }, 100);

        // provide template to use for terms and conditions
        $eventDispatcher->listen('tpl.terms-conditions', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCeres::StaticPages.TermsAndConditions");
        }, 100);

        // provide template to use for item not found
        $eventDispatcher->listen('tpl.item-not-found', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCeres::StaticPages.ItemNotFound");
        }, 100);

        // provide template to use for page not found
        $eventDispatcher->listen('tpl.page-not-found', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCeres::StaticPages.PageNotFound");
        }, 100);

        // provide mapped category IDs - DEPRECATED?
        $eventDispatcher->listen('init.categories', function(CategoryMap $categoryMap) use(&$config) {
            $categoryMap->setCategoryMap(array (
                                             CategoryKey::HOME           => $config->get("PluginCeres.global.category.home"),
                                             CategoryKey::PAGE_NOT_FOUND => $config->get("PluginCeres.global.category.page_not_found"),
                                             CategoryKey::ITEM_NOT_FOUND => $config->get("PluginCeres.global.category.item_not_found")
                                         ));
            
        }, 100);

        $eventDispatcher->listen('IO.init.templates', function(Partial $partial) {
            $partial->set('head', 'PluginCeres::PageDesign.Partials.Head');
            $partial->set('header', 'PluginCeres::PageDesign.Partials.Header.Header');
            $partial->set('footer', 'PluginCeres::PageDesign.Partials.Footer');
            $partial->set('page-design', 'PluginCeres::PageDesign.PageDesign');
        }, 100);
	}
}
