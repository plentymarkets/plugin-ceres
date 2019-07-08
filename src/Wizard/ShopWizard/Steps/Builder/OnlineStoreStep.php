<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 24/06/2019
 * Time: 14:52
 */

namespace Ceres\Wizard\ShopWizard\Steps\Builder;


use Ceres\Wizard\ShopWizard\Helpers\ConfigHelper;

class OnlineStoreStep extends Step
{

    public function generateStep()
    {
        return [
            "title" => "Wizard.onlineStoreSettings",
            "description" => "Wizard.onlineStoreSettingsDescription",
            "sections" => [
                $this->buildStoreNameStructure(),
                $this->buildStoreFaviconStructure(),
                $this->buildStoreCategoryTypesStructure(),
                $this->buildStoreBack2Top(),
                $this->buildStoreEmailSettings(),
                $this->buildStoreOrderSettings(),
                $this->buildStoreCalistoSettings(),
            ]
        ];
    }

    /**
     * @param array $data
     * @param string $translation
     *
     * @return array
     */
    private function generateListBoxValues(array $data): array
    {
        $listValues = [];

        foreach ($data as $itemKey => $itemVal) {
            $listValues[] = [
                "value" => $itemVal,
                "caption" => "Wizard.{$itemKey}"
            ];
        }

        return $listValues;
    }

    /**
     * @return array
     */
    private function buildStoreNameStructure(): array
    {
        return [
            "title" => "Wizard.storeName",
            "form" => [
                "onlineStore_storeName" => [
                    "type" => "text",
                    "options" => [
                        "name" => "Wizard.storeNameLabel"
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function buildStoreFaviconStructure(): array
    {
        return [
            "title" => "Wizard.storeFavicon",
            "form" => [
                "onlineStore_storeFavicon" => [
                    "type" => "file",
                    "options" => [
                        "name" => "Wizard.storeFaviconLabel"
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function buildStoreCategoryTypesStructure(): array
    {
        $catTypes = ConfigHelper::getCategoryTypes();
        $categoryTypes = $this->generateListBoxValues($catTypes);

        return [
            "title" => "Wizard.storeCategoryTypes",
            "description" => "Wizard.storeCategoryTypesDescription",
            "form" => [
                "onlineStore_categoryTypes" => [
                    "type" => "checkboxGroup",
                    "defaultValue" => [],
                    "options" => [
                        "name" => "Wizard.storeCategoryTypeAll",
                        "checkboxValues" => $categoryTypes
                    ]
                ],
            ]
        ];
    }

    /**
     * @return array
     */
    private function buildStoreBack2Top()
    {
        $top2bottomPositions = ConfigHelper::getToTopButtonPosition();
        $positions = $this->generateListBoxValues($top2bottomPositions);

        return [
            "title" => "Wizard.back2Top",
            "form" => [
                "onlineStore_toTopButton" => [
                    "type" => "select",
                    "defaultValue" => $positions[0]['value'],
                    "options" => [
                        "name" => "Wizard.back2Top",
                        "listBoxValues" => $positions
                    ]
                ],
            ]
        ];
    }

    /**
     * @return array
     */
    private function buildStoreEmailSettings()
    {
        $confirmationLinkExpiration = ConfigHelper::getConfirmationLinkExpiration();
        $confirmationList = $this->generateListBoxValues($confirmationLinkExpiration);
        $globaUserHashMax = ConfigHelper::getUserHashMaxAge();
        $globaUserHashMaxList = $this->generateListBoxValues($globaUserHashMax);

        return [
            "title" => "Wizard.emailSettings",
            "description" => "Wizard.emailSettingsDescription",
            "form" => [
                "onlineStore_confirmationLinkLoginRedirect" => [
                    "type" => "checkbox",
                    "defaultValue" => false,
                    "options" => [
                        "name" => "Wizard.forward2LoginPage"
                    ]
                ],
                "onlineStore_confirmationLinkExpiration" => [
                    "type" => "select",
                    "defaultValue" => $confirmationList[0]['value'],
                    "options" => [
                        "name" => "Wizard.validityCheckoutURL",
                        "listBoxValues" => $confirmationList
                    ]
                ],
                "onlineStore_globalUserDataHashMaxAge" => [
                    "type" => "select",
                    "defaultValue" => $globaUserHashMaxList[0]['value'],
                    "options" => [
                        "name" => "Wizard.validityURLs",
                        "listBoxValues" => $globaUserHashMaxList
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function buildStoreOrderSettings()
    {
        $itemBundles = ConfigHelper::getItemBundles();
        $itemBundlesList = $this->generateListBoxValues($itemBundles);
        return [
            "title" => "Wizard.ordersSettings",
            "description" => "Wizard.emailSettingsDescription",
            "form" => [
                "onlineStore_itemBundles" => [
                    "type" => "select",
                    "isVisible" => $this->globalsCondition,
                    "defaultValue" => $itemBundlesList[0]['value'],
                    "options" => [
                        "name" => "Wizard.itemBundles",
                        "listBoxValues" => $itemBundlesList
                    ]
                ],
                "onlineStore_daysOfReturn" => [
                    "type" => "text",
                    "defaultValue" => "14",
                    "options" => [
                        "name" => "Wizard.daysOfReturn"
                    ]
                ],
                "onlineStore_statusReturn" => [
                    "type" => "text",
                    "defaultValue" => "9",
                    "options" => [
                        "name" => "Wizard.statusReturn"
                    ]
                ],
            ]
        ];
    }

    /**
     * @return array
     */
    private function buildStoreCalistoSettings()
    {
        return [
            "title" => "Wizard.settingsOldCalisto",
            "description" => "Wizard.settingsOldCalistoDescription",
            "form" => [
                "onlineStore_enableCalisto" => [
                    "type" => "toggle",
                    "defaultValue" => false,
                    "options" => [
                        "name" => "Wizard.enableCalisto"
                    ]
                ]
            ]
        ];
    }
}