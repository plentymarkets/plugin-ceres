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
        ]
    ];
    
    /**
     * @return array
     */
    public static function getFieldsMapped()
    {
        return self::$fieldsMapped;
    }
}
