<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 03/06/2019
 * Time: 14:37
 */

namespace Ceres\Wizard\ShopWizard\DataSource;

use Plenty\Modules\Wizard\Services\DataSources\BaseWizardDataSource;
use Ceres\Wizard\ShopWizard\Services\ShopWizardService;

class ShopWizardDataSource extends BaseWizardDataSource
{


    public function get(): array
    {

        $wizardService = pluginApp(ShopWizardService::class);
        $hasShippingMethod = $wizardService->hasShippingMethods();
        $hasShippingProfile = $wizardService->hasShippingProfiles();
        $hasPaymentMethod = $wizardService->hasPaymentMethods();
        $hasShippingCountry = $wizardService->hasShippingCountries();
        $data = [];

        if ($hasShippingMethod && $hasShippingProfile && $hasPaymentMethod && $hasShippingCountry) {
            $data = [
                'setAllRequiredAssistants' => ''
            ];
        }

        $dataStructure = $this->dataStructure;

        $dataStructure['data'] = (object) $data;

        return $dataStructure;

    }



}