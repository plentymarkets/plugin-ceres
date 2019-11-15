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
     */
    public function withFixedHeight($isFixedHeight)
    {
        $this->withOption('hasFixedHeight', $isFixedHeight);
    }

    /**
     * @param integer $maxRows
     */
    public function withMaxRows($maxRows)
    {
        $this->withOption('maxRows', $maxRows);
    }
}