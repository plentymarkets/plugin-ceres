<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 08/08/2019
 * Time: 10:42
 */

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Config\SeoConfig;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;

class SeoStep extends Step
{

    /**
     * @return array
     */
    public function generateStep(): array
    {
        return [
            "title" => "Wizard.seoSettings",
            "description" => "Wizard.seoSettingsDescription",
            "condition" => " typeof settingsSelection_seo === 'undefined' || settingsSelection_seo === true",
            "sections" => [
                $this->generateRobotSettingsSection(),
                $this->generateRobotsTxtSection(),
                $this->generateAvailabilitiesSection()
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateRobotSettingsSection(): array
    {
        $metaRobotsOptions = SeoConfig::getMetaRobotsOptions();
        $metaOptions = StepHelper::generateTranslatedListBoxValues($metaRobotsOptions);
        return [
            "title" => "Wizard.robotSettings",
            "description" => "Wizard.robotSettingsDescription",
            "form" => [
                "seo_robotsHome" => [
                    "type" => "select",
                    "defaultValue" => $metaOptions[0]["value"],
                    "options" => [
                        "name" => "Wizard.robotsHomePage",
                        "listBoxValues" => $metaOptions
                    ]
                ],
                "seo_robotsContact" => [
                    "type" => "select",
                    "defaultValue" => $metaOptions[0]["value"],
                    "options" => [
                        "name" => "Wizard.robotsContactPage",
                        "listBoxValues" => $metaOptions
                    ]
                ],
                "seo_robotsCancelRights" => [
                    "type" => "select",
                    "defaultValue" => $metaOptions[0]["value"],
                    "options" => [
                        "name" => "Wizard.robotsCancelRights",
                        "listBoxValues" => $metaOptions
                    ]
                ],
                "seo_robotsCancelForm" => [
                    "type" => "select",
                    "defaultValue" => $metaOptions[0]["value"],
                    "options" => [
                        "name" => "Wizard.robotsCancelForm",
                        "listBoxValues" => $metaOptions
                    ]
                ],
                "seo_robotsLegalDisclosure" => [
                    "type" => "select",
                    "defaultValue" => $metaOptions[0]["value"],
                    "options" => [
                        "name" => "Wizard.robotsLegalDisclosure",
                        "listBoxValues" => $metaOptions
                    ]
                ],
                "seo_robotsPrivacyPolicy" => [
                    "type" => "select",
                    "defaultValue" => $metaOptions[0]["value"],
                    "options" => [
                        "name" => "Wizard.robotsPrivacyPolicy",
                        "listBoxValues" => $metaOptions
                    ]
                ],
                "seo_robotsTermsAndConditions" => [
                    "type" => "select",
                    "defaultValue" => $metaOptions[0]["value"],
                    "options" => [
                        "name" => "Wizard.robotsTermsAndConditions",
                        "listBoxValues" => $metaOptions
                    ]
                ],
                "seo_robotsSearchResult" => [
                    "type" => "select",
                    "defaultValue" => $metaOptions[0]["value"],
                    "options" => [
                        "name" => "Wizard.robotsSearchResult",
                        "listBoxValues" => $metaOptions
                    ]
                ],
                "seo_paginationNoIndex" => [
                    "type" => "text",
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
    private function generateAvailabilitiesSection(): array
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
    private function generateAvailabilitiesFormFields($availabilities): array
    {
        $formFields = [];
        $availabilitiesOptions = SeoConfig::getAvailabilitiesOptions();
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

    public function generateRobotsTxtSection(): array
    {

        $robotsDefault = 'User-agent: *'.chr(10);
        $robotsDefault .= 'Disallow: /plenty/'.chr(10);
        $robotsDefault .= 'Allow: /plenty/api/external.php'.chr(10);
        $robotsDefault .= 'Disallow: /xml/'.chr(10);
        $robotsDefault .= 'Sitemap: '.DOM_SSL.'/sitemap.xml'.chr(10);

        return [
            "title" => "Wizard.robotsTxt",
            "description" => "Wizard.robotsTxtDescription",
            "condition" => $this->globalsCondition,
            "form" => [
                "seo_robotsTxt" => [
                    "type" => "textarea",
                    "defaultValue" => $robotsDefault,
                    "options" => [
                        "name" => "Wizard.robotsTxt",
                        "maxRows" => 15,
                    ]
                ]
            ]
        ];
    }
}