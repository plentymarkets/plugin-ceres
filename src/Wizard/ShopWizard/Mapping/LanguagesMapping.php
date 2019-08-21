<?php

namespace Ceres\Wizard\ShopWizard\Mapping;

/**
 * Class LanguagesMapping
 * @package Ceres\Wizard\ShopWizard\Mapping
 */
class LanguagesMapping
{
    private static $fieldsMapped = [
        "languages_activeLanguages" => [
            "field"    => "language.active_languages",
            "type"     => "concatenated",
            "global"   => false,
            "optional" => true,
        ],
        "languages_defaultBrowserLang" => [
            "field" => "browserLanguage",
            "type" => "string",
            "global" => true,
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
