<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 05/07/2019
 * Time: 11:56
 */

namespace Ceres\Wizard\ShopWizard\DynamicLoaders;

use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;
use Plenty\Modules\Wizard\Contracts\WizardDynamicLoader;

class ShopWizardDynamicLoader implements WizardDynamicLoader
{

    /**
     * @param array $parameters
     * @return array
     */
    public function retrieveLocationData(array $parameters)
    {
        // Do something with $parameters

        // Build the structure
//        $formfieldStructure = [
//            "type" => "text",
//            "options" => [
//                "name" => $parameters['exampleTitle'] ?? 'Failure'
//            ]
//        ];

        // return formfield structure
        return [];
    }

    public function retrieveActiveLanguages(array $parameters)
    {
        $languages = LanguagesHelper::getTranslatedLanguages();
        $activeLanguagesList = $this->buildListBoxData($languages);
        $defaultValue = $activeLanguagesList[0]['value'];

        $formFieldStructure = [
            "type" => "select",
            "defaultValue" => $defaultValue,
            "options" => [
                "name" => "Wizard.defaultBrowserLanguage",
                'listBoxValues' => $activeLanguagesList
            ]
        ];

        return $formFieldStructure;
    }


    private function buildListBoxData($data, $captionColumn = false, $valColumn = false)
    {
        $listBoxValues = [];
        if (count($data)) {
            foreach ($data as $itemKey => $itemVal) {
                $valData = is_object($itemVal) ? $itemVal->toArray() : $itemVal;
                $caption = $captionColumn ? $valData[$captionColumn] : $valData;
                $value = $valColumn ? $valData[$valColumn] : $itemKey;

                $listBoxValues[] = [
                    "caption" => $caption,
                    "value" => $value
                ];
            }
        }

        return $listBoxValues;
    }
}