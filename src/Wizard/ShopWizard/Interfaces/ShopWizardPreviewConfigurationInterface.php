<?php

namespace Ceres\Wizard\ShopWizard\Interfaces;

/**
 * Interface ShopWizardPreviewConfigurationInterface
 * @package Ceres\Wizard\ShopWizard\Interfaces
 */
interface ShopWizardPreviewConfigurationInterface
{

    /**
     * Create new preview config
     *
     * @param array $data
     *
     * @return mixed
     */
    public function createConfig(array $data);

    /**
     * Get all configs
     *
     * @return mixed
     */
    public function getAll();

    /**
     * Update a config
     *
     * @param string $pluginSetId
     *
     * @param array $data
     *
     * @return mixed
     */
    public function updateConfig($pluginSetId, array $data);

    /**
     * Delete config
     *
     * @param string $pluginSetId
     *
     * @param bool $deleted
     *
     * @return mixed
     */
    public function deleteConfig($pluginSetId, $deleted);

    /**
     * Read account
     *
     * @param string $pluginSetId
     *
     * @return mixed
     */
    public function getConfig($pluginSetId);

}
