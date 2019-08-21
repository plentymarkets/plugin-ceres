<?php

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

/**
 * Class SettingsSelectionStep
 * @package Ceres\Wizard\ShopWizard\Steps\Builder
 */
class SettingsSelectionStep extends Step
{
    /**
     * @return array
     */
    public function generateStep():array
    {
        return [
            "title" => "Wizard.settingsSelection",
            "description" => "Wizard.settingsSelectionDescription",
            "condition" => $this->hasRequiredSettings(),
            "sections" => [
                $this->generateSection("displayedInfo"),
                $this->generateSection("paginationSorting"),
                $this->generateSection("languages"),
                $this->generateSection("performance"),
                $this->generateSection("search"),
                $this->generateSection("seo")
            ]
        ];
    }

    /**
     * @param $name
     *
     * @return array
     */
    private function generateSection($name):array
    {
        $condition = $name == "languages" ||  $name == "search" ? $this->globalsCondition : true;
        
        return [
            "title" => "Wizard." . $name,
            "description" => "Wizard." . $name . "Description",
            "condition" => $condition,
            "form" => [
                "settingsSelection_" . $name => $this->generateToggleComponent($name)
            ]
        ];
    }

    /**
     * @param $name
     *
     * @return array
     */
    private function generateToggleComponent($name):array
    {
        return [
            "type" => "toggle",
            "defaultValue" => false,
            "options" => [
                "name" => "Wizard." . $name . "SettingsSelection"
            ]
        ];
    }
}
