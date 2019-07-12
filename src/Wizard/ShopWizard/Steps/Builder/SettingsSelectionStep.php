<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 30/05/2019
 * Time: 14:25
 */

namespace Ceres\Wizard\ShopWizard\Steps\Builder;


class SettingsSelectionStep extends Step
{

    /**
     * @return array
     */
    public function generateStep(): array
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
    private function generateSection($name): array
    {
        return [
            "title" => "Wizard." . $name,
            "description" => "Wizard." . $name . "Description",
            "form" => [
                "step1_" . $name => $this->generateToggleComponent($name)
            ]
        ];
    }

    /**
     * @param $name
     *
     * @return array
     */
    private function generateToggleComponent($name) : array
    {
        return [
            "type" => "toggle",
            "options" => [
                "name" => "Wizard." . $name . "Settings"
            ]
        ];
    }
}