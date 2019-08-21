<?php

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Config\SearchConfig;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;

/**
 * Class SearchStep
 * @package Ceres\Wizard\ShopWizard\Steps\Builder
 */
class SearchStep extends Step
{
    /**
     * @return array
     */
    public function generateStep():array
    {
        return [
            "title" => "Wizard.searchStep",
            "description" => "Wizard.searchStepDescription",
            "condition" => " (typeof settingsSelection_search === 'undefined' ||" .
                           " settingsSelection_search === true) && "
                           . $this->globalsCondition . " && " . $this->hasRequiredSettings(),
            "sections" => [
                $this->generateDefaultSortingSection(),
                $this->generateSearchFieldsSection(),
                $this->generateRecommendedSearchSortingSection()
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateDefaultSortingSection():array
    {
        //default sorting search options
        $defaultSortingSearchOptions = SearchConfig::getSortingSearchDefaultOptions();
        $defaultSearchOptionsList    = StepHelper::generateTranslatedListBoxValues($defaultSortingSearchOptions);

        return [
            "title" => "Wizard.searchDefaultSorting",
            "description" => "Wizard.searchDefaultSortingDescription",
            "condition" => $this->globalsCondition,
            "form" => [
                "search_defaultSortingSearch" => [
                    "type" => "select",
                    "defaultValue" => $defaultSearchOptionsList[0]['value'],
                    "options" => [
                        "name" => "Wizard.defaultSearchSorting",
                        "listBoxValues" => $defaultSearchOptionsList
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateSearchFieldsSection():array
    {
        return [
            "title" => "Wizard.searchFields",
            "description" => "Wizard.searchFieldsDescription",
            "condition" => $this->globalsCondition,
            "form" => $this->getSearchFields()
        ];
    }

    /**
     * @return array
     */
    private function getSearchFields():array
    {
        $formFields = [];
        
        $searchFieldsOptions     = SearchConfig::getSearchFieldsOptions();
        $searchFieldsOptionsList = StepHelper::generateTranslatedListBoxValues($searchFieldsOptions);

        if (count($searchFieldsOptions)) {
            $i = 1;
            foreach ($searchFieldsOptions as $fieldKey => $fieldValue) {
                if (empty($fieldValue)) {
                    continue;
                }

                if ($i) {
                    switch ($i) {
                        case 1:
                            $translationKey = "firstSearchField";
                            break;
                        case 2:
                            $translationKey = "secondSearchField";
                            break;
                        case 3:
                            $translationKey = "thirdSearchField";
                            break;
                        default:
                            $translationKey = "{$i}thSearchField";

                    }

                    $key = "search_{$translationKey}";
                    $formFields[$key] =[
                        "type" => "select",
                        "options" => [
                            "name" => "Wizard.{$translationKey}",
                            "listBoxValues" => $searchFieldsOptionsList
                        ]
                    ];
                }
                $i++;
            }
        }

        return $formFields;
    }

    /**
     * @return array
     */
    private function generateRecommendedSearchSortingSection():array
    {
        //first sorting search options
        $firstSortingSearchOptions = SearchConfig::getSortingFirstSearchOptions();
        $firstSearchOptionsList    = StepHelper::generateTranslatedListBoxValues($firstSortingSearchOptions);

        //other sorting search options
        $otherSortingSearchOptions = SearchConfig::getSortingOtherSearchOptions();
        $otherSearchOptionsList    = StepHelper::generateTranslatedListBoxValues($otherSortingSearchOptions);

        return [
            "title" => "Wizard.searchRecommendedSorting",
            "description" => "Wizard.searchRecommendedSortingDescription",
            "condition" => $this->globalsCondition,
            "form" => [
                "search_prioritySearch1" => [
                    "type" => "select",
                    "defaultValue" => $firstSearchOptionsList[0]['value'],
                    "options" => [
                        "name" => "Wizard.firstSearchSorting",
                        "listBoxValues" => $firstSearchOptionsList
                    ]
                ],
                "search_prioritySearch2" => [
                    "type" => "select",
                    "defaultValue" => $otherSearchOptionsList[0]['value'],
                    "options" => [
                        "name" => "Wizard.secondSearchSorting",
                        "listBoxValues" => $otherSearchOptionsList
                    ]
                ],
                "search_prioritySearch3" => [
                    "type" => "select",
                    "defaultValue" => $otherSearchOptionsList[0]['value'],
                    "options" => [
                        "name" => "Wizard.thirdSearchSorting",
                        "listBoxValues" => $otherSearchOptionsList
                    ]
                ],
            ]
        ];
    }
}
