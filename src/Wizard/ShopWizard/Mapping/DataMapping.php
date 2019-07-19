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
        "defSettings_defaultB2C" => [
            "field" => "defaultCustomerClassId",
            "type" => "string",
            "global" => true
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
        "currencies_currencyFormat" => [
            "field" => "currency.format",
            "type" => "string",
            "global" => false
        ],
        "currencies_currencyFormatSelection" => [
            "field" => "currency.format_selection",
            "type" => "string",
            "global" => false
        ],
        "currencies_allowCurrencyChange" => [
            "field" => "currency.enable_selection",
            "type" => "string",
            "global" => false
        ],
        "currencies_availableCurrencies" => [
            "field" => "currency.available_currencies",
            "type" => "concatenated",
            "global" => false
        ],
        "displayInfo_itemDisplayName" => [
            "field" => "item.displayName",
            "type" => "string",
            "global" => false
        ],
        "displayInfo_itemName" => [
            "field" => "item.name",
            "type" => "string",
            "global" => false
        ],
        "displayInfo_numberOfDecimals" => [
            "field" => "item.storeSpecial",
            "type" => "string",
            "global" => false
        ],
        "displayInfo_loadingAnimation" => [
            "field" => "item.loading_animation_type",
            "type" => "string",
            "global" => false
        ],
        "displayInfo_variationType" => [
            "field" => "item.variation_show_type",
            "type" => "string",
            "global" => false
        ],
        "displayInfo_showDescriptionTop" => [
            "field" => "item.show_category_description_top",
            "type" => "string",
            "global" => false
        ],
        "displayInfo_showDescriptionBottom" => [
            "field" => "item.show_category_description_bottom",
            "type" => "string",
            "global" => false
        ],
        "displayInfo_enableImageCarousel" => [
            "field" => "item.enable_image_carousel",
            "type" => "string",
            "global" => false
        ],
        "displayInfo_showCarouselDots" => [
            "field" => "item.category_show_dots",
            "type" => "string",
            "global" => false
        ],
        "displayInfo_showCarouselNav" => [
            "field" => "item.category_show_nav",
            "type" => "string",
            "global" => false
        ],
        "displayInfo_requireOrderProperties" => [
            "field" => "item.require_all_properties",
            "type" => "string",
            "global" => false
        ],
        "displayInfo_cartItemData" => [
            "field" => "basket.item_data",
            "type" => "concatenated",
            "global" => false
        ],
        "displayInfo_itemAdditionalInfo" => [
            "field" => "basket.add_item_to_basket_confirm",
            "type" => "string",
            "global" => false
        ],
        "displayInfo_cartPreviewPosition" => [
            "field" => "basket.preview_type",
            "type" => "string",
            "global" => false
        ],
        "displayInfo_showShippingCountry" => [
            "field" => "basket.show_shipping_country_select",
            "type" => "string",
            "global" => false
        ],
        "paginationStep_displayPagination" => [
            "field" => "pagination.position",
            "type" => "string",
            "global" => false
        ],
        "paginationStep_showFirstPage" => [
            "field" => "pagination.showFirstPage",
            "type" => "string",
            "global" => false
        ],
        "paginationStep_showLastPage" => [
            "field" => "pagination.showLastPage",
            "type" => "string",
            "global" => false
        ],
        "paginationStep_columnsPerPage" => [
            "field" => "pagination.columnsPerPage",
            "type" => "string",
            "global" => false
        ],
        "paginationStep_rowsPerPage" => [
            "field" => "pagination.rowsPerPage",
            "type" => "concatenated",
            "global" => false
        ],
        "pagination_itemSortBy" => [
            "field" => "sort.data",
            "type" => "concatenated",
            "global" => false
        ],
        "pagination_defaultSorting" => [
            "field" => "sort.defaultSorting",
            "type" => "string",
            "global" => false
        ],
        "pagination_sortingCat1" => [
            "field" => "sorting.priorityCategory1",
            "type" => "string",
            "global" => false
        ],
        "pagination_sortingCat2" => [
            "field" => "sorting.priorityCategory2",
            "type" => "string",
            "global" => false
        ],
        "pagination_sortingCat3" => [
            "field" => "sorting.priorityCategory3",
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