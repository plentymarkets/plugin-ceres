<?php

namespace Ceres\Providers;

use Plenty\Plugin\RouteServiceProvider;
use Plenty\Plugin\Routing\Router;
use Plenty\Plugin\Routing\ApiRouter;

/**
 * Class CeresRouteServiceProvider
 * @package Ceres\Providers
 */
class CeresRouteServiceProvider extends RouteServiceProvider
{
    public function register()
    {
    }

    /**
     * Define the map routes to templates or REST resources
     * @param Router $router
     * @param ApiRouter $api
     * @throws \Plenty\Plugin\Routing\Exceptions\RouteReservedException
     */
    public function map(Router $router, ApiRouter $api)
    {
        $router->post('test', function() {
            return [
                'response' => 'It works!'
            ];
        });
    }

}
