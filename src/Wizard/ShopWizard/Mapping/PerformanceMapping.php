<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 09/08/2019
 * Time: 14:54
 */

namespace Ceres\Wizard\ShopWizard\Mapping;


class PerformanceMapping
{
    public static $fieldsMapped = [
        "performance_loggingOptions" => [
            "field" => "log.data",
            "type" => "concatenated",
            "global" => false,
            "optional" => true,
        ],
        "performance_logPerformanceLevel" => [
            "field" => "log.performance.level",
            "type" => "string",
            "global" => false,
            "optional" => true,
        ],
        "performance_errorCheck" => [
            "field" => "log.check_syntax",
            "type" => "boolean",
            "global" => false,
            "optional" => true,
        ],
    ];

    public static function getFieldsMapped()
    {
        return self::$fieldsMapped;
    }
}