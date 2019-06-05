<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 30/05/2019
 * Time: 12:56
 */

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Services\ShopWizardService;


class RequiredSettingsStep
{


    public function generateStep(): array
    {

        $shopWizardService = pluginApp(ShopWizardService::class);

        $hasShippingMethod = $shopWizardService->hasShippingMethods();
        $hasShippingProfile = $shopWizardService->hasShippingProfiles();
        $hasPaymentMethod = $shopWizardService->hasPaymentMethods();
        $hasShippingCountry = $shopWizardService->hasShippingCountries();
        $hasLocation = $shopWizardService->hasLocations();
        $showFirstStep = true;

        if ($hasShippingMethod && $hasShippingProfile && $hasPaymentMethod && $hasShippingCountry && $hasLocation) {
            $showFirstStep = false;
        }

        return [
            "title" => "Wizard.reqSettings",
            "description" => "Wizard.generalDescription",
            "condition" => $showFirstStep,
            "validationClass" => "Ceres\Wizard\ShopWizard\Validators\RequiredSettingsDataValidator",
            "sections" => [
                $this->generateSection("shippingMethod", $hasShippingMethod, "/rest/wizards/plugin_install"),
                $this->generateSection("shippingProfile", $hasShippingProfile, "javascript:void(0)"),
                $this->generateSection("paymentMethod", $hasPaymentMethod, "/rest/wizards/plugin_install"),
                $this->generateSection("deliveryCountry", $hasShippingCountry, "/rest/wizards/fulfillment-shipping-profile-wizard"),
                $this->generateSection("location", $hasLocation, "/rest/wizards/accounting-location-assistant")

            ]
        ];
    }

    private function generateSection($name, $condition, $url) : array
    {
        return [
            "title" => "Wizard." . $name,
            "description" => "Wizard.generalDescription",
            "condition" => !$condition,
            "form" => [
                $name . "Assistant" => [
                    "type" => "button",

                    "options" => [
                        "name" => "Wizard.". $name ."Assistant",
                        "link" => [
                            "fromAction" => false,
                            "newWindow" => false,
                            "url" => $url
                        ]
                    ]
                ]
            ]
        ];
    }
}