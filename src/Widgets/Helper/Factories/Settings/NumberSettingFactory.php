<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class NumberSettingFactory extends SettingFactory
{
    public function __construct()
    {
        $this->withType('number');
    }
}