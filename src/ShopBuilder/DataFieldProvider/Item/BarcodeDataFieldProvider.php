<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\Item\Barcode\Models\Barcode;
use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class BarcodeDataFieldProvider extends DataFieldProvider
{
    /** @var Barcode */
    private $barcode;
    public function __construct(Barcode $barcode)
    {
        $this->barcode = $barcode;
    }

    function register()
    {
        $this->addField("Ceres::Widget.dataFieldBarcodeName", "");
        $this->addField("Ceres::Widget.dataFieldBarcodeType", "");
        $this->addField("Ceres::Widget.dataFieldBarcodeCode", "");
    }
}