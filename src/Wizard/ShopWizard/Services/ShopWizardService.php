<?php

namespace Ceres\Wizard\ShopWizard\Services;

use Ceres\Wizard\ShopWizard\Models\ShopWizardPreviewConfiguration;
use Ceres\Wizard\ShopWizard\Repositories\ShopWizardConfigRepository;
use Plenty\Modules\ContentCache\ContentCacheSettings\ContentCacheSettings;
use Plenty\Modules\ContentCache\Contracts\ContentCacheSettingsRepositoryContract;
use Plenty\Modules\Item\Search\Contracts\VariationElasticSearchSettingsRepositoryContract;
use Plenty\Modules\Plugin\Contracts\ConfigurationRepositoryContract;
use Plenty\Modules\Plugin\Contracts\PluginRepositoryContract;
use Plenty\Modules\Plugin\Models\Plugin;
use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetEntryRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSet;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSetEntry;
use Plenty\Modules\System\Contracts\WebstoreConfigurationRepositoryContract;
use Plenty\Modules\System\Contracts\WebstoreRepositoryContract;
use Plenty\Modules\Webshop\Seo\Contracts\RobotsRepositoryContract;
use Plenty\Modules\Webshop\Seo\Contracts\SitemapConfigurationRepositoryContract;
use Plenty\Modules\Webshop\Seo\Models\Robots;
use Plenty\Modules\Webshop\Seo\Models\SitemapConfiguration;

/**
 * Class ShopWizardService
 * @package Ceres\Wizard\ShopWizard\Services
 */
class ShopWizardService
{
    private $settingsService;

    private $mappingService;

    /**
     * ShopWizardService constructor.
     * @param DefaultSettingsService $settingsService
     * @param MappingService $mappingService
     */
    public function __construct(DefaultSettingsService $settingsService, MappingService $mappingService)
    {
        $this->settingsService = $settingsService;
        $this->mappingService = $mappingService;
    }

    /**
     * @return array
     */
    public function getWebstoresIdentifiers():array
    {
        $webstoresMapped = [];

        $webstores = $this->settingsService->getWebstores();

        // we need to check if we have settings for preview mode saved
        $webstoresPluginSetIds = array_column($webstores, 'pluginSetId');

        /** @var PluginRepositoryContract $pluginRepo */
        $pluginRepo = pluginApp(PluginRepositoryContract::class);
        $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);
        $pluginSets = $pluginSetRepo->list();
        $wizardConfRepo = pluginApp(ShopWizardConfigRepository::class);

        $plugin = $pluginRepo->getPluginByName("Ceres");
        if ($plugin instanceof Plugin) {
            foreach($pluginSets as $pluginSet) {
                foreach ($pluginSet->pluginSetEntries as $pluginSetEntry) {
                    $previewConfig = $wizardConfRepo->getConfig($pluginSetEntry->pluginSetId);
                    if (
                        $pluginSetEntry instanceof PluginSetEntry &&
                        $pluginSetEntry->pluginId == $plugin->id &&
                        !in_array($pluginSetEntry->pluginSetId, $webstoresPluginSetIds) &&
                        $previewConfig instanceof ShopWizardPreviewConfiguration && !$previewConfig->deleted
                    ) {
                        $webstores[] = [
                            'id' => 'preview',
                            'pluginSetId' => (int)$pluginSetEntry->pluginSetId
                        ];
                    }
                }
            }
        }

        if (count($webstores)) {
            foreach ($webstores as $webstore) {
                if (!empty($webstore['pluginSetId'])) {

                    $pluginSet = $pluginSets->where('id', '=', $webstore['pluginSetId'])->first();

                    if($pluginSet instanceof PluginSet
                        && $pluginRepo->isActiveInPluginSet($plugin->id, $pluginSet)) {

                        $key = "webstore_" . $webstore['id'] . "." . "pluginSet_" . $webstore['pluginSetId'];

                        $webstoresMapped[$key] = [
                            "client" => $webstore['id'],
                            "pluginSet" => $webstore['pluginSetId']
                        ];
                    }
                }
            }
        }

        return $webstoresMapped;
    }

    /**
     * @param $webstoreId
     * @param $pluginSetId
     * @return array
     */
    public function mapWebstoreData($webstoreId, $pluginSetId)
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

            if (count($globalData['languages_defaultBrowserLang'])) {
                $globalData['languages_setLinkedStoreLanguage'] = true;
                $browserLanguage = $globalData['languages_defaultBrowserLang'];

                //now we extract data related from browser language
                foreach ($browserLanguage as $bLangKey => $bLang) {
                    if ($bLangKey == 'other') {
                        $globalData['languages_defaultBrowserLang'] = $bLang;
                    } else {
                        $langKey = "languages_browserLang_{$bLangKey}";
                        $globalData[$langKey] = $bLang;
                    }
                }
            }

            //get content of robots txt
            $robotsRepo = pluginApp(RobotsRepositoryContract::class);
            $robotsTxt = $robotsRepo->findByWebstoreId($webstoreId);

            if ($robotsTxt instanceof Robots) {
                $robotsTxtData = $robotsTxt->toArray();
                $globalData['seo_robotsTxt'] =
                    is_array($robotsTxtData['value'])?
                    $robotsTxtData['value']['value']:
                    $robotsTxtData['value'];
            }

            // get sitemap data
            $siteMapConfigRepo = pluginApp(SitemapConfigurationRepositoryContract::class);
            $siteMapConfig = $siteMapConfigRepo->findByWebstoreId($webstoreId);

            if ($siteMapConfig instanceof SitemapConfiguration) {
                $siteMapConfigData = $siteMapConfig->toArray();
                $globalData['seo_siteMapConfig'] = [];

                foreach ($siteMapConfigData as $configKey => $configStatus) {
                    if ($configStatus) {
                        $globalData['seo_siteMapConfig'][] = $configKey;
                    }
                }
            }

            //get search languages
            $searchSettingsRepo = pluginApp(VariationElasticSearchSettingsRepositoryContract::class);
            $searchLanguagesSettings = $searchSettingsRepo->getLanguages()->toArray();

            //iterate between languages and set the ones enabled
            $enabledLanguages = [];
            foreach($searchLanguagesSettings['languages'] as $searchLanguage) {
                if($searchLanguage['isActive']) {
                    $enabledLanguages[] = $searchLanguage['lang'];
                }
            }

            if (count($enabledLanguages)) {
                if (isset($enabledLanguages[0])) {
                    $globalData['languages_secondSearchLanguage'] = $enabledLanguages[0];
                }
                if (isset($enabledLanguages[1])){
                    $globalData['languages_firstSearchLanguage'] = $enabledLanguages[1];
                }

                if (isset($enabledLanguages[2])) {
                    $globalData['languages_thirdSearchLanguage'] = $enabledLanguages[2];
                }
            }

            // search fields logic

            $itemSearchSettings = $searchSettingsRepo->getSearchSettings()->toArray();
            foreach($itemSearchSettings['fields'] as $fieldKey => $fieldSettings) {
                $fieldKey += 1;
                $formFieldPrefix = "search_";
                switch ($fieldKey) {
                    case 1:
                        $formField = "{$formFieldPrefix}firstSearchField";
                        break;
                    case 2:
                        $formField = "{$formFieldPrefix}secondSearchField";
                        break;
                    case 3:
                        $formField = "{$formFieldPrefix}thirdSearchField";
                        break;
                    default:
                        $formField = "{$formFieldPrefix}{$fieldKey}thSearchField";

                }
                $formFieldValue = $fieldSettings['isActive'] ? $fieldSettings['key'] : "";

                $globalData[$formField] = $formFieldValue;
            }
        }

         /** @var PluginRepositoryContract $pluginRepo */
        $pluginRepo = pluginApp(PluginRepositoryContract::class);
        $plugin = $pluginRepo->getPluginByName("Ceres");
        $pluginConfData = [];

        if ($plugin instanceof Plugin)
        {
            /**
             * @var PluginSetRepositoryContract $pluginSetRepo
             */
            $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);
            $pluginSetEntries = $pluginSetRepo->listSetEntries($pluginSetId);

            foreach ($pluginSetEntries as $pluginSetEntry)
            {
                if ($pluginSetEntry instanceof PluginSetEntry && $pluginSetEntry->plugin->id === $plugin->id)
                {
                    $config = $pluginSetEntry->configurations()->getResults();
                    if (count($config))
                    {
                        foreach ($config as $confItem)
                        {
                            $pluginConfData[$confItem->key] = $confItem->value;
                        }
                    }
                }
            }
             /** @var ConfigurationRepositoryContract $configurationRepo */
            $configurationRepo = pluginApp(ConfigurationRepositoryContract::class);
            $pluginConfigJson = $configurationRepo->getConfigurationFile($plugin->id, $pluginSetId);

            $pluginConfig = json_decode($pluginConfigJson, true);

            foreach($pluginConfig['menu'] as $tab)
            {
                foreach($tab['formFields'] as $configKey => $formField)
                {
                    if(!array_key_exists($configKey, $pluginConfData) && isset($formField['options']['defaultValue']))
                    {
                        if($formField['type'] === 'multiCheckBox' && $formField['options']['defaultValue'] === 'all')
                        {
                            $values = [];
                            foreach($formField['options']['checkBoxValues'] as $checkBoxValue)
                            {
                                $values[] = $checkBoxValue['value'];
                            }
                            $pluginConfData[$configKey] = implode(', ', $values);
                        }
                        else
                        {
                            $pluginConfData[$configKey] = $formField['options']['defaultValue'];
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
                $data['performance_shopBooster'] = (bool) $shopBoosterData['contentCacheActive'];
            }
        }

        if ($hasShippingMethod && $hasShippingProfile && $hasPaymentMethod && $hasShippingCountry) {
            $data['setAllRequiredAssistants'] = 'true';
        }

        $data['onlineStore_enableRecaptcha'] = strlen($data['onlineStore_recaptchaApiKey']) || strlen($data['onlineStore_recaptchaSecret']);

        return $data;
    }

    /**
     * @param string $keyPrefix
     * @param array $data
     * @return bool
     */
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
