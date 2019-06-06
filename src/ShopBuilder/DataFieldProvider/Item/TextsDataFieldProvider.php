<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class TextsDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("name1", "Ceres::Widget.dataFieldTextsName1", "item_data_field('texts.name1')");
        $this->addField("name2", "Ceres::Widget.dataFieldTextsName2", "item_data_field('texts.name2')");
        $this->addField("name3", "Ceres::Widget.dataFieldTextsName3", "item_data_field('texts.name3')");
        $this->addField("shortDescription", "Ceres::Widget.dataFieldTextsShortDescription", "item_data_field('texts.shortDescription', null, null)");
        $this->addField("description", "Ceres::Widget.dataFieldTextsDescription", "item_data_field('texts.description', null, null)");
        $this->addField("technicalData", "Ceres::Widget.dataFieldTextsTechnicalData", "item_data_field('texts.technicalData', null, null)");
        $this->addField("urlPath", "Ceres::Widget.dataFieldTextsUrlPath", "item_data_field('texts.urlPath')");
        $this->addField("metaDescription", "Ceres::Widget.dataFieldTextsMetaDescription", "item_data_field('texts.metaDescription')");
        $this->addField("metaKeywords", "Ceres::Widget.dataFieldTextsMetaKeywords", "item_data_field('texts.keywords')");
    }
}