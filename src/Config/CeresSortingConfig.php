<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresSortingConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getData()
    {
        return $this->getMultiSelectValue(
            "sort.data",
            [
                "default.recommended_sorting",
                "texts.name1_asc",
                "texts.name1_desc",
                "sorting.price.min_asc",
                "sorting.price.max_desc",
                "variation.createdAt_desc",
                "variation.createdAt_asc",
                "variation.availability.averageDays_asc",
                "variation.availability.averageDays_desc",
                "variation.number_asc",
                "variation.number_desc",
                "variation.updatedAt_asc",
                "variation.updatedAt_desc",
                "item.manufacturer.externalName_asc",
                "item.manufacturer.externalName_desc"
            ],
            [
                "texts.name1_asc",
                "texts.name1_desc",
                "sorting.price.min_asc",
                "sorting.price.max_desc"
            ]
        );
    }

    public function getDefaultSorting()
    {
        return $this->getTextValue( "sort.defaultSorting", "texts.name1_asc" );
    }

    public function getPriorityCategory1()
    {
        return $this->getTextValue( "sorting.priorityCategory1", "texts.name_asc" );
    }

    public function getPriorityCategory2()
    {
        return $this->getTextValue( "sorting.priorityCategory2", "notSelected" );
    }

    public function getPriorityCategory3()
    {
        return $this->getTextValue( "sorting.priorityCategory3", "notSelected" );
    }

    public function getDefaultSortingSearch()
    {
        return $this->getTextValue( "sort.defaultSortingSearch", "item.score" );
    }

    public function getPrioritySearch1()
    {
        return $this->getTextValue( "sorting.prioritySearch1", "item.score" );
    }

    public function getPrioritySearch2()
    {
        return $this->getTextValue( "sorting.prioritySearch2", "notSelected" );
    }

    public function getPrioritySearch3()
    {
        return $this->getTextValue( "sorting.prioritySearch3", "notSelected" );
    }


}