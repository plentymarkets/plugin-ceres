<?php

namespace Ceres\Wizard\ShopWizard\Mapping;

/**
 * Class DefaultSettingsMapping
 * @package Ceres\Wizard\ShopWizard\Mapping
 */
class DefaultSettingsMapping
{
    private static $fieldsMapped = [
        "defSettings_defaultLanguage" => [
            "field"    => "defaultLanguage",
            "type"     => "string",
            "global"   => true,
            "optional" => false,
        ],
        "defSettings_defaultShippingProfile" => [
            "field"    => "defaultParcelServicePresetId",
            "type"     => "float",
            "global"   => true,
            "optional" => false,
        ],
        "defSettings_defaultShippingMethod" => [
            "field"    => "defaultParcelServiceId",
            "type"     => "float",
            "global"   => true,
            "optional" => false,
        ],
        "defSettings_defaultPaymentMethod" => [
            "field"    => "defaultMethodOfPaymentId",
            "type"     => "float",
            "global"   => true,
            "optional" => false,
        ],
        "defSettings_defaultLocation" => [
            "field"    => "defaultAccountingLocation",
            "type"     => "integer",
            "global"   => true,
            "optional" => false,
        ],
        "defSettings_defaultB2B" => [
            "field"    => "defaultCustomerB2BClassId",
            "type"     => "integer",
            "global"   => true,
            "optional" => false,
        ],
        "defSettings_defaultB2C" => [
            "field"    => "defaultCustomerClassId",
            "type"     => "integer",
            "global"   => true,
            "optional" => false,
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
