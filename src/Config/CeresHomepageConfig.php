<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresHomepageConfig extends PluginConfig
{
    public $showShopBuilderContent;
    public $showDefaultHomepage;

    public $sliderItemId1;
    public $sliderImageUrl1;
    public $sliderItemId2;
    public $sliderImageUrl2;
    public $sliderItemId3;
    public $sliderImageUrl3;

    public $heroExtraItemId1;
    public $heroExtraImageUrl1;
    public $heroExtraItemId2;
    public $heroExtraImageUrl2;

    public $homepageCategory1;
    public $homepageCategory2;
    public $homepageCategory3;
    public $homepageCategory4;
    public $homepageCategory5;
    public $homepageCategory6;

    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");

        $this->showShopBuilderContent = $this->getBooleanValue( "homepage.showShopBuilderContent", false );
        $this->showDefaultHomepage  = $this->getBooleanValue( "default.homepage", true );
        $this->sliderItemId1        = $this->getIntegerValue( "homepage.sliderItemId1" );
        $this->sliderImageUrl1      = $this->getTextValue( "homepage.sliderImageUrl1" );
        $this->sliderItemId2        = $this->getIntegerValue( "homepage.sliderItemId2" );
        $this->sliderImageUrl2      = $this->getTextValue( "homepage.sliderImageUrl2" );
        $this->sliderItemId3        = $this->getIntegerValue( "homepage.sliderItemId3" );
        $this->sliderImageUrl3      = $this->getTextValue( "homepage.sliderImageUrl3" );
        $this->heroExtraItemId1     = $this->getIntegerValue( "homepage.heroExtraItemId1" );
        $this->heroExtraImageUrl1   = $this->getTextValue( "homepage.heroExtraImageUrl1" );
        $this->heroExtraItemId2     = $this->getIntegerValue( "homepage.heroExtraItemId2" );
        $this->heroExtraImageUrl2   = $this->getTextValue( "homepage.heroExtraImageUrl2" );
        $this->homepageCategory1    = $this->getIntegerValue( "homepage.homepageCategory1" );
        $this->homepageCategory2    = $this->getIntegerValue( "homepage.homepageCategory2" );
        $this->homepageCategory3    = $this->getIntegerValue( "homepage.homepageCategory3" );
        $this->homepageCategory4    = $this->getIntegerValue( "homepage.homepageCategory4" );
        $this->homepageCategory5    = $this->getIntegerValue( "homepage.homepageCategory5" );
        $this->homepageCategory6    = $this->getIntegerValue( "homepage.homepageCategory6" );
    }
}