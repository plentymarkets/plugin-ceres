<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\Item\Barcode\Models\Barcode;
use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

/**
 * Class BarcodeDataFieldProvider
 *
 * This class is a data field provider centered about the topic of bar codes.
 * It is used to enable placeholders for dynamic data in the shop builders text widget.
 * Please refer to the parent class for more information about DataFieldProviders.
 * Please refer to https://developers.plentymarkets.com/dev-doc/result-fields-ceres for more information about
 * the data fields.
 *
 * @package Ceres\ShopBuilder\DataFieldProvider\Item
 */
class BarcodeDataFieldProvider extends DataFieldProvider
{
    /** @var Barcode */
    private $barcode;
    public function __construct(Barcode $barcode)
    {
        $this->barcode = $barcode;
    }

    /**
     * Registers item data fields for use in the shop builder.
     */
    function register()
    {
        $barcodeId = $this->barcode->id;
        $this->addField("name_$barcodeId", "Ceres::Widget.dataFieldBarcodeName", "item_data_field('barcodes.{id, $barcodeId}.name')");
        $this->addField("type_$barcodeId", "Ceres::Widget.dataFieldBarcodeType", "item_data_field('barcodes.{id, $barcodeId}.type')");
        $this->addField("code_$barcodeId", "Ceres::Widget.dataFieldBarcodeCode", "item_data_field('barcodes.{id, $barcodeId}.code')");
    }
}
