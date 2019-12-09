<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class SelectSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('select');
    }

    /**
     * @param boolean $openOnTop
     * @return SelectSettingFactory
     */
    public function withOpenOnTop($openOnTop)
    {
        return $this->withOption('openOnTop', $openOnTop);
    }

    /**
     * @param array $listBoxValues
     * @return SelectSettingFactory
     */
    public function withListBoxValues($listBoxValues)
    {
        return $this->withOption('listBoxValues', $listBoxValues);
    }
}