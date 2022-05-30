<?php

namespace Ceres\Migrations;

use Ceres\Migrations\Traits\MigrateTranslations;

/**
 * Class UpdateTranslationKeysMigration_001
 *
 * This migration is used for migrating custom translations, the keys of categoryItemFootnote,
 * categoryItemFromPrice and categoryItemLowestPrice have changed.
 * @package Ceres\Migrations
 */
class UpdateTranslationKeysMigration_001
{
    use MigrateTranslations;

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

        $this->migrateTranslations($pluginSetId, $keysToReplace);
    }
}
