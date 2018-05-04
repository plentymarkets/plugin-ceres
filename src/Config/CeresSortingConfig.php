<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

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

    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");

        $this->data                 = $this->getMultiSelectValue(
            "sort.data",
            [
                "default.recommended_sorting",
                "texts.name1_asc",
                "texts.name1_desc",
                "sorting.price.avg_asc",
                "sorting.price.avg_desc",
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
                "sorting.price.avg_asc",
                "sorting.price.avg_desc"
            ]
        );
        $this->defaultSorting       = $this->getTextValue( "sort.defaultSorting", "texts.name1_asc" );
        $this->priorityCategory1    = $this->getTextValue( "sorting.priorityCategory1", "texts.name_asc" );
        $this->priorityCategory2    = $this->getTextValue( "sorting.priorityCategory2", "notSelected" );
        $this->priorityCategory3    = $this->getTextValue( "sorting.priorityCategory3", "notSelected" );
        $this->defaultSortingSearch = $this->getTextValue( "sort.defaultSortingSearch", "item.score" );
        $this->prioritySearch1      = $this->getTextValue( "sorting.prioritySearch1", "item.score" );
        $this->prioritySearch2      = $this->getTextValue( "sorting.prioritySearch2", "notSelected" );
        $this->prioritySearch3      = $this->getTextValue( "sorting.prioritySearch3", "notSelected" );

    }
}