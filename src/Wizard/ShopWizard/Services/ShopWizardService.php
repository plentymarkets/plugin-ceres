<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 29/05/2019
 * Time: 13:56
 */

namespace Ceres\Wizard\ShopWizard\Services;


use Plenty\Modules\Accounting\Contracts\AccountingLocationRepositoryContract;
use Plenty\Modules\Order\Shipping\Contracts\ParcelServicePresetRepositoryContract;
use Plenty\Modules\Order\Shipping\Countries\Contracts\CountryRepositoryContract;
use Plenty\Modules\Order\Shipping\ParcelService\Models\ParcelService;
use Plenty\Modules\Payment\Contracts\PaymentRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\System\Contracts\WebstoreRepositoryContract;

class ShopWizardService
{


    /**
     * @var ParcelServicePresetRepositoryContract
     */
    private $parcelServicePresetRepo;

    /**
     * @var PaymentRepositoryContract
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
     * ShopWizardService constructor.
     *
     * @param ParcelServicePresetRepositoryContract $parcelServicePresetRepo
     */
    public function __construct(
        ParcelServicePresetRepositoryContract $parcelServicePresetRepo,
        PaymentRepositoryContract $paymentRepository,
        CountryRepositoryContract $countryRepository,
        AccountingLocationRepositoryContract $accountingLocationRepo
    ){
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
        $paymentMethods = $this->paymentRepository->getAll();

        return count($paymentMethods) ? true : false;
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
    private function getShippingProfiles()
    {
        return $this->parcelServicePresetRepo->getPreviewList();
    }

    /**
     * @return array
     */
    private function getShippingMethods()
    {
        $shippingMethods = [];

        $shippingProfiles = $this->getShippingProfiles();

        if (count($shippingProfiles)) {
            foreach ($shippingProfiles as $profile) {
                $shippingMethod = $profile->parcelService;
                if($shippingMethod instanceof ParcelService) {
                    $shippingMethods[] = $shippingMethod;
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
        $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);

        $pluginSets = $pluginSetRepo->list();

        return $pluginSets->toArray();
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