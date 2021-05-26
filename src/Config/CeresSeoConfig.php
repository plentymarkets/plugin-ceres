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
     * @var string $gtin8Mapping Selected option value for gtin 8 barcode in rich snippet.
     */
    public $gtin8Mapping;

    /**
     * @var string $gtin8MappingId Selected option value for gtin 8 barcode in rich snippet.
     */
    public $gtin8MappingId;

    /**
     * @var string $gtin13Mapping Selected option value for gtin 13 barcode in rich snippet.
     */
    public $gtin13Mapping;

    /**
     * @var string $gtin13MappingId Selected option value for gtin 13 barcode in rich snippet.
     */
    public $gtin13MappingId;

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
        $this->gtin8Mapping = $this->getTextValue('gtin8.mapping.gtin8','1');
        $this->gtin8MappingId = $this->getTextValue('gtin8.mapping.gtin8ID', '');
        $this->gtin13Mapping = $this->getTextValue('gtin13.mapping.gtin13','1');
        $this->gtin13MappingId = $this->getTextValue('gtin13.mapping.gtin13ID', '');
        $this->isbnMapping = $this->getTextValue('isbn.mapping.isbn','1');
        $this->mpnMapping = $this->getTextValue('mpn.mapping.mpn','1');
        $this->mpnMappingId = $this->getTextValue('mpn.mapping.mpnID', '');
    }
}
