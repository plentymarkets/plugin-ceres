<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class CheckboxSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('checkbox');
    }

    /**
     * @param string $icon
     */
    public function withIcon($icon)
    {
        $this->withOption('icon', $icon);
    }
}