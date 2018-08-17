<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresSearchConfig extends PluginConfig
{
    public $forwardToSingleItem;

    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");

        $this->forwardToSingleItem = $this->getBooleanValue("search.forwardToSingleItem", false );
    }
}