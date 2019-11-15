<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class DateSettingFactory extends SettingFactory
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