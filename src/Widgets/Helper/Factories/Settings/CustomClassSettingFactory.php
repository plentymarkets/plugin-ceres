<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class CustomClassSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('text')
            ->withDefaultValue('')
            ->withName('Widget.customClass')
            ->withOption('tooltipText', 'Widget.customClassTooltip');
    }
}
