<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class TextareaSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('textarea');
    }

    /**
     * @param boolean $isFixedHeight
     * @return TextareaSettingFactory
     */
    public function withFixedHeight($isFixedHeight)
    {
        return $this->withOption('hasFixedHeight', $isFixedHeight);
    }

    /**
     * @param integer $maxRows
     * @return TextareaSettingFactory
     */
    public function withMaxRows($maxRows)
    {
        return $this->withOption('maxRows', $maxRows);
    }
}