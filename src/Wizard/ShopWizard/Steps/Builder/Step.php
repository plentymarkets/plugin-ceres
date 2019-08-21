<?php

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Services\DefaultSettingsService;

/**
 * Class Step
 * @package Ceres\Wizard\ShopWizard\Steps\Builder
 */
class Step
{
    public $globalsCondition;

    /**
     * Step constructor.
     */
    public function __construct()
    {
        $this->globalsCondition = "client !== 'preview'";
    }

    /**
     * @return bool
     */
    public function hasRequiredSettings():bool
    {
        $hasSettings = false;

        $shopWizardService = pluginApp(DefaultSettingsService::class);

        $hasShippingMethod  = $shopWizardService->hasShippingMethods();
        $hasShippingProfile = $shopWizardService->hasShippingProfiles();
        $hasPaymentMethod   = $shopWizardService->hasPaymentMethods();
        $hasShippingCountry = $shopWizardService->hasShippingCountries();
        $hasLocation        = $shopWizardService->hasLocations();

        if ($hasShippingMethod && $hasShippingProfile && $hasPaymentMethod && $hasShippingCountry && $hasLocation) {
            $hasSettings = true;
        }

        return $hasSettings;
    }
}
