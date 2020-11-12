<?php

namespace Ceres\Wizard\ShopWizard\Migrations;

use Ceres\Wizard\ShopWizard\Models\ShopWizardPreviewConfiguration;
use Plenty\Modules\Plugin\DataBase\Contracts\Migrate;
use Plenty\Plugin\Log\Loggable;

/**
 * Class UpdateShopWizardPreviewTableWebstoreId
 * @package Ceres\Wizard\ShopWizard\Migrations
 */
class UpdateShopWizardPreviewTableWebstoreId
{
    use Loggable;

    /**
     * @param Migrate $migrate
     */
    public function run(Migrate $migrate)
    {
        $migrate->updateTable(ShopWizardPreviewConfiguration::class);
        $this->getLogger(__CLASS__)->debug(
            'Ceres::Wizard.tableUpdated',
            ['tableName' => 'ShopWizardPreviewConfigurations']
        );
    }
}
