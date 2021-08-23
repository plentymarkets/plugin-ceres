<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

/**
 * Class TextsDataFieldProvider
 *
 * This class is a data field provider centered on the topic of texts.
 * It is used to enable placeholders for dynamic data in the ShopBuilder's text widget.
 * Please refer to the parent class for more information about DataFieldProviders.
 * Please refer to https://developers.plentymarkets.com/dev-doc/result-fields-ceres for more information about
 * the data fields.
 * @package Ceres\ShopBuilder\DataFieldProvider\Item
 */
class TextsDataFieldProvider extends DataFieldProvider
{
    /**
     * Registers item data fields for use in the ShopBuilder.
     */
    function register()
    {
        $this->addField("name1", "Ceres::Widget.dataFieldTextsName1", "item_data_field('texts.name1')");
        $this->addField("name2", "Ceres::Widget.dataFieldTextsName2", "item_data_field('texts.name2')");
        $this->addField("name3", "Ceres::Widget.dataFieldTextsName3", "item_data_field('texts.name3')");
        $this->addField("shortDescription", "Ceres::Widget.dataFieldTextsShortDescription", "item_data_field('texts.shortDescription', null, null)");
        $this->addField("description", "Ceres::Widget.dataFieldTextsDescription", "item_data_field('texts.description', null, null)", true);
        $this->addField("technicalData", "Ceres::Widget.dataFieldTextsTechnicalData", "item_data_field('texts.technicalData', null, null)", true);
        $this->addField("urlPath", "Ceres::Widget.dataFieldTextsUrlPath", "item_data_field('texts.urlPath')");
        $this->addField("metaDescription", "Ceres::Widget.dataFieldTextsMetaDescription", "item_data_field('texts.metaDescription')");
        $this->addField("metaKeywords", "Ceres::Widget.dataFieldTextsMetaKeywords", "item_data_field('texts.keywords')");
    }
}
