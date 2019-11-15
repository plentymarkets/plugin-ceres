<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class CategorySettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType('category');
    }

    /**
     * @param boolean $displayResetButton
     */
    public function withDisplayResetButton($displayResetButton)
    {
        $this->withOption('displayResetButton', $displayResetButton);
    }

    /**
     * @param boolean $displaySearch
     */
    public function withDisplaySearch($displaySearch)
    {
        $this->withOption('displaySearch', $displaySearch);
    }

    /**
     * @param boolean $showFullSelectionPath
     */
    public function withShowFullSelectionPath($showFullSelectionPath)
    {
        $this->withOption('showFullSelectionPath', $showFullSelectionPath);
    }
}