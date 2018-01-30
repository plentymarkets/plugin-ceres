<?php

namespace Ceres\Migrations;

use IO\Services\CategoryPagesMigrationService;

class CategoryPagesMigration_0_0_1
{
    private $version = '2.1.2';
    
    public function run()
    {
        /** @var CategoryPagesMigrationService $categoryPagesMigrationService */
        $categoryPagesMigrationService = pluginApp(CategoryPagesMigrationService::class);
        $categoryPagesMigrationService->createCategoryPages($this->version);
    }
}