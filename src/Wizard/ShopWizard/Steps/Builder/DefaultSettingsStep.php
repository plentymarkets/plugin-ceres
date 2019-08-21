<?php

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;
use Ceres\Wizard\ShopWizard\Services\DefaultSettingsService;
use Plenty\Modules\Account\Contact\Contracts\ContactClassRepositoryContract;
use Plenty\Modules\Order\Shipping\Countries\Contracts\CountryRepositoryContract;
use Plenty\Modules\Payment\Contracts\PaymentRepositoryContract;
use Plenty\Modules\Payment\Method\Contracts\PaymentMethodRepositoryContract;
use Plenty\Modules\Accounting\Contracts\AccountingLocationRepositoryContract;
use Plenty\Plugin\Translation\Translator;

/**
 * Class DefaultSettingsStep
 * @package Ceres\Wizard\ShopWizard\Steps\Builder
 */
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

    /** @var Translator */
    private $translator;

    /**
     * DefaultSettingsStep constructor.
     *
     * @param PaymentMethodRepositoryContract $paymentRepository
     * @param CountryRepositoryContract $countryRepository
     * @param ContactClassRepositoryContract $classRepository
     * @param AccountingLocationRepositoryContract $accountingLocationRepositoryContract
     * @param Translator $translator
     */
    public function __construct(
        PaymentMethodRepositoryContract $paymentRepository,
        CountryRepositoryContract $countryRepository,
        ContactClassRepositoryContract $classRepository,
        AccountingLocationRepositoryContract $accountingLocationRepositoryContract,
        Translator $translator
    ){
        parent::__construct();
        
        $this->paymentRepository = $paymentRepository;
        $this->countryRepository = $countryRepository;
        $this->classRepository = $classRepository;
        $this->locationRepository = $accountingLocationRepositoryContract;
        $this->translator = $translator;
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
        if(!count($b2bClasses))
        {
            /** @var Translator $translator */
            $translator = pluginApp(Translator::class);
            $b2bClasses[0] = $translator->trans('Ceres::Wizard.defaultCustomerClass');
        }
        
        $b2bClassesList = StepHelper::buildListBoxData($b2bClasses);

        $locations = $this->locationRepository->getAll();
        $locationsList = StepHelper::buildListBoxData($locations, "name", "id");
        
        return [
            "title"       => "Wizard.defaultSettings",
            "description" => "Wizard.defaultSettingsDescription",
            "condition"   => $this->hasRequiredSettings(),
            "sections"    => [
                $this->generateSection("defaultLanguage", $languagesList, $this->globalsCondition),
                $this->generateSection("defaultShippingMethod", $shippingMethodsList, $this->globalsCondition),
                $this->generateSection("defaultShippingProfile", $shippingProfilesList, $this->globalsCondition),
                $this->generateSection("defaultPaymentMethod", $paymentMethodsList, $this->globalsCondition),
                $this->generateCountryDeliverySection("defaultDeliveryCountry", $deliveryCountries, $this->globalsCondition),
                $this->generateSection("defaultB2C", $b2bClassesList, $this->globalsCondition),
                $this->generateSection("defaultB2B",$b2bClassesList),
                $this->generateSection("defaultLocation",$locationsList, $this->globalsCondition)
            ]
        ];
    }
    
    /**
     * @param $name
     * @param $listBoxValues
     * @param bool $condition
     * @return array
     */
    private function generateSection($name, $listBoxValues, $condition = true):array
    {
        return [
            "title"       => "Wizard." . $name,
            "description" => "Wizard." . $name . "Description",
            "condition"   => $condition,
            "form"        => [
                "defSettings_" . $name => [
                    "type"    => "select",
                    "options" => [
                        "name"          => "Wizard." . $name,
                        "listBoxValues" => $listBoxValues
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
    private function generateCountryDeliverySection($name, $collection, $condition = true):array
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
    private function generateCountriesList($countriesCollection):array
    {
        $list = [];
    
        $languages = LanguagesHelper::getTranslatedLanguages();
        $countryNames = $this->countryRepository->getActiveCountryNameMap(LanguagesHelper::getUserLang());
        $prefix = $this->translator->trans("Ceres::Wizard.defaultDeliveryCountry");
        if (count($countriesCollection)) {
            foreach ($languages as $langKey => $language) {
                $settingKey = 'defSettings_deliveryCountry_' . $langKey;

                $countries = $countriesCollection->where('lang', $langKey);

                if(count($countries)) {
                    $list[$settingKey] = [
                        "type"    => "select",
                        "options" => [
                            "name"          => "{$prefix} {$language}",
                            'required'      => true,
                            "listBoxValues" => []
                        ]
                    ];

                    foreach($countries as $country) {
                        $countryData = $country->toArray();

                        $list[$settingKey]['options']['listBoxValues'][] = [
                            "value"   => $countryData['id'],
                            "caption" => $countryNames[$countryData['id']]
                        ];
                    }
                }
            }
        }

        return $list;
    }
}
