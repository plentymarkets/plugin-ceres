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
     * @var string $gtinMapping Selected option value for GTIN barcode in rich snippet.
     */
    public $gtinMapping;

    /**
     * @var string $gtinMappingId Property ID for GTIN rich snippet.
     */
    public $gtinMappingId;

    /**
     * @var string $gtin8Mapping Selected option value for GTIN 8 barcode in rich snippet.
     */
    public $gtin8Mapping;

    /**
     * @var string $gtin8MappingId Property ID for GTIN 8 rich snippet.
     */
    public $gtin8MappingId;

    /**
     * @var string $gtin13Mapping Selected option value for GTIN 13 barcode in rich snippet.
     */
    public $gtin13Mapping;

    /**
     * @var string $gtin13MappingId Property ID for GTIN 13 rich snippet.
     */
    public $gtin13MappingId;

    /**
     * @var string $isbnMapping Selected option value for ISBN barcode in rich snippet.
     */
    public $isbnMapping;

    /**
     * @var string $isbnMappingId Property ID for ISBN rich snippet.
     */
    public $isbnMappingId;

    /**
     * @var string $mpnMapping Selected option value for MPN barcode in rich snippet.
     */
    public $mpnMapping;

    /**
     * @var string $mpnMappingId Property ID for MPN rich snippet.
     */
    public $mpnMappingId;

    /**
     * @var string $priceValidUntilMappingId Property ID for "priceValidUntil" rich snippet.
     */
    public $priceValidUntilMappingId;

    /**
     * @var string $skuMapping Selected option value for SKU barcode in rich snippet.
     */
    public $skuMapping;

    /**
     * @var string $skuMappingId Property ID for SKU rich snippet.
     */
    public $skuMappingId;



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
        $this->gtin8Mapping = $this->getTextValue('gtin8.mapping.gtin8','1');
        $this->gtin8MappingId = $this->getTextValue('gtin8.mapping.gtin8ID', '');
        $this->gtin13Mapping = $this->getTextValue('gtin13.mapping.gtin13','1');
        $this->gtin13MappingId = $this->getTextValue('gtin13.mapping.gtin13ID', '');
        $this->isbnMapping = $this->getTextValue('isbn.mapping.isbn','1');
        $this->isbnMappingId = $this->getTextValue('isbn.mapping.isbnID','');
        $this->mpnMapping = $this->getTextValue('mpn.mapping.mpn','1');
        $this->mpnMappingId = $this->getTextValue('mpn.mapping.mpnID', '');
        $this->priceValidUntilMappingId = $this->getTextValue('priceValidUntil.mapping.priceValidUntilID','');
        $this->skuMapping = $this->getTextValue('sku.mapping.sku','1');
        $this->skuMappingId = $this->getTextValue('sku.mapping.skuID','');
    }
}
