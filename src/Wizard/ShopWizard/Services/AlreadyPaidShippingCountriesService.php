<?php

namespace Ceres\Wizard\ShopWizard\Services;

use Ceres\Wizard\ShopWizard\Repositories\AlreadyPaidShippingCountryRepository;

class AlreadyPaidShippingCountriesService
{

    /**
     * @param int $plentyId
     * @param array $shippingCountriesIds
     * @return void
     */
    public function execute(int $plentyId, array $shippingCountriesIds)
    {
        /** @var AlreadyPaidShippingCountryRepository $shippingCountryRepo */
        $shippingCountryRepo = pluginApp(AlreadyPaidShippingCountryRepository::class);
        $shippingCountryRepo->deleteShippingCountries($plentyId);

        if (empty($shippingCountriesIds)) {
            return;
        }

        $shippingCountryRepo->saveShippingCountries($plentyId, $shippingCountriesIds);
    }
}