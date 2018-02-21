<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresItemConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getDisplayName()
    {
        return $this->getTextValue( "item.displayName", "itemName" );
    }

    public function getItemName()
    {
        return $this->getIntegerValue( "item.item", 0 );
    }

    public function getItemData()
    {
        return $this->getMultiSelectValue(
            "item.data",
            [
                "item.condition",
                "item.manufacturer",
                "item.producerCountry",
                "item.age_rating",
                "item.id",
                "item.technical_data",
                "item.description",
                "item.shortDescription",
                "item.recommendedPrice",
                "item.variation_name",
                "item.external_id",
                "item.variation_model",
                "item.variation_dimensions",
                "item.customs_tariff_number",
                "item.weigthNetG",
                "item.weightG",
                "item.variationBase_content"
            ]
        );
    }

    public function getStoreSpecial()
    {
        return $this->getIntegerValue( "item.storeSpecial", 0 );
    }

    public function getShowVariationOverDropdown()
    {
        return $this->getBooleanValue( "item.show_variation_over_dropdown", false );
    }

    public function getVariationShowType()
    {
        return $this->getTextValue( "item.variation_show_type", "all" );
    }

    public function getEnableImageCarousel()
    {
        return $this->getBooleanValue( "item.enable_image_carousel", true );
    }

    public function getCategoryShowDots()
    {
        return $this->getBooleanValue( "item.category_show_dots", true );
    }

    public function getCategoryShowNav()
    {
        return $this->getBooleanValue( "item.category_show_nav", true );
    }

    public function getLoadingAnimationType()
    {
        return $this->getTextValue( "item.loading_animation_type", "blur" );
    }

    public function getShowCategoryImage()
    {
        return $this->getBooleanValue( "item.show_category_image", true );
    }

    public function getShowCategoryDescription()
    {
        return $this->getBooleanValue( "item.show_category_description", true );
    }
}