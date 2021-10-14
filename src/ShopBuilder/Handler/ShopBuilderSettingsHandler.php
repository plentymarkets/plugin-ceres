<?php

namespace Ceres\ShopBuilder\Handler;

use IO\Helper\RouteConfig;
use Plenty\Modules\ShopBuilder\Helper\MappableSettingsHandler;

/**
 * Class ShopBuilderSettingsHandler
 *
 * Maps the routing settings from IO to plentyShop LTS. This allows us to set routing settings in the ShopBuilder.
 *
 * @package Ceres\ShopBuilder\Handler
 */
class ShopBuilderSettingsHandler extends MappableSettingsHandler
{
    /**
     * @var string[] Maps the plentyShop LTS settings to the IO settings.
     */
    protected $mappings = [
        'routing.homeCategory'                  => 'IO.routing.category_home',
        'routing.homeEnableRoute'               => 'IO.routing.enabled_routes',
        'routing.basketCategory'                => 'IO.routing.category_basket',
        'routing.basketEnableRoute'             => 'IO.routing.enabled_routes',
        'routing.checkoutCategory'              => 'IO.routing.category_checkout',
        'routing.checkoutEnableRoute'           => 'IO.routing.enabled_routes',
        'routing.myAccountCategory'             => 'IO.routing.category_my-account',
        'routing.myAccountEnableRoute'          => 'IO.routing.enabled_routes',
        'routing.searchCategory'                => 'IO.routing.category_search',
        'routing.searchEnableRoute'             => 'IO.routing.enabled_routes',
        'routing.loginCategory'                 => 'IO.routing.category_login',
        'routing.loginEnableRoute'              => 'IO.routing.enabled_routes',
        'routing.registerCategory'              => 'IO.routing.category_register',
        'routing.registerEnableRoute'           => 'IO.routing.enabled_routes',
        'routing.confirmationCategory'          => 'IO.routing.category_confirmation',
        'routing.confirmationEnableRoute'       => 'IO.routing.enabled_routes',
        'routing.confirmationGuestCategory'     => 'IO.routing.category_confirmation-guest',
        'routing.cancellationRightsCategory'    => 'IO.routing.category_cancellation-rights',
        'routing.cancellationRightsEnableRoute' => 'IO.routing.enabled_routes',
        'routing.cancellationFormCategory'      => 'IO.routing.category_cancellation-form',
        'routing.cancellationFormEnableRoute'   => 'IO.routing.enabled_routes',
        'routing.legalDisclosureCategory'       => 'IO.routing.category_legal-disclosure',
        'routing.legalDisclosureEnableRoute'    => 'IO.routing.enabled_routes',
        'routing.privacyPolicyCategory'         => 'IO.routing.category_privacy-policy',
        'routing.privacyPolicyEnableRoute'      => 'IO.routing.enabled_routes',
        'routing.gtcCategory'                   => 'IO.routing.category_gtc',
        'routing.gtcEnableRoute'                => 'IO.routing.enabled_routes',
        'routing.contactCategory'               => 'IO.routing.category_contact',
        'routing.contactEnableRoute'            => 'IO.routing.enabled_routes',
        'routing.wishListCategory'              => 'IO.routing.category_wish-list',
        'routing.wishListEnableRoute'           => 'IO.routing.enabled_routes',
        'routing.changeMailCategory'            => 'IO.routing.category_change-mail',
        'routing.changeMailEnableRoute'         => 'IO.routing.enabled_routes',
        'routing.passwordResetCategory'         => 'IO.routing.category_password-reset',
        'routing.passwordResetEnableRoute'      => 'IO.routing.enabled_routes',
        'routing.newsletterOptOutCategory'      => 'IO.routing.category_newsletter-opt-out',
        'routing.newsletterOptOutEnableRoute'   => 'IO.routing.enabled_routes',
        'routing.orderReturnCategory'           => 'IO.routing.category_order-return',
        'routing.orderReturnEnableRoute'        => 'IO.routing.enabled_routes',
        'routing.pageNotFoundCategory'          => 'IO.routing.category_page-not-found',
        'routing.pageNotFoundEnableRoute'       => 'IO.routing.enabled_routes',
        'routing.shippingCategory'              => 'Ceres.global.shippingCostsCategoryId',

        'grecaptcha.version'                    => 'Ceres.global.google_recaptcha_version',
        'grecaptcha.apikey'                     => 'Ceres.global.google_recaptcha_api_key',
        'grecaptcha.secret'                     => 'Ceres.global.google_recaptcha_secret',
        'grecaptcha.threshold'                  => 'Ceres.global.google_recaptcha_threshold'
    ];

    /**
     * @var string[] Decides what datatype the settings should be casted as.
     */
    protected $casts = [
        'routing.home'                          => 'int',
        'routing.basket'                        => 'int',
        'routing.checkoutCategory'              => 'int',
        'routing.myAccountCategory'             => 'int',
        'routing.searchCategory'                => 'int',
        'routing.loginCategory'                 => 'int',
        'routing.registerCategory'              => 'int',
        'routing.confirmationCategory'          => 'int',
        'routing.confirmationGuestCategory'     => 'int',
        'routing.cancellationRightsCategory'    => 'int',
        'routing.cancellationFormCategory'      => 'int',
        'routing.legalDisclosureCategory'       => 'int',
        'routing.privacyPolicyCategory'         => 'int',
        'routing.gtcCategory'                   => 'int',
        'routing.contactCategory'               => 'int',
        'routing.wishListCategory'              => 'int',
        'routing.changeMailCategory'            => 'int',
        'routing.passwordResetCategory'         => 'int',
        'routing.newsletterOptOutCategory'      => 'int',
        'routing.orderReturnCategory'           => 'int',
        'routing.pageNotFoundCategory'          => 'int',
        'routing.shippingCategory'              => 'int',

        'grecaptcha.version'                    => 'int',
        'grecaptcha.threshold'                  => 'float'
    ];

    /**
     * @var array|null $enabledRoutes Contains all enabled routes from the plugin config.
     */
    private $enabledRoutes = null;

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_HomeEnableRoute()
    {
        return in_array( RouteConfig::HOME, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableHomeRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_HomeEnableRoute($enableHomeRoute)
    {
        return $this->setEnabledRoute(RouteConfig::HOME, $enableHomeRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_BasketEnableRoute()
    {
        return in_array( RouteConfig::BASKET, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableBasketRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_BasketEnableRoute($enableBasketRoute)
    {
        return $this->setEnabledRoute(RouteConfig::BASKET, $enableBasketRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_CheckoutEnableRoute()
    {
        return in_array( RouteConfig::CHECKOUT, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableCheckoutRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_CheckoutEnableRoute($enableCheckoutRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CHECKOUT, $enableCheckoutRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_MyAccountEnableRoute()
    {
        return in_array( RouteConfig::MY_ACCOUNT, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableMyAccountRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_MyAccountEnableRoute($enableMyAccountRoute)
    {
        return $this->setEnabledRoute(RouteConfig::MY_ACCOUNT, $enableMyAccountRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_searchEnableRoute(): bool
    {
        return in_array(RouteConfig::SEARCH, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableSearchRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_searchEnableRoute($enableSearchRoute): string
    {
        return $this->setEnabledRoute(RouteConfig::SEARCH, $enableSearchRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_ConfirmationEnableRoute()
    {
        return in_array( RouteConfig::CONFIRMATION, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableConfirmationRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_ConfirmationEnableRoute($enableConfirmationRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CONFIRMATION, $enableConfirmationRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_LoginEnableRoute()
    {
        return in_array( RouteConfig::LOGIN, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableLoginRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_LoginEnableRoute($enableLoginRoute)
    {
        return $this->setEnabledRoute(RouteConfig::LOGIN, $enableLoginRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_RegisterEnableRoute()
    {
        return in_array( RouteConfig::REGISTER, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableRegisterRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_RegisterEnableRoute($enableRegisterRoute)
    {
        return $this->setEnabledRoute(RouteConfig::REGISTER, $enableRegisterRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_CancellationRightsEnableRoute()
    {
        return in_array( RouteConfig::CANCELLATION_RIGHTS, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableCancellationRightsRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_CancellationRightsEnableRoute($enableCancellationRightsRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CANCELLATION_RIGHTS, $enableCancellationRightsRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_CancellationFormEnableRoute()
    {
        return in_array( RouteConfig::CANCELLATION_FORM, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableCancellationFormRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_CancellationFormEnableRoute($enableCancellationFormRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CANCELLATION_FORM, $enableCancellationFormRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_LegalDisclosureEnableRoute()
    {
        return in_array( RouteConfig::LEGAL_DISCLOSURE, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableLegalDisclosureRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_LegalDisclosureEnableRoute($enableLegalDisclosureRoute)
    {
        return $this->setEnabledRoute(RouteConfig::LEGAL_DISCLOSURE, $enableLegalDisclosureRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_PrivacyPolicyEnableRoute()
    {
        return in_array( RouteConfig::PRIVACY_POLICY, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enablePrivacyPolicyRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_PrivacyPolicyEnableRoute($enablePrivacyPolicyRoute)
    {
        return $this->setEnabledRoute(RouteConfig::PRIVACY_POLICY, $enablePrivacyPolicyRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_GtcEnableRoute()
    {
        return in_array( RouteConfig::TERMS_CONDITIONS, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableGtcRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_GtcEnableRoute($enableGtcRoute)
    {
        return $this->setEnabledRoute(RouteConfig::TERMS_CONDITIONS, $enableGtcRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_ContactEnableRoute()
    {
        return in_array( RouteConfig::CONTACT, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableContactRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_ContactEnableRoute($enableContactRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CONTACT, $enableContactRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_WishListEnableRoute()
    {
        return in_array( RouteConfig::WISH_LIST, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableWishListRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_WishListEnableRoute($enableWishListRoute)
    {
        return $this->setEnabledRoute(RouteConfig::WISH_LIST, $enableWishListRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_ChangeMailEnableRoute()
    {
        return in_array( RouteConfig::CHANGE_MAIL, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableWishListRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_ChangeMailEnableRoute($enableWishListRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CHANGE_MAIL, $enableWishListRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_PasswordResetEnableRoute()
    {
        return in_array( RouteConfig::PASSWORD_RESET, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableWishListRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_PasswordResetEnableRoute($enableWishListRoute)
    {
        return $this->setEnabledRoute(RouteConfig::PASSWORD_RESET, $enableWishListRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_NewsletterOptOutEnableRoute()
    {
        return in_array( RouteConfig::NEWSLETTER_OPT_OUT, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableWishListRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_NewsletterOptOutEnableRoute($enableWishListRoute)
    {
        return $this->setEnabledRoute(RouteConfig::NEWSLETTER_OPT_OUT, $enableWishListRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_OrderReturnEnableRoute()
    {
        return in_array( RouteConfig::ORDER_RETURN, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enableWishListRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_OrderReturnEnableRoute($enableWishListRoute)
    {
        return $this->setEnabledRoute(RouteConfig::ORDER_RETURN, $enableWishListRoute);
    }

    /**
     * Check if route is enabled or disabled.
     * @return bool
     */
    public function readRouting_PageNotFoundEnableRoute()
    {
        return in_array( RouteConfig::PAGE_NOT_FOUND, RouteConfig::getEnabledRoutes());
    }

    /**
     * Enable or disable the route.
     * @param bool $enablePageNotFoundRoute If true, enable the route.
     * @return string
     */
    public function writeRouting_PageNotFoundEnableRoute($enablePageNotFoundRoute)
    {
        return $this->setEnabledRoute(RouteConfig::PAGE_NOT_FOUND, $enablePageNotFoundRoute);
    }

    /**
     * Setter logic for the enabled routes.
     * @param string $key The key of the route (See RouteConfig).
     * @param bool $value The state of the route.
     * @return string
     */
    private function setEnabledRoute($key, $value)
    {
        if(is_null($this->enabledRoutes))
        {
            $this->enabledRoutes = RouteConfig::getEnabledRoutes();
        }

        if( $value && !in_array($key, $this->enabledRoutes) )
        {
            $this->enabledRoutes[] = $key;
        }
        else if ( !$value && in_array($key, $this->enabledRoutes) )
        {
            $this->enabledRoutes = array_filter($this->enabledRoutes, function($route) use ($key)
            {
                return $route !== $key;
            });
        }

        return implode(", ", $this->enabledRoutes);
    }
}
