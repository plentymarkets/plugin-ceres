<?php

namespace Ceres\Migrations\Traits;


use Plenty\Modules\PluginMultilingualism\Contracts\PluginTranslationRepositoryContract;
use Plenty\Modules\PluginMultilingualism\Models\PluginTranslation;

/**
 * Trait MigrateTranslation
 *
 * This trait is used to update a translation and migrate it to a new key in any language.
 * @package Ceres\Migrations\Traits
 */
trait MigrateTranslation
{
    /**
     * Migrate a translation from a current key to a new key in any language.
     *
     * @param string $key The key of the deprecated translation.
     * @param string $newKey The new key, to save the translation.
     * @param int $pluginSetId The id of the plugin set.
     * @param string $pluginName The name of the plugin, holding the translation.
     * @param string $fileName The filename, where the translation is from.
     */
    public function migrateTranslation(string $key, string $newKey, int $pluginSetId, $pluginName = "Ceres", $fileName = "Template.properties") {
        /** @var PluginTranslationRepositoryContract $pluginTranslationRepository */
        $pluginTranslationRepository = pluginApp(PluginTranslationRepositoryContract::class);

        // multiple translations for possible languages
        $translations = $pluginTranslationRepository->listTranslations([
            "pluginSetId"  => $pluginSetId,
            "pluginName" => $pluginName,
            "fileName" => $fileName,
            "key" => $key
        ]);

        foreach ($translations as $translation) {
            // create new translation data, based on the old entry
            $translationData = [
                "languageCode" => $translation->languageCode,
                "key"          => $newKey,
                "value"        => $translation->value,
                "pluginName"   => $translation->pluginName,
                "pluginSetId"  => $translation->pluginSetId,
                "fileName"     => $translation->fileName
            ];

            $pluginTranslationRepository->updateOrCreateTranslation($translationData);
        }
    }
}
