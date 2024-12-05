<?php

namespace Ceres\Builders\Abstracts;

use Ceres\Helper\ShopBuilderHelper;

class AbstractBuilderFieldGenerator
{
    /**
     * Constructs the actual field provider structure that's used to generate shop builder data fields.
     *
     * @param string $provider
     *
     * @return string
     */
    protected function getShopBuilderDataFieldProvider(string $provider): string
    {
        /** @var ShopBuilderHelper $shopBuilderHelper */
        $shopBuilderHelper = pluginApp(ShopBuilderHelper::class);

        return $shopBuilderHelper->getShopBuilderDataFieldProvider(
            'ManufacturerDataFieldProvider::' . $provider,
            ['item.manufacturer.' . $provider, null, null]
        );
    }
}