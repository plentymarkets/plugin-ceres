<?php

namespace Ceres\Wizard\ShopWizard\Mapping;

/**
 * Class SeoMapping
 * @package Ceres\Wizard\ShopWizard\Mapping
 */
class SeoMapping
{
    private static $fieldsMapped = [
        'seo_robotsSearchResult' => [
            'field'    => 'meta.robots_search_result',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_paginationNoIndex' => [
            'field'    => 'pagination.noIndex',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_availability1' => [
            'field'    => 'availability.mapping.availability1',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_availability2' => [
            'field'    => 'availability.mapping.availability2',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_availability3' => [
            'field'    => 'availability.mapping.availability3',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_availability4' => [
            'field'    => 'availability.mapping.availability4',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_availability5' => [
            'field'    => 'availability.mapping.availability5',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_availability6' => [
            'field'    => 'availability.mapping.availability6',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_availability7' => [
            'field'    => 'availability.mapping.availability7',
            'type'     => 'string',
            'global'   => false,
            'optional' => true,
        ],
        'seo_availability8' => [
            'field'    => 'availability.mapping.availability8',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_availability9' => [
            'field'    => 'availability.mapping.availability9',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_availability10' => [
            'field'    => 'availability.mapping.availability10',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_itemMetaTitle' => [
            'field'    => 'urlTitleItemName',
            'type'     => 'integer',
            'global'   => true,
            'optional' => true
        ],
        'seo_brand' => [
            'field'    => 'brand.mapping.brand',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_brandId' => [
            'field'    => 'brand.mapping.brandID',
            'type'     => 'integer',
            'global'   => false,
            'optional' => true
        ],
        'seo_manufacturer' => [
            'field'    => 'manufacturer.mapping.manufacturer',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_gtin' => [
            'field'    => 'gtin.mapping.gtin',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_gtin8' => [
            'field'    => 'gtin8.mapping.gtin8',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_gtin13' => [
            'field'    => 'gtin13.mapping.gtin13',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_gtinId' => [
            'field'    => 'gtin.mapping.gtinID',
            'type'     => 'integer',
            'global'   => false,
            'optional' => true
        ],
        'seo_gtin8Id' => [
            'field'    => 'gtin8.mapping.gtin8ID',
            'type'     => 'integer',
            'global'   => false,
            'optional' => true
        ],
        'seo_gtin13Id' => [
            'field'    => 'gtin13.mapping.gtin13ID',
            'type'     => 'integer',
            'global'   => false,
            'optional' => true
        ],
        'seo_isbn' => [
            'field'    => 'isbn.mapping.isbn',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_isbnId' => [
            'field'    => 'isbn.mapping.isbnID',
            'type'     => 'integer',
            'global'   => false,
            'optional' => true
        ],
        'seo_mpn' => [
            'field'    => 'mpn.mapping.mpn',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_mpnId' => [
            'field'    => 'mpn.mapping.mpnID',
            'type'     => 'integer',
            'global'   => false,
            'optional' => true
        ],
        'seo_priceValidUntilId' => [
            'field'    => 'priceValidUntil.mapping.priceValidUntilID',
            'type'     => 'integer',
            'global'   => false,
            'optional' => true
        ],
         'seo_sku' => [
            'field'    => 'sku.mapping.sku',
            'type'     => 'string',
            'global'   => false,
            'optional' => true
        ],
        'seo_skuId' => [
            'field'    => 'sku.mapping.skuID',
            'type'     => 'integer',
            'global'   => false,
            'optional' => true
        ],
    ];

    /**
     * @return array
     */
    public static function getFieldsMapped()
    {
        return self::$fieldsMapped;
    }
}
