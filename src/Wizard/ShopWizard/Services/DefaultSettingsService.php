<?php

namespace Ceres\Wizard\ShopWizard\Services;

use Plenty\Modules\Accounting\Contracts\AccountingLocationRepositoryContract;
use Plenty\Modules\Order\Shipping\Contracts\ParcelServicePresetRepositoryContract;
use Plenty\Modules\Order\Shipping\Countries\Contracts\CountryRepositoryContract;
use Plenty\Modules\Order\Shipping\ParcelService\Models\ParcelService;
use Plenty\Modules\Payment\Method\Contracts\PaymentMethodContainer;
use Plenty\Modules\Payment\Method\Contracts\PaymentMethodRepositoryContract;
use Plenty\Modules\Plugin\Contracts\PluginRepositoryContract;
use Plenty\Modules\Plugin\Models\Plugin;
use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSet;
use Plenty\Modules\System\Contracts\WebstoreRepositoryContract;

/**
 * Class DefaultSettingsService
 * @package Ceres\Wizard\ShopWizard\Services
 */
class DefaultSettingsService
{
    /**
     * @var ParcelServicePresetRepositoryContract
     */
    private $parcelServicePresetRepo;

    /**
     * @var PaymentMethodRepositoryContract
     */
    private $paymentRepository;

    /**
     * @var CountryRepositoryContract
     */
    private $countryRepository;

    /**
     * @var AccountingLocationRepositoryContract
     */
    private $accountingLocationRepo;

    /**
     * @var array
     */
    private $pluginSetList;

    /**
     * ShopWizardService constructor.
     *
     * @param ParcelServicePresetRepositoryContract $parcelServicePresetRepo
     * @param PaymentMethodRepositoryContract $paymentRepository
     * @param CountryRepositoryContract $countryRepository
     * @param AccountingLocationRepositoryContract $accountingLocationRepo
     */
    public function __construct(
        ParcelServicePresetRepositoryContract $parcelServicePresetRepo,
        PaymentMethodRepositoryContract $paymentRepository,
        CountryRepositoryContract $countryRepository,
        AccountingLocationRepositoryContract $accountingLocationRepo
    )
    {
        $this->parcelServicePresetRepo = $parcelServicePresetRepo;
        $this->paymentRepository = $paymentRepository;
        $this->countryRepository = $countryRepository;
        $this->accountingLocationRepo = $accountingLocationRepo;
    }

    /**
     * @return bool
     */
    public function hasShippingProfiles(): bool
    {
        $shippingProfiles = $this->getShippingProfiles();
        return count($shippingProfiles) ? true : false;
    }

    /**
     * @return bool
     */
    public function hasPaymentMethods(): bool
    {
        $pluginPaymentMethodsRegistered = $this->getPluginPaymentMethodsRegistered();
        return count($pluginPaymentMethodsRegistered) ? true : false;
    }

    /**
     * @return array
     */
    public function getPluginPaymentMethodsRegistered():array
    {
        $paymentMethods = $this->paymentRepository->allPluginPaymentMethods();
        $paymentMethodContainer = pluginApp(PaymentMethodContainer::class);

        $pluginPaymentMethodsRegistered = [];
        if (count($paymentMethods)) {
            foreach ($paymentMethods as $paymentMethod) {
                $registeringKey = $paymentMethod->pluginKey . "::" . $paymentMethod->paymentKey;
                if ($paymentMethodContainer->isRegistered($registeringKey)) {
                    $pluginPaymentMethodsRegistered[$paymentMethod->id] = $paymentMethod->name;
                }
            }
        }

        return $pluginPaymentMethodsRegistered;
    }

    /**
     * @return bool
     */
    public function hasShippingMethods(): bool
    {
        $shippingMethods = $this->getShippingMethods();
        return count($shippingMethods) ? true : false;
    }

    /**
     * @return bool
     */
    public function hasShippingCountries(): bool
    {
        $shippingCountries = $this->countryRepository->getActiveCountriesList();
        return count($shippingCountries) ? true : false;
    }
    
    /**
     * @return array
     */
    public function getShippingProfiles()
    {
        return $this->parcelServicePresetRepo->getPreviewList();
    }

    /**
     * @return array
     */
    public function getShippingMethods()
    {
        $shippingMethods = [];
        $shippingProfiles = $this->parcelServicePresetRepo->getPresetList(['*'], 'parcelService');

        if (count($shippingProfiles)) {
            foreach ($shippingProfiles as $profile) {
                $shippingMethod = $profile->parcelService;
                if($shippingMethod instanceof ParcelService) {
                    $shippingMethods[$shippingMethod->id] = $shippingMethod->backendName;
                }
            }
        }

        return $shippingMethods;
    }

    /**
     * @return bool
     */
    public function hasLocations(): bool
    {
        $locations = $this->accountingLocationRepo->getAll();
        return count($locations) ? true : false;
    }

    /**
     * @return array
     */
    public function getPluginSets(): array
    {
        if(is_array($this->pluginSetList)) {
            return $this->pluginSetList;
        }

        $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);
        $pluginRepo = pluginApp(PluginRepositoryContract::class);
        $pluginSets = $pluginSetRepo->list();
        $pluginSetsData = $pluginSets->toArray();
        $pluginSetList = [];
        if (count($pluginSetsData)) {
            $plugin = $pluginRepo->getPluginByName("Ceres");
            if ($plugin instanceof Plugin) {
                foreach ($pluginSetsData as $pluginSetData) {
                    $pluginSet = $pluginSets->where('id', '=', $pluginSetData['id'])->first();
                    if($pluginSet instanceof PluginSet) {
                        if ($pluginRepo->isActiveInPluginSet($plugin->id, $pluginSet)) {
                            $pluginSetList[] = $pluginSetData;
                        }
                    }
                }
            }
        }

        $this->pluginSetList = $pluginSetList;

        return $pluginSetList;
    }

    /**
     * @return array
     */
    public function getWebstores(): array
    {
        $webstoreRepo = pluginApp(WebstoreRepositoryContract::class);
        $webstores = [];

        $webstoresCollection = $webstoreRepo->loadAllPreview();

        if (count($webstoresCollection)) {
            foreach ($webstoresCollection as $webstore) {
                $webstores[] = $webstore->toArray();
            }
        }
        return $webstores;
    }
}
