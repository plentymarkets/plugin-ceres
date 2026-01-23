<?php

namespace Ceres\Migrations;

use Plenty\Modules\BI\Integrations\Plugin\Models\PluginSet;
use Plenty\Modules\Plugin\Models\Plugin;
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

        /** @var PluginSet $pluginSet */
        foreach($pluginSets as $pluginSet)
        {
            foreach ($pluginSet->pluginSetEntries as $pluginSetEntry)
            {
                if ($pluginSetEntry instanceof PluginSetEntry && $pluginSetEntry->plugin->name === 'Ceres')
                {
                    $pluginSetId = $pluginSetEntry->pluginSetId;
                    $config      = $pluginSetEntry->configurations()->getResults();

                    // insert into webstore config foreach pluginSetId found
                    // the `global.default_contact_class_b2b` value as `'defaultBusinessClassId' => value,`

                }
            }
        }
    }
}
