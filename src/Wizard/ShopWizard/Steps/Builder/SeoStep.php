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
use Plenty\Modules\System\Contracts\WebstoreConfigurationRepositoryContract;
use Plenty\Plugin\Application;

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
            "condition" => " (typeof settingsSelection_seo === 'undefined' || " .
                "settingsSelection_seo === true) && " . $this->hasRequiredSettings(),
            "sections" => [
                $this->generateRobotSettingsSection(),
                $this->generateRobotsTxtSection(),
                $this->generateSiteMapSection(),
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

    /**
     * @return array
     */
    public function generateRobotsTxtSection(): array
    {
        $webstoreConfig = pluginApp(WebstoreConfigurationRepositoryContract::class);
        $app = pluginApp(Application::class);
        $currentConfig = $webstoreConfig->findByWebstoreId($app->getWebstoreId())->toArray();

        $robotsDefault = 'User-agent: *'.chr(10);
        $robotsDefault .= 'Disallow: /plenty/'.chr(10);
        $robotsDefault .= 'Allow: /plenty/api/external.php'.chr(10);
        $robotsDefault .= 'Disallow: /xml/'.chr(10);
        $robotsDefault .= 'Sitemap: '. $currentConfig['domainSsl'] .'/sitemap.xml'.chr(10);

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

    /**
     * @return array
     */
    public function generateSiteMapSection(): array
    {
        $siteMapData = SeoConfig::getSiteMapOptions();
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
}