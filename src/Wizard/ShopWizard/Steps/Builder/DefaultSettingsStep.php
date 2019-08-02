<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 06/06/2019
 * Time: 15:25
 */

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;
use Ceres\Wizard\ShopWizard\Services\DefaultSettingsService;
use Plenty\Modules\Account\Contact\Contracts\ContactClassRepositoryContract;
use Plenty\Modules\Order\Shipping\Countries\Contracts\CountryRepositoryContract;
use Plenty\Modules\Payment\Contracts\PaymentRepositoryContract;
use Plenty\Modules\Payment\Method\Contracts\PaymentMethodRepositoryContract;
use Plenty\Modules\Accounting\Contracts\AccountingLocationRepositoryContract;

class DefaultSettingsStep extends Step
{


    /**
     * @var PaymentRepositoryContract
     */
    private $paymentRepository;

    /**
     * @var CountryRepositoryContract
     */
    private $countryRepository;

    /**
     * @var ContactClassRepositoryContract
     */
    private $classRepository;

    /**
     * @var AccountingLocationRepositoryContract
     */
    private $locationRepository;


    /**
     * DefaultSettingsStep constructor.
     *
     * @param PaymentMethodRepositoryContract $paymentRepository
     * @param CountryRepositoryContract $countryRepository
     * @param ContactClassRepositoryContract $classRepository
     * @param AccountingLocationRepositoryContract $accountingLocationRepositoryContract
     */
    public function __construct(
        PaymentMethodRepositoryContract $paymentRepository,
        CountryRepositoryContract $countryRepository,
        ContactClassRepositoryContract $classRepository,
        AccountingLocationRepositoryContract $accountingLocationRepositoryContract
    ){
        $this->paymentRepository = $paymentRepository;
        $this->countryRepository = $countryRepository;
        $this->classRepository = $classRepository;
        $this->locationRepository = $accountingLocationRepositoryContract;

        parent::__construct();
    }

    /**
     * @return array
     */
    public function generateStep()
    {
        $wizardService = pluginApp(DefaultSettingsService::class);

        $shippingMethods = $wizardService->getShippingMethods();
        $shippingMethodsList = StepHelper::buildListBoxData($shippingMethods);

        $languages = LanguagesHelper::getTranslatedLanguages();
        $languagesList = StepHelper::buildListBoxData($languages);

        $shippingProfiles = $wizardService->getShippingProfiles();
        $shippingProfilesList = StepHelper::buildListBoxData($shippingProfiles);

        $paymentMethods = $wizardService->getPluginPaymentMethodsRegistered();
        $paymentMethodsList = StepHelper::buildListBoxData($paymentMethods);

        $deliveryCountries = $this->countryRepository->getActiveCountriesList();


        $b2bClasses  = $this->classRepository->allContactClasses();
        $b2bClassesList = StepHelper::buildListBoxData($b2bClasses);

        $locations = $this->locationRepository->getAll();
        $locationsList = StepHelper::buildListBoxData($locations, "name", "id");
        return [
            "title" => "Wizard.defaultSettings",
            "description" => "Wizard.defaultSettingsDescription",
            "condition" => $this->hasRequiredSettings(),
            "sections" => [
                $this->generateSection("defaultLanguage", $languagesList, $this->globalsCondition),
                $this->generateSection("defaultShippingMethod", $shippingMethodsList, $this->globalsCondition),
                $this->generateSection("defaultShippingProfile", $shippingProfilesList, $this->globalsCondition),
                $this->generateSection("defaultPaymentMethod", $paymentMethodsList, $this->globalsCondition),
                $this->generateCountryDeliverySection("defaultDeliveryCountry", $deliveryCountries, $this->globalsCondition),
                $this->generateSection("defaultB2C", $b2bClassesList, $this->globalsCondition),
                $this->generateSection("defaultB2B",$b2bClassesList),
                $this->generateSection("defaultLocation",$locationsList, $this->globalsCondition)
                //$this->generateLocationSection($this->globalsCondition)
            ]
        ];
    }

    /**
     * @param $name
     *
     * @return array
     */
    private function generateSection($name, $listBoxValues, $condition = true): array
    {
        return [
            "title" => "Wizard." . $name,
            "description" => "Wizard." . $name . "Description",
            "condition" => $condition,
            "form" => [
                "defSettings_" . $name => [
                    "type" => "select",
                    "options" => [
                        "name" => "Wizard." . $name,
                        "listBoxValues" => $listBoxValues
                    ]
                ]
            ]
        ];
    }

    /**
     * @param $condition
     *
     * @return array
     */
    private function generateLocationSection($condition)
    {
        return [
            "title" => "Wizard.defaultLocation",
            "description" => "Wizard.defaultLocationDescription",
            "condition" => $condition,
            "form" => [
                "defSettings_defaultLocation" => [
                    "type" => "select",
                    "dependencies" => ['client'],
                    "dependencyMethod" => "retrieveLocationData",
                    "options" => [
                        "name" => "Wizard.defaultLocation",
                    ]
                ]
            ]
        ];
    }

    /**
     * @param $name
     * @param $collection
     * @param bool $condition
     *
     * @return array
     */
    private function generateCountryDeliverySection($name, $collection, $condition = true): array
    {
        return [
            "title" => "Wizard." . $name,
            "description" => "Wizard." . $name . "Description",
            "condition" => $condition,
            "form" => $this->generateCountriesList($collection)
        ];
    }

    /**
     * @param $countriesCollection
     *
     * @return array
     */
    private function generateCountriesList($countriesCollection): array
    {
        $list = [];

        if (count($countriesCollection)) {
            foreach ($countriesCollection as $country) {
                $countryData = $country->toArray();
                $languages = LanguagesHelper::getTranslatedLanguages();
                $key = 'defSettings_deliveryCountry_' . $countryData['lang'];
                $list[$key] = [
                    "type" => "select",
                    "options" => [
                        "name" => $languages[$countryData['lang']],
                        'required' => true,
                        "listBoxValues" => [
                            [
                                "value" => $countryData['id'],
                                "caption" => $countryData['name']
                            ]
                        ]
                    ]
                ];
            }
        }

        return $list;
    }
}