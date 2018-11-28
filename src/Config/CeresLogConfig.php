<?php

namespace Ceres\Config;

use IO\Helper\PluginConfig;
use Plenty\Plugin\ConfigRepository;

class CeresLogConfig extends PluginConfig
{
    public $data;
    public $performanceLevel;
    public $checkSyntax;

    public function __construct(ConfigRepository $configRepository)
    {
        parent::__construct($configRepository, "Ceres");

        $this->data = $this->getMultiSelectValue(
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

        $this->performanceLevel = $this->getTextValue( "log.performance.level", "live" );
        $this->checkSyntax = $this->getBooleanValue("log.check_syntax", true);
    }
}