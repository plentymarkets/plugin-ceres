<?php

namespace Ceres\Wizard\ShopWizard\Interfaces;

/**
 * Interface AlreadyPaidShippingCountryRepositoryInterface
 * @package Ceres\Wizard\ShopWizard\Interfaces
 */
interface AlreadyPaidShippingCountryRepositoryInterface
{

    public function deleteShippingCountries(int $plentyId);

    public function saveShippingCountries(int $plentyId, array $shippingCountryIds);

    public function getShippingCountryIds(int $plentyId);
}