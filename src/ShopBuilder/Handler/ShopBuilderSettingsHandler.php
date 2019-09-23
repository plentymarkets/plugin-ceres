<?php

namespace Ceres\ShopBuilder\Handler;

use IO\Helper\RouteConfig;
use Plenty\Modules\ShopBuilder\Helper\MappableSettingsHandler;

class ShopBuilderSettingsHandler extends MappableSettingsHandler
{
    protected $mappings = [
        'routing.homeCategory'                  => 'IO.routing.category_home',
        'routing.homeEnableRoute'               => 'IO.routing.enabled_routes',
        'routing.basketCategory'                => 'IO.routing.category_basket',
        'routing.basketEnableRoute'             => 'IO.routing.enabled_routes',
        'routing.checkoutCategory'              => 'IO.routing.category_checkout',
        'routing.checkoutEnableRoute'           => 'IO.routing.enabled_routes',
        'routing.myAccountCategory'             => 'IO.routing.category_my-account',
        'routing.myAccountEnableRoute'          => 'IO.routing.enabled_routes',
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

    protected $casts = [
        'routing.home'                          => 'int',
        'routing.basket'                        => 'int',
        'routing.checkoutCategory'              => 'int',
        'routing.myAccountCategory'             => 'int',
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

    private $enabledRoutes = null;

    public function readRouting_HomeEnableRoute()
    {
        return in_array( RouteConfig::HOME, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_HomeEnableRoute($enableHomeRoute)
    {
        return $this->setEnabledRoute(RouteConfig::HOME, $enableHomeRoute);
    }

    public function readRouting_BasketEnableRoute()
    {
        return in_array( RouteConfig::BASKET, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_BasketEnableRoute($enableBasketRoute)
    {
        return $this->setEnabledRoute(RouteConfig::BASKET, $enableBasketRoute);
    }

    public function readRouting_CheckoutEnableRoute()
    {
        return in_array( RouteConfig::CHECKOUT, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_CheckoutEnableRoute($enableCheckoutRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CHECKOUT, $enableCheckoutRoute);
    }

    public function readRouting_MyAccountEnableRoute()
    {
        return in_array( RouteConfig::MY_ACCOUNT, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_MyAccountEnableRoute($enableMyAccountRoute)
    {
        return $this->setEnabledRoute(RouteConfig::MY_ACCOUNT, $enableMyAccountRoute);
    }

    public function readRouting_ConfirmationEnableRoute()
    {
        return in_array( RouteConfig::CONFIRMATION, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_ConfirmationEnableRoute($enableConfirmationRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CONFIRMATION, $enableConfirmationRoute);
    }

    public function readRouting_LoginEnableRoute()
    {
        return in_array( RouteConfig::LOGIN, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_LoginEnableRoute($enableLoginRoute)
    {
        return $this->setEnabledRoute(RouteConfig::LOGIN, $enableLoginRoute);
    }

    public function readRouting_RegisterEnableRoute()
    {
        return in_array( RouteConfig::REGISTER, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_RegisterEnableRoute($enableRegisterRoute)
    {
        return $this->setEnabledRoute(RouteConfig::REGISTER, $enableRegisterRoute);
    }

    public function readRouting_CancellationRightsEnableRoute()
    {
        return in_array( RouteConfig::CANCELLATION_RIGHTS, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_CancellationRightsEnableRoute($enableCancellationRightsRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CANCELLATION_RIGHTS, $enableCancellationRightsRoute);
    }

    public function readRouting_CancellationFormEnableRoute()
    {
        return in_array( RouteConfig::CANCELLATION_FORM, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_CancellationFormEnableRoute($enableCancellationFormRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CANCELLATION_FORM, $enableCancellationFormRoute);
    }

    public function readRouting_LegalDisclosureEnableRoute()
    {
        return in_array( RouteConfig::LEGAL_DISCLOSURE, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_LegalDisclosureEnableRoute($enableLegalDisclosureRoute)
    {
        return $this->setEnabledRoute(RouteConfig::LEGAL_DISCLOSURE, $enableLegalDisclosureRoute);
    }

    public function readRouting_PrivacyPolicyEnableRoute()
    {
        return in_array( RouteConfig::PRIVACY_POLICY, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_PrivacyPolicyEnableRoute($enablePrivacyPolicyRoute)
    {
        return $this->setEnabledRoute(RouteConfig::PRIVACY_POLICY, $enablePrivacyPolicyRoute);
    }

    public function readRouting_GtcEnableRoute()
    {
        return in_array( RouteConfig::TERMS_CONDITIONS, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_GtcEnableRoute($enableGtcRoute)
    {
        return $this->setEnabledRoute(RouteConfig::TERMS_CONDITIONS, $enableGtcRoute);
    }

    public function readRouting_ContactEnableRoute()
    {
        return in_array( RouteConfig::CONTACT, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_ContactEnableRoute($enableContactRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CONTACT, $enableContactRoute);
    }

    public function readRouting_WishListEnableRoute()
    {
        return in_array( RouteConfig::WISH_LIST, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_WishListEnableRoute($enableWishListRoute)
    {
        return $this->setEnabledRoute(RouteConfig::WISH_LIST, $enableWishListRoute);
    }

    public function readRouting_ChangeMailEnableRoute()
    {
        return in_array( RouteConfig::CHANGE_MAIL, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_ChangeMailEnableRoute($enableWishListRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CHANGE_MAIL, $enableWishListRoute);
    }

    public function readRouting_PasswordResetEnableRoute()
    {
        return in_array( RouteConfig::PASSWORD_RESET, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_PasswordResetEnableRoute($enableWishListRoute)
    {
        return $this->setEnabledRoute(RouteConfig::PASSWORD_RESET, $enableWishListRoute);
    }

    public function readRouting_NewsletterOptOutEnableRoute()
    {
        return in_array( RouteConfig::NEWSLETTER_OPT_OUT, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_NewsletterOptOutEnableRoute($enableWishListRoute)
    {
        return $this->setEnabledRoute(RouteConfig::NEWSLETTER_OPT_OUT, $enableWishListRoute);
    }

    public function readRouting_OrderReturnEnableRoute()
    {
        return in_array( RouteConfig::ORDER_RETURN, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_OrderReturnEnableRoute($enableWishListRoute)
    {
        return $this->setEnabledRoute(RouteConfig::ORDER_RETURN, $enableWishListRoute);
    }

    public function readRouting_PageNotFoundEnableRoute()
    {
        return in_array( RouteConfig::PAGE_NOT_FOUND, RouteConfig::getEnabledRoutes());
    }

    public function writeRouting_PageNotFoundEnableRoute($enablePageNotFoundRoute)
    {
        return $this->setEnabledRoute(RouteConfig::PAGE_NOT_FOUND, $enablePageNotFoundRoute);
    }

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
