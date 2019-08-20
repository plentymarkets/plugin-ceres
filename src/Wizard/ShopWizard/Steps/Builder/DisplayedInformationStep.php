<?php

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Config\ItemViewConfig;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;

/**
 * Class DisplayedInformationStep
 * @package Ceres\Wizard\ShopWizard\Steps\Builder
 */
class DisplayedInformationStep extends Step
{
    /**
     * @return array
     */
    public function generateStep():array
    {
        return [
            "title" => "Wizard.displayedInfoSettings",
            "description" => "Wizard.displayedInfoSettingsDescription",
            "condition" => " (typeof settingsSelection_displayedInfo === 'undefined' ||" .
                           " settingsSelection_displayedInfo === true) &&
                           " .$this->hasRequiredSettings(),
            "sections" => [
                $this->generateItemSection(),
                $this->generateDecimalPlacesSection(),
                $this->generateLoadingAnimationSection(),
                $this->generateCategoryView(),
                $this->generateItemView(),
                $this->generateShoppingCartView(),
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateItemSection():array
    {
        $itemDisplayOptions    = ItemViewConfig::getItemDisplayNames();
        $itemDisplayOptionList = StepHelper::generateTranslatedListBoxValues($itemDisplayOptions);

        $itemNameOptions    = ItemViewConfig::getItemNames();
        $itemNameOptionList = StepHelper::generateTranslatedListBoxValues($itemNameOptions);

        return [
            "title" => "Wizard.itemLook",
            "form" => [
                "displayInfo_itemDisplayName" => [
                    "type" => "select",
                    "defaultValue" => $itemDisplayOptionList[0]['value'],
                    "options" => [
                        "name" => "Wizard.itemDisplayName",
                        "listBoxValues" => $itemDisplayOptionList
                    ]
                ],
                "displayInfo_itemName" => [
                    "type" => "select",
                    "defaultValue" => $itemNameOptionList[0]['value'],
                    "options" => [
                        "name" => "Wizard.itemName",
                        "listBoxValues" => $itemNameOptionList
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateDecimalPlacesSection(): array
    {
        $itemDecimals    = ItemViewConfig::getItemDecimals();
        $itemDecimalList = StepHelper::generateTranslatedListBoxValues($itemDecimals);

        return [
            "title" => "Wizard.displayedInfoDecimals",
            "form" => [
                "displayInfo_numberOfDecimals" => [
                    "type" => "select",
                    "defaultValue" => $itemDecimalList[0]['value'],
                    "options" => [
                        "name" => "Wizard.numberOfDecimals",
                        "listBoxValues" => $itemDecimalList
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateLoadingAnimationSection():array
    {
        $loadingAnimationTypes = ItemViewConfig::getLoadingAnimationTypes();
        $loadingAnimationTypesList = StepHelper::generateTranslatedListBoxValues($loadingAnimationTypes);

        return [
            "title" => "Wizard.displayedInfoLoadingAnimation",
            "description" => "Wizard.displayedInfoLoadingAnimationDescription",
            "form" => [
                "displayInfo_loadingAnimation" => [
                    "type" => "select",
                    "defaultValue" => $loadingAnimationTypesList[0]['value'],
                    "options" => [
                        "name" => "Wizard.loadingAnimation",
                        "listBoxValues" => $loadingAnimationTypesList
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateCategoryView(): array
    {
        $variationTypes               = ItemViewConfig::getItemVariationTypes();
        $variationsTypesList          = StepHelper::generateTranslatedListBoxValues($variationTypes);
        $categoryDescriptionPositions = ItemViewConfig::getCategoryDescriptionPositions();
        $categoryDescriptionList      = StepHelper::generateTranslatedListBoxValues($categoryDescriptionPositions);

        return [
            "title" => "Wizard.displayedInfoCategoryViewType",
            "description" => "Wizard.displayedInfoCategoryViewTypeDescription",
            "form" => [
                "displayInfo_variationType" => [
                    "type" => "select",
                    "defaultValue" => $variationsTypesList[0]['value'],
                    "options" => [
                        "name" => "Wizard.variationType",
                        "listBoxValues" => $variationsTypesList
                    ]
                ],
                "displayInfo_showCategoryImage" => [
                    "type" => "checkbox",
                    "defaultValue" => true,
                    "options" => [
                        "name" => "Wizard.showCategoryImage",
                    ]
                ],
                "displayInfo_showDescriptionTop" => [
                    "type" => "select",
                    "defaultValue" => $categoryDescriptionList[1]['value'],
                    "options" => [
                        "name" => "Wizard.categoryDescriptionAbove",
                        "listBoxValues" => $categoryDescriptionList
                    ]
                ],
                "displayInfo_showDescriptionBottom" => [
                    "type" => "select",
                    "defaultValue" => $categoryDescriptionList[0]['value'],
                    "options" => [
                        "name" => "Wizard.categoryDescriptionBelow",
                        "listBoxValues" => $categoryDescriptionList
                    ]
                ],
                "displayInfo_enableImageCarousel" => [
                    "type" => "checkbox",
                    "defaultValue" => true,
                    "options" => [
                        "name" => "Wizard.enableImageCarousel",
                    ]
                ],
                "displayInfo_showCarouselDots" => [
                    "type" => "checkbox",
                    "defaultValue" => false,
                    "isVisible" => "!!displayInfo_enableImageCarousel",
                    "options" => [
                        "name" => "Wizard.showCarouselDots",
                    ]
                ],
                "displayInfo_showCarouselNav" => [
                    "type" => "checkbox",
                    "defaultValue" => false,
                    "isVisible" => "!!displayInfo_enableImageCarousel",
                    "options" => [
                        "name" => "Wizard.showCarouselNav",
                    ]
                ],
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateItemView(): array
    {
        return [
            "title" => "Wizard.itemViewSettings",
            "description" => "Wizard.itemViewSettingsDescription",
            "form" => [
                "displayInfo_requireOrderProperties" => [
                    "type" => "checkbox",
                    "defaultValue" => false,
                    "options" => [
                        "name" => "Wizard.requireOrderProperties",
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateShoppingCartView():array
    {
        $cartItemData    = ItemViewConfig::getCartItemData();
        $cartItemOptions = StepHelper::generateTranslatedListBoxValues($cartItemData);

        $cartItemAdditionalData        = ItemViewConfig::getCartItemAdditionalInfo();
        $cartItemAdditionalDataOptions = StepHelper::generateTranslatedListBoxValues($cartItemAdditionalData);

        $cartPreviewPosition = ItemViewConfig::getCartPreviewPosion();
        $cartPreviewOptions  = StepHelper::generateTranslatedListBoxValues($cartPreviewPosition);

        return [
            "title" => "Wizard.shoppingCartInfo",
            "form" => [
                "displayInfo_cartItemData" => [
                    "type" => "checkboxGroup",
                    "defaultValue" => [
                        $cartItemOptions[0]['value'],
                        $cartItemOptions[1]['value'],
                        $cartItemOptions[3]['value'],
                        $cartItemOptions[4]['value'],
                    ],
                    "options" => [
                        "name" => "Wizard.displayShoppingCartInfo",
                        "checkboxValues" => $cartItemOptions
                    ]
                ],
                "displayInfo_itemAdditionalInfo" => [
                    "type" => "select",
                    "defaultValue" => $cartItemAdditionalDataOptions[0]['value'],
                    "options" => [
                        "name" => "Wizard.itemAdditionalInfo",
                        "listBoxValues" => $cartItemAdditionalDataOptions
                    ]
                ],
                "displayInfo_cartPreviewPosition" => [
                    "type" => "select",
                    "defaultValue" => $cartPreviewOptions[1]['value'],
                    "options" => [
                        "name" => "Wizard.cartPreviewPosition",
                        "listBoxValues" => $cartPreviewOptions
                    ]
                ],
                "displayInfo_showShippingCountry" => [
                    "type" => "checkbox",
                    "defaultValue" => true,
                    "options" => [
                        "name" => "Wizard.showShippingCountry",
                    ]
                ]
            ]
        ];
    }
}
