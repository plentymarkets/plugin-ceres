<?php

namespace Ceres;

use IO\Helper\RouteConfig;
use Plenty\Modules\ShopBuilder\Helper\MappableSettingsHandler;

class ShopBuilderSettingsHandler extends MappableSettingsHandler
{
    protected $mappings = [
        'checkoutCategory'      => 'IO.routing.category_checkout',
        'checkoutEnableRoute'   => 'IO.routing.enabled_routes'
    ];

    protected $casts = [
        'checkoutCategory'      => 'int'
    ];

    public function readCheckoutEnableRoute()
    {
        return in_array( RouteConfig::CHECKOUT, RouteConfig::getEnabledRoutes());
    }

    public function writeCheckoutEnableRoute($enableCheckoutRoute)
    {
        return $this->setEnabledRoute(RouteConfig::CHECKOUT, $enableCheckoutRoute);
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