<?php

namespace Ceres\Wizard\ShopWizard\Repositories;

use Plenty\Modules\Plugin\DataBase\Contracts\DataBase;
use Plenty\Plugin\Log\Loggable;
use Ceres\Wizard\ShopWizard\Interfaces\AlreadyPaidShippingCountryRepositoryInterface;
use Ceres\Wizard\ShopWizard\Models\ShippingCountrySettings;

/**
 * Class AlreadyPaidShippingCountryRepository
 * @package Ceres\Wizard\ShopWizard\Repositories
 */
class AlreadyPaidShippingCountryRepository implements AlreadyPaidShippingCountryRepositoryInterface
{
    use Loggable;

    /**
     * @param $plentyId
     * @return bool
     */
    public function deleteShippingCountries(int $plentyId)
    {
        try {
            $database = pluginApp(DataBase::class);

            $database->query(ShippingCountrySettings::MODEL_NAMESPACE)
                ->where('plentyId', '=', $plentyId)
                ->delete();

            return true;
        } catch (\Exception $ex) {
            $this->getLogger(__FUNCTION__)
                ->error('Ceres::Wizard.exceptionError', $ex->getMessage());
        }

        return false;
    }

    /**
     * @param $plentyId
     * @param $shippingCountryIds
     * @return bool
     */
    public function saveShippingCountries(int $plentyId, array $shippingCountryIds)
    {
        try {
            $database = pluginApp(DataBase::class);

            foreach($shippingCountryIds as $countryId) {
                $shippingCountrySettings = pluginApp(ShippingCountrySettings::class);
                $shippingCountrySettings->plentyId = $plentyId;
                $shippingCountrySettings->shippingCountryId = $countryId;
                $database->save($shippingCountrySettings);
            }

            return true;
        }  catch (\Exception $ex) {
            $this->getLogger(__FUNCTION__)
                ->error('Ceres::Wizard.exceptionError', $ex->getMessage());
        }

        return false;
    }

    public function getShippingCountryIds(int $plentyId)
    {
        $ids = [];
        try {
            $database = pluginApp(DataBase::class);

            $result = $database->query(ShippingCountrySettings::MODEL_NAMESPACE)
                ->where('plentyId', '=', $plentyId)
                ->get();
            foreach($result as $country){
                $ids[] = (int)$country->shippingCountryId;
            }

            return $ids;
        }  catch (\Exception $ex) {
            $this->getLogger(__FUNCTION__)
                ->error('Ceres::Wizard.exceptionError', $ex->getMessage());
        }

        return [];
    }
}
