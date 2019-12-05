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
     * @return DoubleSettingFactory
     */
    public function withPriceInput($isPriceInput)
    {
        return $this->withOption('isPriceInput', $isPriceInput);
    }

    /**
     * @param integer $decimalCount
     * @return DoubleSettingFactory
     */
    public function withDecimalCount($decimalCount)
    {
        return  $this->withOption('decimalCount', $decimalCount);
    }
}