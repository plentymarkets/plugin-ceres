<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresSeoConfig
 *
 * PluginConfig class, including all plugin settings for the seo data.
 *
 * @package Ceres\Config
 */
class CeresSeoConfig extends PluginConfig
{
    /**
     * @var string $brandMapping Selected option value for brand in rich snippet.
     */
    public $brandMapping;

    /**
     * @var string $brandMappingId Property ID for brand rich snippet.
     */
    public $brandMappingId;

    /**
     * @var string $manufacturerMapping Selected option value for manufacturer in rich snippet.
     */
    public $manufacturerMapping;

    /**
     * @var string $gtinMapping Selected option value for gtin barcode in rich snippet.
     */
    public $gtinMapping;

    /**
     * @var string $gtinMappingId Selected option value for gtin barcode in rich snippet.
     */
    public $gtinMappingId;

    /**
     * @var string $isbnMapping Selected option value for isbn barcode in rich snippet.
     */
    public $isbnMapping;

    /**
     * @var string $mpnMapping;
     */
    public $mpnMapping;

    /**
     * @var string $mpnMappingLabel ?????
     */
    public $mpnMappingId;

    /**
     * @inheritDoc
     */
    protected function getPluginName(): string
    {
        return 'Ceres';
    }

    /**
     * @inheritDoc
     */
    protected function load()
    {
        $this->brandMapping = $this->getTextValue('brand.mapping.brand', '1');
        $this->brandMappingId = $this->getTextValue('brand.mapping.brandID', '');
        $this->manufacturerMapping = $this->getTextValue('manufacturer.mapping.manufacturer', '2');
        $this->gtinMapping = $this->getTextValue('gtin.mapping.gtin','1');
        $this->gtinMappingId = $this->getTextValue('gtin.mapping.gtinID', '');
        $this->isbnMapping = $this->getTextValue('isbn.mapping.isbn','1');
        $this->mpnMapping = $this->getTextValue('mpn.mapping.mpn','1');
        $this->mpnMappingId = $this->getTextValue('mpn.mapping.mpnID', '');
    }
}
