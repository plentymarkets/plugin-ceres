<?php

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Config\SeoConfig;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;

/**
 * Class SeoStep
 * @package Ceres\Wizard\ShopWizard\Steps\Builder
 */
class SeoStep extends Step
{
    /**
     * @return array
     */
    public function generateStep():array
    {
        return [
            "title" => "Wizard.seoSettings",
            "description" => "Wizard.seoSettingsDescription",
            "condition" => " (typeof settingsSelection_seo === 'undefined' ||" .
                           " settingsSelection_seo === true) && "
                           . $this->hasRequiredSettings(),
            "sections" => [
                $this->generateRobotSettingsSection(),
                $this->generateRobotsTxtSection(),
                $this->generateSiteMapSection(),
                $this->generateAvailabilitiesSection(),
                $this->generateItemMetaTitleSection(),
                $this->generateBrandMappingSection(),
                $this->generateManufacturerMappingSection()
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateRobotSettingsSection():array
    {
        $metaRobotsOptions = SeoConfig::getMetaRobotsOptions();
        $metaOptions       = StepHelper::generateTranslatedListBoxValues($metaRobotsOptions);

        return [
            "title" => "Wizard.robotSettings",
            "description" => "Wizard.robotSettingsDescription",
            "form" => [
                "seo_robotsSearchResult" => [
                    "type" => "select",
                    "defaultValue" => $metaOptions[0]["value"],
                    "options" => [
                        "name" => "Wizard.robotsSearchResult",
                        "listBoxValues" => $metaOptions
                    ]
                ],
                "seo_paginationNoIndex" => [
                    "type" => "number",
                    "defaultValue" => "0",
                    "options" => [
                        "name" => "Wizard.paginationNoIndex"
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateAvailabilitiesSection():array
    {
        $availabilities = [
            "availability1",
            "availability2",
            "availability3",
            "availability4",
            "availability5",
            "availability6",
            "availability7",
            "availability8",
            "availability9",
            "availability10"
        ];

        return [
            "title" => "Wizard.availabilitiesSearchEngines",
            "description" => "Wizard.availabilitiesSearchEnginesDescription",
            "condition" => $this->globalsCondition,
            "form" => $this->generateAvailabilitiesFormFields($availabilities)
        ];
    }

    /**
     * @param $availabilities
     *
     * @return array
     */
    private function generateAvailabilitiesFormFields($availabilities):array
    {
        $formFields = [];

        $availabilitiesOptions     = SeoConfig::getAvailabilitiesOptions();
        $availabilitiesListOptions = StepHelper::generateTranslatedListBoxValues($availabilitiesOptions);

        foreach ($availabilities as $availabilityField) {
            $fieldKey = "seo_{$availabilityField}";
            $formFields[$fieldKey] = [
                "type" =>  "select",
                "defaultValue" => "",
                "options" => [
                    "name" => "Wizard.{$availabilityField}",
                    "listBoxValues" => $availabilitiesListOptions
                ]
            ];
        }

        return $formFields;
    }

    /**
     * @return array
     */
    public function generateRobotsTxtSection():array
    {
        return [
            "title" => "Wizard.robotsTxt",
            "description" => "Wizard.robotsTxtDescription",
            "condition" => $this->globalsCondition,
            "form" => [
                "seo_robotsTxt" => [
                    "type" => "textarea",
                    "defaultValue" => "",
                    "options" => [
                        "name" => "Wizard.robotsTxt",
                        "maxRows" => 15,
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    public function generateSiteMapSection():array
    {
        $siteMapData    = SeoConfig::getSiteMapOptions();
        $siteMapOptions = StepHelper::generateTranslatedListBoxValues($siteMapData);

        return [
            "title" => "Wizard.siteMapXml",
            "description" => "Wizard.siteMapXmlDescription",
            "condition" => $this->globalsCondition,
            "form" => [
                "seo_siteMapConfig" => [
                    "type" => "checkboxGroup",
                    "defaultValue" => [
                        $siteMapOptions[0]["value"],
                        $siteMapOptions[1]["value"],
                        $siteMapOptions[2]["value"],
                        $siteMapOptions[3]["value"],
                    ],
                    "options" =>[
                        "name" => "Wizard.siteMapXml",
                        "checkboxValues" => $siteMapOptions
                    ]
                ]
            ]
        ];
    }

    private function generateItemMetaTitleSection()
    {
        return [
            "title" => "Wizard.itemMetaTitle",
            "description" => "Wizard.itemMetaTitleDescription",
            "form" => [
                "seo_itemMetaTitle" => [
                    "type" => "select",
                    "defaultValue" => 1,
                    "options" => [
                        "name" => "Wizard.itemMetaTitle",
                        "listBoxValues" => [
                            [
                                "value" => 1,
                                "caption" => "Wizard.itemName0"
                            ],
                            [
                                "value" => 2,
                                "caption" => "Wizard.itemName1"
                            ],
                            [
                                "value" => 3,
                                "caption" => "Wizard.itemName2"
                            ],
                        ]
                    ]
                ],
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateBrandMappingSection():array
    {
        $brandOptions = SeoConfig::getBrandOptions();
        $options       = StepHelper::generateTranslatedListBoxValues($brandOptions);

        return [
            "title"       => "Wizard.brandMapping",
            "description" => "Wizard.brandMappingDescription",
            "form"        => [
                "seo_brand" => [
                    "type"         => "select",
                    "defaultValue" => "1",
                    "options"      => [
                        "name" => "Wizard.brandChoose",
                        "listBoxValues" => $options,
                    ]
                ],
                "seo_brandId" => [
                    "type"         => "text",
                    "isVisible"    => "seo_brand === '3'",
                    "defaultValue" => "",
                    "options"      => [
                        "name"          => "Wizard.brandPropertyIdOnArticle",
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateManufacturerMappingSection():array
    {
        $manufacturerOptions = SeoConfig::getManufacturerOptions();
        $options       = StepHelper::generateTranslatedListBoxValues($manufacturerOptions);

        return [
            "title"       => "Wizard.manufacturerMapping",
            "description" => "Wizard.manufacturerMappingDescription",
            "form"        => [
                "seo_manufacturer" => [
                    "type"         => "select",
                    "defaultValue" => "2",
                    "options"      => [
                        "name" => "Wizard.manufacturerChoose",
                        "listBoxValues" => $options,
                    ]
                ]
            ]
        ];
    }
}
