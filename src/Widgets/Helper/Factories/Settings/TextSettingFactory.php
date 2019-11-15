<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class TextSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType("text");
    }
}