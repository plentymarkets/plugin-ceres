<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class ManufacturerSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('manufacturer');
    }
}
