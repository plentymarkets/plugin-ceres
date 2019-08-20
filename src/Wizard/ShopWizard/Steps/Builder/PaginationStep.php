<?php

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Config\PaginationConfig;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;

/**
 * Class PaginationStep
 * @package Ceres\Wizard\ShopWizard\Steps\Builder
 */
class PaginationStep extends Step
{
    /**
     * @return array
     */
    public function generateStep():array
    {
        return [
            "title" => "Wizard.paginationStep",
            "description" => "Wizard.paginationStepDescription",
            "condition" => " (typeof settingsSelection_paginationSorting === 'undefined' ||" .
                           " settingsSelection_paginationSorting === true) && "
                           . $this->hasRequiredSettings(),
            "sections" => [
                $this->generatePaginationSection(),
                $this->generateSortingSection(),
                $this->generateRecommendedSortingSection()
            ]
        ];
    }

    /**
     * @return array
     */
    private function generatePaginationSection():array
    {
        $paginationPositions = PaginationConfig::getPaginationPositions();
        $paginationPositionOptions = StepHelper::generateTranslatedListBoxValues($paginationPositions);

        //$rowsPerPage = PaginationConfig::getRowsPerPage();
        //$rowsPerPageOptions = StepHelper::generateTranslatedListBoxValues($rowsPerPage);

        return [
            "title" => "Wizard.paginationSettings",
            "description" => "Wizard.paginationSettingsDescription",
            "form" => [
                "paginationStep_displayPagination" => [
                    "type" => "select",
                    "defaultValue" => $paginationPositionOptions[0]['value'],
                    "options" => [
                        "name" => "Wizard.displayPagination",
                        "listBoxValues" => $paginationPositionOptions
                    ]
                ],
                "paginationStep_showFirstPage" => [
                    "type" => "checkbox",
                    "defaultValue" => false,
                    "options" => [
                        "name" => "Wizard.paginationShowFirstPage",
                    ]
                ],
                "paginationStep_showLastPage" => [
                    "type" => "checkbox",
                    "defaultValue" => false,
                    "options" => [
                        "name" => "Wizard.paginationShowLastPage",
                    ]
                ],
//                "paginationStep_columnsPerPage" => [
//                    "type" => "select",
//                    "defaultValue" => $paginationPositionOptions[0]['value'],
//                    "options" => [
//                        "name" => "Wizard.paginationColumnsPerPage",
//                        "listBoxValues" => $paginationPositionOptions
//                    ]
//                ],
//                "paginationStep_rowsPerPage" => [
//                    "type" => "checkboxGroup",
//                    "defaultValue" => [
//                        $rowsPerPageOptions[0]["value"],
//                        $rowsPerPageOptions[1]["value"],
//                        $rowsPerPageOptions[4]["value"],
//                    ],
//                    "options" =>[
//                        "name" => "Wizard.paginationRowsPerPage",
//                        "checkboxValues" => $rowsPerPageOptions
//                    ]
//                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateSortingSection():array
    {
        $itemSortingByRules = PaginationConfig::getItemSortingByRules();
        $itemSortingOptions = StepHelper::generateTranslatedListBoxValues($itemSortingByRules);

        return [
            "title" => "Wizard.sortingSettings",
            "description" => "Wizard.sortingSettingsDescription",
            "form" => [
                "pagination_itemSortBy" => [
                    "type" => "checkboxGroup",
                    "defaultValue" => [
                        $itemSortingOptions[3]["value"],
                        $itemSortingOptions[4]["value"],
                        $itemSortingOptions[5]["value"],
                        $itemSortingOptions[6]["value"],
                    ],
                    "options" => [
                        "name" => "Wizard.itemSortingBy",
                        "checkboxValues" => $itemSortingOptions
                    ]
                ],
                "pagination_defaultSorting" => [
                    "type" => "select",
                    "defaultValue" => $itemSortingOptions[3]["value"],
                    "options" => [
                        "name" => "Wizard.defaultSorting",
                        "listBoxValues" => $itemSortingOptions
                    ]
                ]
            ]
        ];
    }
    
    /**
     * @return array
     */
    private function generateRecommendedSortingSection():array
    {
        $sortingRules           = PaginationConfig::getSortingCategoryRules();
        $categorySortingOptions = StepHelper::generateTranslatedListBoxValues($sortingRules);

        $secondSortingRules = PaginationConfig::getSecondSortingCategoryRules();
        $secondCatOptions   = StepHelper::generateTranslatedListBoxValues($secondSortingRules);
        
        return [
            "title" => "Wizard.recommendedSortingSettings",
            "description" => "Wizard.recommendedSortingSettingsDescription",
            "form" => [
                "pagination_sortingCat1" => [
                    "type" => "select",
                    "defaultValue" => $categorySortingOptions[2]["value"],
                    "options" => [
                        "name" => "Wizard.sortingCategory1",
                        "listBoxValues" => $categorySortingOptions
                    ]
                ],
                "pagination_sortingCat2" => [
                    "type" => "select",
                    "defaultValue" => $secondCatOptions[0]["value"],
                    "options" => [
                        "name" => "Wizard.sortingCategory2",
                        "listBoxValues" => $secondCatOptions
                    ]
                ],
                "pagination_sortingCat3" => [
                    "type" => "select",
                    "defaultValue" => $secondCatOptions[0]["value"],
                    "options" => [
                        "name" => "Wizard.sortingCategory3",
                        "listBoxValues" => $secondCatOptions
                    ]
                ],
            ]
        ];
    }
}
