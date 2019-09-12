<?php

namespace Ceres\Wizard\ShopWizard\SettingsHandlers;

use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;
use Ceres\Wizard\ShopWizard\Models\ShopWizardPreviewConfiguration;
use Ceres\Wizard\ShopWizard\Repositories\ShopWizardConfigRepository;
use Ceres\Wizard\ShopWizard\Services\MappingService;
use Ceres\Wizard\ShopWizard\Services\SettingsHandlerService;
use Plenty\Modules\ContentCache\Contracts\ContentCacheInvalidationRepositoryContract;
use Plenty\Modules\ContentCache\Contracts\ContentCacheSettingsRepositoryContract;
use Plenty\Modules\Item\Search\Contracts\VariationElasticSearchSettingsRepositoryContract;
use Plenty\Modules\Order\Currency\Contracts\CurrencyRepositoryContract;
use Plenty\Modules\Order\Shipping\Countries\Contracts\CountryRepositoryContract;
use Plenty\Modules\Plugin\Contracts\ConfigurationRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSetEntry;
use Plenty\Modules\System\Contracts\WebstoreConfigurationRepositoryContract;
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
    public function __construct(CountryRepositoryContract $countryRepository, CurrencyRepositoryContract $currencyRepositoryContract)
    {
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

            list($webstore,$pluginSet) = explode(".", $optionId);

            $webstoreId = explode('_', $webstore)[1];
            $pluginSetId = explode('_', $pluginSet)[1];

            if (empty($webstoreId) && !empty($data['client'])) {
                $webstoreId = $data['client'];
            }

            if (empty($pluginSetId) && $data['pluginSet']!== false) {
                $pluginSetId = $data['pluginSet'];
            }

            //we need to create list of active languages that will be saved into plugin config and system settings
            $activeLanguagesList = count($data['languages_activeLanguages']) ?
                implode(", ", $data['languages_activeLanguages']):
                "";

            if ($webstoreId !=='preview') {

                $languages = LanguagesHelper::getTranslatedLanguages();
                $plentyId = $settingsHandlerService->getStoreIdentifier($webstoreId);
                $shippingCountryList = [];
                $currenciesList = [];

                //create default country list
                foreach ($languages as $langKey => $language) {
                    $settingKey = 'defSettings_deliveryCountry_' . $langKey;
                    if(isset($data[$settingKey])) {
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

                if (isset($globalData["defaultLanguage"]))
                {
                    $defaultLang = $globalData["defaultLanguage"];
                    if(isset($shippingData["defaultShippingCountryList"][$defaultLang]))
                    {
                        $globalData["defaultShippingCountryId"] = $shippingData["defaultShippingCountryList"][$defaultLang];
                    }

                    if(isset($currenciesData["defaultCurrencyList"][$defaultLang]))
                    {
                        $globalData["defaultCurrency"] = $currenciesData["defaultCurrencyList"][$defaultLang];
                    }
                }

                $intermediarBrowserLanguage = $globalData['browserLanguage'];
                $globalData['browserLanguage'] = [
                    'other' => $intermediarBrowserLanguage
                ];
                foreach ($data as $dataKey => $dataValue){
                    if (strpos($dataKey, "languages_browserLang_") !== false) {
                        $key = end(explode("_", $dataKey));
                        $globalData['browserLanguage'][$key] = $dataValue;
                    }
                }

                $webstoreData = array_merge($shippingData, $currenciesData, $globalData);

                if (!empty($activeLanguagesList)) {
                    $webstoreData['languageList'] = $activeLanguagesList;
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

                    foreach($siteMapConfig as $siteMapKey => $siteMapValue) {
                        if (in_array($siteMapKey, $data['seo_siteMapConfig'])) {
                            $siteMapConfig[$siteMapKey] = 1;
                        }
                    }
                    $siteMapRepo = pluginApp(SitemapConfigurationRepositoryContract::class);
                    $siteMapRepo->updateByWebstoreId($webstoreId, $siteMapConfig);
                }

                //we handle settings for shopping booster

                if (isset($data["performance_shopBooster"])) {
                    $cacheRepo = pluginApp(ContentCacheSettingsRepositoryContract::class);
                    $cacheRepo->saveSettings($plentyId, (bool) $data["performance_shopBooster"]);
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

                    foreach($searchLanguagesSettings['languages'] as &$searchLanguagesSetting) {
                        if (in_array($searchLanguagesSetting['lang'], $selectedSearchLanguages)) {
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

                    foreach($searchSettings as $searchSetting) {
                        if (!empty($data[$searchSetting['key']]) && !in_array($data[$searchSetting['key']], $completedSettings)){
                            $itemSearchSettingsData[] = [
                                "key" => $data[$searchSetting['key']],
                                "boost" => 2000 - (intval($searchSetting['position']) * 100),
                                "isActive" => true
                            ];
                            $completedSettings[] = $data[$searchSetting['key']];
                        }
                    }

                    $disabledSettings  = array_diff(array_unique($searchFields), $completedSettings);

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
            } else {
                // we set the preview config entry

                $previewConfigRepo = pluginApp(ShopWizardConfigRepository::class);
                $previewConfData = [
                    "pluginSetId" => $pluginSetId,
                    "deleted" => false
                ];

                $previewConf = $previewConfigRepo->getConfig($pluginSetId);
                if ($previewConf instanceof ShopWizardPreviewConfiguration) {
                    $previewConfigRepo->updateConfig($pluginSetId, $previewConfData);
                } else {
                    $previewConfigRepo->createConfig($previewConfData);
                }
            }

            $configRepo = pluginApp(ConfigurationRepositoryContract::class);
            $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);
            $pluginSets = $pluginSetRepo->list();
            $pluginId = '';

            if (count($pluginSets)) {
                foreach($pluginSets as $pluginSet) {
                    foreach ($pluginSet->pluginSetEntries as $pluginSetEntry) {
                        if ($pluginSetEntry instanceof PluginSetEntry && $pluginSetEntry->plugin->name === 'Ceres' && $pluginSetEntry->pluginSetId == $pluginSetId) {
                            $pluginId = $pluginSetEntry->pluginId;
                        }
                    }
                }
            }

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

            //invalidate caching
            $cacheInvalidRepo = pluginApp(ContentCacheInvalidationRepositoryContract::class);
            $cacheInvalidRepo->invalidateAll();

        } catch (\Exception $exception) {

            return false;
        }

        return true;
    }
    
    /**
     * @return array
     */
    private function setSearchSettingComplete():array
    {
        $searchSettings = [];

        for ($i = 0; $i < 13; $i++) {
            switch($i){
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
}
