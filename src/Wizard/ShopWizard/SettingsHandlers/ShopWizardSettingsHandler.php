<?php

namespace Ceres\Wizard\ShopWizard\SettingsHandlers;

use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;
use Ceres\Wizard\ShopWizard\Interfaces\ShopWizardPreviewConfigurationInterface;
use Ceres\Wizard\ShopWizard\Models\ShopWizardPreviewConfiguration;
use Ceres\Wizard\ShopWizard\Repositories\ShopWizardConfigRepository;
use Ceres\Wizard\ShopWizard\Services\MappingService;
use Ceres\Wizard\ShopWizard\Services\SettingsHandlerService;
use Ceres\Wizard\ShopWizard\Services\AlreadyPaidShippingCountriesService;
use Plenty\Modules\ContentCache\Contracts\ContentCacheInvalidationRepositoryContract;
use Plenty\Modules\ContentCache\Contracts\ContentCacheSettingsRepositoryContract;
use Plenty\Modules\Item\Search\Contracts\VariationElasticSearchSettingsRepositoryContract;
use Plenty\Modules\Order\Currency\Contracts\CurrencyRepositoryContract;
use Plenty\Modules\Order\Shipping\Countries\Contracts\CountryRepositoryContract;
use Plenty\Modules\Plugin\Contracts\ConfigurationRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSetEntry;
use Plenty\Modules\System\Contracts\WebstoreConfigurationRepositoryContract;
use Plenty\Modules\Webshop\Contracts\WebstoreConfigurationRepositoryContract as WebshopWebstoreConfigurationRepositoryContract;
use Plenty\Modules\Webshop\Seo\Contracts\RobotsRepositoryContract;
use Plenty\Modules\Webshop\Seo\Contracts\SitemapConfigurationRepositoryContract;
use Plenty\Modules\Wizard\Contracts\WizardSettingsHandler;

/**
 * Class ShopWizardSettingsHandler
 * @package Ceres\Wizard\ShopWizard\SettingsHandlers
 */
class ShopWizardSettingsHandler implements WizardSettingsHandler
{
    /**
     * @var CountryRepositoryContract
     */
    private $countryRepository;

    /**
     * @var CurrencyRepositoryContract
     */
    private $currencyRepository;

    /**
     * ShopWizardSettingsHandler constructor.
     * @param CountryRepositoryContract $countryRepository
     * @param CurrencyRepositoryContract $currencyRepositoryContract
     */
    public function __construct(
        CountryRepositoryContract $countryRepository,
        CurrencyRepositoryContract $currencyRepositoryContract
    ) {
        $this->countryRepository = $countryRepository;
        $this->currencyRepository = $currencyRepositoryContract;
    }

    /**
     * @param array $parameters
     * @return bool
     */
    public function handle(array $parameters)
    {
        $data = $parameters['data'];
        $optionId = $parameters['optionId'];

        try {
            $webstoreConfig = pluginApp(WebstoreConfigurationRepositoryContract::class);
            $settingsHandlerService = pluginApp(SettingsHandlerService::class);

            list($webstore, $pluginSet) = explode(".", $optionId);

            $webstoreId = explode('_', $webstore)[1];
            $pluginSetId = explode('_', $pluginSet)[1];

            if (empty($webstoreId) && !empty($data['client'])) {
                $webstoreId = $data['client'];
            }

            if (empty($pluginSetId) && $data['pluginSet'] !== false) {
                $pluginSetId = $data['pluginSet'];
            }

            //we need to create list of active languages that will be saved into plugin config and system settings
            $activeLanguagesList = is_array($data['languages_activeLanguages']) && count($data['languages_activeLanguages']) ?
                implode(", ", $data['languages_activeLanguages']) :
                "";

            if ($webstoreId !== 'preview') {
                $languages = LanguagesHelper::getTranslatedLanguages();
                $plentyId = $settingsHandlerService->getStoreIdentifier($webstoreId);
                $shippingCountryList = [];
                $currenciesList = [];

                //create default country list
                foreach ($languages as $langKey => $language) {
                    $settingKey = 'defSettings_deliveryCountry_' . $langKey;
                    if (isset($data[$settingKey])) {
                        $shippingCountryList[$langKey] = $data[$settingKey];
                    }
                }

                //create default currencies list
                foreach ($languages as $langCode => $language) {
                    $key = 'currencies_defaultCurrency_' . $langCode;

                    if (!empty($data[$key])) {
                        $currenciesList[$langCode] = $data[$key];
                    }
                }

                $mappingService = pluginApp(MappingService::class);

                $shippingData = [
                    "defaultShippingCountryList" => $shippingCountryList
                ];

                $currenciesData = [
                    "defaultCurrencyList" => $currenciesList
                ];
                $globalData = $mappingService->processGlobalMappingData($data, "store");

                if (isset($globalData["defaultLanguage"])) {
                    $defaultLang = $globalData["defaultLanguage"];
                    if (isset($shippingData["defaultShippingCountryList"][$defaultLang])) {
                        $globalData["defaultShippingCountryId"] = $shippingData["defaultShippingCountryList"][$defaultLang];
                    }

                    if (isset($currenciesData["defaultCurrencyList"][$defaultLang])) {
                        $globalData["defaultCurrency"] = $currenciesData["defaultCurrencyList"][$defaultLang];
                    }
                }

                $intermediarBrowserLanguage = $globalData['browserLanguage'];
                $globalData['browserLanguage'] = [
                    'other' => $intermediarBrowserLanguage
                ];
                foreach ($data as $dataKey => $dataValue) {
                    if (strpos($dataKey, "languages_browserLang_") !== false) {
                        $exploded = explode("_", $dataKey);
                        $key = end($exploded);
                        $globalData['browserLanguage'][$key] = $dataValue;
                    }
                }

                $webstoreData = array_merge($shippingData, $currenciesData, $globalData);

                if (!empty($activeLanguagesList)) {
                    $webstoreData['languageList'] = $activeLanguagesList;
                }

                if (isset($data['onlineStore_externalVatIdCheck'])) {
                    $webstoreData['externalVatCheckInactive'] = $data['onlineStore_externalVatIdCheck'];
                }
    
                if (isset($data['onlineStore_loginMode'])) {
                    $webstoreData['loginMode'] = $data['onlineStore_loginMode'];
                }

                if (isset($data['onlineStore_externalVatIdCheckServiceUnavailableFallbackStatus'])) {
                    $webstoreData['externalVatCheckServiceUnavailableFallbackStatus'] = (float)$data['onlineStore_externalVatIdCheckServiceUnavailableFallbackStatus'];
                }

                if (isset($data['onlineStore_useVariationOrderProperties'])) {
                    $webstoreData['useVariationOrderProperties'] = $data['onlineStore_useVariationOrderProperties'];
                }

                if (isset($data['pagination_sortingMonthlySales'])) {
                    $webstoreData['itemSortByMonthlySales'] = $data['pagination_sortingMonthlySales'];
                }

                if (isset($data['onlineStore_minimumOrderValue'])) {
                    $webstoreData['minimumOrderValue'] = $data['onlineStore_minimumOrderValue'];
                }

                if (isset($data['displayInfo_attributeSelectDefaultOption'])) {
                    $webstoreData['attributeSelectDefaultOption'] = 0;
                    if ($data['displayInfo_attributeSelectDefaultOption'] !== false) {
                        $webstoreData['attributeSelectDefaultOption'] = 1;
                    }
                }

                if (isset($data['seo_itemMetaTitle'])) {
                    $webstoreData['urlTitleItemName'] = $data['seo_itemMetaTitle'];
                }

                if(!empty($data["onlineStore_storeFavicon"])) {
                    /** @var WebshopWebstoreConfigurationRepositoryContract $webshopConfigRepository */
                    $webshopConfigRepository = pluginApp(WebshopWebstoreConfigurationRepositoryContract::class);
                    $webshopConfigRepository->setFaviconFromWebspace($plentyId, $data["onlineStore_storeFavicon"]);
                } else {
                    $webstoreData['faviconPath'] = '';
                }

                $webstoreConfig->updateByPlentyId($webstoreData, $plentyId);

                // we save robotsTxt
                if (!empty($data["seo_robotsTxt"])) {
                    $robotsRepo = pluginApp(RobotsRepositoryContract::class);
                    $robotsRepo->updateByWebstoreId($webstoreId, $data["seo_robotsTxt"]);
                }

                //save sitemap xml
                if (isset($data['seo_siteMapConfig'])) {
                    $siteMapConfig = [
                        "contentCategory" => 0,
                        "itemCategory" => 0,
                        "item" => 0,
                        "blog" => 0
                    ];

                    foreach ($siteMapConfig as $siteMapKey => $siteMapValue) {
                        if (in_array($siteMapKey, $data['seo_siteMapConfig'] ?? [])) {
                            $siteMapConfig[$siteMapKey] = 1;
                        }
                    }
                    $siteMapRepo = pluginApp(SitemapConfigurationRepositoryContract::class);
                    $siteMapRepo->updateByWebstoreId($webstoreId, $siteMapConfig);
                }

                //save search languages settings
                if (
                    isset($data["languages_firstSearchLanguage"]) ||
                    isset($data["languages_secondSearchLanguage"]) ||
                    isset($data["languages_thirdSearchLanguage"])
                ) {
                    $selectedSearchLanguages = [];

                    if (!empty($data["languages_firstSearchLanguage"])) {
                        $selectedSearchLanguages[] = $data["languages_firstSearchLanguage"];
                    }

                    if (!empty($data["languages_secondSearchLanguage"])) {
                        $selectedSearchLanguages[] = $data["languages_secondSearchLanguage"];
                    }

                    if (!empty($data["languages_thirdSearchLanguage"])) {
                        $selectedSearchLanguages[] = $data["languages_thirdSearchLanguage"];
                    }

                    $searchSettingsRepo = pluginApp(VariationElasticSearchSettingsRepositoryContract::class);
                    $searchLanguagesSettings = $searchSettingsRepo->getLanguages()->toArray();

                    foreach ($searchLanguagesSettings['languages'] as &$searchLanguagesSetting) {
                        if (in_array($searchLanguagesSetting['lang'], $selectedSearchLanguages ?? [])) {
                            $searchLanguagesSetting['isActive'] = true;
                        } else {
                            $searchLanguagesSetting['isActive'] = false;
                        }
                    }

                    $searchSettingsRepo->saveLanguages($searchLanguagesSettings);

                    //save search settings

                    $itemSearchSettings = $searchSettingsRepo->getSearchSettings()->toArray();
                    $searchFields = $this->getSearchSetingsKeys($itemSearchSettings['fields']);
                    $searchSettings = $this->setSearchSettingComplete();

                    $completedSettings = [];
                    $itemSearchSettingsData = [];

                    foreach ($searchSettings as $searchSetting) {
                        if (!empty($data[$searchSetting['key']]) && !in_array(
                                $data[$searchSetting['key']],
                                $completedSettings ?? []
                            )) {
                            $itemSearchSettingsData[] = [
                                "key" => $data[$searchSetting['key']],
                                "boost" => 2000 - (intval($searchSetting['position']) * 100),
                                "isActive" => true
                            ];
                            $completedSettings[] = $data[$searchSetting['key']];
                        }
                    }

                    $disabledSettings = array_diff(array_unique($searchFields), $completedSettings);

                    if (count($disabledSettings)) {
                        foreach ($disabledSettings as $disabledSetting) {
                            $itemSearchSettingsData[] = [
                                "key" => $disabledSetting,
                                "boost" => 0,
                                "isActive" => false
                            ];
                        }
                    }

                    $searchSettingsRepo->saveSearchSettings(["fields" => $itemSearchSettingsData]);
                }

                if (!isset($data['onlineStore_alreadyPaidShippingCountries'])) {
                    $data['onlineStore_alreadyPaidShippingCountries'] = [];
                }
                $alreadyPaidShippingCountriesService = pluginApp(AlreadyPaidShippingCountriesService::class);
                $alreadyPaidShippingCountriesService->execute(
                    $plentyId,
                    $data['onlineStore_alreadyPaidShippingCountries']
                );

                $previewConfData = [
                    'pluginSetId' => $pluginSetId,
                    'deleted' => false,
                    'webstoreId' => (int)$webstoreId
                ];

                $this->savePreviewConfig($pluginSetId, $previewConfData, (int)$webstoreId);
                
                //invalidate caching
                $cacheInvalidRepo = pluginApp(ContentCacheInvalidationRepositoryContract::class);
                $cacheInvalidRepo->invalidateAll($plentyId);
            } else {
                // we set the preview config entry

                $previewConfData = [
                    "pluginSetId" => $pluginSetId,
                    "deleted" => false
                ];

                $this->savePreviewConfig($pluginSet, $previewConfData);
            }

            $configRepo = pluginApp(ConfigurationRepositoryContract::class);
            $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);
            $pluginSets = $pluginSetRepo->list();
            $pluginId = '';

            if (count($pluginSets)) {
                foreach ($pluginSets as $pluginSet) {
                    foreach ($pluginSet->pluginSetEntries as $pluginSetEntry) {
                        if ($pluginSetEntry instanceof PluginSetEntry && $pluginSetEntry->plugin->name === 'Ceres' && $pluginSetEntry->pluginSetId == $pluginSetId) {
                            $pluginId = $pluginSetEntry->pluginId;
                        }
                    }
                }
            }

            /** @var MappingService $mappingService */
            $mappingService = pluginApp(MappingService::class);
            $pluginData = $mappingService->processPluginMappingData($data, "store");

            if (count($pluginData)) {
                $configData = [];

                foreach ($pluginData as $itemKey => $itemVal) {
                    $configData[] = [
                        'key' => $itemKey,
                        'value' => $itemVal
                    ];
                }

                $configRepo->saveConfiguration($pluginId, $configData, $pluginSetId);
            }
        } catch (\Exception $exception) {
            return false;
        }

        return true;
    }

    /**
     * @return array
     */
    private function setSearchSettingComplete(): array
    {
        $searchSettings = [];

        for ($i = 0; $i < 13; $i++) {
            switch ($i) {
                case 1:
                    $key = "search_firstSearchField";
                    break;
                case 2:
                    $key = "search_secondSearchField";
                    break;
                case 3:
                    $key = "search_thirdSearchField";
                    break;
                default:
                    $key = "search_{$i}thSearchField";
            }

            $searchSettings[] = [
                "key" => $key,
                "position" => $i
            ];
        }

        return $searchSettings;
    }

    private function getSearchSetingsKeys(array $settingsData): array
    {
        $searchKeys = [];

        foreach ($settingsData as $setting) {
            $searchKeys[] = $setting['key'];
        }

        return $searchKeys;
    }


    private function savePreviewConfig($pluginSetId, $previewConfData, $webstoreId = null)
    {
        /** @var ShopWizardConfigRepository $previewConfigRepo */
        $previewConfigRepo = pluginApp(ShopWizardConfigRepository::class);

        $previewConf = $previewConfigRepo->getConfig($pluginSetId, $webstoreId);
        if ($previewConf instanceof ShopWizardPreviewConfiguration) {
            $previewConfigRepo->updateConfig($pluginSetId, $webstoreId, $previewConfData);
        } else {
            $previewConfigRepo->createConfig($previewConfData);
        }
    }
}
