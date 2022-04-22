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
    private function generateCategoryView(): array
    {
        $categoryDescriptionPositions = ItemViewConfig::getCategoryDescriptionPositions();
        $categoryDescriptionList      = StepHelper::generateTranslatedListBoxValues($categoryDescriptionPositions);

        return [
            "title" => "Wizard.displayedInfoCategoryViewType",
            "description" => "Wizard.displayedInfoCategoryViewTypeDescription",
            "form" => [
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
                "displayInfo_enableGraduatedPrices" => [
                    "type" => "checkbox",
                    "defaultValue" => false,
                    "options" => [
                        "name" => "Wizard.enableGraduatedPrices",
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
                "displayInfo_showCategoryFilter" => [
                    "type" => "checkbox",
                    "defaultValue" => false,
                    "options" => [
                        "name" => "Wizard.showCategoryFilter",
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
            "form" => [
                "displayInfo_requireOrderProperties" => [
                    "type" => "checkbox",
                    "defaultValue" => false,
                    "options" => [
                        "name" => "Wizard.requireOrderProperties",
                    ]
                ],
                "displayInfo_showPleaseSelect" => [
                    "type" => "checkbox",
                    "defaultValue" => false,
                    "options" => [
                        "name" => "Wizard.showPleaseSelect",
                    ]
                ],
                "displayInfo_attributeSelectDefaultOption" => [
                    "type" => "checkbox",
                    "isVisible" => "displayInfo_showPleaseSelect",
                    "defaultValue" => false,
                    "options" => [
                        "name" => "Wizard.attributeSelectDefaultOption",
                    ]
                ],
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
        
        $cartItemPreviewData    = ItemViewConfig::getCartItemPreviewData();
        $cartItemPreviewOptions = StepHelper::generateTranslatedListBoxValues($cartItemPreviewData);

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
                "displayInfo_cartPreviewData" => [
                    "type" => "checkboxGroup",
                    "defaultValue" => [
                        $cartItemPreviewOptions[0]['value'],
                        $cartItemPreviewOptions[1]['value'],
                        $cartItemPreviewOptions[3]['value'],
                        $cartItemPreviewOptions[4]['value'],
                        $cartItemPreviewOptions[5]['value'],
                        $cartItemPreviewOptions[6]['value'],
                        $cartItemPreviewOptions[7]['value'],
                        $cartItemPreviewOptions[8]['value'],
                        $cartItemPreviewOptions[9]['value'],
                        $cartItemPreviewOptions[10]['value'],
                        $cartItemPreviewOptions[11]['value'],
                        $cartItemPreviewOptions[12]['value'],
                    ],
                    "options" => [
                        "name" => "Wizard.displayShoppingCartPreviewInfo",
                        "checkboxValues" => $cartItemPreviewOptions
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
