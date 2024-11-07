<?php

namespace Ceres\Helper;

class ShopBuilderHelper
{
    /**
     * Constructs the actual field provider structure that's used to generate shop builder data fields.
     *
     * @param string $provider
     * @param array $itemDataFields
     * @return string
     */
    public function getShopBuilderDataFieldProvider(string $provider, array $itemDataFields)
    {
        $query = "{# SHOPBUILDER:DATA_FIELD Ceres\\ShopBuilder\\DataFieldProvider\\Item\\$provider #}";
        $dataFields = implode(",", $itemDataFields);
        $query .= "{{ item_data_field($dataFields)}}";
        return $query;
    }
}
