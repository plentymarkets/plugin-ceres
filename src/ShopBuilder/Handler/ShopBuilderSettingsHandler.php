<?php

namespace Ceres\ShopBuilder\Handler;

use IO\Helper\RouteConfig;
use Plenty\Modules\ShopBuilder\Helper\MappableSettingsHandler;

class ShopBuilderSettingsHandler extends MappableSettingsHandler
{
    protected $mappings = [
        'shippingCategory'      => 'Ceres.global.shippingCostsCategoryId',
        'checkoutCategory'      => 'IO.routing.category_checkout',
        'checkoutEnableRoute'   => 'IO.routing.enabled_routes',
        'myAccountCategory'     => 'IO.routing.category_my-account',
        'myAccountEnableRoute'  => 'IO.routing.enabled_routes',
        
        'cancellationRightsCategory'    => 'IO.routing.category_cancellation-rights',
        'cancellationRightsEnableRoute' => 'IO.routing.enabled_routes',
        'cancellationFormCategory'      => 'IO.routing.category_cancellation-form',
        'cancellationFormEnableRoute'   => 'IO.routing.enabled_routes',
        'legalDisclosureCategory'       => 'IO.routing.category_legal-disclosure',
        'legalDisclosureEnableRoute'    => 'IO.routing.enabled_routes',
        'privacyPolicyCategory'         => 'IO.routing.category_privacy-policy',
        'privacyPolicyEnableRoute'      => 'IO.routing.enabled_routes',
        'gtcCategory'                   => 'IO.routing.category_gtc',
        'gtcEnableRoute'                => 'IO.routing.enabled_routes'
    ];

    protected $casts = [
        'shippingCategory'           => 'int',
        'checkoutCategory'           => 'int',
        'myAccountCategory'          => 'int',
        'cancellationRightsCategory' => 'int',
        'cancellationFormCategory'   => 'int',
        'legalDisclosureCategory'    => 'int',
        'privacyPolicyCategory'      => 'int',
        'gtcCategory'                => 'int'
    ];

    public function readCheckoutEnableRoute()
    {
        return in_array( RouteConfig::CHECKOUT, RouteConfig::getEnabledRoutes());
    }

    public function writeCheckoutEnableRoute($enableCheckoutRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CHECKOUT, $enableCheckoutRoute);
    }

    public function readMyAccountEnableRoute()
    {
        return in_array( RouteConfig::MY_ACCOUNT, RouteConfig::getEnabledRoutes());
    }

    public function writeMyAccountEnableRoute($enableCheckoutRoute)
    {
        return $this->setEnabledRoute(RouteConfig::MY_ACCOUNT, $enableCheckoutRoute);
    }
    
    public function readCancellationRightsEnableRoute()
    {
        return in_array( RouteConfig::CANCELLATION_RIGHTS, RouteConfig::getEnabledRoutes());
    }
    
    public function writeCancellationRightsEnableRoute($enableCancellationRightsRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CANCELLATION_RIGHTS, $enableCancellationRightsRoute);
    }
    
    public function readCancellationFormEnableRoute()
    {
        return in_array( RouteConfig::CANCELLATION_FORM, RouteConfig::getEnabledRoutes());
    }
    
    public function writeCancellationFormEnableRoute($enableCancellationFormRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CANCELLATION_FORM, $enableCancellationFormRoute);
    }
    
    public function readLegalDisclosureEnableRoute()
    {
        return in_array( RouteConfig::LEGAL_DISCLOSURE, RouteConfig::getEnabledRoutes());
    }
    
    public function writeLegalDisclosureEnableRoute($enableLegalDisclosureRoute)
    {
        return $this->setEnabledRoute(RouteConfig::LEGAL_DISCLOSURE, $enableLegalDisclosureRoute);
    }
    
    public function readPrivacyPolicyEnableRoute()
    {
        return in_array( RouteConfig::PRIVACY_POLICY, RouteConfig::getEnabledRoutes());
    }
    
    public function writePrivacyPolicyEnableRoute($enablePrivacyPolicyRoute)
    {
        return $this->setEnabledRoute(RouteConfig::PRIVACY_POLICY, $enablePrivacyPolicyRoute);
    }
    
    public function readGtcEnableRoute()
    {
        return in_array( RouteConfig::TERMS_CONDITIONS, RouteConfig::getEnabledRoutes());
    }
    
    public function writeGtcEnableRoute($enableGtcRoute)
    {
        return $this->setEnabledRoute(RouteConfig::TERMS_CONDITIONS, $enableGtcRoute);
    }

    private function setEnabledRoute($key, $value)
    {
        $enabledRoutes = RouteConfig::getEnabledRoutes();

        if( $value && !in_array($key, $enabledRoutes) )
        {
            $enabledRoutes[] = $key;
        }
        else if ( !$value && in_array($key, $enabledRoutes) )
        {
            $enabledRoutes = array_filter($enabledRoutes, function($route) use ($key)
            {
                return $route !== $key;
            });
        }

        return implode(", ", $enabledRoutes);
    }
}