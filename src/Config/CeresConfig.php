<?php //strict

namespace Ceres\Config;


class CeresConfig
{
    public $addresses;

    public $basket;

    /** @var CeresContactConfig */
    public $contact;

    public $currency;

    public $footer;

    /** @var CeresGlobalConfig */
    public $global;

    /** @var CeresHeaderConfig */
    public $header;

    public $homepage;

    public $item;

    public $itemLists;

    public $language;

    public $log;

    public $meta;

    public $myAccount;

    public $pagination;

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
        $this->sorting      = pluginApp( CeresSortingConfig::class );
    }



}