<?php

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Config\LogConfig;
use Ceres\Wizard\ShopWizard\Config\PerformanceConfig;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;
use Plenty\Modules\System\Module\Contracts\PlentyModuleRepositoryContract;

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
        $step = [
            "title" => "Wizard.performanceSettings",
            "description" => "Wizard.performanceSettingsDescription",
            "condition" => " (typeof settingsSelection_performance === 'undefined' ||"
                          ." settingsSelection_performance === true) && "
                          . $this->hasRequiredSettings(),
            "sections" => [
                $this->generateSsrSection(),
                $this->generateLoggingOptionsSection(),
                $this->generatePerformanceSection(),
                $this->generatePerformanceEventPropagationSection()
            ]
        ];
        
        if ($this->isModuleS3Active()) {
            array_unshift($step["sections"], $this->generateShopBoosterSection());
        }
        
        return $step;
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
    
    private function generateSsrSection():array
    {
        return [
            "title" => "Wizard.ssr",
            "description" => "Wizard.ssrDescription",
            "form" => [
                "performance_ssr" => [
                    "type" => "toggle",
                    "defaultValue" => false,
                    "options" => [
                        "name" =>  "Wizard.activateSsr"
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

    /**
     * @return array
     */
    private function generatePerformanceEventPropagationSection():array
    {
        return [
            "title" => "Wizard.performanceEventPropagationTitle",
            "description" => "Wizard.performanceEventPropagationDescription",
            "form" => [
                "performance_eventPropagation" => [
                    "type" => "checkbox",
                    "default" => true,
                    "options" => [
                        "name" => "Wizard.performanceEventPropagation"
                    ]
                ]
            ]
        ];
    }
    
    private function isModuleS3Active()
    {
        /** @var PlentyModuleRepositoryContract $moduleRepo */
        $moduleRepo = pluginApp(PlentyModuleRepositoryContract::class);
        return $moduleRepo->isActive('cdn.contentCache.s3');
    }
}
