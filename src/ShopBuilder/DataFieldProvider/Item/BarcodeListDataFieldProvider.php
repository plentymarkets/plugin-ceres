<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\Authorization\Services\AuthHelper;
use Plenty\Modules\Item\Barcode\Contracts\BarcodeRepositoryContract;
use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

/**
 * Class BarcodeListDataFieldProvider
 *
 * This class is a data field provider centered about the topic of bar codes.
 * It is used to enable placeholders for dynamic data in the shop builders text widget.
 * Please refer to the parent class for more information about DataFieldProviders.
 * Please refer to https://developers.plentymarkets.com/dev-doc/result-fields-ceres for more information about
 * the data fields.
 * @package Ceres\ShopBuilder\DataFieldProvider\Item
 */
class BarcodeListDataFieldProvider extends DataFieldProvider
{
    /**
     * Registers item data fields for use in the shop builder.
     */
    function register()
    {
        /** @var AuthHelper $authHelper */
        $authHelper = pluginApp(AuthHelper::class);
        $barcodes = $authHelper->processUnguarded(function()
        {
            /** @var BarcodeRepositoryContract $barcodeRepository */
            $barcodeRepository = pluginApp(BarcodeRepositoryContract::class);
            return $barcodeRepository->findBarcodesByReferrerRelation(1, 200);
        });

        foreach ($barcodes as $barcode)
        {
            $this->addChildProvider(
                $barcode->name,
                BarcodeDataFieldProvider::class,
                ['barcode' => $barcode]
            );
        }
    }
}
