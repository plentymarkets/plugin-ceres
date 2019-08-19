<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 19/08/2019
 * Time: 15:00
 */

namespace Ceres\Wizard\ShopWizard\Migrations;

use Ceres\Wizard\ShopWizard\Models\ShopWizardPreviewConfiguration;
use Plenty\Modules\Plugin\DataBase\Contracts\Migrate;
use Plenty\Plugin\Log\Loggable;

class CreateShopWizardPreviewConfigTable
{


    use Loggable;
    /**
     * @param Migrate $migrate
     */
    public function run(Migrate $migrate)
    {
        $migrate->createTable(ShopWizardPreviewConfiguration::class);
        $this->getLogger("CreateAccountsTable_run")->debug('Ceres::Wizard.tableCreated', ['tableName' => 'ShopWizardPreviewConfigurations']);
    }
}