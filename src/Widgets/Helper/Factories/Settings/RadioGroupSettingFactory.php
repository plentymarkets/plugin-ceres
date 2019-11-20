<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class RadioGroupSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('radioGroup');
    }

    /**
     * @param array $radioValues
     * @return RadioGroupSettingFactory
     */
    public function withRadioValues($radioValues)
    {
        return $this->withOption('radioValues', $radioValues);
    }
}