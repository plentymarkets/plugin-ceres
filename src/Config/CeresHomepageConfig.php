<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresHomepageConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getShowDefaultHomepage()
    {
        return $this->getBooleanValue( "default.homepage", true );
    }

    public function getSliderItemId1()
    {
        return $this->getIntegerValue( "homepage.sliderItemId1" );
    }

    public function getSliderImageUrl1()
    {
        return $this->getTextValue( "homepage.sliderImageUrl1" );
    }

    public function getSliderItemId2()
    {
        return $this->getIntegerValue( "homepage.sliderItemId2" );
    }

    public function getSliderImageUrl2()
    {
        return $this->getTextValue( "homepage.sliderImageUrl2" );
    }

    public function getSliderItemId3()
    {
        return $this->getIntegerValue( "homepage.sliderItemId3" );
    }

    public function getSliderImageUrl3()
    {
        return $this->getTextValue( "homepage.sliderImageUrl3" );
    }

    public function getHeroExtraItemId1()
    {
        return $this->getIntegerValue( "homepage.heroExtraItemId1" );
    }

    public function getHeroExtraImageUrl1()
    {
        return $this->getTextValue( "homepage.heroExtraImageUrl1" );
    }

    public function getHeroExtraItemId2()
    {
        return $this->getIntegerValue( "homepage.heroExtraItemId2" );
    }

    public function getHeroExtraImageUrl2()
    {
        return $this->getTextValue( "homepage.heroExtraImageUrl2" );
    }

    public function getHomepageCategory1()
    {
        return $this->getIntegerValue( "homepage.homepageCategory1" );
    }

    public function getHomepageCategory2()
    {
        return $this->getIntegerValue( "homepage.homepageCategory2" );
    }

    public function getHomepageCategory3()
    {
        return $this->getIntegerValue( "homepage.homepageCategory3" );
    }

    public function getHomepageCategory4()
    {
        return $this->getIntegerValue( "homepage.homepageCategory4" );
    }

    public function getHomepageCategory5()
    {
        return $this->getIntegerValue( "homepage.homepageCategory5" );
    }

    public function getHomepageCategory6()
    {
        return $this->getIntegerValue( "homepage.homepageCategory6" );
    }
}