<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresSortingConfig
 *
 * PluginConfig class, including all plugin settings for the item sorting.
 *
 * @package Ceres\Config
 */
class CeresSortingConfig extends PluginConfig
{
    /**
     * @var array $data Enable item sorting by.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $data;

    /**
     * @var string $defaultSorting Default sorting value for category view.
     */
    public $defaultSorting;

    /**
     * @var string $priorityCategory1 Recommended item sorting: First sorting value.
     */
    public $priorityCategory1;

    /**
     * @var string $priorityCategory2 Recommended item sorting: Second sorting value.
     */
    public $priorityCategory2;

    /**
     * @var string $priorityCategory3 Recommended item sorting: Third sorting value.
     */
    public $priorityCategory3;

    /**
     * @var string $defaultSortingSearch Default sorting value for search results.
     */
    public $defaultSortingSearch;

    /**
     * @var string $prioritySearch1 Recommended search results: First search value.
     */
    public $prioritySearch1;

    /**
     * @var string $prioritySearch2 Recommended search results: Second search value.
     */
    public $prioritySearch2;

    /**
     * @var string $prioritySearch3 Recommended search results: Third search value.
     */
    public $prioritySearch3;

    /**
     * @var array $dynamicInherit Adopt item sorting for sorting variations on the item tile.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $dynamicInherit;

    /**
     * @var string $dynamicPrio1 Variation on item tile: First sorting value.
     */
    public $dynamicPrio1;

    /**
     * @var string $dynamicPrio2 Variation on item tile: Second sorting value.
     */
    public $dynamicPrio2;

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
        $this->data = $this->getMultiSelectValue(
            'sort.data',
            [
                'default.recommended_sorting',
                'texts.name1_asc',
                'texts.name1_desc',
                'sorting.price.avg_asc',
                'sorting.price.avg_desc',
                'variation.createdAt_desc',
                'variation.createdAt_asc',
                'variation.availability.averageDays_asc',
                'variation.availability.averageDays_desc',
                'variation.number_asc',
                'variation.number_desc',
                'variation.updatedAt_asc',
                'variation.updatedAt_desc',
                'item.manufacturer.externalName_asc',
                'item.manufacturer.externalName_desc',
                'variation.position_asc',
                'variation.position_desc'
            ],
            [
                'texts.name1_asc',
                'texts.name1_desc',
                'sorting.price.avg_asc',
                'sorting.price.avg_desc'
            ]
        );


        $this->defaultSorting = $this->getTextValue('sort.defaultSorting', 'texts.name1_asc');
        $this->priorityCategory1 = $this->getTextValue('sorting.priorityCategory1', 'texts.name_asc');
        $this->priorityCategory2 = $this->getTextValue('sorting.priorityCategory2', 'notSelected');
        $this->priorityCategory3 = $this->getTextValue('sorting.priorityCategory3', 'notSelected');
        $this->defaultSortingSearch = $this->getTextValue('sort.defaultSortingSearch', 'item.score');
        $this->prioritySearch1 = $this->getTextValue('sorting.prioritySearch1', 'item.score');
        $this->prioritySearch2 = $this->getTextValue('sorting.prioritySearch2', 'notSelected');
        $this->prioritySearch3 = $this->getTextValue('sorting.prioritySearch3', 'notSelected');
        $this->dynamicInherit = $this->getMultiSelectValue(
            'sorting.dynamicInherit',
            [
                'filter.prices.price_asc',
                'filter.prices.price_desc',
                'filter.position_asc',
                'filter.position_desc',
                'filter.availabilityAverageDays_asc',
                'filter.availabilityAverageDays_desc',
                'analyzed.number.sorting_asc',
                'analyzed.number.sorting_desc'
            ],
            []
        );

        $this->dynamicPrio1 = $this->getTextValue('sorting.dynamicPrio1', 'filter.prices.price_asc');
        $this->dynamicPrio2 = $this->getTextValue('sorting.dynamicPrio2', 'variationId_asc');
    }
}
