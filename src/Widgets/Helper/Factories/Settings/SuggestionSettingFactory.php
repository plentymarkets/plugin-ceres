<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class SuggestionSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('suggestion');
    }

    /**
     * @param array $listBoxValues
     * @return SuggestionSettingFactory
     */
    public function withListBoxValues($listBoxValues)
    {
        return $this->withOption('listBoxValues', $listBoxValues);
    }
}