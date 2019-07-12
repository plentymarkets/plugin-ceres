<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 03/06/2019
 * Time: 14:01
 */

namespace Ceres\Wizard\ShopWizard\SettingsHandlers;

use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;
use Ceres\Wizard\ShopWizard\Services\MappingService;
use Plenty\Modules\Order\Currency\Contracts\CurrencyRepositoryContract;
use Plenty\Modules\Order\Shipping\Countries\Contracts\CountryRepositoryContract;
use Plenty\Modules\Plugin\Contracts\ConfigurationRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSetEntry;
use Plenty\Modules\System\Contracts\WebstoreConfigurationRepositoryContract;
use Plenty\Modules\System\Contracts\WebstoreRepositoryContract;
use Plenty\Modules\Wizard\Contracts\WizardSettingsHandler;


class ShopWizardSettingsHandler implements WizardSettingsHandler
{
    /**
     * @var CountryRepositoryContract
     */
    private $countryRepository;

    private $currencyRepository;

    public function __construct(CountryRepositoryContract $countryRepository, CurrencyRepositoryContract $currencyRepositoryContract)
    {
        $this->countryRepository = $countryRepository;
        $this->currencyRepository = $currencyRepositoryContract;
    }

    public function handle(array $parameters)
    {
        $data = $parameters['data'];
        $optionId = $parameters['optionId'];

        try{
            $webstoreConfig = pluginApp(WebstoreConfigurationRepositoryContract::class);
            $webstoreRepo = pluginApp(WebstoreRepositoryContract::class);

            list($webstore,$pluginSet) = explode(".", $optionId);

            list($webstorePrefix, $webstoreId) = explode('_', $webstore);
            list($pluginSetPrefix, $pluginSetId) = explode('_', $pluginSet);

            if (empty($webstoreId) && !empty($data['client'])) {
                $webstoreId = $data['client'];
            }

            if (empty($pluginSetId) && !empty($data['pluginSet'])) {
                $pluginSetId = $data['pluginSet'];
            }

            if ($webstoreId !=='preview') {

                $store = $webstoreRepo->findById($webstoreId);
                $plentyId = $store->storeIdentifier;
                $shippingCountryList = [];
                $deliveryCountries = $this->countryRepository->getActiveCountriesList();
                $currencies = $this->currencyRepository->getCurrencyList();
                $currenciesList = [];

                //create default country list
                if (count($deliveryCountries)) {
                    foreach ($deliveryCountries as $country) {
                        $countryData = $country->toArray();
                        $key = 'defSettings_deliveryCountry_' . $countryData['lang'];

                        if(!empty($data[$key])) {
                            $shippingCountryList[$countryData['lang']] = $countryData['id'];
                        }
                    }
                }

                //create default currencies list
                if (count($currencies)) {
                    $languages = LanguagesHelper::getTranslatedLanguages();
                    foreach ($languages as $langCode => $language) {
                        $key = 'currencies_defaultCurrency_' . $langCode;

                        if (!empty($data[$key])) {
                            $currenciesList[$langCode] = $data[$key];
                        }
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

                $webstoreData = array_merge($shippingData, $currenciesData, $globalData);

                $webstoreConfig->updateByPlentyId($webstoreData, $plentyId);
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



        } catch (\Exception $exception) {

            return false;
        }

        return true;
    }
}