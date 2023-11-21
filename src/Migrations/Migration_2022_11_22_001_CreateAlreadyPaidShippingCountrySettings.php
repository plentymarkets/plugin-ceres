<?php

namespace Ceres\Migrations;

use Plenty\Modules\Plugin\DataBase\Contracts\Migrate;
use Ceres\Wizard\ShopWizard\Models\ShippingCountrySettings;
use Plenty\Plugin\Log\Loggable;

/**
 * Class Migration_2022_11_22_001_CreateAlreadyPaidShippingCountrySettings
 *
 * @package Ceres\Migrations
 */
class Migration_2022_11_22_001_CreateAlreadyPaidShippingCountrySettings
{
    use Loggable;

    public function run(Migrate $migrate)
    {
        $migrate->createTable(ShippingCountrySettings::class);
        $this->getLogger(__CLASS__)->debug(
            'Ceres::Wizard.tableCreated',
            ['tableName' => 'ShippingCountrySettings']
        );
    }
}