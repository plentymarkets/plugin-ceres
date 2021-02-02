<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

use Plenty\Modules\ShopBuilder\Factories\Settings\BaseSettingFactory;

class AlignmentSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('alignment')
             ->withDefaultValue('left');
    }
}
