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

            $database->save($configModel);

            return $configModel;
        }catch (\Exception $exception) {
            $this->getLogger( __FUNCTION__)
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
            $this->getLogger( __FUNCTION__)
                ->error('Ceres::Wizard.exceptionError', $ex->getMessage());
        }

        return [];
    }
    
    /**
     * @param string $pluginSetId
     * @param array $data
     * @return bool|mixed
     */
    public function updateConfig($pluginSetId, array $data)
    {
        try {
            $database = pluginApp(DataBase::class);

            $configs = $database->query(ShopWizardPreviewConfiguration::class)
                ->where('pluginSetID', '=', $pluginSetId)
                ->get();
            
            $config = $configs[0];
            $config->deleted = !empty($data['deleted']) ? true : false;
            
            $database->save($config);

            unset($this->configList[$pluginSetId]);

            return $config;

        } catch (\Exception $ex) {
            $this->getLogger( __FUNCTION__)
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
    public function deleteConfig($pluginSetId, $deleted)
    {
        try {
            $database = pluginApp(DataBase::class);

            $configs = $database->query(ShopWizardPreviewConfiguration::class)
                ->where('pluginSetId', '=', $pluginSetId)
                ->get();
            
            $config = $configs[0];
            $config->deleted = $deleted;
            
            $database->save($config);

            unset($this->configList[$pluginSetId]);

        } catch (\Exception $ex) {
            $this->getLogger( __FUNCTION__)
                ->error('Ceres::Wizard.exceptionError', $ex->getMessage());
        }

        return false;
    }

    /**
     * @param string $pluginSetId
     *
     * @return bool|mixed
     */
    public function getConfig($pluginSetId)
    {
        if (array_key_exists($pluginSetId, $this->configList)) {
            return $this->configList[$pluginSetId];
        }

        try{
            $database = pluginApp(DataBase::class);

            $configs = $database->query(ShopWizardPreviewConfiguration::class)
                ->where('pluginSetId', '=', $pluginSetId)
                ->get();
            
            $config = $configs[0];

        } catch (\Exception $ex) {
            $this->getLogger( __FUNCTION__)
                ->error('Ceres::Wizard.exceptionError', $ex->getMessage());
            $config = false;
        }

        $this->configList[$pluginSetId] = $config;

        return $this->configList[$pluginSetId];
    }
}
