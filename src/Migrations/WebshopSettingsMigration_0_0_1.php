<?php

namespace Ceres\Migrations;

use IO\Services\WebstoreConfigurationService;
use Plenty\Modules\Plugin\Models\Plugin;
use Plenty\Modules\Plugin\Contracts\ConfigurationRepositoryContract;
use Plenty\Modules\Plugin\Contracts\PluginRepositoryContract;
use Plenty\Modules\System\Module\Contracts\PlentyModuleRepositoryContract;

/**
 * Class WebshopSettingsMigration_0_0_1
 * @package Ceres\Migrations
 */
class WebshopSettingsMigration_0_0_1
{
    /**
     * @throws \ErrorException
     */
    public function run()
    {
        /** @var PlentyModuleRepositoryContract $moduleRepo */
        $moduleRepo = pluginApp(PlentyModuleRepositoryContract::class);
        
        if($moduleRepo->isActive('webstore'))
        {
            /** @var WebstoreConfigurationService $webstoreConfigService */
            $webstoreConfigService = pluginApp(WebstoreConfigurationService::class);
            $webstoreConfig        = $webstoreConfigService->getWebstoreConfig();
    
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