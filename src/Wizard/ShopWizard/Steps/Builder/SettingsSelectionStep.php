<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 30/05/2019
 * Time: 14:25
 */

namespace Ceres\Wizard\ShopWizard\Steps\Builder;


class SettingsSelectionStep
{

    public function generateStep(): array
    {
        return [
            "title" => "Wizard.settingsSelection",
            "description" => "Wizard.generalDescription",
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

    private function generateSection($name): array
    {
        return [
            "title" => "Wizard." . $name,
            "description" => "Wizard.generalDescription",
            "form" => [
                $name => [
                    "type" => "toggle",
                    "options" => [
                        "name" => "Wizard." . $name . "Settings"
                    ]
                ]
            ]
        ];
    }
}