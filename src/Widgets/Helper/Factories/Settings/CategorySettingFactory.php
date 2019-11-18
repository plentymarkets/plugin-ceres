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
     * @return CategorySettingFactory
     */
    public function withDisplayResetButton($displayResetButton)
    {
        return $this->withOption('displayResetButton', $displayResetButton);
    }

    /**
     * @param boolean $displaySearch
     * @return CategorySettingFactory
     */
    public function withDisplaySearch($displaySearch)
    {
        return $this->withOption('displaySearch', $displaySearch);
    }

    /**
     * @param boolean $showFullSelectionPath
     * @return CategorySettingFactory
     */
    public function withShowFullSelectionPath($showFullSelectionPath)
    {
        return $this->withOption('showFullSelectionPath', $showFullSelectionPath);
    }
}