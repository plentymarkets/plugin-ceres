<?php

namespace Ceres\Builders\EuManufacturer\Abstracts;

use Ceres\Helper\ShopBuilderHelper;

abstract class AbstractEuManufacturerBuilder
{
    /** @var ShopBuilderHelper */
    private ShopBuilderHelper $shopBuilderHelper;

    protected function __construct()
    {
        $this->shopBuilderHelper = app(ShopBuilderHelper::class);
    }

    /**
     * Constructs the actual field provider structure that's used to generate shop builder data fields.
     *
     * @param string $provider
     *
     * @return string
     */
    protected function getShopBuilderDataFieldProvider(string $provider): string
    {
        return $this->shopBuilderHelper->getShopBuilderDataFieldProvider(
            'ManufacturerDataFieldProvider::' . $provider,
            ['item.manufacturer.' . $provider, null, null]
        );
    }
}
