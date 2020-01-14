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
     * @return SliderSettingFactory
     */
    public function withMin($min)
    {
        return $this->withOption('min', $min);
    }

    /**
     * @param integer $max
     * @return SliderSettingFactory
     */
    public function withMax($max)
    {
        return $this->withOption('max', $max);
    }

    /**
     * @param integer $interval
     * @return SliderSettingFactory
     */
    public function withInterval($interval)
    {
        return $this->withOption('interval', $interval);
    }

    /**
     * @param integer $precision
     * @return SliderSettingFactory
     */
    public function withPrecision($precision)
    {
        return $this->withOption('precision', $precision);
    }

    /**
     * @param boolean $showMinMax
     * @return SliderSettingFactory
     */
    public function withShowMinMax($showMinMax)
    {
        return $this->withOption('showMinMax', $showMinMax);
    }

    /**
     * @param boolean $showTicks
     * @return SliderSettingFactory
     */
    public function withShowTicks($showTicks)
    {
        return $this->withOption('withTicks', $showTicks);
    }

}