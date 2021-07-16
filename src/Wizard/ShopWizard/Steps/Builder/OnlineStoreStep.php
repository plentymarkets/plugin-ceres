<?php

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Config\OnlineStoreConfig;
use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;
use Plenty\Modules\Authorization\Services\AuthHelper;
use Plenty\Modules\Order\Status\Contracts\OrderStatusRepositoryContract;
use Plenty\Modules\System\Module\Contracts\PlentyModuleRepositoryContract;

/**
 * Class OnlineStoreStep
 *
 * @package Ceres\Wizard\ShopWizard\Steps\Builder
 */
class OnlineStoreStep extends Step
{
    /**
     * @var array Collection of order status.
     */
    private static $orderStatusList = null;

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
                $this->buildStoreFaviconStructure(),
                $this->buildStoreCategoryTypesStructure(),
                $this->buildStoreBack2Top(),
                $this->buildStoreEmailSettings(),
                $this->buildVariationOrderPropertiesSettings(),
                $this->buildStoreOrderSettings(),
                $this->buildStoreShippingSettings(),
                $this->buildGoogleMapsSettings(),
                $this->buildGoogleRecaptchaSettings(),
                $this->buildSessionLifeTimeSection(),
                $this->buildStoreCallistoSettings(),
                $this->buildExternalVatIdCheckSettings(),
                $this->buildLoginModeSettings()
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
        $depths = OnlineStoreConfig::getCategoryTreeDepths();
        $categoryTypes = StepHelper::generateTranslatedListBoxValues($catTypes);
        $treeDepths = StepHelper::generateTranslatedListBoxValues($depths);

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
                "onlineStore_categoryTreeDepth" => [
                    "type" => "select",
                    "defaultValue" => 6,
                    "options" => [
                        "name" => "Wizard.categoryTreeDepth",
                        "listBoxValues" => $treeDepths
                    ]
                ]
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
            "description" => "Wizard.ordersSettingsDescription",
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
                        "listBoxValues" => $this->getReturnOrderStatusListBoxValues()
                    ]
                ],
                "onlineStore_minimumOrderAmount" => [
                    "type" => "number",
                    "defaultValue" => "0",
                    "options" => [
                        "name" => "Wizard.minimumOrderAmount"
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function buildStoreShippingSettings(): array
    {
        return [
            "title" => "Wizard.shippingSettings",
            "description" => "Wizard.shippingSettingsDescription",
            "form" => [
                "onlineStore_shippingProfiles" => [
                    "type" => "checkbox",
                    "defaultValue" => false,
                    "options" => [
                        "name" => "Wizard.showAllShippingProfiles"
                    ]
                ],
            ]
        ];
    }

    /**
     * @return array
     */
    private function buildGoogleMapsSettings(): array
    {
        return [
            "title" => "Wizard.settingsGoogleMaps",
            "description" => "Wizard.settingsGoogleMapsDescription",
            "form" => [
                "onlineStore_googleMapsApiKey" => [
                    "type" => "text",
                    "options" => [
                        "name" => "Wizard.googleMapsApiKey"
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function buildGoogleRecaptchaSettings(): array
    {
        return [
            "title" => "Wizard.settingsRecaptcha",
            "description" => "Wizard.settingsRecaptchaDescription",
            "form" => [
                "onlineStore_recaptchaVersion" => [
                    "type" => "select",
                    "defaultValue" => 2,
                    "options" => [
                        "name" => "Wizard.recaptchaVersion",
                        "listBoxValues" => [
                            [
                                "value" => 2,
                                "caption" => "Wizard.recaptchaVersion2"
                            ],
                            [
                                "value" => 3,
                                "caption" => "Wizard.recaptchaVersion3"
                            ]
                        ]
                    ]
                ],
                "onlineStore_recaptchaApiKey" => [
                    "type" => "text",
                    "options" => [
                        "name" => "Wizard.recaptchaApiKey"
                    ]
                ],
                "onlineStore_recaptchaSecret" => [
                    "type" => "text",
                    "options" => [
                        "name" => "Wizard.recaptchaSecret"
                    ]
                ],
                "onlineStore_recaptchaThreshold" => [
                    "type" => "number",
                    "defaultValue" => 0.5,
                    "options" => [
                        "name" => "Wizard.recaptchaThreshold"
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function buildStoreCallistoSettings(): array
    {
        $moduleRepo = pluginApp(PlentyModuleRepositoryContract::class);
        $webstoreActive = $moduleRepo->isActive("webstore.cms");

        return [
            "title" => "Wizard.settingsOldCallisto",
            "description" => "Wizard.settingsOldCallistoDescription",
            "condition" => $webstoreActive,
            "form" => [
                "onlineStore_enableCallisto" => [
                    "type" => "checkbox",
                    "defaultValue" => false,
                    "options" => [
                        "name" => "Wizard.enableCallisto"
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function buildSessionLifeTimeSection(): array
    {
        $sessionLifetimeDurations = OnlineStoreConfig::getSessionLifetimeOptions();
        $sessionLifetimeOptions = StepHelper::generateTranslatedListBoxValues($sessionLifetimeDurations);

        return [
            "title" => "Wizard.sessionLifeTimeTitle",
            "description" => "Wizard.sessionLifeTimeDescription",
            "condition" => $this->globalsCondition,
            "form" => [
                "onlineStore_sessionLifetime" => [
                    "type" => "select",
                    "defaultValue" => 0,
                    "options" => [
                        "name" => "Wizard.sessionLifeTime",
                        "listBoxValues" => $sessionLifetimeOptions
                    ]
                ],
                "onlineStore_blockCookies" => [
                    "type" => "checkbox",
                    "defaultValue" => true,
                    "options" => [
                        "name" => "Wizard.blockCookies"
                    ]
                ]
            ]
        ];
    }

    private function buildExternalVatIdCheckSettings()
    {
        $listValues[] = [
            "value" => 0,
            "caption" => "Wizard.active"
        ];
        return [
            "title" => "Wizard.externalVatIdCheckTitle",
            "description" => "Wizard.externalVatIdCheckDescription",
            "condition" => $this->globalsCondition,
            "form" => [
                "onlineStore_externalVatIdCheck" => [
                    "type" => "select",
                    "defaultValue" => 0,
                    "options" => [
                        "name" => "Wizard.externalVatIdCheck",
                        "listBoxValues" => [
                            [
                                "value" => 0,
                                "caption" => "Wizard.active"
                            ],
                            [
                                "value" => 1,
                                "caption" => "Wizard.inactive"
                            ]
                        ]
                    ]
                ],
                "onlineStore_externalVatIdCheckServiceUnavailableFallbackStatus" => [
                    "type" => "select",
                    "defaultValue" => 0.0,
                    "options" => [
                        "name" => "Wizard.externalVatIdCheckServiceUnavailableFallbackStatus",
                        "listBoxValues" => array_merge([                            [
                                "value" => 0.0,
                                "caption" => "Wizard.serviceUnavailableFallbackStatus"
                            ],], $this->getOrderStatusListBoxValues())
                    ]
                ]
            ]
        ];
    }

    private function buildVariationOrderPropertiesSettings()
    {
        return [
            "title" => "Wizard.variationOrderPropertiesTitle",
            "description" => "Wizard.variationOrderPropertiesDescription",
            "condition" => $this->globalsCondition,
            "form" => [
                "onlineStore_useVariationOrderProperties" => [
                    "type" => "checkbox",
                    "defaultValue" => false,
                    "options" => [
                        "name" => "Wizard.useVariationOrderProperties"
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function getReturnOrderStatusListBoxValues()
    {
        $orderStatusList = [];
        $all = $this->getOrderStatusListBoxValues();
        foreach ($all as $status) {
            if ($status['value'] >= 9 && $status['value'] < 10) {
                $orderStatusList[] = [
                    "value" => (string)$status['value'],
                    "caption" => $status['caption']
                ];
            }
        }
        return $orderStatusList;
    }


    /**
     * @return array
     */
    private function getOrderStatusListBoxValues()
    {
        if(isset(self::$orderStatusList) && count(self::$orderStatusList)) {
            return self::$orderStatusList;
        }
        $currentLang = LanguagesHelper::getUserLang();

        /** @var AuthHelper $authHelper */
        $authHelper = pluginApp(AuthHelper::class);
        /** @var OrderStatusRepositoryContract $orderStatusRepo */
        $orderStatusRepo = pluginApp(OrderStatusRepositoryContract::class);
        $orderStatusCollection = $authHelper->processUnguarded(function() use ($orderStatusRepo) {
            return $orderStatusRepo->all();
        });

        $orderStatusList = [];
        foreach ($orderStatusCollection as $status) {
                $statusName = $status->names[$currentLang] ?? '';
                $prefix = '[' . $status->statusId . ']';
                if (substr($statusName, 0, strlen($prefix)) !== $prefix) {
                    $statusName = $prefix . $statusName;
                }

                $orderStatusList[] = [
                    "value" => $status->statusId,
                    "caption" => $statusName
                ];
        }
        self::$orderStatusList = $orderStatusList;
        return $orderStatusList;
    }

    private function buildLoginModeSettings()
    {
        return [
            "title" => "Wizard.loginModeTitle",
            "description" => "Wizard.loginModeDescription",
            "condition" => $this->globalsCondition,
            "form" => [
                "onlineStore_loginMode" => [
                    "type" => "select",
                    "defaultValue" => 0,
                    "options" => [
                        "name" => "Wizard.loginMode",
                        "listBoxValues" => [
                            [
                                "value" => 0,
                                "caption" => "Wizard.loginMode1"
                            ],
                            [
                                "value" => 1,
                                "caption" => "Wizard.loginMode2"
                            ]
                        ]
                    ]
                ]
            ]
        ];
    }
}
