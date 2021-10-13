<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresHeaderConfig
 *
 * PluginConfig class, including all plugin settings for the header.
 *
 * @package Ceres\Config
 */
class CeresHeaderConfig extends PluginConfig
{
    /**
     * @var string $companyName Name of the store.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $companyName;

    /**
     * @var string $companyLogo Company logo.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $companyLogo;

    /**
     * @var string $showNavBars Position of the navigation bar. Possible values are 'top', 'side' and 'both'.
     */
    public $showNavBars;

    /**
     * @var bool $fixedNavBar Defines if the the navigation bar is fixed at the top of the page.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $fixedNavBar;

    /**
     * @var array $showCategoryTypes Type of categories rendered in the navigation.
     */
    public $showCategoryTypes;

    /**
     * @var string $basketValues Show shopping cart information.
     *
     * @deprecated will be removed in 6.0.0.s
     */
    public $basketValues;

    /**
     * @var int $menuLevels Category levels in the category tree.
     */
    public $menuLevels;

    /**
     * @var int $megamenuLevels Category levels in mega menu.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $megamenuLevels;

    /**
     * @var int $megamenuItemsStage1 Number of categories in level 2.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $megamenuItemsStage1;

    /**
     * @var int $megamenuItemsStage1 Number of categories in level 3.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $megamenuItemsStage2;

    /**
     * @var int $megamenuItemsStage3 Number of categories in level 4.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $megamenuItemsStage3;

    /**
     * @inheritDoc
     */
    protected function getPluginName() :string
    {
        return 'Ceres';
    }

    /**
     * @inheritDoc
     */
    protected function load()
    {
        $this->companyName          = $this->getTextValue('header.company_name', 'plentyShop LTS' );
        $this->companyLogo          = $this->getTextValue( 'header.company_logo', '' );
        $this->showNavBars          = $this->getTextValue( 'header.show_navbars', 'top' );
        $this->fixedNavBar          = $this->getBooleanValue( 'header.fixed_navbar', true );
        $this->showCategoryTypes    = $this->getMultiSelectValue( 'header.show_category_types', ['item', 'content', 'blog'], []);
        $this->basketValues         = $this->getTextValue( 'header.basket_values', 'sum' );
        $this->menuLevels           = $this->getIntegerValue( 'header.menu_levels', 4 );
        $this->megamenuLevels       = $this->getIntegerValue( 'header.megamenu_levels', 1 );
        $this->megamenuItemsStage1  = $this->getIntegerValue( 'header.megamenu_items_stage_1', 30 );
        $this->megamenuItemsStage2  = $this->getIntegerValue( 'header.megamenu_items_stage_2', 3 );
        $this->megamenuItemsStage3  = $this->getIntegerValue( 'header.megamenu_items_stage_3', 2 );
    }
}
