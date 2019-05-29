<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 28/05/2019
 * Time: 15:51
 */

namespace Ceres\Wizard\ShopWizard;


use Ceres\Services\ShopWizardService;
use Plenty\Modules\Wizard\Services\WizardProvider;

class ShopWizard extends WizardProvider
{

    protected function structure()
    {
        $shopWizardService = pluginApp(ShopWizardService::class);
        $hasShippingMethod = $shopWizardService->hasShippingMethod();
        $hasShippingProfile = $shopWizardService->hasShippingProfile();
        $hasPaymentMethod = $shopWizardService->hasPaymentMethod();
        $hasShippingCountry = $shopWizardService->hasShippingCountry();
        $showFirstStep = true;
        if ($hasShippingMethod && $hasShippingProfile && $hasPaymentMethod && $hasShippingCountry) {
            $showFirstStep = false;
        }

        return [
            "title" => "Wizard.title",
            "shortDescription" => "Wizard.shortDescription",
            "key" => "shopCeres-assistant",
            "reloadStructure" => true,
            "translationNamespace" => "Ceres",
            "steps" => [
                "step1" => [
                    "title" => "Wizard.reqSettings",
                    "description" => "wizard.generalDescription",
                    "condition" => $showFirstStep,
                    "sections" => [
                        [
                            "title" => "wizard.shippingMethod",
                            "description" => "wizard.generalDescription",
                            "condition" => !$hasShippingMethod,
                            "form" => [
                                "phonenumber" => [
                                    "type" => "button",

                                    "options" => [
                                        "name" => "Wizard.shippingMethodAssistant",
                                        "link" => [
                                            "fromAction" => false,
                                            "newWindow" => false,
                                            "url" => "javascript:void(0)"
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        [
                            "title" => "wizard.shippingProfile",
                            "description" => "wizard.generalDescription",
                            "condition" => !$hasShippingProfile,
                            "form" => [
                                "phonenumber" => [
                                    "type" => "button",

                                    "options" => [
                                        "name" => "Wizard.shippingProfileAssistant",
                                        "link" => [
                                            "fromAction" => false,
                                            "newWindow" => false,
                                            "url" => "javascript:void(0)"
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        [
                            "title" => "wizard.paymentMethod",
                            "description" => "wizard.generalDescription",
                            "condition" => !$hasPaymentMethod,
                            "form" => [
                                "paymentAssistant" => [
                                    "type" => "button",

                                    "options" => [
                                        "name" => "Wizard.paymentMethodAssistant",
                                        "link" => [
                                            "fromAction" => false,
                                            "newWindow" => false,
                                            "url" => "javascript:void(0)"
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        [
                            "title" => "wizard.deliveryCountry",
                            "description" => "wizard.generalDescription",
                            "condition" => !$hasShippingCountry,
                            "form" => [
                                "countryAssistant" => [
                                    "type" => "button",

                                    "options" => [
                                        "name" => "Wizard.deliveryCountryAssistant",
                                        "link" => [
                                            "fromAction" => false,
                                            "newWindow" => false,
                                            "url" => "javascript:void(0)"
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ],
                ]
            ]
        ];
    }

}