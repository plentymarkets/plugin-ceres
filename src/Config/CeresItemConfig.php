<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresItemConfig extends PluginConfig
{
    public $displayName;
    public $itemName;
    public $itemData;
    public $storeSpecial;
    public $showVariationOverDropdown;
    public $variationShowType;
    public $enableImageCarousel;
    public $categoryShowDots;
    public $categoryShowNav;
    public $showCategoryImage;
    public $showCategoryDescription;
    public $requireOrderProperties;
    public $loadingAnimationType;

    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");

        $this->displayName      = $this->getTextValue( "item.displayName", "itemName" );
        $this->itemName         = $this->getIntegerValue( "item.item", 0 );
        $this->itemData         = $this->getMultiSelectValue(
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
        $this->storeSpecial                 = $this->getIntegerValue( "item.storeSpecial", 0 );
        $this->showVariationOverDropdown    = $this->getBooleanValue( "item.show_variation_over_dropdown", false );
        $this->variationShowType            = $this->getTextValue( "item.variation_show_type", "all" );
        $this->enableImageCarousel          = $this->getBooleanValue( "item.enable_image_carousel", true );
        $this->categoryShowDots             = $this->getBooleanValue( "item.category_show_dots", true );
        $this->categoryShowNav              = $this->getBooleanValue( "item.category_show_nav", true );
        $this->showCategoryImage            = $this->getBooleanValue( "item.show_category_image", true );
        $this->showCategoryDescription      = $this->getBooleanValue( "item.show_category_description", true );
        $this->requireOrderProperties       = $this->getBooleanValue( "item.require_all_properties", false );
        $this->loadingAnimationType         = $this->getTextValue( "item.loading_animation_type", "blur" );
    }
}