<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class TextsDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addField("Ceres::Widget.dataFieldTextsName1", "{{ item_data_field('texts.name1') }}");
        $this->addField("Ceres::Widget.dataFieldTextsName2", "{{ item_data_field('texts.name2') }}");
        $this->addField("Ceres::Widget.dataFieldTextsName3", "{{ item_data_field('texts.name3') }}");
        $this->addField("Ceres::Widget.dataFieldTextsShortDescription", "{{ item_data_field('texts.shortDescription'') }}"); // TODO needs v-html
        $this->addField("Ceres::Widget.dataFieldTextsDescription", "{{ item_data_field('texts.description') }}"); // TODO needs v-html
        $this->addField("Ceres::Widget.dataFieldTextsTechnicalData", "{{ item_data_field('texts.technicalData') }}"); // TODO needs v-html
        $this->addField("Ceres::Widget.dataFieldTextsUrlPath", "{{ item_data_field('texts.urlPath') }}");
        $this->addField("Ceres::Widget.dataFieldTextsMetaDescription", "{{ item_data_field('texts.metaDescription') }}");
        $this->addField("Ceres::Widget.dataFieldTextsMetaKeywords", "{{ item_data_field('texts.keywords') }}");
    }
}