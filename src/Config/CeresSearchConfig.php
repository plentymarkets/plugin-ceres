<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

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
