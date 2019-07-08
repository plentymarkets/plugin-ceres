<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 12/06/2019
 * Time: 12:34
 */

namespace Ceres\Wizard\ShopWizard\Services;



use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSetEntry;
use Plenty\Modules\System\Contracts\WebstoreConfigurationRepositoryContract;

class ShopWizardService
{
    private $settingsService;

    private $mappingService;


    public function __construct( DefaultSettingsService $settingsService, MappingService $mappingService)
    {
        $this->settingsService = $settingsService;
        $this->mappingService = $mappingService;

    }

    public function getWebstoresIdentifiers(): array
    {
        $webstoresMapped = [];

        $webstores = $this->settingsService->getWebstores();

        if (count($webstores)) {
            foreach ($webstores as $webstore) {
                $key = "webstore_" . $webstore['id'] . "." . "pluginSet_" . $webstore['pluginSetId'];

                $webstoresMapped[$key] = $this->mapWebstoreData($webstore['id'], $webstore['pluginSetId']);
            }
        }

        return $webstoresMapped;
    }

    public function mapWebstoreData ($webstoreId, $pluginSetId)
    {
        $webstoreConfig = pluginApp(WebstoreConfigurationRepositoryContract::class);
        $webstoreConfData = $webstoreConfig->findByWebstoreId($webstoreId)->toArray();

        $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);
        $pluginSets = $pluginSetRepo->list();
        $pluginConfData = [];

        foreach($pluginSets as $pluginSet)
        {
            foreach ($pluginSet->pluginSetEntries as $pluginSetEntry) {
                if ($pluginSetEntry instanceof PluginSetEntry && $pluginSetEntry->plugin->name === 'Ceres' && $pluginSetEntry->pluginSetId == $pluginSetId) {
                    $config      = $pluginSetEntry->configurations()->getResults();
                    if (count($config)) {
                        foreach ($config as $confItem) {
                            $pluginConfData[$confItem->key] = $confItem->value;
                        }
                    }
                }
            }
        }

        $hasShippingMethod = $this->settingsService->hasShippingMethods();
        $hasShippingProfile = $this->settingsService->hasShippingProfiles();
        $hasPaymentMethod = $this->settingsService->hasPaymentMethods();
        $hasShippingCountry = $this->settingsService->hasShippingCountries();

        $globalData = $this->mappingService->processGlobalMappingData($webstoreConfData);
        $pluginData = $this->mappingService->processPluginMappingData($pluginConfData);

        $defaultData = [
            'client' => $webstoreId,
            'pluginSet' => $pluginSetId
        ];

        $data = array_merge($defaultData, $globalData, $pluginData);

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