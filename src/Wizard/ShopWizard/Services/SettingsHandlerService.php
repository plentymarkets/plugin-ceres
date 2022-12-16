<?php

namespace Ceres\Wizard\ShopWizard\Services;

use Plenty\Modules\System\Contracts\WebstoreRepositoryContract;
use Ceres\Wizard\ShopWizard\Repositories\AlreadyPaidShippingCountryRepository;

/**
 * Class SettingsHandlerService
 * @package Ceres\Wizard\ShopWizard\Services
 */
class SettingsHandlerService
{
    /**
     * @param $webstoreId
     * @return mixed
     */
    public function getStoreIdentifier($webstoreId)
    {
        $webstoreRepo = pluginApp(WebstoreRepositoryContract::class);
        $store = $webstoreRepo->findById($webstoreId);
        $storeIdentifier = $store->storeIdentifier;

        return $storeIdentifier;
    }

    /**
     * @param int $plentyId
     * @return array
     */
    public function getAlreadyPaidShippingCountries(int $plentyId): array
    {
        /** @var AlreadyPaidShippingCountryRepository $shippingcountryRepository */
        $shippingCountryRepository = pluginApp(AlreadyPaidShippingCountryRepository::class);
        return $shippingCountryRepository->getShippingCountryIds($plentyId);
    }

}
