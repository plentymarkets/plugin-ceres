<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresHeaderConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getCompanyName()
    {
        return $this->getTextValue("header.company_name", "Ceres Webshop" );
    }

    public function getCompanyLogo()
    {
        return $this->getTextValue( "header.company_logo", "images/ceres-logo.svg" );
    }

    public function getShowNavbars()
    {
        return $this->getTextValue( "header.show_navbars", "top" );
    }

    public function getFixedNavbar()
    {
        return $this->getBooleanValue( "header.fixed_navbar", true );
    }

    public function getShowCategoryTypes()
    {
        return $this->getTextValue( "header.show_category_types", "all" );
    }

    public function getBasketValues()
    {
        return $this->getTextValue( "header.basket_values", "sum" );
    }

    public function getMegamenuLevels()
    {
        return $this->getIntegerValue( "header.megamenu_levels", 1 );
    }

    public function getMegamenuItemsStage1()
    {
        return $this->getIntegerValue( "header.megamenu_items_stage_1", 30 );
    }

    public function getMegamenuItemsStage2()
    {
        return $this->getIntegerValue( "header.megamenu_items_stage_2", 3 );
    }

    public function getMegamenuItemsStage3()
    {
        return $this->getIntegerValue( "header.megamenu_items_stage_3", 2 );
    }
}