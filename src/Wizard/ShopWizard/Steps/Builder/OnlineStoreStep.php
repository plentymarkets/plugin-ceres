<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 24/06/2019
 * Time: 14:52
 */

namespace Ceres\Wizard\ShopWizard\Steps\Builder;


use Ceres\Wizard\ShopWizard\Config\OnlineStoreConfig;
use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;
use Plenty\Modules\Order\Status\Contracts\OrderStatusRepositoryContract;
use Plenty\Modules\System\Module\Contracts\PlentyModuleRepositoryContract;

class OnlineStoreStep extends Step
{

    /**
     * @return array
     */
    public function generateStep(): array
    {
        return [
            "title" => "Wizard.onlineStoreSettings",
            "description" => "Wizard.onlineStoreSettingsDescription",
            "condition" => $this->hasRequiredSettings(),
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
        $catTypes = OnlineStoreConfig::getCategoryTypes();
        $categoryTypes = StepHelper::generateTranslatedListBoxValues($catTypes);

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
    private function buildStoreBack2Top(): array
    {
        $top2bottomPositions = OnlineStoreConfig::getToTopButtonPosition();
        $positions = StepHelper::generateTranslatedListBoxValues($top2bottomPositions);

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
    private function buildStoreEmailSettings(): array
    {
        $confirmationLinkExpiration = OnlineStoreConfig::getConfirmationLinkExpiration();
        $confirmationList = StepHelper::generateTranslatedListBoxValues($confirmationLinkExpiration);
        $globaUserHashMax = OnlineStoreConfig::getUserHashMaxAge();
        $globaUserHashMaxList = StepHelper::generateTranslatedListBoxValues($globaUserHashMax);

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
    private function buildStoreOrderSettings(): array
    {
        $itemBundles = OnlineStoreConfig::getItemBundles();
        $itemBundlesList = StepHelper::generateTranslatedListBoxValues($itemBundles);
        
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
                    "type" => "number",
                    "defaultValue" => "14",
                    "options" => [
                        "name" => "Wizard.daysOfReturn"
                    ]
                ],
                "onlineStore_statusReturn" => [
                    "type" => "select",
                    "defaultValue" => "9",
                    "options" => [
                        "name" => "Wizard.statusReturn",
                        "listBoxValues" => $this->getOrderStatusListBoxValues()
                    ]
                ],
            ]
        ];
    }

    /**
     * @return array
     */
    private function buildStoreCalistoSettings(): array
    {
        $moduleRepo = pluginApp(PlentyModuleRepositoryContract::class);
        $webstoreActive = $moduleRepo->isActive("webshop");

        return [
            "title" => "Wizard.settingsOldCalisto",
            "description" => "Wizard.settingsOldCalistoDescription",
            "condition" => $webstoreActive,
            "form" => [
                "onlineStore_enableCalisto" => [
                    "type" => "checkbox",
                    "defaultValue" => false,
                    "options" => [
                        "name" => "Wizard.enableCalisto"
                    ]
                ]
            ]
        ];
    }
    
    private function getOrderStatusListBoxValues()
    {
        $currentLang = LanguagesHelper::getUserLang();
        
        /** @var OrderStatusRepositoryContract $orderStatusRepo */
        $orderStatusRepo = pluginApp(OrderStatusRepositoryContract::class);
        $orderStatusCollection = $orderStatusRepo->all();
        
        $orderStatusList = [];
        foreach($orderStatusCollection as $status)
        {
            if($status->statusId > 7)
            {
                $orderStatusList[] = [
                    "value" => "$status->statusId",
                    "caption" => '['.$status->statusId.'] '.( strlen($status->names[$currentLang]) ? $status->names[$currentLang] : '')
                ];
            }
        }
        
        return $orderStatusList;
    }
}
