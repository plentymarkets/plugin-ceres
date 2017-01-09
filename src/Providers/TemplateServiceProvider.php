<?php
namespace Ceres\Providers;

use IO\Helper\CategoryKey;
use IO\Helper\CategoryMap;
use IO\Helper\TemplateContainer;
use Plenty\Plugin\ConfigRepository;
use Plenty\Plugin\Events\Dispatcher;
use Plenty\Plugin\ServiceProvider;
use Plenty\Plugin\Templates\Twig;

/**
 * Class TemplateServiceProvider
 * @package Ceres\Providers
 */
class TemplateServiceProvider extends ServiceProvider
{
	const EVENT_LISTENER_PRIORITY = 0;
	
	private static $templateKeyToViewMap = [
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
	];
	
	public function register()
	{
	}
	
	/**
	 * @param Twig $twig
	 * @param Dispatcher $eventDispatcher
	 * @param ConfigRepository $config
	 */
	public function boot(Twig $twig, Dispatcher $eventDispatcher, ConfigRepository $config)
	{
		// Register Twig String Loader to use function: template_from_string
		$twig->addExtension('Twig_Extension_StringLoader');
		
		$eventDispatcher->listen(
			'IO.tpl.*',
			function (TemplateContainer $templateContainer)
			{
				$templateContainer->setTemplate('PluginCeres::' . self::$templateKeyToViewMap[$templateContainer->getTemplateKey()]);
			},
			self::EVENT_LISTENER_PRIORITY
		);

		// provide mapped category IDs
		$eventDispatcher->listen(
			'IO.init.categories',
			function (CategoryMap $categoryMap) use ($config)
			{
				$categoryMap->setCategoryMap(
					[
						CategoryKey::HOME           => $config->get("PluginCeres.global.category.home"),
						CategoryKey::PAGE_NOT_FOUND => $config->get("PluginCeres.global.category.page_not_found"),
						CategoryKey::ITEM_NOT_FOUND => $config->get("PluginCeres.global.category.item_not_found")
					]
				);
				
			},
			self::EVENT_LISTENER_PRIORITY
		);
	}
}
