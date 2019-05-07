<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use IO\Services\ItemSearch\Helper\SortingHelper;
use Plenty\Plugin\ConfigRepository;

class CeresItemListsConfig extends PluginConfig
{
    public $lastSeenNumber;
    public $crossSellingType;
    public $crossSellingSorting;
    public $tagSorting;
    public $list1Type;
    public $list1TagIds;
    public $list2Type;
    public $list2TagIds;
    public $list3Type;
    public $list3TagIds;


    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
        $this->lastSeenNumber       = $this->getIntegerValue( "item.lists.last_seen_number", 4 );
        $this->crossSellingType     = $this->getTextValue( "item.lists.cross_selling_type", "Similar" );
        $this->crossSellingSorting  = $this->getTextValue("item.lists.cross_selling_sorting", "texts.name_asc");
        $this->tagSorting           = $this->getTextValue("item.lists.tag_sorting", "texts.name_asc");
        $this->list1Type            = $this->getTextValue( "item.lists.1.list_type", "last_seen" );
        $this->list1TagIds          = $this->getTextValue( "item.lists.1.tag_ids" );
        $this->list2Type            = $this->getTextValue( "item.lists.2.list_type", "cross_selling" );
        $this->list2TagIds          = $this->getTextValue( "item.lists.2.tag_ids" );
        $this->list3Type            = $this->getTextValue( "item.lists.3.list_type", "tag_list" );
        $this->list3TagIds          = $this->getTextValue( "item.lists.3.tag_ids" );
    }
}
