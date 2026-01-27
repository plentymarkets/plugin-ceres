<?php

namespace Ceres\Migrations;

use Plenty\Modules\Plugin\PluginSet\Models\PluginSet;
use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSetEntry;
use Plenty\Modules\Webshop\Contracts\WebstoreConfigurationRepositoryContract;

/**
 * Class WebshopSettingsMigration_0_0_2
 *
 * This migration is used for transferring `global.default_contact_class_b2b` setting from plentyShop LTS configuration
 * into the webstore.
 * @package Ceres\Migrations
 */

class WebshopSettingsMigration_0_0_2
{
    public function run()
    {
        /** @var PluginSetRepositoryContract $pluginSetRepo */
        $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);
        $pluginSets    = $pluginSetRepo->list();

        /** @var WebstoreConfigurationRepositoryContract $webstoreConfigurationRepository */
        $webstoreConfigurationRepository = pluginApp(WebstoreConfigurationRepositoryContract::class);

        /** @var PluginSet $pluginSet */
        foreach ($pluginSets as $pluginSet)
        {
            foreach ($pluginSet->pluginSetEntries as $pluginSetEntry)
            {
                if (!($pluginSetEntry instanceof PluginSetEntry) || $pluginSetEntry->plugin->name !== 'Ceres')
                {
                    continue;
                }

                $defaultContactClassB2B = null;

                $configs = $pluginSetEntry->configurations()->getResults();

                foreach ($configs as $config)
                {
                    if ($config->key === 'global.default_contact_class_b2b')
                    {
                        $defaultContactClassB2B = (int)$config->value;
                        break;
                    }
                }

                if ($defaultContactClassB2B <= 0)
                {
                    continue;
                }

                foreach ($pluginSet->webstores as $webstore)
                {
                    $currentConfig = $webstoreConfigurationRepository->findByPlentyId($webstore->storeIdentifier);

                    if (
                        is_array($currentConfig)
                        && isset($currentConfig['defaultBusinessClassId'])
                        && (int)$currentConfig['defaultBusinessClassId'] > 0
                    ) {
                        continue;
                    }

                    $webstoreConfigurationRepository->updateByPlentyId(
                        ['defaultBusinessClassId' => $defaultContactClassB2B],
                        $webstore->storeIdentifier
                    );
                }
            }
        }
    }
}