<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

class CeresPaginationConfig extends PluginConfig
{
    public $position;
    public $showFirstPage;
    public $showLastPage;
    public $columnsPerPage;
    public $rowsPerPage;
    public $itemsPerPage;
    public $noIndex;
    
    protected function getPluginName()
    {
        return 'Ceres';
    }

    protected function load()
    {
        $this->position         = $this->getTextValue( 'pagination.position', 'top' );
        $this->showFirstPage    = $this->getBooleanValue( 'pagination.showFirstPage', false );
        $this->showLastPage     = $this->getBooleanValue( 'pagination.showLastPage', false );
        $this->columnsPerPage   = $this->getIntegerValue( 'pagination.columnsPerPage', 4 );
        $this->itemsPerPage     = $this->getIntegerValue( 'pagination.itemsPerPage', 20 );
        $this->rowsPerPage      = $this->getMultiSelectValue(
            'pagination.rowsPerPage',
            [
                '5',
                '10',
                '15',
                '20',
                '25'
            ],
            [
                '5',
                '10',
                '25'
            ]
        );
        $this->noIndex   = $this->getIntegerValue( 'pagination.noIndex', 0 );
    }
}
