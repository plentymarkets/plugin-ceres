<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 02/08/2019
 * Time: 14:05
 */

namespace Ceres\Wizard\ShopWizard\Config;


class LogConfig
{
    public static $loggingLevels = [
        "printErrors" => "print_errors",
        "printSuccess" => "print_success",
        "printWarnings" => "print_warnings",
        "printInfos" => "print_infos",
        "printStackTrace" => "print_stack_trace",
        "logMessages" => "log_messages",
        "showErrorCode" => "show_error_code",
    ];

    public static function getLoggingLevels()
    {
        return self::$loggingLevels;
    }
}