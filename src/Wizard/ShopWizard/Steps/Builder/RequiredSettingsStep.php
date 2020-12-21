<?php

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Services\DefaultSettingsService;
use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Plugin\Http\Request;

/**
 * Class RequiredSettingsStep
 * @package Ceres\Wizard\ShopWizard\Steps\Builder
 */
class RequiredSettingsStep extends Step
{
    /**
     * @return array
     */
    public function generateStep():array
    {
        /** @var Request $request */
        $request = pluginApp(Request::class);
    
        /** @var PluginSetRepositoryContract $pluginSetRepo */
        $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);
        $pluginSetId = $pluginSetRepo->getPluginSetIdFromHash($request->get('bootPluginSetHash'));
        
        /** @var DefaultSettingsService $shopWizardService */
        $shopWizardService = pluginApp(DefaultSettingsService::class);

        $hasShippingMethod  = $shopWizardService->hasShippingMethods();
        $hasShippingProfile = $shopWizardService->hasShippingProfiles();
        $hasPaymentMethod   = $shopWizardService->hasPaymentMethods();
        $hasInactivePaymentMethod   = $shopWizardService->hasInactivePaymentMethod();
        $hasShippingCountry = $shopWizardService->hasShippingCountries();
        $hasLocation        = $shopWizardService->hasLocations();
    
        $paymentCondition1 = true;
        if(!$hasPaymentMethod && !$hasInactivePaymentMethod) {
            $paymentCondition1 = false;
        }
        
        $paymentCondition2 = true;
        if($hasPaymentMethod && $hasInactivePaymentMethod) {
            $paymentCondition2 = false;
        }
        
        return [
            "title" => "Wizard.reqSettings",
            "description" => "Wizard.reqSettingsDescription",
            "condition" => !$this->hasRequiredSettings(),
            "validationClass" => "Ceres\Wizard\ShopWizard\Validators\RequiredSettingsDataValidator",
            "sections" => [
                $this->generateSection("shippingMethod", $hasShippingMethod, "/system/assistants/run/plugin_install"),
                $this->generateSection("shippingProfile", $hasShippingProfile, "/system/assistants/overview/integration/fulfillment-shipping-profile-wizard"),
                $this->generateSection("paymentMethod", $paymentCondition1, "/system/assistants/run/plugin_install"),
                $this->generateSection("paymentMethodInactive", $paymentCondition2, "/plugins/plugin-sets/sets/$pluginSetId"),
                $this->generateSection("deliveryCountry", $hasShippingCountry, "/system/orders/shipping/settings"),
                $this->generateSection("location", $hasLocation, "/system/assistants/overview/basic-setup/accounting-location-assistant")

            ]
        ];
    }

    /**
     * @param $name
     * @param $condition
     * @param $url
     *
     * @return array
     */
    private function generateSection($name, $condition, $url):array
    {
        return [
            "title" => "Wizard." . $name,
            "description" => "Wizard." . $name . "Description",
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
