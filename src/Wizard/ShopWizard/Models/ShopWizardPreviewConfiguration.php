<?php

namespace Ceres\Wizard\ShopWizard\Models;

use Plenty\Modules\Plugin\DataBase\Annotations\Nullable;
use Plenty\Modules\Plugin\DataBase\Contracts\Model;

/**
 * Class ShopWizardPreviewConfiguration
 * @package Ceres\Wizard\ShopWizard\Models
 *
 * @property int $id
 * @property int $pluginSetId
 * @property bool $deleted
 * @property int $webstoreId
 *
 * @Nullable(columns={"webstoreId"})
 */
class ShopWizardPreviewConfiguration extends Model
{
    public $id = 0;
    public $pluginSetId = 0;
    public $deleted = false;
    public $webstoreId = null;

    /**
     * @return string
     */
    public function getTableName(): string
    {
        return 'Ceres::ShopWizardPreviewConfigurations';
    }
}
