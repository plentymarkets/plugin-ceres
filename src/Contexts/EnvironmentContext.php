<?php

namespace Ceres\Contexts;

use Plenty\Modules\ShopBuilder\Helper\ShopBuilderRequest;

trait EnvironmentContext
{
    public $isShopBuilder;

    protected function initEnvironmentInformation()
    {
        /** @var ShopBuilderRequest $shopBuilderRequest */
        $shopBuilderRequest = pluginApp(ShopBuilderRequest::class);

        $this->isShopBuilder = $shopBuilderRequest->isShopBuilder();
    } 
}
