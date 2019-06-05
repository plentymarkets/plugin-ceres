<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 28/05/2019
 * Time: 15:51
 */

namespace Ceres\Wizard\ShopWizard;



use Ceres\Wizard\ShopWizard\Steps\Builder\RequiredSettingsStep;
use Ceres\Wizard\ShopWizard\Steps\Builder\SettingsSelectionStep;
use Plenty\Modules\Wizard\Services\WizardProvider;

class ShopWizard extends WizardProvider
{

    protected function structure()
    {
        $requiredSettingsStep = pluginApp(RequiredSettingsStep::class);
        $settingsSelectionStep = pluginApp(SettingsSelectionStep::class);

        return [
            "title" => "Wizard.title",
            "shortDescription" => "Wizard.shortDescription",
            "key" => "shopCeres-assistant",
            "reloadStructure" => true,
            "iconPath" => "https://plentymarkets-assistant.s3.eu-central-1.amazonaws.com/ceres_assistent.svg",
            'dataSource' => 'Ceres\Wizard\ShopWizard\DataSource\ShopWizardDataSource',
            'settingsHandlerClass' => 'Ceres\Wizard\ShopWizard\SettingsHandlers\ShopWizardSettingsHandler',
            "translationNamespace" => "Ceres",
            "steps" => [
                "step1" => $requiredSettingsStep->generateStep(),
                "step2" => $settingsSelectionStep->generateStep(),
            ]
        ];
    }

}