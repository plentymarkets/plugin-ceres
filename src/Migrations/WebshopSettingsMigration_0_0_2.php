<?php

namespace Ceres\Migrations;

use Plenty\Modules\Plugin\PluginSet\Models\PluginSet;
use Plenty\Modules\Plugin\Contracts\ConfigurationRepositoryContract;
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
    /**
     * Hook for running the migration.
     */
    public function run()
    {
        /** @var PluginSetRepositoryContract $pluginSetRepo */
        $pluginSetRepo = pluginApp(PluginSetRepositoryContract::class);
        $pluginSets = $pluginSetRepo->list();

        /** @var ConfigurationRepositoryContract $configurationRepository */
        $configurationRepository = pluginApp(ConfigurationRepositoryContract::class);

        /** @var WebstoreConfigurationRepositoryContract $webstoreConfigurationRepository */
        $webstoreConfigurationRepository = pluginApp(WebstoreConfigurationRepositoryContract::class);

        /** @var PluginSet $pluginSet */
        foreach($pluginSets as $pluginSet)
        {
            foreach ($pluginSet->pluginSetEntries as $pluginSetEntry)
            {
                if ($pluginSetEntry instanceof PluginSetEntry && $pluginSetEntry->plugin->name === 'Ceres')
                {
                    // insert into webstore config for each pluginSetId found
                    // the `global.default_contact_class_b2b` value as `defaultBusinessClassId`.
                    $pluginSetId = $pluginSetEntry->pluginSetId;

                    $defaultContactClassB2B = $configurationRepository->getConfigurationValueByKey(
                        'global.default_contact_class_b2b',
                        $pluginSetId
                    );

                    if ($defaultContactClassB2B === null)
                    {
                        continue;
                    }

                    foreach ($pluginSet->webstores as $webstore)
                    {
                        $webstoreConfigurationRepository->updateByPlentyId(
                            ['defaultBusinessClassId' => (int)$defaultContactClassB2B],
                            $webstore->storeIdentifier
                        );
                    }
                }
            }
        }
    }
}
