<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresFooterConfig extends PluginConfig
{
    public $toTopButton;
    public $numberOfFeatures;
    public $storeFeature1;
    public $storeFeature2;
    public $storeFeature3;
    public $numberOfCols;
    public $col1Title;
    public $col1Categories;
    public $col2Title;
    public $col2Categories;
    public $col3Title;
    public $col3Categories;
    public $cancellationUsePdf;
    public $cancellationPdfPath;

    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");

        $this->toTopButton          = $this->getTextValue( "footer.to_top_button", "right" );
        $this->numberOfFeatures     = $this->getIntegerValue( "footer.number_of_features", 3 );
        $this->storeFeature1        = $this->getTextValue( "footer.store_feature_1", "Delivery period approx. 1 to 3 business days" );
        $this->storeFeature2        = $this->getTextValue( "footer.store_feature_2", "Free shipping & return" );
        $this->storeFeature3        = $this->getTextValue( "footer.store_feature_3" , "100-day return policy" );
        $this->numberOfCols         = $this->getIntegerValue( "footer.number_of_cols", 3 );
        $this->col1Title            = $this->getTextValue("footer.col_1_title", "Shop" );
        $this->col1Categories       = $this->getTextValue( "footer.col_1_categories" );
        $this->col2Title            = $this->getTextValue("footer.col_2_title", "My account" );
        $this->col2Categories       = $this->getTextValue( "footer.col_2_categories" );
        $this->col3Title            = $this->getTextValue("footer.col_3_title", "Service" );
        $this->col3Categories       = $this->getTextValue( "footer.col_3_categories" );
        $this->cancellationUsePdf   = $this->getBooleanValue( "footer.cancellation_use_pdf", false );
        $this->cancellationPdfPath  = $this->getTextValue( "footer.cancellation_pdf_path" );
    }
}