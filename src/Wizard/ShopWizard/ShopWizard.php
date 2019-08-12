<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 28/05/2019
 * Time: 15:51
 */

namespace Ceres\Wizard\ShopWizard;

use Ceres\Wizard\ShopWizard\Services\DefaultSettingsService;
use Ceres\Wizard\ShopWizard\Steps\Builder\CurrencyStep;
use Ceres\Wizard\ShopWizard\Steps\Builder\DefaultSettingsStep;
use Ceres\Wizard\ShopWizard\Steps\Builder\DisplayedInformationStep;
use Ceres\Wizard\ShopWizard\Steps\Builder\LanguagesStep;
use Ceres\Wizard\ShopWizard\Steps\Builder\OnlineStoreStep;
use Ceres\Wizard\ShopWizard\Steps\Builder\PaginationStep;
use Ceres\Wizard\ShopWizard\Steps\Builder\PerformanceStep;
use Ceres\Wizard\ShopWizard\Steps\Builder\RequiredSettingsStep;
use Ceres\Wizard\ShopWizard\Steps\Builder\SearchStep;
use Ceres\Wizard\ShopWizard\Steps\Builder\SeoStep;
use Ceres\Wizard\ShopWizard\Steps\Builder\SettingsSelectionStep;
use Plenty\Modules\Wizard\Services\WizardProvider;
use Plenty\Plugin\Translation\Translator;

class ShopWizard extends WizardProvider
{

    /**
     * @var DefaultSettingsService
     */
    private $settingsService;

    /**
     * @var Translator
     */
    private $translator;

    public function __construct(DefaultSettingsService $defaultSettingsService, Translator $translator)
    {
        $this->settingsService = $defaultSettingsService;
        $this->translator = $translator;
    }
    protected function structure()
    {
        $requiredSettings = pluginApp(RequiredSettingsStep::class);
        $settingsSelection = pluginApp(SettingsSelectionStep::class);
        $defaultSettings = pluginApp(DefaultSettingsStep::class);
        $onlineStore = pluginApp(OnlineStoreStep::class);
        $currency = pluginApp(CurrencyStep::class);
        $displayInfo = pluginApp(DisplayedInformationStep::class);
        $pagination = pluginApp(PaginationStep::class);
        $languages = pluginApp(LanguagesStep::class);
        $performance = pluginApp(PerformanceStep::class);
        $search = pluginApp(SearchStep::class);
        $seo = pluginApp(SeoStep::class);


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
            'dependencyClass' => 'Ceres\Wizard\ShopWizard\DynamicLoaders\ShopWizardDynamicLoader',
            "translationNamespace" => "Ceres",
            "options" => [
                'client' => $this->buildClientOptions(),
                'pluginSet' => $this->buildPluginSetOptions()
            ],
            "steps" => [
                "requiredStep" => $requiredSettings->generateStep(),
                "settingsSelectionStep" => $settingsSelection->generateStep(),
                "defaultSettingsStep" => $defaultSettings->generateStep(),
                "onlineStoreStep" => $onlineStore->generateStep(),
                "currencyStep" => $currency->generateStep(),
                "displayInfoStep" => $displayInfo->generateStep(),
                "paginationStep" => $pagination->generateStep(),
                "languagesStep" => $languages->generateStep(),
                "performanceStep" => $performance->generateStep(),
                "searchStep" => $search->generateStep(),
                "seoStep" => $seo->generateStep()
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
        $clientsList = [
            [
                "value" => "preview",
                "caption" => $this->translator->trans("Ceres::Wizard.previewOption")
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
            'defaultValue' => $pluginSetValues[0]['value'],
            'options' => [
                'name' => 'Wizard.pluginSetSelection',
                'required' => true,
                'listBoxValues' => $pluginSetValues
            ]
        ];
    }
}