<?php //strict

namespace Ceres\Config;


class CeresConfig
{
    /** @var CeresAddressConfig  */
    public $addresses;

    /** @var CeresBasketConfig */
    public $basket;

    /** @var CeresContactConfig */
    public $contact;

    /** @var CeresCurrencyConfig  */
    public $currency;

    /** @var CeresFooterConfig  */
    public $footer;

    /** @var CeresGlobalConfig */
    public $global;

    /** @var CeresHeaderConfig */
    public $header;

    /** @var CeresHomepageConfig  */
    public $homepage;

    /** @var CeresItemConfig  */
    public $item;

    /** @var CeresItemListsConfig  */
    public $itemLists;

    /** @var CeresLanguageConfig  */
    public $language;

    /** @var CeresLogConfig  */
    public $log;

    /** @var CeresMetaConfig  */
    public $meta;

    /** @var CeresMyAccountConfig  */
    public $myAccount;

    /** @var CeresPaginationConfig  */
    public $pagination;

    /** @var CeresSearchConfig */
    public $search;

    /** @var CeresSortingConfig  */
    public $sorting;

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
        $this->myAccount    = pluginApp( CeresMyAccountConfig::class );
        $this->pagination   = pluginApp( CeresPaginationConfig::class );
        $this->search       = pluginApp( CeresSearchConfig::class );
        $this->sorting      = pluginApp( CeresSortingConfig::class );
    }



}