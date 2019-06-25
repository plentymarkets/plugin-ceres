<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 12/06/2019
 * Time: 12:34
 */

namespace Ceres\Wizard\ShopWizard\Services;


use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\System\Contracts\WebstoreConfigurationRepositoryContract;

class ShopWizardService
{
    private $settingsService;

    public function __construct( DefaultSettingsService $settingsService)
    {
        $this->settingsService = $settingsService;

    }

    public function getWebstoresIdentifiers(): array
    {
        $webstoresMapped = [];

        $webstores = $this->settingsService->getWebstores();

        if (count($webstores)) {
            foreach ($webstores as $webstore) {
                $pluginSet = pluginApp(PluginSetRepositoryContract::class);
                $pluginSetData = $pluginSet->get($webstore['pluginSetId'])->toArray();

                $key = "webstore_" . $webstore['id'] . "." . "pluginSet_" . $webstore['pluginSetId'];
                $identifData = [
                    'pluginSet' => $pluginSetData['id'],
                    'client' => $webstore['id']
                ];

                $webstoresMapped[$key] = array_merge($identifData, $this->mapWebstoreData($webstore['id']));
            }
        }

        return $webstoresMapped;
    }

    public function mapWebstoreData ($webstoreId)
    {
        $webstoreConfig = pluginApp(WebstoreConfigurationRepositoryContract::class);
        $webstoreConfData = $webstoreConfig->findByWebstoreId($webstoreId)->toArray();

        $hasShippingMethod = $this->settingsService->hasShippingMethods();
        $hasShippingProfile = $this->settingsService->hasShippingProfiles();
        $hasPaymentMethod = $this->settingsService->hasPaymentMethods();
        $hasShippingCountry = $this->settingsService->hasShippingCountries();


        $data = [
            'client' => $webstoreId,
            'defSettings_defaultLanguage' => $webstoreConfData['defaultLanguage'],
            'defSettings_defaultShippingMethod' => intval($webstoreConfData['defaultParcelServicePresetId']),
            'defSettings_defaultShippingProfile' => intval($webstoreConfData['defaultParcelServiceId']),
            'defSettings_defaultPaymentMethod' => intval($webstoreConfData['defaultMethodOfPaymentId']),
            'defSettings_defaultDeliveryCountry' => intval($webstoreConfData['defaultShippingCountryId']),
            'defSettings_defaultLocation' => intval($webstoreConfData['defaultAccountingLocation']),
            'defSettings_defaultB2B' => $webstoreConfData['defaultCustomerClassId']
        ];

        if (count($webstoreConfData['defaultShippingCountryList'])) {
            foreach ($webstoreConfData['defaultShippingCountryList'] as $countryLang => $countryId) {
                $settingsKey = 'defSettings_deliveryCountry_' . $countryLang;

                $data[$settingsKey] = $countryId;
            }
        }

        if ($hasShippingMethod && $hasShippingProfile && $hasPaymentMethod && $hasShippingCountry) {
            $data['setAllRequiredAssistants'] = '';
        }

        return $data;
    }
}