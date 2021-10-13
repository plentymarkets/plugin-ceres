<?php

namespace Ceres\Migrations;

use Plenty\Modules\Plugin\Models\Configuration;
use Plenty\Modules\Plugin\PluginSet\Contracts\PluginSetRepositoryContract;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSet;
use Plenty\Modules\Plugin\PluginSet\Models\PluginSetEntry;
use Plenty\Modules\PluginMultilingualism\Contracts\PluginTranslationRepositoryContract;

/**
 * Class ConfigPropertiesMigration_0_0_1
 *
 * This migration is used for migrating a config property into the translation.
 * Migrations are referenced in the 'runOnBuild' section of the plugin.json and run exactly once.
 * @package Ceres\Migrations
 */
class ConfigPropertiesMigration_0_0_1
{
    /** @var \string[][] $translationMap Translation map */
    private $translationMap =
    [
        'headerCompanyName' => [
            'de' => 'header.company_name',
            'en' => 'header.company_name'
        ]
    ];

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

                    $this->migrate($pluginSetId, $config);
                }
            }
        }
    }

    /**
     * This function contains the main logic of this migration
     * @param int $pluginSetId The pluginset id
     * @param Configuration $config The plentyShop LTS config
     */
    public function migrate($pluginSetId, $config)
    {
		/** @var PluginTranslationRepositoryContract $translationRepo */
		$translationRepo = pluginApp(PluginTranslationRepositoryContract::class);

		$pluginName = 'Ceres';
		$pluginTranslationFile = 'Template.properties';

		foreach($this->translationMap as $translationKey => $configKeys)
        {
            foreach($configKeys as $lang => $configKey)
            {
                $configValue = null;
                foreach($config as $configEntry)
                {
                    if($configEntry->key == $configKey)
                    {
                        $configValue = $configEntry->value;
                    }
                }

                if(!is_null($configValue) && strlen($configValue))
                {
                    $translationData = [
                        'languageCode' => $lang,
                        'key'          => $translationKey,
                        'value'        => $configValue,
                        'pluginName'   => $pluginName,
                        'pluginSetId'  => $pluginSetId,
                        'fileName'     => $pluginTranslationFile
                    ];

                    $translationRepo->updateOrCreateTranslation($translationData);
                }

            }
        }
    }
}
