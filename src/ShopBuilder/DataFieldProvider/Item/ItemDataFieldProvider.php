<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

/**
 * Class ItemDataFieldProvider
 *
 * This class is the main data provider for plentyShop LTS. All other data providers are registered as child providers of this one.
 * To use a DataFieldProvider in the ShopBuilder, it is referenced in the shopBuilder.json
 * It is used to enable placeholders for dynamic data in the ShopBuilder's text widget.
 * Please refer to the parent class for more information about DataFieldProviders.
 * Please refer to https://developers.plentymarkets.com/dev-doc/result-fields-ceres for more information about
 * the data fields.
 * @package Ceres\ShopBuilder\DataFieldProvider\Item
 */
class ItemDataFieldProvider extends DataFieldProvider
{
    /**
     * Registers item data fields for use in the ShopBuilder.
     */
    function register()
    {
        $this->addChildProvider("Ceres::Widget.dataFieldItemGlobal", ItemGlobalDataFieldProvider::class);
        $this->addChildProvider("Ceres::Widget.dataFieldVariationGlobal", VariationGlobalDataFieldProvider::class);
        $this->addChildProvider("Ceres::Widget.dataFieldAvailability", AvailabilityDataFieldProvider::class);
        $this->addChildProvider("Ceres::Widget.dataFieldManufacturer", ManufacturerDataFieldProvider::class);
        $this->addChildProvider("Ceres::Widget.dataFieldBarcodes", BarcodeListDataFieldProvider::class);
        $this->addChildProvider("Ceres::Widget.dataFieldUnits", UnitDataFieldProvider::class);
        $this->addChildProvider("Ceres::Widget.dataFieldTexts", TextsDataFieldProvider::class);
        $this->addChildProvider("Ceres::Widget.dataFieldProperties", PropertyGroupDataFieldProvider::class);
    }
}
