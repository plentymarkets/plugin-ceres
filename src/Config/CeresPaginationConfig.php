<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresPaginationConfig
 *
 * PluginConfig class, including all plugin settings for the pagination.
 *
 * @package Ceres\Config
 */
class CeresPaginationConfig extends PluginConfig
{
    /**
     * @var string $position Pagination position. Possible values are 'top', 'bottom' and 'top_bottom'.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $position;

    /**
     * @var boolean $showFirstPage Defines if the "To first page" button is visible.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $showFirstPage;

    /**
     * @var boolean $showLastPage Defines if the "To last page" button is visible.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $showLastPage;

    /**
     * @var int $columnsPerPage Columns per page.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $columnsPerPage;

    /**
     * @var int $rowsPerPage Rows per page.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $rowsPerPage;

    /**
     * @var int $itemsPerPage Number of items displayed per page in the category view.
     */
    public $itemsPerPage;

    /**
     * @var int $noIndex SEO: Define the page number starting from which the value noindex is set.
     */
    public $noIndex;

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
