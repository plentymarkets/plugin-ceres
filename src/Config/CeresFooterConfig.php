<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresFooterConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getToTopButton()
    {
        return $this->getTextValue( "footer.to_top_button", "right" );
    }

    public function getNumberOfFeatures()
    {
        return $this->getIntegerValue( "footer.number_of_features", 3 );
    }

    public function getStoreFeature1()
    {
        return $this->getTextValue( "footer.store_feature_1", "Delivery period approx. 1 to 3 business days" );
    }

    public function getStoreFeature2()
    {
        return $this->getTextValue( "footer.store_feature_2", "Free shipping & return" );
    }

    public function getStoreFeature3()
    {
        return $this->getTextValue( "footer.store_feature_3" , "100-day return policy" );
    }

    public function getNumberOfCols()
    {
        return $this->getIntegerValue( "footer.number_of_cols", 3 );
    }

    public function getCol1Title()
    {
        return $this->getTextValue("footer.col_1_title", "Shop" );
    }

    public function getCol1Categories()
    {
        return $this->getTextValue( "footer.col_1_categories" );
    }

    public function getCol2Title()
    {
        return $this->getTextValue("footer.col_2_title", "My account" );
    }

    public function getCol2Categories()
    {
        return $this->getTextValue( "footer.col_2_categories" );
    }

    public function getCol3Title()
    {
        return $this->getTextValue("footer.col_3_title", "Service" );
    }

    public function getCol3Categories()
    {
        return $this->getTextValue( "footer.col_1_categories" );
    }

    public function getCancellationUsePdf()
    {
        return $this->getBooleanValue( "footer.cancellation_use_pdf", false );
    }

    public function getCancellationPdfPath()
    {
        return $this->getTextValue( "footer.cancellation_pdf_path" );
    }
}