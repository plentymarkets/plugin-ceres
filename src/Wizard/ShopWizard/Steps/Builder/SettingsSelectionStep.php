<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 30/05/2019
 * Time: 14:25
 */

namespace Ceres\Wizard\ShopWizard\Steps\Builder;


use Ceres\Wizard\ShopWizard\Services\ShopWizardService;

class SettingsSelectionStep
{

    /**
     * @return array
     */
    public function generateStep(): array
    {
        $wizardService = pluginApp(ShopWizardService::class);

        $pluginSets = $wizardService->getPluginSets();

        $setValues = $this->buildListBoxData($pluginSets);

        $webstores = $wizardService->getWebstores();

        $storesValues = $this->buildListBoxData($webstores);

        $options = [
            [
                "name" => "client",
                "options" => $storesValues
            ],
            [
                "name" => "pluginSet",
                "options" => $setValues
            ]
        ];

        return [
            "title" => "Wizard.settingsSelection",
            "description" => "Wizard.generalDescription",
            "sections" => [
                $this->generateHorizontalSection($options),
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
     * @param $options
     *
     * @return array
     */
    private function generateHorizontalSection($options) {
        $children =  [];

        foreach ($options as $optionItem) {
            $stepKey = "step1_" . $optionItem['name'];
            $children [$stepKey] = $this->generateSelection($optionItem['name'], $optionItem['options']);
        }

        return [
            "form" => [
                "sideBySide" => [
                    "type" => "horizontal",
                    "children" => $children
                ]
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
            "description" => "Wizard.generalDescription",
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

    /**
     * @param $name
     * @param $listBoxValues
     *
     * @return array
     */
    private function generateSelection($name, $listBoxValues)
    {
        return  [
            "type" => "select",
            "options" => [
                "name" => "Wizard." . $name . "Selection",
                "listBoxValues" => $listBoxValues
            ]
        ];
    }

    /**
     * @param $dropdownData
     *
     * @return array
     */
    private function buildListBoxData($dropdownData)
    {
        $listBoxValues = [];

        foreach ($dropdownData as $option) {
            $listBoxValues[] = [
                "caption" => $option['name'],
                "value" => $option['id']
            ];
        }

        return $listBoxValues;
    }
}