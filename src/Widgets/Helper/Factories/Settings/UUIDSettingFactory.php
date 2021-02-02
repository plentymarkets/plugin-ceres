<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

use Plenty\Modules\ShopBuilder\Factories\Settings\BaseSettingFactory;

class UUIDSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('uuid');
    }
}
