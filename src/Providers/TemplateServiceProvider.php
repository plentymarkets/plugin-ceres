<?php

namespace Ceres\Providers;

use Ceres\Config\CeresConfig;
use Ceres\Contexts\CategoryContext;
use Ceres\Contexts\CategoryItemContext;
use Ceres\Contexts\ChangeMailContext;
use Ceres\Contexts\CheckoutContext;
use Ceres\Contexts\GlobalContext;
use Ceres\Contexts\ItemSearchContext;
use Ceres\Contexts\OrderConfirmationContext;
use Ceres\Contexts\OrderReturnContext;
use Ceres\Contexts\PasswordResetContext;
use Ceres\Contexts\SingleItemContext;
use Ceres\Extensions\TwigItemDataField;
use Ceres\Extensions\TwigJsonDataContainer;
use Ceres\Extensions\TwigLayoutContainerInternal;
use Ceres\Extensions\TwigStyleScriptTagFilter;
use Ceres\Hooks\CeresAfterBuildPlugins;
use Ceres\Wizard\ShopWizard\Services\DefaultSettingsService;
use Ceres\Wizard\ShopWizard\ShopWizard;
use IO\Extensions\Constants\ShopUrls;
use IO\Extensions\Functions\Partial;
use IO\Helper\RouteConfig;
use IO\Helper\TemplateContainer;
use IO\Services\ItemSearch\Helper\ResultFieldTemplate;
use IO\Services\UrlBuilder\UrlQuery;
use Plenty\Modules\Plugin\Events\AfterBuildPlugins;
use Plenty\Modules\System\Contracts\WebstoreConfigurationRepositoryContract;
use Plenty\Modules\Webshop\Consent\Contracts\ConsentRepositoryContract;
use Plenty\Modules\Wizard\Contracts\WizardContainerContract;
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
        'tpl.home.category'                 => ['Homepage.HomepageCategory',              CategoryContext::class],
        'tpl.category.content'              => ['Category.Content.CategoryContent',       CategoryContext::class],
        'tpl.category.item'                 => ['Category.Item.CategoryItem',             CategoryItemContext::class],
        'tpl.category.blog'                 => ['PageDesign.PageDesign',                  GlobalContext::class],
        'tpl.category.container'            => ['PageDesign.PageDesign',                  GlobalContext::class],
        'tpl.item'                          => ['Item.SingleItemWrapper',                 SingleItemContext::class],
        'tpl.basket'                        => ['Basket.Basket',                          GlobalContext::class],
        'tpl.checkout'                      => ['Checkout.CheckoutView',                  CheckoutContext::class],
        'tpl.checkout.category'             => ['Checkout.CheckoutCategory',              CheckoutContext::class],
        'tpl.my-account'                    => ['MyAccount.MyAccountView',                GlobalContext::class],
        'tpl.my-account.category'           => ['MyAccount.MyAccountCategory',            CategoryContext::class],
        'tpl.confirmation'                  => ['Checkout.OrderConfirmation',             OrderConfirmationContext::class],
        'tpl.login'                         => ['Customer.Login',                         GlobalContext::class],
        'tpl.register'                      => ['Customer.Register',                      GlobalContext::class],
        'tpl.guest'                         => ['Customer.Guest',                         GlobalContext::class],
        'tpl.password-reset'                => ['Customer.ResetPassword',                 PasswordResetContext::class],
        'tpl.change-mail'                   => ['Customer.ChangeMail',                    ChangeMailContext::class],
        'tpl.contact'                       => ['Customer.Contact',                       GlobalContext::class],
        'tpl.search'                        => ['Category.Item.CategoryItem',             ItemSearchContext::class],
        'tpl.wish-list'                     => ['WishList.WishListView',                  GlobalContext::class],
        'tpl.order.return'                  => ['OrderReturn.OrderReturnView',            OrderReturnContext::class],
        'tpl.order.return.confirmation'     => ['OrderReturn.OrderReturnConfirmation',    GlobalContext::class],
        'tpl.cancellation-rights'           => ['StaticPages.CancellationRights',         GlobalContext::class],
        'tpl.cancellation-form'             => ['StaticPages.CancellationForm',           GlobalContext::class],
        'tpl.legal-disclosure'              => ['StaticPages.LegalDisclosure',            GlobalContext::class],
        'tpl.privacy-policy'                => ['StaticPages.PrivacyPolicy',              GlobalContext::class],
        'tpl.terms-conditions'              => ['StaticPages.TermsAndConditions',         GlobalContext::class],
        'tpl.item-not-found'                => ['StaticPages.ItemNotFound',               GlobalContext::class],
        'tpl.page-not-found'                => ['StaticPages.PageNotFound',               GlobalContext::class],
        'tpl.newsletter.opt-out'            => ['Newsletter.NewsletterOptOut',            GlobalContext::class],
        'tpl.mail.contact'                  => ['Customer.Components.Contact.ContactMail',GlobalContext::class]
    ];

    public function register(){
        $this->getApplication()->singleton( CeresConfig::class );
        $this->getApplication()->singleton( DefaultSettingsService::class );
    }

    public function boot(Twig $twig, Dispatcher $eventDispatcher, ConfigRepository $config)
    {
        //register shopCeres assistant
        /** @var WizardContainerContract $wizardContainer */
        $wizardContainer = pluginApp(WizardContainerContract::class);
        $wizardContainer->register('shopCeres-assistant', ShopWizard::class);

        $this->registerConsents();

        // Register Twig String Loader to use function: template_from_string
        $twig->addExtension('Twig_Extension_StringLoader');
        $twig->addExtension(TwigStyleScriptTagFilter::class);
        $twig->addExtension(TwigLayoutContainerInternal::class);
        $twig->addExtension(TwigJsonDataContainer::class);
        $twig->addExtension(TwigItemDataField::class);

        $this->listenToIO('tpl.*', function (TemplateContainer $templateContainer, $templateData = []) {
            if ( !$templateContainer->hasTemplate() )
            {
                $this->setTemplateAndContext($templateContainer);
            }
        });

        $this->listenToIO('ctx.*', function (TemplateContainer $templateContainer, $templateData = []) {
            $this->setTemplateAndContext($templateContainer);
        });

        $this->listenToIO('ResultFields.*', function(ResultFieldTemplate $templateContainer) {
            $templateContainer->setTemplates([
                ResultFieldTemplate::TEMPLATE_LIST_ITEM     => 'Ceres::ResultFields.ListItem',
                ResultFieldTemplate::TEMPLATE_SINGLE_ITEM   => 'Ceres::ResultFields.SingleItem',
                ResultFieldTemplate::TEMPLATE_BASKET_ITEM   => 'Ceres::ResultFields.BasketItem',
                ResultFieldTemplate::TEMPLATE_AUTOCOMPLETE_ITEM_LIST => 'Ceres::ResultFields.AutoCompleteListItem',
                ResultFieldTemplate::TEMPLATE_CATEGORY_TREE => 'Ceres::ResultFields.CategoryTree',
                ResultFieldTemplate::TEMPLATE_VARIATION_ATTRIBUTE_MAP => 'Ceres::ResultFields.VariationAttributeMap'
            ]);
        });

        $this->listenToIO('init.templates', function (Partial $partial) {

            $partial->set('head', 'Ceres::PageDesign.Partials.Head');
            $partial->set('header', 'Ceres::PageDesign.Partials.Header.Header');
            $partial->set('footer', 'Ceres::PageDesign.Partials.Footer');
            $partial->set('page-design', 'Ceres::PageDesign.PageDesign');
            $partial->set('page-metadata', 'Ceres::PageDesign.Partials.PageMetadata');

        });

        $eventDispatcher->listen(AfterBuildPlugins::class, CeresAfterBuildPlugins::class);
    }

    private function listenToIO($event, $listener)
    {
        /** @var Dispatcher $dispatcher */
        $dispatcher = pluginApp(Dispatcher::class);
        $dispatcher->listen('IO.' . $event, $listener, self::EVENT_LISTENER_PRIORITY);
        $dispatcher->listen('IO.intl.' . $event, $listener, self::EVENT_LISTENER_PRIORITY);
    }

    /**
     * @param TemplateContainer $templateContainer
     */
    private function setTemplateAndContext( $templateContainer )
    {
        $templateEvent  = $templateContainer->getTemplateKey();
        $template = substr($templateEvent, 4);
        if ( RouteConfig::getCategoryId( $template ) > 0
            && array_key_exists($templateEvent.'.category', self::$templateKeyToViewMap))
        {
            $templateEvent .= '.category';
        }

        if( array_key_exists($templateEvent, self::$templateKeyToViewMap) )
        {
            $templateConfig = self::$templateKeyToViewMap[$templateEvent];
            $templateContainer->setTemplate( 'Ceres::' . $templateConfig[0] );
            $templateContainer->setContext( $templateConfig[1] );
        }
        else
        {
            $templateContainer->setContext( GlobalContext::class );
        }
    }

    private function registerConsents()
    {
        /** @var ConsentRepositoryContract $consentRepository */
        $consentRepository = pluginApp(ConsentRepositoryContract::class);
        $consentRepository->registerConsentGroup(
            'necessary',
            'Ceres::Template.consentGroupNecessaryLabel',
            [
                'position' => 0,
                'necessary' => true,
                'description' => 'Ceres::Template.consentGroupNecessaryDescription'
            ]
        );

        $consentRepository->registerConsentGroup(
            'tracking',
            'Ceres::Template.consentGroupTrackingLabel',
            [
                'position' => 100,
                'description' => 'Ceres::Template.consentGroupTrackingDescription'
            ]
        );

        $consentRepository->registerConsentGroup(
            'marketing',
            'Ceres::Template.consentGroupMarketingLabel',
            [
                'position' => 200,
                'description' => 'Ceres::Template.consentGroupMarketingDescription'
            ]
        );

        $consentRepository->registerConsentGroup(
            'media',
            'Ceres::Template.consentGroupMediaLabel',
            [
                'position' => 300,
                'description' => 'Ceres::Template.consentGroupMediaDescription'
            ]
        );

        /** @var WebstoreConfigurationRepositoryContract $webstoreRepository */
        $webstoreRepository = pluginApp(WebstoreConfigurationRepositoryContract::class);
        $webstoreConfig     = $webstoreRepository->findByPlentyId($this->getApplication()->getPlentyId());

        $consentRepository->registerConsent(
            'consent',
            'Ceres::Template.consentConsentLabel',
            [
                'necessary' => true,
                'position' => 100,
                'description' => 'Ceres::Template.consentConsentDescription',
                'provider' => 'Ceres::Template.headerCompanyName',
                'lifespan' => 'Ceres::Template.consentLifespanSession',
                'policyUrl' => function()
                {
                    /** @var ShopUrls $shopUrls */
                    $shopUrls = pluginApp(ShopUrls::class);
                    /** @var UrlQuery $urlQuery */
                    $urlQuery = pluginApp(UrlQuery::class, ['path' => $shopUrls->privacyPolicy]);
                    return $urlQuery->toAbsoluteUrl();
                },
                'group' => 'necessary'
            ]
        );

        $consentRepository->registerConsent(
            'session',
            'Ceres::Template.consentSessionLabel',
            [
                'necessary' => true,
                'position' => 200,
                'description' => 'Ceres::Template.consentSessionDescription',
                'provider' => 'Ceres::Template.headerCompanyName',
                'lifespan' => $webstoreConfig->sessionLifetime > 0 ? 'Ceres::Template.consentLifespan100Days' : 'Ceres::Template.consentLifespanSession',
                'policyUrl' => function()
                {
                    /** @var ShopUrls $shopUrls */
                    $shopUrls = pluginApp(ShopUrls::class);
                    /** @var UrlQuery $urlQuery */
                    $urlQuery = pluginApp(UrlQuery::class, ['path' => $shopUrls->privacyPolicy]);
                    return $urlQuery->toAbsoluteUrl();
                },
                'group' => 'necessary'
            ]
        );

        $consentRepository->registerConsent(
            'csrf',
            'Ceres::Template.consentCsrfLabel',
            [
                'necessary' => true,
                'position' => 300,
                'description' => 'Ceres::Template.consentCsrfDescription',
                'provider' => 'Ceres::Template.headerCompanyName',
                'lifespan' => $webstoreConfig->sessionLifetime > 0 ? 'Ceres::Template.consentLifespan100Days' : 'Ceres::Template.consentLifespanSession',
                'policyUrl' => function()
                {
                    /** @var ShopUrls $shopUrls */
                    $shopUrls = pluginApp(ShopUrls::class);
                    /** @var UrlQuery $urlQuery */
                    $urlQuery = pluginApp(UrlQuery::class, ['path' => $shopUrls->privacyPolicy]);
                    return $urlQuery->toAbsoluteUrl();
                },
                'group' => 'necessary',
                'cookieNames' => ['XSRF-TOKEN']
            ]
        );

        $consentRepository->registerConsent(
            'googleMaps',
            'Ceres::Template.consentGoogleMapsLabel',
            [
                'position'      => 100,
                'description'   => 'Ceres::Template.consentGoogleMapsDescription',
                'provider'      => 'Ceres::Template.consentGoogleMapsProvider',
                'lifespan'      => 'Ceres::Template.consentGoogleMapsLifespan',
                'policyUrl'     => 'Ceres::Template.consentGoogleMapsPolicyUrl',
                'group'         => 'media'
            ]
        );
    }
}
