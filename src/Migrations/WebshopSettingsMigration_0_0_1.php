<?php

namespace Ceres\Migrations;

use Plenty\Modules\Plugin\Models\Plugin;
use Plenty\Modules\Plugin\Contracts\ConfigurationRepositoryContract;
use Plenty\Modules\Plugin\Contracts\PluginRepositoryContract;
use Plenty\Modules\System\Module\Contracts\PlentyModuleRepositoryContract;
use Plenty\Modules\Webshop\Contracts\WebstoreConfigurationRepositoryContract;

/**
 * Class WebshopSettingsMigration_0_0_1
 *
 * This migration is used for transferring settings from the webstore configuration into the plentyShop LTS configuration.
 * Migrations are referenced in the 'runOnBuild' section of the plugin.json and run exactly once.
 * @package Ceres\Migrations
 */
class WebshopSettingsMigration_0_0_1
{
    /**
     * Hook for running the migration.
     * @throws \ErrorException
     */
    public function run()
    {
        /** @var PlentyModuleRepositoryContract $moduleRepo */
        $moduleRepo = pluginApp(PlentyModuleRepositoryContract::class);

        if($moduleRepo->isActive('webstore'))
        {
            /** @var WebstoreConfigurationRepositoryContract $webstoreConfigurationRepository */
            $webstoreConfigurationRepository = pluginApp(WebstoreConfigurationRepositoryContract::class);
            $webstoreConfig        = $webstoreConfigurationRepository->getWebstoreConfiguration();

            $activeLanguages              = $webstoreConfig->languageList;
            $googleReCaptchaApiWebsiteKey = $webstoreConfig->googleRecaptchaApiWebsitekey;

            $pluginId = 0;

            /** @var PluginRepositoryContract $pluginRepo */
            $pluginRepo = pluginApp(PluginRepositoryContract::class);
            $pluginResult = $pluginRepo->searchPlugins(['name' => 'Ceres'], 1)->getResult();
            $plugin = $pluginResult[0];

            if($plugin instanceof Plugin)
            {
                $pluginId = (int)$plugin->id;
            }

            if((int)$pluginId > 0)
            {
                $newConfigValues = [
                    [
                        'key' => 'global.google_recaptcha_api_key',
                        'value' => (!is_null($googleReCaptchaApiWebsiteKey) ? $googleReCaptchaApiWebsiteKey : '')
                    ],
                    [
                        'key' => 'language.active_languages',
                        'value' => (count($activeLanguages) ? implode(', ', $activeLanguages) : '')
                    ]
                ];

                /** @var ConfigurationRepositoryContract $configRepo */
                $configRepo = pluginApp(ConfigurationRepositoryContract::class);
                $configRepo->saveConfiguration($pluginId, $newConfigValues);
            }
        }
    }
}
