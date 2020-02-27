<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

class CeresSearchConfig extends PluginConfig
{
    public $forwardToSingleItem;
    
    protected function getPluginName()
    {
        return 'Ceres';
    }

    protected function load()
    {
        $this->forwardToSingleItem = $this->getBooleanValue('search.forwardToSingleItem', false );
    }
}
