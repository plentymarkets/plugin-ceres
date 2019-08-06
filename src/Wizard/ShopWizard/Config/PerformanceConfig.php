<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 05/08/2019
 * Time: 09:08
 */

namespace Ceres\Wizard\ShopWizard\Config;


class PerformanceConfig
{
    public static $performanceLevels = [
        "performanceDevelopment" => "development",
        "performanceLive" => "live",
    ];

    public static function getPerformanceLevels()
    {
        return self::$performanceLevels;
    }
}