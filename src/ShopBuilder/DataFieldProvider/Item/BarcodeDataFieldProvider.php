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
        $barcodeId = $this->barcode->id;
        $this->addField("name_$barcodeId", "Ceres::Widget.dataFieldBarcodeName", "");
        $this->addField("type_$barcodeId", "Ceres::Widget.dataFieldBarcodeType", "");
        $this->addField("code_$barcodeId", "Ceres::Widget.dataFieldBarcodeCode", "");
    }
}