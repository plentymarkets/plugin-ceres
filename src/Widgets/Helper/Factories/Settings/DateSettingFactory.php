<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class DateSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('date');
    }

    /**
     * @param string $icon
     */
    public function withIcon($icon)
    {
        $this->withOption('icon', $icon);
    }
}