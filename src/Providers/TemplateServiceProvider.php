<?php // strict

namespace Callisto\Providers;

use Plenty\Plugin\ServiceProvider;
use Plenty\Plugin\Templates\Twig;
use Plenty\Plugin\Events\Dispatcher;
use Plenty\Plugin\ConfigRepository;

use Plenty\Modules\Category\Models\Category;
use Plenty\Modules\Item\DataLayer\Models\Record;

use LayoutCore\Helper\TemplateContainer;
use LayoutCore\Helper\CategoryMap;
use LayoutCore\Helper\CategoryKey;

class TemplateServiceProvider extends ServiceProvider
{
    public function register():void
    {
        
    }
    
    public function boot(Twig $twig, Dispatcher $eventDispatcher, ConfigRepository $config):void
    {
        // Register Twig String Loader to use function: template_from_string
        $twig->addExtension('Twig_Extension_StringLoader');
        
        // provide template to use for content categories
        $eventDispatcher->listen('tpl.category.content', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCallisto::Category.CategoryContent");
        }, 0);

        // provide template to use for item categories
        $eventDispatcher->listen('tpl.category.item', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCallisto::Category.Item.ItemCategoryView");
        }, 0);

        // provide template to use for blog categories
        $eventDispatcher->listen('tpl.category.blog', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCallisto::PageDesign");
        }, 0);

        // provide template to use for container categories
        $eventDispatcher->listen('tpl.category.container', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCallisto::PageDesign");
        }, 0);

        // provide template to use for single items
        $eventDispatcher->listen('tpl.item', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCallisto::Item.SingleItem");
        }, 0);

        // provide template to use for basket
        $eventDispatcher->listen('tpl.basket', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCallisto::Basket.Basket");
        }, 0);

        // provide template to use for checkout
        $eventDispatcher->listen('tpl.checkout', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCallisto::Checkout.Checkout");
        }, 0);

        // provide template to use for my-account
        $eventDispatcher->listen('tpl.my-account', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCallisto::MyAccount.MyAccount");
        }, 0);

        // provide template to use for confirmation
        $eventDispatcher->listen('tpl.confirmation', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCallisto::Confirmation.Confirmation");
        }, 0);

        // provide template to use for login
        $eventDispatcher->listen('tpl.login', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCallisto::LoginPage.LoginPage");
        }, 0);

        // provide template to use for register
        $eventDispatcher->listen('tpl.register', function(TemplateContainer $container, $templateData) {
            $container->setTemplate("PluginCallisto::RegisterPage.RegisterPage");
        }, 0);

        // provide template to use for guest
        $eventDispatcher->listen('tpl.guest', function(TemplateContainer $container,  $templateData) {
            $container->setTemplate("PluginCallisto::Guest.Guest");
        }, 0);

        // provide mapped category IDs
        $eventDispatcher->listen('init.categories', function(CategoryMap $categoryMap, $config) {
            $categoryMap->setCategoryMap(array (
                CategoryKey::HOME           => $config->get("PluginCallisto.global.category.home"),
                CategoryKey::PAGE_NOT_FOUND => $config->get("PluginCallisto.global.category.page_not_found"),
                CategoryKey::ITEM_NOT_FOUND => $config->get("PluginCallisto.global.category.item_not_found")
            ));
        }, 0);
	}
}
