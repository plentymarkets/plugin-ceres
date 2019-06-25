<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 03/06/2019
 * Time: 14:01
 */

namespace Ceres\Wizard\ShopWizard\SettingsHandlers;

use Plenty\Modules\Order\Shipping\Countries\Contracts\CountryRepositoryContract;
use Plenty\Modules\Plugin\Contracts\ConfigurationRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\System\Contracts\WebstoreConfigurationRepositoryContract;
use Plenty\Modules\System\Contracts\WebstoreRepositoryContract;
use Plenty\Modules\Wizard\Contracts\WizardSettingsHandler;


class ShopWizardSettingsHandler implements WizardSettingsHandler
{

    private $countryRepository;

    public function __construct(CountryRepositoryContract $countryRepository)
    {
        $this->countryRepository = $countryRepository;
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

            if (!empty($webstoreId) && !empty($data['client'])) {
                $webstoreId = $data['client'];
            }

            if (!empty($pluginSetId) && !empty($data['pluginSet'])) {
                $pluginSetId = $data['pluginSet'];
            }

            if ($webstoreId !=='preview') {

                $store = $webstoreRepo->findById($webstoreId);
                $plentyId = $store->storeIdentifier;
                $shippingCountryList = [];
                $deliveryCountries = $this->countryRepository->getActiveCountriesList();

                if (count($deliveryCountries)) {
                    foreach ($deliveryCountries as $country) {
                        $countryData = $country->toArray();
                        $key = 'defSettings_deliveryCountry_' . $countryData['lang'];

                        if(!empty($data[$key])) {
                            $shippingCountryList[$countryData['lang']] = $countryData['id'];
                        }
                    }
                }
                $webstoreData = [
                    "defaultLanguage" => $data['defSettings_defaultLanguage'],
                    "defaultParcelServicePresetId" => floatval($data['defSettings_defaultShippingProfile']),
                    "defaultParcelServiceId" => floatval($data['defSettings_defaultShippingMethod']),
                    "defaultMethodOfPaymentId" => floatval($data['defSettings_defaultPaymentMethod']),
                    "defaultShippingCountryList" => $shippingCountryList,
                    "defaultAccountingLocation" => intval($data['defSettings_defaultLocation'])
                ];

                if ($store->pluginSetId == $pluginSetId) {
                    $webstoreData['defaultCustomerClassId'] = $data['defSettings_defaultB2B'];
                }

                $webstoreConfig->updateByPlentyId($webstoreData, $plentyId);
            }

            $configRepo = pluginApp(ConfigurationRepositoryContract::class);
            $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);
            $pluginId = '';

            $pluginSetObj = $pluginSetRepo->get($pluginSetId)->toArray();

            if (count($pluginSetObj['pluginSetEntries'])) {
                foreach ($pluginSetObj['pluginSetEntries'] as $pluginSetEntry) {
                    if ($pluginSetEntry['plugin']['name'] === 'Ceres') {
                        $pluginId = $pluginSetEntry['plugin']['id'];
                    }
                }
            }
            $configData = [
                [
                    'key' => "global.default_contact_class_b2b",
                    'value' => $data['defSettings_defaultB2B']
                ]
            ];

            $configRepo->saveConfiguration($pluginId, $configData, $pluginSetId);


        } catch (\Exception $exception) {

            return false;
        }

        return true;
    }
}