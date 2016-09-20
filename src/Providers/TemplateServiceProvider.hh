<?hh // strict

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
        $eventDispatcher->listen('tpl.category.content', (TemplateContainer $container, array<string, mixed> $templateData) ==> {
            $container->setTemplate("PluginCallisto::Category.CategoryContent");
        });

        // provide template to use for item categories
        $eventDispatcher->listen('tpl.category.item', (TemplateContainer $container, array<string, mixed> $templateData) ==> {
            $container->setTemplate("PluginCallisto::Category.Item.ItemCategoryView");
        });

        // provide template to use for blog categories
        $eventDispatcher->listen('tpl.category.blog', (TemplateContainer $container, array<string, mixed> $templateData) ==> {
            $container->setTemplate("PluginCallisto::PageDesign");
        });

        // provide template to use for container categories
        $eventDispatcher->listen('tpl.category.container', (TemplateContainer $container, array<string, mixed> $templateData) ==> {
            $container->setTemplate("PluginCallisto::PageDesign");
        });

        // provide template to use for single items
        $eventDispatcher->listen('tpl.item', (TemplateContainer $container, array<string, mixed> $templateData) ==> {
            $container->setTemplate("PluginCallisto::Item.SingleItem");
        });

        // provide template to use for basket
        $eventDispatcher->listen('tpl.basket', (TemplateContainer $container, array<string, mixed> $templateData) ==> {
            $container->setTemplate("PluginCallisto::Basket.Basket");
        });

        // provide template to use for checkout
        $eventDispatcher->listen('tpl.checkout', (TemplateContainer $container, array<string, mixed> $templateData) ==> {
            $container->setTemplate("PluginCallisto::Checkout.Checkout");
         });

        // provide template to use for my-account
        $eventDispatcher->listen('tpl.my-account', (TemplateContainer $container, array<string, mixed> $templateData) ==> {
            $container->setTemplate("PluginCallisto::MyAccount.MyAccount");
         });

        // provide template to use for confirmation
        $eventDispatcher->listen('tpl.confirmation', (TemplateContainer $container, array<string, mixed> $templateData) ==> {
            $container->setTemplate("PluginCallisto::Confirmation.Confirmation");
        });

        // provide template to use for login
        $eventDispatcher->listen('tpl.login', (TemplateContainer $container, array<string, mixed> $templateData) ==> {
            $container->setTemplate("PluginCallisto::LoginPage.LoginPage");
        });

        // provide template to use for register
        $eventDispatcher->listen('tpl.register', (TemplateContainer $container, array<string, mixed> $templateData) ==> {
            $container->setTemplate("PluginCallisto::RegisterPage.RegisterPage");
        });

        // provide template to use for guest
        $eventDispatcher->listen('tpl.guest', (TemplateContainer $container, array<string, mixed> $templateData) ==> {
            $container->setTemplate("PluginCallisto::Guest.Guest");
        });

        // provide mapped category IDs
        $eventDispatcher->listen('init.categories', (CategoryMap $categoryMap) ==> {
            $categoryMap->setCategoryMap(array (
                CategoryKey::HOME           => $config->get("PluginCallisto.global.category.home"),
                CategoryKey::PAGE_NOT_FOUND => $config->get("PluginCallisto.global.category.page_not_found"),
                CategoryKey::ITEM_NOT_FOUND => $config->get("PluginCallisto.global.category.item_not_found")
            ));
        });
	}
}
