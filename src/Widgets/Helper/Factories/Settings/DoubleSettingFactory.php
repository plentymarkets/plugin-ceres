<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class DoubleSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('double');
    }

    /**
     * @param $isPriceInput
     */
    public function withPriceInput($isPriceInput)
    {
        $this->withOption('isPriceInput', $isPriceInput);
    }

    /**
     * @param integer $decimalCount
     */
    public function withDecimalCount($decimalCount)
    {
        $this->withOption('decimalCount', $decimalCount);
    }
}