<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class SliderSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('slider');
    }

    /**
     * @param integer $min
     */
    public function withMin($min)
    {
        $this->withOption('min', $min);
    }

    /**
     * @param integer $max
     */
    public function withMax($max)
    {
        $this->withOption('max', $max);
    }

    /**
     * @param integer $interval
     */
    public function withInterval($interval)
    {
        $this->withOption('interval', $interval);
    }

    /**
     * @param integer $precision
     */
    public function withPrecision($precision)
    {
        $this->withOption('precision', $precision);
    }

    /**
     * @param boolean $showMinMax
     */
    public function withShowMinMax($showMinMax)
    {
        $this->withOption('showMinMax', $showMinMax);
    }

    /**
     * @param boolean $showTicks
     */
    public function withShowTicks($showTicks)
    {
        $this->withOption('withTicks', $showTicks);
    }

}