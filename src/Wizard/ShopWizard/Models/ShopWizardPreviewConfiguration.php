<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 19/08/2019
 * Time: 14:51
 */

namespace Ceres\Wizard\ShopWizard\Models;

use Plenty\Modules\Plugin\DataBase\Contracts\Model;

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
    public function getTableName(): string
    {
        return 'Ceres::ShopWizardPreviewConfigurations';
    }
}