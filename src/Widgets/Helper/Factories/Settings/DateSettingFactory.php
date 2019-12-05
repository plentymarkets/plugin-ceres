<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class DateSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('date');
    }

    /**
     * @param boolean $isCalendarTop
     * @return DateSettingFactory
     */
    public function withCalendarTop($isCalendarTop)
    {
        return $this->withOption('openCalendarTop', $isCalendarTop);
    }

    /**
     * @param string $format
     * @return DateSettingFactory
     */
    public function withDisplayDateFormat($format)
    {
        return $this->withOption('displayDateFormat', $format);
    }
}