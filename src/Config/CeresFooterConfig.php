<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresFooterConfig
 *
 * PluginConfig class, including all plugin settings for the footer.
 *
 * @package Ceres\Config
 */
class CeresFooterConfig extends PluginConfig
{
    /**
     * @var string $toTopButton Position of the Back-to-top button. Possible values are 'right' and 'bottom'.
     */
    public $toTopButton;

    /**
     * @var int $numberOfFeatures Number of store features.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $numberOfFeatures;

    /**
     * @var int $numberOfCols Number of columns.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $numberOfCols;

    /**
     * @var string $col1Categories List of IDs of categories to display in first column.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $col1Categories;

    /**
     * @var string $col2Categories List of IDs of categories to display in second column.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $col2Categories;

    /**
     * @var string $col3Categories List of IDs of categories to display in third column.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $col3Categories;

    /**
     * @var bool $cancellationUsePdf Use PDF cancellation form.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $cancellationUsePdf;

    /**
     * @var string $cancellationPdfPath URL to PDF file.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $cancellationPdfPath;

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
        $this->toTopButton          = $this->getTextValue( 'footer.to_top_button', 'right' );
        $this->numberOfFeatures     = $this->getIntegerValue( 'footer.number_of_features', 3 );
        $this->numberOfCols         = $this->getIntegerValue( 'footer.number_of_cols', 3 );
        $this->col1Categories       = $this->getTextValue( 'footer.col_1_categories' );
        $this->col2Categories       = $this->getTextValue( 'footer.col_2_categories' );
        $this->col3Categories       = $this->getTextValue( 'footer.col_3_categories' );
        $this->cancellationUsePdf   = $this->getBooleanValue( 'footer.cancellation_use_pdf', false );
        $this->cancellationPdfPath  = $this->getTextValue( 'footer.cancellation_pdf_path' );
    }
}
