<?php

namespace Ceres\Wizard\ShopWizard\Services;

use Plenty\Modules\System\Contracts\WebstoreRepositoryContract;

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
}
