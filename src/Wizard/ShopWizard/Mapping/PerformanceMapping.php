<?php

namespace Ceres\Wizard\ShopWizard\Mapping;

/**
 * Class PerformanceMapping
 * @package Ceres\Wizard\ShopWizard\Mapping
 */
class PerformanceMapping
{
    private static $fieldsMapped = [
        "performance_ssr" => [
            "field"    => "log.performance.ssr",
            "type"     => "boolean",
            "global"   => false,
            "optional" => true,
        ],
        "performance_loggingOptions" => [
            "field"    => "log.data",
            "type"     => "concatenated",
            "global"   => false,
            "optional" => true,
        ],
        "performance_logPerformanceLevel" => [
            "field"    => "log.performance.level",
            "type"     => "string",
            "global"   => false,
            "optional" => true,
        ],
        "performance_errorCheck" => [
            "field"    => "log.check_syntax",
            "type"     => "boolean",
            "global"   => false,
            "optional" => true,
        ],
        "performance_eventPropagation" => [
            "field"    => "log.performance.eventPropagation",
            "type"     => "boolean",
            "global"   => false,
            "optional" => true,
        ],
    ];
    
    /**
     * @return array
     */
    public static function getFieldsMapped()
    {
        return self::$fieldsMapped;
    }
}
