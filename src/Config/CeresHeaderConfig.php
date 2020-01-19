<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresHeaderConfig extends PluginConfig
{
    public $companyName;
    public $companyLogo;
    public $showNavBars;
    public $fixedNavBar;
    public $showCategoryTypes;
    public $basketValues;
    public $menuLevels;
    public $megamenuLevels;
    public $megamenuItemsStage1;
    public $megamenuItemsStage2;
    public $megamenuItemsStage3;

    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
        $this->companyName          = $this->getTextValue("header.company_name", "Ceres Webshop" );
        $this->companyLogo          = $this->getTextValue( "header.company_logo", "images/ceres-logo.svg" );
        $this->showNavBars          = $this->getTextValue( "header.show_navbars", "top" );
        $this->fixedNavBar          = $this->getBooleanValue( "header.fixed_navbar", true );
        $this->showCategoryTypes    = $this->getMultiSelectValue( "header.show_category_types", ["item", "content", "blog"] );
        $this->basketValues         = $this->getTextValue( "header.basket_values", "sum" );
        $this->menuLevels           = $this->getIntegerValue( "header.menu_levels", 4 );
        $this->megamenuLevels       = $this->getIntegerValue( "header.megamenu_levels", 1 );
        $this->megamenuItemsStage1  = $this->getIntegerValue( "header.megamenu_items_stage_1", 30 );
        $this->megamenuItemsStage2  = $this->getIntegerValue( "header.megamenu_items_stage_2", 3 );
        $this->megamenuItemsStage3  = $this->getIntegerValue( "header.megamenu_items_stage_3", 2 );
    }
}