<?php

namespace Ceres\Wizard\ShopWizard\Config;

/**
 * Class PerformanceConfig
 * @package Ceres\Wizard\ShopWizard\Config
 */
class PerformanceConfig
{
    private static $performanceLevels = [
        "performanceDevelopment" => "development",
        "performanceLive"        => "live",
    ];
    
    /**
     * @return array
     */
    public static function getPerformanceLevels()
    {
        return self::$performanceLevels;
    }
}
