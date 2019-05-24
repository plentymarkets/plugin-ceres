<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class ItemDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addChildProvider("Ceres::Widget.dataFieldItemGlobal", ItemGlobalDataFieldProvider::class);
        $this->addChildProvider("Ceres::Widget.dataFieldVariationGlobal", VariationGlobalDataFieldProvider::class);
        $this->addChildProvider("Ceres::Widget.dataFieldAvailability", AvailabilityDataFieldProvider::class);
        $this->addChildProvider("Ceres::Widget.dataFieldManufacturer", ManufacturerDataFieldProvider::class);
        $this->addChildProvider("Ceres::Widget.dataFieldBarcodes", BarcodeListDataFieldProvider::class);
        $this->addChildProvider("Ceres::Widget.dataFieldUnits", UnitDataFieldProvider::class);
        $this->addChildProvider("Ceres::Widget.dataFieldTexts", TextsDataFieldProvider::class);
    }
}