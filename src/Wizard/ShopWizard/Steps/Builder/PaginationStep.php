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
    public function generateStep(): array
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
                $this->generateRecommendedSortingSection(),
                $this->generateAdditionalSortingOption(),
                $this->generateDynamicSortingOption()
            ]
        ];
    }

    /**
     * @return array
     */
    private function generatePaginationSection(): array
    {
        $paginationPositions = PaginationConfig::getPaginationPositions();
        $paginationPositionOptions = StepHelper::generateTranslatedListBoxValues($paginationPositions);

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
                "paginationStep_itemsPerPage" => [
                    "type" => "text",
                    "options" => [
                        "name" => "Wizard.paginationItemsPerPage"
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateSortingSection(): array
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
    private function generateRecommendedSortingSection(): array
    {
        $sortingRules = PaginationConfig::getSortingCategoryRules();
        $categorySortingOptions = StepHelper::generateTranslatedListBoxValues($sortingRules);

        $secondSortingRules = PaginationConfig::getSecondSortingCategoryRules();
        $secondCatOptions = StepHelper::generateTranslatedListBoxValues($secondSortingRules);

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

    /**
     * @return array
     */
    private function generateAdditionalSortingOption(): array
    {
        return [
            "title" => "Wizard.additionalSortingOption",
            "description" => "Wizard.additionalSortingOptionDescription",
            "form" => [
                "pagination_sortingMonthlySales" => [
                    "type" => "select",
                    "defaultValue" => 0,
                    "options" => [
                        "name" => "Wizard.monthlySales",
                        "listBoxValues" => [
                            [
                                "value" => 0,
                                "caption" => "Wizard.inactive"
                            ],
                            [
                                "value" => 1,
                                "caption" => "Wizard.active"
                            ],
                        ]
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateDynamicSortingOption(): array
    {
        $itemSortingByRules = PaginationConfig::getDynamicSortingRules();
        $itemSortingOptions = StepHelper::generateTranslatedListBoxValues($itemSortingByRules);

        $itemSortingInheritByRules = PaginationConfig::getDynamicInheritSortingRules();
        $itemSortingInheritOptions = StepHelper::generateTranslatedListBoxValues($itemSortingInheritByRules);

        return [
            "title" => "Wizard.dynamicSortingOption",
            "description" => "Wizard.dynamicSortingOptionDescription",
            "form" => [
                "pagination_sortingDynamicInherit" => [
                    "type" => "checkboxGroup",
                    "defaultValue" => [],
                    "options" => [
                        "name" => "Wizard.dynamicInherit",
                        "checkboxValues" => $itemSortingInheritOptions
                    ]
                ],
                "pagination_sortingDynamicPrio1" => [
                    "type" => "select",
                    "defaultValue" => $itemSortingOptions[1]["value"],
                    "options" => [
                        "name" => "Wizard.dynamicPrio1",
                        "listBoxValues" => $itemSortingOptions
                    ]
                ],
                "pagination_sortingDynamicPrio2" => [
                    "type" => "select",
                    "defaultValue" => $itemSortingOptions[9]["value"],
                    "options" => [
                        "name" => "Wizard.dynamicPrio2",
                        "listBoxValues" => $itemSortingOptions
                    ]
                ]
            ]
        ];
    }
}
