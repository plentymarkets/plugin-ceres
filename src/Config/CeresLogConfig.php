<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresLogConfig extends PluginConfig
{
    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");
    }

    public function getData()
    {
        return $this->getMultiSelectValue(
            "log.data",
            [
                "print_errors",
                "print_success",
                "print_warnings",
                "print_infos",
                "print_stack_trace",
                "show_error_code"
            ],
            [
                "print_errors",
                "print_success"
            ]
        );
    }

    public function getPerformanceLevel()
    {
        return $this->getTextValue( "log.performance.level", "live" );
    }
}