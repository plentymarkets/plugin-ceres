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
     * @return CheckboxSettingFactory
     */
    public function withIcon($icon)
    {
        return $this->withOption('icon', $icon);
    }
}