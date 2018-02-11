<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresItemListsConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getLastSeenNumber()
    {
        return $this->getIntegerValue( "item.lists.last_seen_number", 4 );
    }

    public function getCrossSellingType()
    {
        return $this->getTextValue( "item.lists.cross_selling_type", "Similar" );
    }

    public function getList1Type()
    {
        return $this->getTextValue( "item.lists.1.list_type", "last_seen" );
    }

    public function getList1Name_de()
    {
        return $this->getTextValue( "item.lists.1.de.list_name" );
    }

    public function getList1Name_en()
    {
        return $this->getTextValue( "item.lists.1.en.list_name" );
    }

    public function getList1TagIds()
    {
        return $this->getTextValue( "item.lists.1.tag_ids" );
    }

    public function getList2Type()
    {
        return $this->getTextValue( "item.lists.2.list_type", "cross_selling" );
    }

    public function getList2Name_de()
    {
        return $this->getTextValue( "item.lists.2.de.list_name" );
    }

    public function getList2Name_en()
    {
        return $this->getTextValue( "item.lists.2.en.list_name" );
    }

    public function getList2TagIds()
    {
        return $this->getTextValue( "item.lists.2.tag_ids" );
    }

    public function getList3Type()
    {
        return $this->getTextValue( "item.lists.3.list_type", "tag_list" );
    }

    public function getList3Name_de()
    {
        return $this->getTextValue( "item.lists.3.de.list_name" );
    }

    public function getList3Name_en()
    {
        return $this->getTextValue( "item.lists.3.en.list_name" );
    }

    public function getList3TagIds()
    {
        return $this->getTextValue( "item.lists.3.tag_ids" );
    }
}