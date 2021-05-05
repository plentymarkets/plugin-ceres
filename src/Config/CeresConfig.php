<?php //strict

namespace Ceres\Config;

/**
 * Class CeresConfig
 *
 * Config class, containing all PluginConfig classes of Ceres.
 *
 * @package Ceres\Config
 */
class CeresConfig
{
    /**
     * @var CeresAddressConfig $addresses Address configuration.
     */
    public $addresses;

    /**
     * @var CeresBasketConfig $basket Basket configuration.
     */
    public $basket;

    /**
     * @var CeresContactConfig $contact Contact configuration.
     *
     * @deprecated since 4.4.0. Will be removed in 6.0.0.
     */
    public $contact;

    /**
     * @var CeresCurrencyConfig $currency Currency configuration.
     */
    public $currency;

    /**
     * @var CeresFooterConfig $footer Footer configuration.
     */
    public $footer;

    /**
     * @var CeresGlobalConfig $global Global configuration.
     */
    public $global;

    /**
     * @var CeresHeaderConfig $header Header configuration.
     */
    public $header;

    /**
     * @var CeresHomepageConfig $homepage Homepage configuration.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $homepage;

    /**
     * @var CeresItemConfig $item Item view configuration.
     */
    public $item;

    /**
     * @var CeresItemListsConfig $itemLists Item lists configuration.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $itemLists;

    /**
     * @var CeresLanguageConfig $language Language configuration.
     */
    public $language;

    /**
     * @var CeresLogConfig $log Log configuration.
     */
    public $log;

    /**
     * @var CeresMetaConfig $meta Meta configuration.
     */
    public $meta;

    /**
     * @var CeresCheckoutConfig $checkout Checkout configuration.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $checkout;

    /**
     * @var CeresMyAccountConfig $myAccount My account configuration.
     */
    public $myAccount;

    /**
     * @var CeresPaginationConfig $pagination Pagination configuration.
     */
    public $pagination;

    /**
     * @var CeresSearchConfig $search Search configuration.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $search;

    /**
     * @var CeresSortingConfig $sorting Sorting configuration.
     */
    public $sorting;

    /**
     * @var CeresSeoConfig $seo Seo configuration.
     */
    public $seo;

    /**
     * CeresConfig constructor.
     */
    public function __construct()
    {
        $this->addresses    = pluginApp( CeresAddressConfig::class );
        $this->basket       = pluginApp( CeresBasketConfig::class );
        $this->contact      = pluginApp( CeresContactConfig::class );
        $this->currency     = pluginApp( CeresCurrencyConfig::class );
        $this->footer       = pluginApp( CeresFooterConfig::class );
        $this->global       = pluginApp( CeresGlobalConfig::class );
        $this->header       = pluginApp( CeresHeaderConfig::class );
        $this->homepage     = pluginApp( CeresHomepageConfig::class );
        $this->item         = pluginApp( CeresItemConfig::class );
        $this->itemLists    = pluginApp( CeresItemListsConfig::class );
        $this->language     = pluginApp( CeresLanguageConfig::class );
        $this->log          = pluginApp( CeresLogConfig::class );
        $this->meta         = pluginApp( CeresMetaConfig::class );
        $this->checkout     = pluginApp( CeresCheckoutConfig::class );
        $this->myAccount    = pluginApp( CeresMyAccountConfig::class );
        $this->pagination   = pluginApp( CeresPaginationConfig::class );
        $this->search       = pluginApp( CeresSearchConfig::class );
        $this->sorting      = pluginApp( CeresSortingConfig::class );
        $this->seo          = pluginApp( CeresSeoConfig::class);
    }
}
