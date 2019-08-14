<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 12/06/2019
 * Time: 12:34
 */

namespace Ceres\Wizard\ShopWizard\Services;

use Plenty\Modules\ContentCache\ContentCacheSettings\ContentCacheSettings;
use Plenty\Modules\ContentCache\Contracts\ContentCacheSettingsRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSetEntry;
use Plenty\Modules\System\Contracts\WebstoreConfigurationRepositoryContract;
use Plenty\Modules\System\Contracts\WebstoreRepositoryContract;
use Plenty\Plugin\Translation\Translator;

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

        // we need to check if we have settings for preview mode saved
        $webstoresPluginSetIds = array_column($webstores, 'pluginSetId');

        $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);
        $translator = pluginApp(Translator::class);

        $pluginSets = $pluginSetRepo->list();

        foreach($pluginSets as $pluginSet) {
            foreach ($pluginSet->pluginSetEntries as $pluginSetEntry) {
                $pluginSetEntryConfig = $pluginSetEntry->configurations()->getResults();
                if (
                    $pluginSetEntry instanceof PluginSetEntry &&
                    $pluginSetEntry->plugin->name === 'Ceres' &&
                    !in_array($pluginSetEntry->pluginSetId, $webstoresPluginSetIds) &&
                    count($pluginSetEntryConfig)
                ) {
                    $webstores[] = [
                        'id' => 'preview',
                        'pluginSetId' => (int)$pluginSetEntry->pluginSetId

                    ];
                }
            }
        }

        if (count($webstores)) {
            foreach ($webstores as $webstore) {
                $key = "webstore_" . $webstore['id'] . "." . "pluginSet_" . $webstore['pluginSetId'];

                $webstoresMapped[$key] = [
                    "client" => $webstore['id'],
                    "pluginSet" => $webstore['pluginSetId']

                ];
            }
        }

        return $webstoresMapped;
    }

    public function mapWebstoreData ($webstoreId, $pluginSetId)
    {
        $globalData = [];

        if ($webstoreId != 'preview') {
            $webstoreConfig = pluginApp(WebstoreConfigurationRepositoryContract::class);
            $webstoreConfData = $webstoreConfig->findByWebstoreId($webstoreId)->toArray();

            $webstoreRepo = pluginApp(WebstoreRepositoryContract::class);
            $store = $webstoreRepo->findById($webstoreId);
            $plentyId = $store->storeIdentifier;

            $globalData = $this->mappingService->processGlobalMappingData($webstoreConfData);

            //we check for shipping country list
            if (count($webstoreConfData['defaultShippingCountryList'])) {
                foreach ($webstoreConfData['defaultShippingCountryList'] as $countryLang => $countryId) {
                    $settingsKey = 'defSettings_deliveryCountry_' . $countryLang;

                    $globalData[$settingsKey] = $countryId;
                }
            }

            //we check for default currency list

            if (count($webstoreConfData['defaultCurrencyList'])) {
                foreach ($webstoreConfData['defaultCurrencyList'] as $currencyCountryCode => $currency) {
                    $settingsKey = 'currencies_defaultCurrency_' . $currencyCountryCode;

                    $globalData[$settingsKey] = $currency;
                }
            }

            //need to refactor after we have implemented Ceres browser languages
//            if (count($globalData['languages_defaultBrowserLang'])) {
//                $globalData['languages_setLinkedStoreLanguage'] = true;
//                $browserLanguage = $globalData['languages_defaultBrowserLang'];
//
//                //now we extract data related from browser language
//                foreach ($browserLanguage as $bLangKey => $bLang) {
//                    if ($bLangKey == 'other') {
//                        $globalData['languages_defaultBrowserLang'] = $bLang;
//                    } else {
//                        $langKey = "languages_browserLang_{$bLangKey}";
//                        $globalData[$langKey] = $bLang;
//                    }
//                }
//            }

        }

        $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);
        $pluginSets = $pluginSetRepo->list();
        $pluginConfData = [];

        foreach($pluginSets as $pluginSet)
        {
            foreach ($pluginSet->pluginSetEntries as $pluginSetEntry) {
                if ($pluginSetEntry instanceof PluginSetEntry && $pluginSetEntry->plugin->name === 'Ceres' && $pluginSetEntry->pluginSetId == $pluginSetId) {
                    $config = $pluginSetEntry->configurations()->getResults();
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


        $pluginData = $this->mappingService->processPluginMappingData($pluginConfData);

        $defaultData = [
            'client' => $webstoreId,
            'pluginSet' => $pluginSetId
        ];

        $data = array_merge($defaultData, $globalData, $pluginData);


        $data['settingsSelection_displayedInfo'] = $this->checkSelectionEnabled('displayInfo', $data);
        $data['settingsSelection_paginationSorting'] = $this->checkSelectionEnabled('paginationStep', $data);
        $data['settingsSelection_languages'] = $this->checkSelectionEnabled('languages', $data);
        $data['settingsSelection_performance'] = $this->checkSelectionEnabled('performance', $data);
        $data['settingsSelection_search'] = $this->checkSelectionEnabled('search', $data);
        $data['settingsSelection_seo'] = $this->checkSelectionEnabled('seo', $data);

        //get shop booster cache
        if (!empty($plentyId)) {
            $cacheRepository = pluginApp(ContentCacheSettingsRepositoryContract::class);
            $shopBooster = $cacheRepository->getSettings($plentyId);

            if ($shopBooster instanceOf ContentCacheSettings) {
                $shopBoosterData = $shopBooster->toArray();
                $data['performance_shopBooster'] = $shopBoosterData['contentCacheActive'];
            }
        }

        if ($hasShippingMethod && $hasShippingProfile && $hasPaymentMethod && $hasShippingCountry) {
            $data['setAllRequiredAssistants'] = 'true';
        }

        return $data;
    }


    private function checkSelectionEnabled(string $keyPrefix, array $data): bool
    {
        $hasData = [];
        $keys = array_keys($data);

        if (count($keys)) {
            foreach ($keys as $key) {
                if(strpos($key, $keyPrefix) !== false && !empty($data[$key])) {
                    $hasData[] = $key;
                }
            }
        }

        $found = count($hasData) ? true : false;

        return $found;
    }

}