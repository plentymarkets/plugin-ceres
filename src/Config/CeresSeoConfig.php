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
    }
}
