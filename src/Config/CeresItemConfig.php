<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Contracts\WebstoreConfigurationRepositoryContract;
use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresItemConfig
 *
 * PluginConfig class, including all plugin settings for the single item view.
 *
 * @package Ceres\Config
 */
class CeresItemConfig extends PluginConfig
{
    /**
     * @var string $displayName Name of an item to display. Possible values are 'itemName', 'variationName' and 'itemNameVariationName'.
     */
    public $displayName;

    /**
     * @var int $itemName Item name.
     */
    public $itemName;

    /**
     * @var array $itemData Show item information.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $itemData;

    /**
     * @var int $storeSpecial Number of decimal places for discounts.
     */
    public $storeSpecial;

    /**
     * @var bool $showVariationOverDropdown Defines if the selection of variations without stock in the variation dropdown is enabled.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $showVariationOverDropdown;

    /**
     * @var string Show variations by type. Possible values are 'all', 'main', 'child' and 'combined'.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $variationShowType;

    /**
     * @var bool $showPleaseSelect Defines if the "Please select" option is displayed.
     */
    public $showPleaseSelect;

    /**
     * @var bool $enableGraduatedPrices Defines if the graduated prices for category item list is enabled.
     */
    public $enableGraduatedPrices;

    /**
     * @var bool $enableImageCarousel Defines if the image carousel for category item list is enabled.
     */
    public $enableImageCarousel;

    /**
     * @var bool $categoryShowDots Show image carousel dots in category item list and item lists.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $categoryShowDots;

    /**
     * @var bool $categoryShowNav Show image carousel navigation in category item list and item lists.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $categoryShowNav;

    /**
     * @var bool $showCategoryImage Show category image in category view.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $showCategoryImage;

    /**
     * @var bool $showCategoryDescription Show category description in category view.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $showCategoryDescription;

    /**
     * @var string $showCategoryDescriptionTop Show category description above item list. Possible values are 'none', 'description1', 'description2' and 'both'.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $showCategoryDescriptionTop;

    /**
     * @var string $showCategoryDescriptionBottom Show category description below item list. Possible values are 'none', 'description1', 'description2' and 'both'.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $showCategoryDescriptionBottom;

    /**
     * @var bool $requireOrderProperties Defines if all order properties are required before adding an item to shopping cart.
     */
    public $requireOrderProperties;

    /**
     * @var string $loadingAnimationType Loading animation. Possible values are 'bars' and 'spinner'.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $loadingAnimationType;

    /**
     * @var bool $showCategoryFilter Show categories as filter options for search results.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $showCategoryFilter;

    /**
     * @inheritDoc
     */
    protected function getPluginName(): string
    {
        return 'Ceres';
    }

    /**
     * @inheritDoc
     */
    protected function load()
    {
        $this->displayName = $this->getTextValue('item.displayName', 'itemName');
        $this->itemName = $this->getIntegerValue('item.name', 0);
        $this->itemData = $this->getMultiSelectValue(
            'item.data',
            [
                'item.condition',
                'item.manufacturer',
                'item.producerCountry',
                'item.age_rating',
                'item.id',
                'item.technical_data',
                'item.description',
                'item.shortDescription',
                'item.recommendedPrice',
                'item.variation_name',
                'item.external_id',
                'item.variation_model',
                'item.variation_dimensions',
                'item.customs_tariff_number',
                'item.weigthNetG',
                'item.weightG',
                'item.variationBase_content'
            ]
        );

        $this->storeSpecial = $this->getIntegerValue('item.storeSpecial', 0);
        $this->showVariationOverDropdown = $this->getBooleanValue('item.show_variation_over_dropdown', false);
        $this->variationShowType = $this->getTextValue('item.variation_show_type', 'all');
        $this->showPleaseSelect = $this->getBooleanValue('item.show_please_select', false);
        $this->enableGraduatedPrices = $this->getBooleanValue('item.enable_graduated_prices', false);
        $this->enableImageCarousel = $this->getBooleanValue('item.enable_image_carousel', true);
        $this->categoryShowDots = $this->getBooleanValue('item.category_show_dots', true);
        $this->categoryShowNav = $this->getBooleanValue('item.category_show_nav', true);
        $this->showCategoryImage = $this->getBooleanValue('item.show_category_image', true);
        $this->showCategoryDescription = $this->getBooleanValue('item.show_category_description', true);
        $this->showCategoryDescriptionTop = $this->getTextValue('item.show_category_description_top', 'description1');
        $this->showCategoryDescriptionBottom = $this->getTextValue('item.show_category_description_bottom', 'none');

        /** @var WebstoreConfigurationRepositoryContract $webstoreConfigurationRepository */
        $webstoreConfigurationRepository = pluginApp(WebstoreConfigurationRepositoryContract::class);
        $webstoreConfiguration = $webstoreConfigurationRepository->getWebstoreConfiguration();
        $this->requireOrderProperties = !$webstoreConfiguration->useVariationOrderProperties && $this->getBooleanValue(
                'item.require_all_properties',
                false
            );
        $this->showCategoryFilter = $this->getBooleanValue('item.show_category_filter', false);
    }
}
