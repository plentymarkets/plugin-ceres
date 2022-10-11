<?php

namespace Ceres\Migrations;

use Ceres\Migrations\Traits\MigrateTranslation;

/**
 * Class UpdateTranslationKeysMigration_001
 *
 * This migration is used for migrating custom translations, the keys of categoryItemFootnote,
 * categoryItemFromPrice and categoryItemLowestPrice have changed.
 * @package Ceres\Migrations
 */
class UpdateTranslationKeysMigration_0_0_1
{
    use MigrateTranslation;

    /**
     * Hook for running the migration.
     */
    public function run()
    {
        $pluginSetId = pluginSetId();
        $keysToReplace = [
            "categoryItemFootnote" => "itemFootnote",
            "categoryItemFromPrice" => "itemFromPrice",
            "categoryItemLowestPrice" => "itemLowestPrice"
        ];

        foreach ($keysToReplace as $key => $newKey) {
            $this->migrateTranslation($key, $newKey, $pluginSetId);
        }
    }
}
