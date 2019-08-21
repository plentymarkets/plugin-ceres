<?php

namespace Ceres\Wizard\ShopWizard\Mapping;

/**
 * Class DisplayInfoMapping
 * @package Ceres\Wizard\ShopWizard\Mapping
 */
class DisplayInfoMapping
{
    private static $fieldsMapped = [
        "displayInfo_itemName" => [
            "field"    => "item.name",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "displayInfo_numberOfDecimals" => [
            "field"    => "item.storeSpecial",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "displayInfo_loadingAnimation" => [
            "field"    => "item.loading_animation_type",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "displayInfo_variationType" => [
            "field"    => "item.variation_show_type",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "displayInfo_showCategoryImage" => [
            "field"    => "item.show_category_image",
            "type"     => "boolean",
            "global"   => false,
            "optional" => true,
        ],
        "displayInfo_showDescriptionTop" => [
            "field"    => "item.show_category_description_top",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "displayInfo_showDescriptionBottom" => [
            "field"    => "item.show_category_description_bottom",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "displayInfo_enableImageCarousel" => [
            "field"    => "item.enable_image_carousel",
            "type"     => "boolean",
            "global"   => false,
            "optional" => true,
        ],
        "displayInfo_showCarouselDots" => [
            "field"    => "item.category_show_dots",
            "type"     => "boolean",
            "global"   => false,
            "optional" => true,
        ],
        "displayInfo_showCarouselNav" => [
            "field"    => "item.category_show_nav",
            "type"     => "boolean",
            "global"   => false,
            "optional" => true,
        ],
        "displayInfo_requireOrderProperties" => [
            "field"    => "item.require_all_properties",
            "type"     => "boolean",
            "global"   => false,
            "optional" => true,
        ],
        "displayInfo_cartItemData" => [
            "field"    => "basket.item_data",
            "type"     => "concatenated",
            "global"   => false,
            "optional" => true,
        ],
        "displayInfo_itemAdditionalInfo" => [
            "field"    => "basket.add_item_to_basket_confirm",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "displayInfo_cartPreviewPosition" => [
            "field"    => "basket.preview_type",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "displayInfo_showShippingCountry" => [
            "field"    => "basket.show_shipping_country_select",
            "type"     => "boolean",
            "global"   => false,
            "optional" => true,
        ],
    ];
    
    /**
     * @return array
     */
    public static function getFieldsMapped()
    {
        return self::$fieldsMapped;
    }
}
