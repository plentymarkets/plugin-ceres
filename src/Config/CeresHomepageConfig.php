<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresHomepageConfig
 *
 * PluginConfig class, including all plugin settings for the homepage.
 *
 * @deprecated since 5.0.0. This class will be removed in 6.0.0
 * @package Ceres\Config
 */
class CeresHomepageConfig extends PluginConfig
{
    /**
     * @var bool $showShopBuilderContent Show ShopBuilder homepage.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $showShopBuilderContent;

    /**
     * @var bool $showDefaultHomepage Show default homepage.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $showDefaultHomepage;

    /**
     * @var int $sliderItemId1 ID of the item variation to display in the first slide of the image slider.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $sliderItemId1;

    /**
     * @var string $sliderImageUrl1 URL to the image of the first slide.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $sliderImageUrl1;

    /**
     * @var int $sliderItemId2 ID of the item variation to display in the second slide of the image slider.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $sliderItemId2;

    /**
     * @var string $sliderImageUrl2 URL to the image of the second slide.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $sliderImageUrl2;

    /**
     * @var int $sliderItemId3 ID of the item variation to display in the third slide of the image slider.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $sliderItemId3;

    /**
     * @var string $sliderImageUrl3 URL to the image of the third slide.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $sliderImageUrl3;

    /**
     * @var int $heroExtraItemId1 ID of the item variation to display in the upper item preview.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $heroExtraItemId1;

    /**
     * @var string $heroExtraImageUrl1 URL to the image of the upper item preview.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $heroExtraImageUrl1;

    /**
     * @var int $heroExtraItemId2 ID of the item variation to display in the lower item preview.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $heroExtraItemId2;

    /**
     * @var string $heroExtraImageUrl2 URL to the image of the lower item preview.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $heroExtraImageUrl2;

    /**
     * @var int $homepageCategory1 Category to display in the first category preview.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $homepageCategory1;

    /**
     * @var int $homepageCategory2 Category to display in the second category preview.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $homepageCategory2;

    /**
     * @var int $homepageCategory3 Category to display in the first list of items.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $homepageCategory3;

    /**
     * @var int $homepageCategory4 Category to display in the third category preview.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $homepageCategory4;

    /**
     * @var int $homepageCategory5 Category to display in the fourth category preview.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $homepageCategory5;

    /**
     * @var int $homepageCategory6 Category to display in the second list of items.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $homepageCategory6;

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
        $this->showShopBuilderContent = $this->getBooleanValue( 'homepage.showShopBuilderContent', false );
        $this->showDefaultHomepage  = $this->getBooleanValue( 'default.homepage', true );
        $this->sliderItemId1        = $this->getIntegerValue( 'homepage.sliderItemId1' );
        $this->sliderImageUrl1      = $this->getTextValue( 'homepage.sliderImageUrl1' );
        $this->sliderItemId2        = $this->getIntegerValue( 'homepage.sliderItemId2' );
        $this->sliderImageUrl2      = $this->getTextValue( 'homepage.sliderImageUrl2' );
        $this->sliderItemId3        = $this->getIntegerValue( 'homepage.sliderItemId3' );
        $this->sliderImageUrl3      = $this->getTextValue( 'homepage.sliderImageUrl3' );
        $this->heroExtraItemId1     = $this->getIntegerValue( 'homepage.heroExtraItemId1' );
        $this->heroExtraImageUrl1   = $this->getTextValue( 'homepage.heroExtraImageUrl1' );
        $this->heroExtraItemId2     = $this->getIntegerValue( 'homepage.heroExtraItemId2' );
        $this->heroExtraImageUrl2   = $this->getTextValue( 'homepage.heroExtraImageUrl2' );
        $this->homepageCategory1    = $this->getIntegerValue( 'homepage.homepageCategory1' );
        $this->homepageCategory2    = $this->getIntegerValue( 'homepage.homepageCategory2' );
        $this->homepageCategory3    = $this->getIntegerValue( 'homepage.homepageCategory3' );
        $this->homepageCategory4    = $this->getIntegerValue( 'homepage.homepageCategory4' );
        $this->homepageCategory5    = $this->getIntegerValue( 'homepage.homepageCategory5' );
        $this->homepageCategory6    = $this->getIntegerValue( 'homepage.homepageCategory6' );
    }
}
