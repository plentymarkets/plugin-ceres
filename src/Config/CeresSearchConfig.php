<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresSearchConfig
 *
 * PluginConfig class, including all plugin settings for the shop search.
 *
 * @deprecated will be removed in 6.0.0
 * @package Ceres\Config
 */
class CeresSearchConfig extends PluginConfig
{
    /**
     * @var bool $forwardToSingleItem Search: Forward to single item view.
     *
     * @deprecated will be removed in 6.0.0.
     */
    public $forwardToSingleItem;

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
        $this->forwardToSingleItem = $this->getBooleanValue('search.forwardToSingleItem', false );
    }
}
