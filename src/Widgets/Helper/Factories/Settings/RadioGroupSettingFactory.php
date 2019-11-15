<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class RadioGroupSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('radioGroup');
    }

    /**
     * @param ValueCaptionFactory $radioValues
     */
    public function withRadioValues($radioValues)
    {
        $this->withOption('radioValues', $radioValues->toArray());
    }

}