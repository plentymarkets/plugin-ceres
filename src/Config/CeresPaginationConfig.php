<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresPaginationConfig extends PluginConfig
{
    public $position;
    public $showFirstPage;
    public $showLastPage;
    public $columnsPerPage;
    public $rowsPerPage;
    public $noIndex;
    
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");

        $this->position         = $this->getTextValue( "pagination.position", "top" );
        $this->showFirstPage    = $this->getBooleanValue( "pagination.showFirstPage", false );
        $this->showLastPage     = $this->getBooleanValue( "pagination.showLastPage", false );
        $this->columnsPerPage   = $this->getIntegerValue( "pagination.columnsPerPage", 4 );
        $this->rowsPerPage      = $this->getMultiSelectValue(
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
        $this->noIndex   = $this->getIntegerValue( "pagination.noIndex", 0 );
    }
}