<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 09/08/2019
 * Time: 14:37
 */

namespace Ceres\Wizard\ShopWizard\Mapping;


class LanguagesMapping
{
    public static $fieldsMapped = [
        "languages_activeLanguages" => [
            "field" => "language.active_languages",
            "type" => "concatenated",
            "global" => false,
            "optional" => true,
        ],
//        "languages_defaultBrowserLang" => [
//            "field" => "browserLanguage",
//            "type" => "string",
//            "global" => true,
//            "optional" => true,
//        ],
    ];

    public static function getFieldsMapped()
    {
        return self::$fieldsMapped;
    }
}