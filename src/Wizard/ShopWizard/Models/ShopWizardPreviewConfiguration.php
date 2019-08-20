<?php

namespace Ceres\Wizard\ShopWizard\Models;

use Plenty\Modules\Plugin\DataBase\Contracts\Model;

/**
 * Class ShopWizardPreviewConfiguration
 * @package Ceres\Wizard\ShopWizard\Models
 */
class ShopWizardPreviewConfiguration extends Model
{
    /**
     * @var int
     */
    public $id = 0;

    /**
     * @var int
     */
    public $pluginSetId = 0;

    /**
     * @var bool
     */
    public $deleted = false;

    /**
     * @return string
     */
    public function getTableName():string
    {
        return 'Ceres::ShopWizardPreviewConfigurations';
    }
}
