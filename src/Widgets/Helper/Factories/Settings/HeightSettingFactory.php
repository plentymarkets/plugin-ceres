<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

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
