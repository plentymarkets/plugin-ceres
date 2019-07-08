<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 28/05/2019
 * Time: 15:51
 */

namespace Ceres\Wizard\ShopWizard;



use Ceres\Wizard\ShopWizard\Services\DefaultSettingsService;
use Ceres\Wizard\ShopWizard\Steps\Builder\DefaultSettingsStep;
use Ceres\Wizard\ShopWizard\Steps\Builder\OnlineStoreStep;
use Ceres\Wizard\ShopWizard\Steps\Builder\RequiredSettingsStep;
use Ceres\Wizard\ShopWizard\Steps\Builder\SettingsSelectionStep;
use Plenty\Modules\Wizard\Services\WizardProvider;
use Plenty\Plugin\Translation\Translator;

class ShopWizard extends WizardProvider
{

    private $settingsService;

    public function __construct(DefaultSettingsService $defaultSettingsService)
    {
        $this->settingsService = $defaultSettingsService;
    }
    protected function structure()
    {
        $requiredSettingsStep = pluginApp(RequiredSettingsStep::class);
        $settingsSelectionStep = pluginApp(SettingsSelectionStep::class);
        $defalutSettingsStep = pluginApp(DefaultSettingsStep::class);
        $onlineStoreStep = pluginApp(OnlineStoreStep::class);


        return [
            "title" => "Wizard.title",
            "shortDescription" => "Wizard.shortDescription",
            "topics" => [
                "omni-channel"
            ],
            "key" => "shopCeres-assistant",
            "reloadStructure" => true,
            "iconPath" => "https://plentymarkets-assistant.s3.eu-central-1.amazonaws.com/ceres_assistent.svg",
            'dataSource' => 'Ceres\Wizard\ShopWizard\DataSource\ShopWizardDataSource',
            'settingsHandlerClass' => 'Ceres\Wizard\ShopWizard\SettingsHandlers\ShopWizardSettingsHandler',
            //'dependencyClass' => 'Ceres\Wizard\ShopWizard\DynamicLoaders\ShopWizardDynamicLoader',
            "translationNamespace" => "Ceres",
            "options" => [
                'client' => $this->buildClientOptions(),
                'pluginSet' => $this->buildPluginSetOptions()
            ],
            "steps" => [
                "requiredStep" => $requiredSettingsStep->generateStep(),
                "settingsSelectionStep" => $settingsSelectionStep->generateStep(),
                "defaultSettingsStep" => $defalutSettingsStep->generateStep(),
                "onlineStoreStep" => $onlineStoreStep->generateStep(),
            ]
        ];
    }

    /**
     * @param array $clients
     *
     * @return array
     */
    private function buildClientOptions()
    {
        $clients = $this->settingsService->getWebstores();
        $translator = pluginApp(Translator::class);
        $clientsList = [
            [
                "value" => "preview",
                "caption" => $translator->trans("Ceres::Wizard.previewOption")
            ]
        ];

        if (count($clients)) {
            foreach($clients as $client) {
                $clientsList[] = [
                    "value" => $client['id'],
                    "caption" => $client["name"]
                ];
            }
        }

        return [
            'type' => 'select',
            'defaultValue' => $clientsList[0]['value'],
            'options' => [
                'name' => 'Wizard.clientSelection',
                'required' => true,
                'listBoxValues' => $clientsList
            ]
        ];
    }

    /**
     * @return array
     */
    private function buildPluginSetOptions()
    {
        $pluginSets = $this->settingsService->getPluginSets();
        $pluginSetValues = [];

        if (count($pluginSets)) {
            foreach ($pluginSets as $pluginSet) {
                $pluginSetValues[] = [
                    "value" => $pluginSet['id'],
                    "caption" => $pluginSet['name']
                ];
            }
        }

        return [
            'type' => 'select',
            'defaultValue' => '0',
            'options' => [
                'name' => 'Wizard.pluginSetSelection',
                'required' => true,
                'listBoxValues' => $pluginSetValues
            ]
        ];
    }
}