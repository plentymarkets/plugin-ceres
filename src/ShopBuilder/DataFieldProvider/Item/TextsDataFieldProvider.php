<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class TextsDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("Ceres::Widget.dataFieldTextsName1", "");
        $this->addField("Ceres::Widget.dataFieldTextsName2", "");
        $this->addField("Ceres::Widget.dataFieldTextsName3", "");
        $this->addField("Ceres::Widget.dataFieldTextsShortDescription", "");
        $this->addField("Ceres::Widget.dataFieldTextsDescription", "");
        $this->addField("Ceres::Widget.dataFieldTextsTechnicalData", "");
        $this->addField("Ceres::Widget.dataFieldTextsUrlPath", "");
        $this->addField("Ceres::Widget.dataFieldTextsMetaDescription", "");
        $this->addField("Ceres::Widget.dataFieldTextsMetaKeywords", "");
    }
}