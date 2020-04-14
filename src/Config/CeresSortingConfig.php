<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

class CeresSortingConfig extends PluginConfig
{
    public $data;
    public $defaultSorting;
    public $priorityCategory1;
    public $priorityCategory2;
    public $priorityCategory3;

    public $defaultSortingSearch;
    public $prioritySearch1;
    public $prioritySearch2;
    public $prioritySearch3;

    public $dynamicInherit;
    public $dynamicPrio1;
    public $dynamicPrio2;

    protected function getPluginName()
    {
        return 'Ceres';
    }

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
