<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 29/05/2019
 * Time: 13:56
 */

namespace Ceres\Services;

use Plenty\Modules\System\Contracts\WebstoreConfigurationRepositoryContract;
use Plenty\Plugin\Application;

class ShopWizardService
{

    private $webstoreConfig;

    /**
     * @return \Plenty\Modules\System\Models\WebstoreConfiguration
     */
    public function getWebstoreConfig()
    {
        if ($this->webstoreConfig === null) {
            /** @var WebstoreConfigurationRepositoryContract $webstoreConfig */
            $webstoreConfig = pluginApp(WebstoreConfigurationRepositoryContract::class);

            /** @var Application $app */
            $app = pluginApp(Application::class);

            $this->webstoreConfig = $webstoreConfig->findByWebstoreId($app->getWebstoreId());
        }

        return $this->webstoreConfig;
    }

    /**
     * @return bool
     */
    public function hasShippingMethod()
    {

        $webstoreConfig = $this->getWebstoreConfig()->toArray();

        return !empty($webstoreConfig['defaultParcelServiceId']) ? true : false;

    }

    /**
     * @return bool
     */
    public function hasShippingProfile()
    {
        $webstoreConfig = $this->getWebstoreConfig()->toArray();

        return !empty($webstoreConfig['defaultParcelServicePresetId']) ? true : false;
    }

    public function hasPaymentMethod()
    {
        $webstoreConfig = $this->getWebstoreConfig()->toArray();

        return !empty($webstoreConfig['defaultMethodOfPaymentId']) ? true : false;
    }

    /**
     * @return bool
     */
    public function hasShippingCountry()
    {
        $webstoreConfig = $this->getWebstoreConfig()->toArray();

        return !empty($webstoreConfig['defaultShippingCountryId']) ? true : false;
    }
}