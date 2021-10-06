<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

use Plenty\Modules\ShopBuilder\Factories\Settings\BaseSettingFactory;

class HeightSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType("spacing")
            ->withName('Widget.widgetMinHeight')
            ->withOption("units", ["px", "rem"])
            ->withOption("direction", "top");
    }
}
