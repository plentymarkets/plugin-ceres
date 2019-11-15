<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class EditorSettingFactory extends GenericSettingFactory
{
    /**
     * @param string $placeholder
     */
    public function withPlaceHolder($placeholder)
    {
        $this->withOption('placeholder', $placeholder);
    }

    /**
     * @param string $fixedHeight
     */
    public function withFixedHeight($fixedHeight)
    {
        $this->withOption('fixedHeight', $fixedHeight);
    }

    /**
     * @param string $minHeight
     */
    public function withMinHeight($minHeight)
    {
        $this->withOption('minHeight', $minHeight);
    }
}