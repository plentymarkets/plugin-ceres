<?php

namespace Ceres\Migrations\Traits;


use Plenty\Modules\PluginMultilingualism\Contracts\PluginTranslationRepositoryContract;
use Plenty\Modules\PluginMultilingualism\Models\PluginTranslation;

/**
 * Trait MigrateTranslations
 *
 * This trait is used to update custom translations from and old to a new key.
 * @package Ceres\Migrations\Traits
 */
trait MigrateTranslations
{
    /**
     * Migrate translations.
     * @param int $pluginSetId The id of the plugin set which contains the translations.
     * @param array $keysToReplace Associative array with oldKey to newKey relation.
     * @param string $pluginName The name of the plugin.
     * @param string $fileName The filename which contains the translations.
     */
    public function migrateTranslations($pluginSetId, $keysToReplace = [], $pluginName = "Ceres", $fileName = "Template.properties") {
        /** @var PluginTranslationRepositoryContract $pluginTranslationRepository */
        $pluginTranslationRepository = pluginApp(PluginTranslationRepositoryContract::class);

        $translations = $pluginTranslationRepository->listTranslations([
            "pluginSetId"  => $pluginSetId,
            "pluginName" => $pluginName,
            "fileName" => $fileName
        ]);

        foreach ($translations as $translation) {
            // filter translations for given translation keys
            if (in_array($translation->key, array_keys($keysToReplace))) {
                // create new translation data, based on the old entry
                $translationData = [
                    "languageCode" => $translation->languageCode,
                    "key"          => $keysToReplace[$translation->key],
                    "value"        => $translation->value,
                    "pluginName"   => $translation->pluginName,
                    "pluginSetId"  => $translation->pluginSetId,
                    "fileName"     => $translation->fileName
                ];

                $pluginTranslationRepository->updateOrCreateTranslation($translationData);
            }
        }
    }
}
