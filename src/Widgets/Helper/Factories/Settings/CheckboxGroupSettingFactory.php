<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class CheckboxGroupSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        return $this->withType('checkboxGroup');
    }

    /**
     * @param boolean $collapsed
     * @return CheckboxGroupSettingFactory
     */
    public function withCollapsed($collapsed)
    {
        return $this->withOption('collapsed', $collapsed);
    }

    /**
     * @param array $checkboxValues
     * @return CheckboxGroupSettingFactory
     */
    public function withCheckboxValues($checkboxValues)
    {
        return $this->withOption('checkboxValues', $checkboxValues);
    }

}