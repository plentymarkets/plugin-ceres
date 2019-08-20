<?php

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;

/**
 * Class LanguagesStep
 * @package Ceres\Wizard\ShopWizard\Steps\Builder
 */
class LanguagesStep extends Step
{
    /**
     * @var array
     */
    private $languages;

    /**
     * @var array
     */
    private $languagesOptions;

    /**
     * LanguagesStep constructor.
     */
    public function __construct()
    {
        $this->languages = LanguagesHelper::getTranslatedLanguages();
        $this->languagesOptions = StepHelper::buildListBoxData($this->languages);

        parent::__construct();
    }

    /**
     * @return array
     */
    public function generateStep():array
    {
        return [
            "title" => "Wizard.languagesSettings",
            "description" => "Wizard.languagesSettingsDescription",
            "condition" => " (typeof settingsSelection_languages === 'undefined' ||".
                           " settingsSelection_languages === true) && "
                           . $this->globalsCondition . " && " . $this->hasRequiredSettings(),
            "sections" => [
                $this->generateActiveLanguagesSection(),
                $this->generateAutomaticLanguageSection(),
                $this->generateSearchLanguagesSection()
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateActiveLanguagesSection():array
    {
        return [
            "title" => "Wizard.activeLanguages",
            "description" => "Wizard.activeLanguagesDescription",
            "condition" => $this->globalsCondition,
            "form" => [
                "languages_activeLanguages" => [
                    "type" => "checkboxGroup",
                    "defaultValue" => [
                        $this->languagesOptions[0]['value']
                    ],
                    "options" => [
                        "name" => "Wizard.activeLanguages",
                        "checkboxValues" => $this->languagesOptions
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateAutomaticLanguageSection():array
    {
        return [
            "title"       => "Wizard.automaticLanguageRecognition",
            "description" => "Wizard.automaticLanguageRecognitionDescription",
            "condition"   => $this->globalsCondition,
            "form"        => $this->generateFormLanguagesSelection()
        ];
    }

    /**
     * @return array
     */
    private function generateFormLanguagesSelection():array
    {
        $languageOptions = StepHelper::buildListBoxData($this->languages);
        $formFields = [
            "languages_setLinkedStoreLanguage" => [
                "type" => "toggle",
                "defaultValue" => false,
                "options" => [
                    "name" => "Wizard.setLinkedStoreLanguage"
                ]
            ],
            "languages_defaultBrowserLang" => [
                "type" => "select",
                "defaultValue" => $languageOptions[0]['value'],
                "isVisible" => "typeof languages_setLinkedStoreLanguage ==='undefined' || languages_setLinkedStoreLanguage === true",
                "options" => [
                    "name" => "Wizard.defaultBrowserLanguage",
                    'listBoxValues' => $languageOptions
                ]
            ]
        ];

        array_unshift($languageOptions, [
            "caption" => "Wizard.noChange",
            "value" => ""
        ]);
        
        foreach ($this->languages as $langKey => $language) {
            $key = "languages_browserLang_{$langKey}";
            $translateKey = "browserLang" . ucfirst($langKey);
            $formFields[$key] = [
                "type" => "select",
                "defaultValue" => "",
                "isVisible" => "typeof languages_setLinkedStoreLanguage ==='undefined' || languages_setLinkedStoreLanguage === true",
                "options" => [
                    "name" => "Wizard.{$translateKey}",
                    "listBoxValues" => $languageOptions
                ]
            ];
        }

        return $formFields;
    }
    
    /**
     * @return array
     */
    private function generateSearchLanguagesSection():array
    {
        $languageOptions = $this->languagesOptions;
        array_unshift($languageOptions, [
            "caption" => "Wizard.noChange",
            "value" => ""
        ]);
        
        return [
            "title" => "Wizard.searchLanguages",
            "description" => "Wizard.searchLanguagesDescription",
            "form" => [
                "languages_firstSearchLanguage" => [
                    "type" => "select",
                    "defaultValue" => "",
                    "options" => [
                        "name" => "Wizard.firstSearchLanguage",
                        "listBoxValues" => $languageOptions
                    ]
                ],
                "languages_secondSearchLanguage" => [
                    "type" => "select",
                    "defaultValue" => "",
                    "options" => [
                        "name" => "Wizard.secondSearchLanguage",
                        "listBoxValues" => $languageOptions
                    ]
                ],
                "languages_thirdSearchLanguage" => [
                    "type" => "select",
                    "defaultValue" => "",
                    "options" => [
                        "name" => "Wizard.thirdSearchLanguage",
                        "listBoxValues" => $languageOptions
                    ]
                ],
            ]
        ];
    }
}
