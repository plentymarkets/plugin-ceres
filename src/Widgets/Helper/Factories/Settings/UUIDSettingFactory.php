<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class UUIDSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('uuid');
    }
}
