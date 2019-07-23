<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 19/07/2019
 * Time: 10:11
 */

namespace Ceres\Wizard\ShopWizard\Steps\Builder;


use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;

class LanguagesStep extends Step
{
    private $languages;

    public function __construct()
    {
        $languages = LanguagesHelper::getTranslatedLanguages();
        $this->languages = $languages;

        parent::__construct();
    }
    public function generateStep(): array
    {
        return [
            "title" => "Wizard.languagesSettings",
            "description" => "Wizard.languagesSettingsDescription",
            "condition" => " typeof settingsSelection_languages === 'undefined' || settingsSelection_languages === true",
            "sections" => [
                $this->generateActiveLanguagesSection(),
                $this->generateAutomaticLanguageSection()
            ]
        ];
    }

    private function generateActiveLanguagesSection(): array
    {

        $languagesOptions = $this->buildListBoxData($this->languages);
        return [
            "title" => "Wizard.activeLanguages",
            "description" => "Wizard.activeLanguagesDescription",
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

    private function generateAutomaticLanguageSection(): array
    {

        return [
            "title" => "Wizard.automaticLanguageRecognition",
            "form" => $this->generateFormLanguagesSelection()
        ];
    }


    private function generateFormLanguagesSelection(): array
    {
        $languages = LanguagesHelper::getTranslatedLanguages();
        $activeLanguagesList = $this->buildListBoxData($languages);
        $defaultValue = $activeLanguagesList[0]['value'];

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
                "options" => [
                    "name" => "Wizard.defaultBrowserLanguage",
                ]
            ],
            "language_defaultStaticBrowserLang" => [
                "type" => "select",
                "defaultValue" => $defaultValue,
                "options" => [
                    "name" => "Default Browser Static",
                    'listBoxValues' => $activeLanguagesList
                ]
            ]
        ];

        return $formFields;
    }
}