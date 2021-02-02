<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresItemListsConfig
 *
 * PluginConfig class, including all plugin settings for the item lists.
 *
 * @deprecated will be removed in 6.0.0.
 * @package Ceres\Config
 */
class CeresItemListsConfig extends PluginConfig
{
    /**
     * @var int $lastSeenNumber Number of last seen items.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $lastSeenNumber;

    /**
     * @var string $crossSellingType Cross-selling relation.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $crossSellingType;

    /**
     * @var string $crossSellingSorting Cross-Selling sorting.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $crossSellingSorting;

    /**
     * @var string $tagSorting Tags sorting.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $tagSorting;

    /**
     * @var string $list1Type Type of the first item list.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $list1Type;

    /**
     * @var string $list1TagIds List of IDs of tags to display in the first item list.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $list1TagIds;

    /**
     * @var string $list2Type Type of the second item list.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $list2Type;

    /**
     * @var string $list2TagIds List of IDs of tags to display in the second item list.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $list2TagIds;

    /**
     * @var string $list3Type Type of the third item list.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $list3Type;

    /**
     * @var string $list3TagIds List of IDs of tags to display in the third item list.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $list3TagIds;

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
        $this->lastSeenNumber       = $this->getIntegerValue( 'item.lists.last_seen_number', 4 );
        $this->crossSellingType     = $this->getTextValue( 'item.lists.cross_selling_type', 'Similar' );
        $this->crossSellingSorting  = $this->getTextValue('item.lists.cross_selling_sorting', 'texts.name_asc');
        $this->tagSorting           = $this->getTextValue('item.lists.tag_sorting', 'texts.name_asc');
        $this->list1Type            = $this->getTextValue( 'item.lists.1.list_type', 'last_seen' );
        $this->list1TagIds          = $this->getTextValue( 'item.lists.1.tag_ids' );
        $this->list2Type            = $this->getTextValue( 'item.lists.2.list_type', 'cross_selling' );
        $this->list2TagIds          = $this->getTextValue( 'item.lists.2.tag_ids' );
        $this->list3Type            = $this->getTextValue( 'item.lists.3.list_type', 'tag_list' );
        $this->list3TagIds          = $this->getTextValue( 'item.lists.3.tag_ids' );
    }
}
