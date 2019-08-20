<?php

namespace Ceres\Wizard\ShopWizard\DynamicLoaders;

use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;
use Plenty\Modules\Accounting\Contracts\AccountingLocationRepositoryContract;
use Plenty\Modules\Wizard\Contracts\WizardDynamicLoader;
use Plenty\Plugin\Translation\Translator;

class ShopWizardDynamicLoader implements WizardDynamicLoader
{
    /**
     * @var Translator
     */
    private $translator;

    /**
     * @var array
     */
    private $languages;

    /**
     * ShopWizardDynamicLoader constructor.
     *
     * @param Translator $translator
     */
    public function __construct(Translator $translator)
    {
        $this->translator = $translator;
        $this->languages = LanguagesHelper::getTranslatedLanguages();
    }

    /**
     * @param array $parameters
     *
     * @return array
     */
    public function getRelatedLocations(array $parameters): array
    {
        $currentFormField = $this->getCurrentFormField($parameters["plentyMarkets"]);
        $translationKey = end(explode("_", $currentFormField));
        $locationsRepo = pluginApp(AccountingLocationRepositoryContract::class);
        $locations = $locationsRepo->listByPlentyId($parameters['client']);
        $locationsList = StepHelper::buildListBoxData($locations, "name", "id");

        return [
            "type" => "select",
            "options" => [
                "name" => $this->translator->trans("Ceres::Wizard.{$translationKey}"),
                "listBoxValues" => $locationsList
            ],
        ];
    }

    /**
     * @param string $param
     *
     * @return string
     */
    private function getCurrentFormField(string $param): string
    {
        $currentFormField = end(explode("/", $param));

        return $currentFormField;
    }

    /**
     * @param array $activeList
     * @param array $parameters
     *
     * @return array
     */
    private function getActiveLanguagesList(array $activeList, array $parameters): array
    {
        $selectedActiveLanguages = $parameters['languages_activeLanguages'];

        if(count($selectedActiveLanguages)) {
            foreach($selectedActiveLanguages as $selLang) {
                $activeList[] = [
                    "caption" => $this->languages[$selLang],
                    "value" => $selLang
                ];
            }
        }

        return $activeList;
    }

    /**
     * @param array $activeLanguages
     * @param string $currentFormField
     *
     * @return string
     */
    private function getActiveLanguagesDefaultValue(array $activeLanguages, string $currentFormField): string
    {
        $defaultValue = "";

        if(count($activeLanguages)) {
            foreach ($activeLanguages as $selLang) {
                $key = "languages_browserLang_" . $selLang;

                if($key == $currentFormField) {
                    $defaultValue = $selLang;
                }
            }
        }

        return $defaultValue;
    }

    /**
     * @param array $parameters
     *
     * @return array
     */
    public function retrieveActiveLanguages(array $parameters): array
    {
        $activeLangList = [];

        $currentFormField = $this->getCurrentFormField($parameters["plentyMarkets"]);

        if($currentFormField != 'languages_defaultBrowserLang') {
            $activeLangList[] = [
                "caption" => $this->translator->trans("Ceres::Wizard.noChange"),
                "value" => ""
            ];
        }

        $defaultValue = $this->getActiveLanguagesDefaultValue($parameters['languages_activeLanguages'], $currentFormField);

        $activeList = $this->getActiveLanguagesList($activeLangList, $parameters);

        // we generate translation key for current form field

        foreach($this->languages as $langKey => $language){
            $field = "languages_browserLang_{$langKey}";
            if ($currentFormField == $field) {
                $translationKey = "browserLang" . ucfirst($langKey);
            }
        }

        if($currentFormField == "languages_defaultBrowserLang") {
            $translationKey = "defaultBrowserLanguage";
            $defaultValue = "de";
        }


        $formFieldStructure = [
            "type" => "select",
            "defaultValue" => $defaultValue,
            "isVisible" => "typeof languages_setLinkedStoreLanguage ==='undefined' ||languages_setLinkedStoreLanguage === true",
            "options" => [
                "name" => $this->translator->trans("Ceres::Wizard.{$translationKey}"),
                'listBoxValues' => $activeList
            ]
        ];

        return $formFieldStructure;
    }

    /**
     * @param array $parameters
     *
     * @return array
     */
    public function getSearchActiveLanguages(array $parameters): array
    {
        $currentFormField = $this->getCurrentFormField($parameters["plentyMarkets"]);
        $translationKey = end(explode("_", $currentFormField));

        $notSelected = [
            [
                "caption" => $this->translator->trans("Ceres::Wizard.notSelected"),
                "value" => ""
            ]
        ];

        $languageList = $this->getActiveLanguagesList($notSelected, $parameters);

        return [
            "type" => "select",
            "options" => [
                "name" => $this->translator->trans("Ceres::Wizard.{$translationKey}"),
                'listBoxValues' => $languageList
            ]
        ];
    }


}
