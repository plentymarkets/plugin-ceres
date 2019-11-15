<?php

namespace Ceres\Widgets\Helper\Factories\Settings\Includes;

use Ceres\Widgets\Helper\Factories\Settings\BaseSettingFactory;

class CustomClassSetting extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('text')
            ->withDefaultValue('')
            ->withName('Widget.customClass')
            ->withOption('tooltipText', 'Widget.customClassTooltip');
    }
}
