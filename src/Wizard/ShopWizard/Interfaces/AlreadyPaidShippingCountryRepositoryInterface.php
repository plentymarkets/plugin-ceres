<?php

namespace Ceres\Wizard\ShopWizard\Interfaces;

/**
 * Interface AlreadyPaidShippingCountryRepositoryInterface
 * @package Ceres\Wizard\ShopWizard\Interfaces
 */
interface AlreadyPaidShippingCountryRepositoryInterface
{

    /**
     * @param int $plentyId
     * @return mixed
     */
    public function deleteShippingCountries(int $plentyId);

    /**
     * @param int $plentyId
     * @param array $shippingCountryIds
     * @return mixed
     */
    public function saveShippingCountries(int $plentyId, array $shippingCountryIds);

    /**
     * @param int $plentyId
     * @return mixed
     */
    public function getShippingCountryIds(int $plentyId);
}
