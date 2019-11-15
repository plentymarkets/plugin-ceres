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
     */
    public function withListBoxValues($listBoxValues)
    {
        $this->withOption('listBoxValues', $listBoxValues);
    }
}