<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class TextSettingFactory extends SettingFactory
{
    public function __construct()
    {
        $this->withType("text");
    }
}