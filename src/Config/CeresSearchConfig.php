<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

class CeresSearchConfig extends PluginConfig
{
    public $forwardToSingleItem;
    
    /**
     * @inheritDoc
     */
    protected function getPluginName()
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
