<?php

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Config\LogConfig;
use Ceres\Wizard\ShopWizard\Config\PerformanceConfig;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;

/**
 * Class PerformanceStep
 * @package Ceres\Wizard\ShopWizard\Steps\Builder
 */
class PerformanceStep extends Step
{
    /**
     * @return array
     */
    public function generateStep():array
    {
        return [
            "title" => "Wizard.performanceSettings",
            "description" => "Wizard.performanceSettingsDescription",
            "condition" => " (typeof settingsSelection_performance === 'undefined' ||"
                          ." settingsSelection_performance === true) && "
                          . $this->hasRequiredSettings(),
            "sections" => [
                $this->generateShopBoosterSection(),
                $this->generateLoggingOptionsSection(),
                $this->generatePerformanceSection()
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateShopBoosterSection():array
    {
        return [
            "title" => "Wizard.shopBooster",
            "description" => "Wizard.shopBoosterDescription",
            "condition" => $this->globalsCondition,
            "form" => [
                "performance_shopBooster" => [
                    "type" => "toggle",
                    "defaultValue" => false,
                    "options" => [
                        "name" =>  "Wizard.activateShopBooster"
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateLoggingOptionsSection():array
    {
        $loggingLevels    = LogConfig::getLoggingLevels();
        $logLevelsOptions = StepHelper::generateTranslatedListBoxValues($loggingLevels);

        return [
            "title" => "Wizard.loggingOptions",
            "description" => "Wizard.loggingOptionsDescription",
            "form" => [
                "performance_loggingOptions" => [
                    "type" => "checkboxGroup",
                    "defaultValue" => [
                        $logLevelsOptions[0]['value'],
                        $logLevelsOptions[1]['value'],
                        $logLevelsOptions[2]['value']
                    ],
                    "options" => [
                        "name" =>  "Wizard.loggingOptions",
                        "checkboxValues" => $logLevelsOptions
                    ]
                ]
            ]
        ];
    }
    
    /**
     * @return array
     */
    private function generatePerformanceSection():array
    {
        $performanceLevels        = PerformanceConfig::getPerformanceLevels();
        $performanceLevelsOptions = StepHelper::generateTranslatedListBoxValues($performanceLevels);
        
        return [
            "title" => "Wizard.performanceLevel",
            "description" => "Wizard.performanceLevelDescription",
            "form" => [
                "performance_logPerformanceLevel" => [
                    "type" => "select",
                    "defaultValue" => $performanceLevelsOptions[1]['value'],
                    "options" => [
                        "name" => "Wizard.performanceLevel",
                        "listBoxValues" => $performanceLevelsOptions
                    ]
                ],
                "performance_errorCheck" => [
                    "type" => "checkbox",
                    "default" => true,
                    "options" => [
                        "name" => "Wizard.performanceErrorCheck"
                    ]
                ]
            ]
        ];
    }
}
