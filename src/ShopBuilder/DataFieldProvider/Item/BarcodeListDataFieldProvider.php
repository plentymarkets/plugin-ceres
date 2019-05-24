<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\Item\Barcode\Contracts\BarcodeRepositoryContract;
use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class BarcodeListDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        /** @var BarcodeRepositoryContract $barcodeRepository */
        $barcodeRepository = pluginApp(BarcodeRepositoryContract::class);
        $barcodes = $barcodeRepository->findBarcodesByReferrerRelation(1, 200);
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