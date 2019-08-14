<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 09/08/2019
 * Time: 15:10
 */

namespace Ceres\Wizard\ShopWizard\Mapping;


class SeoMapping
{
    public static $fieldsMapped = [
        "seo_robotsHome" => [
            "field" => "meta.robots_home",
            "type" => "string",
            "global" => false,
            "optional" => true,
        ],
        "seo_robotsContact" => [
            "field" => "meta.robots_contact",
            "type" => "string",
            "global" => false,
            "optional" => true,
        ],
        "seo_robotsCancelRights" => [
            "field" => "meta.robots_cancel_rights",
            "type" => "string",
            "global" => false,
            "optional" => true,
        ],
        "seo_robotsCancelForm" => [
            "field" => "meta.robots_cancel_form",
            "type" => "string",
            "global" => false,
            "optional" => true,
        ],
        "seo_robotsLegalDisclosure" => [
            "field" => "meta.robots_legal_disclosure",
            "type" => "string",
            "global" => false,
            "optional" => true,
        ],
        "seo_robotsPrivacyPolicy" => [
            "field" => "meta.robots_privacy_policy",
            "type" => "string",
            "global" => false,
            "optional" => true,
        ],
        "seo_robotsTermsAndConditions" => [
            "field" => "meta.robots_terms_and_conditions",
            "type" => "string",
            "global" => false,
            "optional" => true,
        ],
        "seo_robotsSearchResult" => [
            "field" => "meta.robots_search_result",
            "type" => "string",
            "global" => false,
            "optional" => true,
        ],
    ];

    public static function getFieldsMapped()
    {
        return self::$fieldsMapped;
    }
}