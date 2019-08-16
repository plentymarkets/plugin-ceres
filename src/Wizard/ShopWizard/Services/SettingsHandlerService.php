<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 16/08/2019
 * Time: 15:45
 */

namespace Ceres\Wizard\ShopWizard\Services;


use Plenty\Modules\System\Contracts\WebstoreRepositoryContract;

class SettingsHandlerService
{

    public function getStoreIdentifier($webstoreId)
    {
        $webstoreRepo = pluginApp(WebstoreRepositoryContract::class);
        $store = $webstoreRepo->findById($webstoreId);
        $storeIdentifier = $store->storeIdentifier;

        return $storeIdentifier;
    }
}