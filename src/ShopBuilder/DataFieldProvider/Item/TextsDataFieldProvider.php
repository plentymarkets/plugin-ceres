<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class TextsDataFieldProvider extends DataFieldProvider
{
    function register()
    {
<<<<<<< HEAD
        $this->addField("Ceres::Widget.dataFieldTextsName1", "{{ item_data_field('texts.name1') }}");
        $this->addField("Ceres::Widget.dataFieldTextsName2", "{{ item_data_field('texts.name2') }}");
        $this->addField("Ceres::Widget.dataFieldTextsName3", "{{ item_data_field('texts.name3') }}");
        $this->addField("Ceres::Widget.dataFieldTextsShortDescription", "{{ item_data_field_html('texts.shortDescription') }}");
        $this->addField("Ceres::Widget.dataFieldTextsDescription", "{{ item_data_field_html('texts.description') }}");
        $this->addField("Ceres::Widget.dataFieldTextsTechnicalData", "{{ item_data_field_html('texts.technicalData') }}");
        $this->addField("Ceres::Widget.dataFieldTextsUrlPath", "{{ item_data_field('texts.urlPath') }}");
        $this->addField("Ceres::Widget.dataFieldTextsMetaDescription", "{{ item_data_field('texts.metaDescription') }}");
        $this->addField("Ceres::Widget.dataFieldTextsMetaKeywords", "{{ item_data_field('texts.keywords') }}");
=======
        $this->addField("name1", "Ceres::Widget.dataFieldTextsName1", "");
        $this->addField("name2", "Ceres::Widget.dataFieldTextsName2", "");
        $this->addField("name3", "Ceres::Widget.dataFieldTextsName3", "");
        $this->addField("shortDescription", "Ceres::Widget.dataFieldTextsShortDescription", "");
        $this->addField("description", "Ceres::Widget.dataFieldTextsDescription", "");
        $this->addField("technicalData", "Ceres::Widget.dataFieldTextsTechnicalData", "");
        $this->addField("urlPath", "Ceres::Widget.dataFieldTextsUrlPath", "");
        $this->addField("metaDescription", "Ceres::Widget.dataFieldTextsMetaDescription", "");
        $this->addField("metaKeywords", "Ceres::Widget.dataFieldTextsMetaKeywords", "");
>>>>>>> sb_single_item/data_field_identifier
    }
}