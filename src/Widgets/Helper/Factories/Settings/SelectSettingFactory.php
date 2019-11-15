<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class SelectSettingFactory extends SettingFactory
{
    public function __construct()
    {
        $this->withType('select');
    }

    /**
     * @param boolean $openOnTop
     */
    public function withOpenOnTop($openOnTop)
    {
        $this->withOption('openOnTop', $openOnTop);
    }

    /**
     * @param $listBoxValues
     */
    public function withListBoxValues($listBoxValues)
    {
        $this->withOption('listBoxValues', $listBoxValues);
    }
}