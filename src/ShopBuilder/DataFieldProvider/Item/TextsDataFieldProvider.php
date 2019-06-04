<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class TextsDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("name1", "Ceres::Widget.dataFieldTextsName1", "");
        $this->addField("name2", "Ceres::Widget.dataFieldTextsName2", "");
        $this->addField("name3", "Ceres::Widget.dataFieldTextsName3", "");
        $this->addField("shortDescription", "Ceres::Widget.dataFieldTextsShortDescription", "");
        $this->addField("description", "Ceres::Widget.dataFieldTextsDescription", "");
        $this->addField("technicalData", "Ceres::Widget.dataFieldTextsTechnicalData", "");
        $this->addField("urlPath", "Ceres::Widget.dataFieldTextsUrlPath", "");
        $this->addField("metaDescription", "Ceres::Widget.dataFieldTextsMetaDescription", "");
        $this->addField("metaKeywords", "Ceres::Widget.dataFieldTextsMetaKeywords", "");
    }
}