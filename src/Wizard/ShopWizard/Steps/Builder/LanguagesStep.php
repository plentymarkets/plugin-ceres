<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 19/07/2019
 * Time: 10:11
 */

namespace Ceres\Wizard\ShopWizard\Steps\Builder;


use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;

class LanguagesStep extends Step
{
    /**
     * @var array
     */
    private $languages;

    /**
     * LanguagesStep constructor.
     */
    public function __construct()
    {
        $languages = LanguagesHelper::getTranslatedLanguages();
        $this->languages = $languages;

        parent::__construct();
    }

    /**
     * @return array
     */
    public function generateStep(): array
    {
        return [
            "title" => "Wizard.languagesSettings",
            "description" => "Wizard.languagesSettingsDescription",
            "condition" => " typeof settingsSelection_languages === 'undefined' || settingsSelection_languages === true",
            "sections" => [
                $this->generateActiveLanguagesSection(),
                //$this->generateAutomaticLanguageSection(),
                //we not use this until we have access in plugin to needed contracts
                //$this->generateSearchLanguagesSection()
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateActiveLanguagesSection(): array
    {

        $languagesOptions = StepHelper::buildListBoxData($this->languages);
        return [
            "title" => "Wizard.activeLanguages",
            "description" => "Wizard.activeLanguagesDescription",
            "condition" => $this->globalsCondition,
            "form" => [
                "languages_activeLanguages" => [
                    "type" => "checkboxGroup",
                    "defaultValue" => [
                        $languagesOptions[0]['value']
                    ],
                    "options" => [
                        "name" => "Wizard.activeLanguages",
                        "checkboxValues" => $languagesOptions
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateAutomaticLanguageSection(): array
    {

        return [
            "title" => "Wizard.automaticLanguageRecognition",
            "condition" => $this->globalsCondition,
            "form" => $this->generateFormLanguagesSelection()
        ];
    }

    /**
     * @return array
     */
    private function generateFormLanguagesSelection(): array
    {

        $formFields = [
            "languages_setLinkedStoreLanguage" => [
                "type" => "toggle",
                "defaultValue" => false,
                "options" => [
                    "name" => "Wizard.setLinkedStoreLanguage"
                ]
            ],
            "languages_defaultBrowserLang" => [
                "dependencies" => ['languages_activeLanguages'],
                "dependencyMethod" => "retrieveActiveLanguages",
                "type" => "select",
                "isVisible" => "typeof languages_setLinkedStoreLanguage ==='undefined' ||languages_setLinkedStoreLanguage === true",
                "options" => [
                    "name" => "Wizard.defaultBrowserLanguage",
                    'listBoxValues' => []
                ]
            ]
        ];

        $finalFormFields = $this->generateLanguagesFormFields($formFields);

        return $finalFormFields;
    }

    /**
     * @param array $formFields
     *
     * @return array
     */
    private function generateLanguagesFormFields(array $formFields): array
    {

        foreach ($this->languages as $langKey => $language) {
            $key = "languages_browserLang_{$langKey}";
            $translateKey = "browserLang" . ucfirst($langKey);
            $formFields[$key] = [
                "dependencies" => ['languages_activeLanguages'],
                "dependencyMethod" => "retrieveActiveLanguages",
                "type" => "select",
                "isVisible" => "typeof languages_setLinkedStoreLanguage ==='undefined' ||languages_setLinkedStoreLanguage === true",
                "options" => [
                    "name" => "Wizard.{$translateKey}",
                    "listBoxValues" => []
                ]
            ];
        }

        return $formFields;
    }

    /**
     * @return array
     */
    private function generateSearchLanguagesSection(): array
    {
        return [
            "title" => "Wizard.searchLanguages",
            "description" => "Wizard.searchLanguagesDescription",
            "form" => [
                "languages_firstSearchLanguage" => [
                    "dependencies" => ['languages_activeLanguages'],
                    "dependencyMethod" => "getSearchActiveLanguages",
                    "type" => "select",
                    "options" => [
                        "name" => "Wizard.firstSearchLanguage",
                        "listBoxValues" => []
                    ]
                ],
                "languages_secondSearchLanguage" => [
                    "dependencies" => ['languages_activeLanguages'],
                    "dependencyMethod" => "getSearchActiveLanguages",
                    "type" => "select",
                    "options" => [
                        "name" => "Wizard.secondSearchLanguage",
                        "listBoxValues" => []
                    ]
                ],
                "languages_thirdSearchLanguage" => [
                    "dependencies" => ['languages_activeLanguages'],
                    "dependencyMethod" => "getSearchActiveLanguages",
                    "type" => "select",
                    "options" => [
                        "name" => "Wizard.thirdSearchLanguage",
                        "listBoxValues" => []
                    ]
                ],
            ]
        ];
    }
}