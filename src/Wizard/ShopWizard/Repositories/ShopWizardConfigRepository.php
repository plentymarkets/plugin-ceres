<?php

namespace Ceres\Wizard\ShopWizard\Repositories;

use Ceres\Wizard\ShopWizard\Interfaces\ShopWizardPreviewConfigurationInterface;
use Ceres\Wizard\ShopWizard\Models\ShopWizardPreviewConfiguration;
use Plenty\Modules\Plugin\DataBase\Contracts\DataBase;
use Plenty\Plugin\Log\Loggable;

/**
 * Class ShopWizardConfigRepository
 * @package Ceres\Wizard\ShopWizard\Repositories
 */
class ShopWizardConfigRepository implements ShopWizardPreviewConfigurationInterface
{
    use Loggable;

    private $configList = [];

    /**
     * @param array $data
     * @return bool|mixed
     */
    public function createConfig(array $data)
    {
        try {
            $database = pluginApp(DataBase::class);
            $configModel = pluginApp(ShopWizardPreviewConfiguration::class);

            $configModel->pluginSetId = $data['pluginSetId'];
            $configModel->deleted = !empty($data['deleted']) ? true : false;
            $configModel->webstoreId = $data['webstoreId'] ?? null;

            $database->save($configModel);

            return $configModel;
        } catch (\Exception $exception) {
            $this->getLogger(__FUNCTION__)
                ->error('Ceres::Wizard.exceptionError', $exception->getMessage());
        }

        return false;
    }

    /**
     * @return array|mixed
     */
    public function getAll()
    {
        try {
            $database = pluginApp(DataBase::class);
            $configs = $database->query(ShopWizardPreviewConfiguration::class)->get();

            return $configs;
        } catch (\Exception $ex) {
            $this->getLogger(__FUNCTION__)
                ->error('Ceres::Wizard.exceptionError', $ex->getMessage());
        }

        return [];
    }

    /**
     * @param string $pluginSetId
     * @param int $webstoreId
     * @param array $data
     * @return bool|mixed
     */
    public function updateConfig($pluginSetId, $webstoreId, array $data)
    {
        try {
            $database = pluginApp(DataBase::class);

            $configs = $database->query(ShopWizardPreviewConfiguration::class)
                ->where('pluginSetId', '=', $pluginSetId)
                ->where('webstoreId', '=', $webstoreId)
                ->get();

            $config = $configs[0];
            $config->deleted = !empty($data['deleted']) ? true : false;

            $database->save($config);

            unset($this->configList[$webstoreId . '_' . $pluginSetId]);

            return $config;
        } catch (\Exception $ex) {
            $this->getLogger(__FUNCTION__)
                ->error('Ceres::Wizard.exceptionError', $ex->getMessage());
        }

        return false;
    }

    /**
     * @param string $pluginSetId
     * @param bool $deleted
     *
     * @return bool|mixed
     */
    public function deleteConfig($pluginSetId, $webstoreId, $deleted)
    {
        try {
            $database = pluginApp(DataBase::class);

            $configs = $database->query(ShopWizardPreviewConfiguration::class)
                ->where('pluginSetId', '=', $pluginSetId)
                ->where('webstoreId', '=', $webstoreId)
                ->get();

            $config = $configs[0];
            $config->deleted = $deleted;

            $database->save($config);

            unset($this->configList[$webstoreId . '_' . $pluginSetId]);
        } catch (\Exception $ex) {
            $this->getLogger(__FUNCTION__)
                ->error('Ceres::Wizard.exceptionError', $ex->getMessage());
        }

        return false;
    }

    /**
     * @param string $pluginSetId
     *
     * @return bool|mixed
     */
    public function getConfig($pluginSetId, $webstoreId = null)
    {
        if (array_key_exists($webstoreId . '_' . $pluginSetId, $this->configList)) {
            return $this->configList[$webstoreId . '_' . $pluginSetId];
        }

        try {
            $database = pluginApp(DataBase::class);

            $configs = $database->query(ShopWizardPreviewConfiguration::class)
                ->where('pluginSetId', '=', $pluginSetId)
                ->where('webstoreId', '=', $webstoreId)
                ->get();

            $config = $configs[0];
        } catch (\Exception $ex) {
            $this->getLogger(__FUNCTION__)
                ->error('Ceres::Wizard.exceptionError', $ex->getMessage());
            $config = false;
        }

        $this->configList[$webstoreId . '_' . $pluginSetId] = $config;

        return $this->configList[$webstoreId . '_' . $pluginSetId];
    }

    /**
     * @param string $pluginSetId
     *
     * @return bool|mixed
     */
    public function getConfigsForPluginSet($pluginSetId)
    {
        try {
            $database = pluginApp(DataBase::class);

            $configs = $database->query(ShopWizardPreviewConfiguration::class)
                ->where('pluginSetId', '=', $pluginSetId)
                ->get();
        } catch (\Exception $ex) {
            $this->getLogger(__FUNCTION__)
                ->error('Ceres::Wizard.exceptionError', $ex->getMessage());
            $configs = [];
        }

        return $configs;
    }
}
