<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresPaginationConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getPosition()
    {
        return $this->getTextValue( "pagination.position", "top" );
    }

    public function getShowFirstPage()
    {
        return $this->getBooleanValue( "pagination.showFirstPage", false );
    }

    public function getShowLastPage()
    {
        return $this->getBooleanValue( "pagination.showLastPage", false );
    }

    public function getColumnsPerPage()
    {
        return $this->getIntegerValue( "pagination.columnsPerPage", 4 );
    }

    public function getRowsPerPage()
    {
        return $this->getMultiSelectValue(
            "pagination.rowsPerPage",
            [
                "5",
                "10",
                "15",
                "20",
                "25"
            ],
            [
                "5",
                "10",
                "25"
            ]
        );
    }
}