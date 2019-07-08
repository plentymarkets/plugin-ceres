<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 04/07/2019
 * Time: 08:34
 */

namespace Ceres\Wizard\ShopWizard\Mapping;


class DataMapping
{
    public $dataMapping = [
        "defSettings_defaultLanguage" => [
            "field" => "defaultLanguage",
            "type" => "string",
            "global" => true
        ],
        "defSettings_defaultShippingProfile" => [
            "field" => "defaultParcelServicePresetId",
            "type" => "float",
            "global" => true
        ],
        "defSettings_defaultShippingMethod" => [
            "field" => "defaultParcelServiceId",
            "type" => "float",
            "global" => true
        ],
        "defSettings_defaultPaymentMethod" => [
            "field" => "defaultMethodOfPaymentId",
            "type" => "float",
            "global" => true
        ],
        "defSettings_defaultLocation" => [
            "field" => "defaultAccountingLocation",
            "type" => "integer",
            "global" => true
        ],
        "onlineStore_itemBundles" => [
            "field" => "dontSplitItemBundle",
            "type" => "integer",
            "global" => true
        ],
        "defSettings_defaultB2B" => [
            "field" => "global.default_contact_class_b2b",
            "type" => "string",
            "global" => false
        ],
        "onlineStore_storeName" => [
            "field" => "header.company_name",
            "type" => "string",
            "global" => false
        ],
        "onlineStore_storeFavicon" => [
            "field" => "global.favicon",
            "type" => "string",
            "global" => false
        ],
        "onlineStore_categoryTypes" => [
            "field" => "header.show_category_types",
            "type" => "concatenated",
            "global" => false
        ],
        "onlineStore_toTopButton" => [
            "field" => "footer.to_top_button",
            "type" => "string",
            "global" => false
        ],
        "onlineStore_confirmationLinkLoginRedirect" => [
            "field" => "my_account.confirmation_link_login_redirect",
            "type" => "string",
            "global" => false
        ],
        "onlineStore_confirmationLinkExpiration" => [
            "field" => "my_account.confirmation_link_expiration",
            "type" => "string",
            "global" => false
        ],
        "onlineStore_globalUserDataHashMaxAge" => [
            "field" => "global.user_data_hash_max_age",
            "type" => "string",
            "global" => false
        ],
        "onlineStore_daysOfReturn" => [
            "field" => "my_account.order_return_days",
            "type" => "string",
            "global" => false
        ],
        "onlineStore_statusReturn" => [
            "field" => "my_account.order_return_initial_status",
            "type" => "string",
            "global" => false
        ],
        "onlineStore_enableCalisto" => [
            "field" => "global.enableOldUrlPattern",
            "type" => "string",
            "global" => false
        ],
    ];

    public $globalMapping = [];

    public $pluginMapping = [];

    /**
     * DataMapping constructor.
     */

    public function __construct()
    {
        $this->sortDataMapping();
    }

    private function sortDataMapping()
    {

        foreach ($this->dataMapping as $mappingKey => $mappingData) {
            if ($mappingData['global'] === true) {
                $this->globalMapping[$mappingKey] = $mappingData;
            } else {
                $this->pluginMapping[$mappingKey] = $mappingData;
            }
        }

    }

    public function getGlobalData()
    {
        return $this->globalMapping;
    }

    public function getPluginMapping()
    {
        return $this->pluginMapping;
    }
}