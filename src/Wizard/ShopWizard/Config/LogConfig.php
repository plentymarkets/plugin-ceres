<?php

namespace Ceres\Wizard\ShopWizard\Config;

/**
 * Class LogConfig
 * @package Ceres\Wizard\ShopWizard\Config
 */
class LogConfig
{
    private static $loggingLevels = [
        "printErrors"     => "print_errors",
        "printSuccess"    => "print_success",
        "printWarnings"   => "print_warnings",
        "printInfos"      => "print_infos",
        "printStackTrace" => "print_stack_trace",
        "logMessages"     => "log_messages",
        "showErrorCode"   => "show_error_code",
    ];
    
    /**
     * @return array
     */
    public static function getLoggingLevels()
    {
        return self::$loggingLevels;
    }
}
