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
     * @var string $brandMapping
     */
    public $brandMapping;

    /**
     * @var string $brandMappingId
     */
    public $brandMappingId;

    /**
     * @var string $manufacturerMapping
     */
    public $manufacturerMapping;


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
        $this->brandMapping                         = $this->getTextValue( 'brand.mapping.brand' , '' );
        $this->brandMappingId                       = $this->getTextValue( 'brand.mapping.brandID', '');
        $this->manufacturerMapping                  = $this->getTextValue( 'manufacturer.mapping.manufacturer', '');
    }
}
