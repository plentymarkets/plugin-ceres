<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class CheckboxGroupSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('checkboxGroup');
    }

    /**
     * @param boolean $collapsed
     */
    public function withCollapsed($collapsed)
    {
        $this->withOption('collapsed', $collapsed);
    }

    /**
     * @param ValueCaptionFactory $checkboxValues
     */
    public function withCheckboxValues($checkboxValues)
    {
        $this->withOption('checkboxValues', $checkboxValues->toArray());
    }

}