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
        $this->addField("name", "Ceres::Widget.dataFieldBarcodeName", "");
        $this->addField("type", "Ceres::Widget.dataFieldBarcodeType", "");
        $this->addField("code", "Ceres::Widget.dataFieldBarcodeCode", "");
    }
}