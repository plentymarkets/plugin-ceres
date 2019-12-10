<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class AlignmentSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('alignment')
             ->withDefaultValue('left');
    }
}
