<?php

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

/**
 * Class ShopWizard
 * @package Ceres\Wizard\ShopWizard
 */
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

    /**
     * ShopWizard constructor.
     *
     * @param DefaultSettingsService $defaultSettingsService
     * @param Translator $translator
     */
    public function __construct(DefaultSettingsService $defaultSettingsService, Translator $translator)
    {
        $this->settingsService = $defaultSettingsService;
        $this->translator = $translator;
    }

    /**
     * @return array
     */
    protected function structure()
    {
        $requiredSettings  = pluginApp(RequiredSettingsStep::class);
        $settingsSelection = pluginApp(SettingsSelectionStep::class);
        $defaultSettings   = pluginApp(DefaultSettingsStep::class);
        $onlineStore       = pluginApp(OnlineStoreStep::class);
        $currency          = pluginApp(CurrencyStep::class);
        $displayInfo       = pluginApp(DisplayedInformationStep::class);
        $pagination        = pluginApp(PaginationStep::class);
        $languages         = pluginApp(LanguagesStep::class);
        $performance       = pluginApp(PerformanceStep::class);
        $search            = pluginApp(SearchStep::class);
        $seo               = pluginApp(SeoStep::class);
        
        return [
            "title" => "Wizard.title",
            "shortDescription" => "Wizard.shortDescription",
            "keywords" => $this->buildKeywords(),
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
            "undeleteableOptionIds" => $this->getUnDeletableOptions(),
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
     * @return array
     */
    private function buildKeywords()
    {
        $keywords = [];
        $i = 1;
        $prefix = ["Ceres::", "Wizard.keyword"];
        
        while($this->translator->trans($prefix[0].$prefix[1].$i) !== $prefix[0].$prefix[1].$i)
        {
            $keywords[] = $prefix[1].$i;
            $i++;
            if($i > 100)
            {
                break;
            }
        }

        return $keywords;
    }

    /**
     * @param array $clients
     *
     * @return array
     */
    private function buildClientOptions()
    {
        $clients = $this->settingsService->getWebstores();
        $pluginSets = $this->settingsService->getPluginSets();
        
        $clientsList = [
            [
                "value" => "",
                "caption" => $this->translator->trans("Ceres::Wizard.selectClient")
            ]
        ];

        //we add preview option only there are more than one plugin set
        if (count($pluginSets) > 1) {
            $clientsList[] = [
                "value" => "preview",
                "caption" => $this->translator->trans("Ceres::Wizard.previewOption")
            ];
        }

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
        
        $pluginSetValues = [
            [
                "value" => "",
                "caption" => $this->translator->trans("Ceres::Wizard.selectPluginSet")
            ]

        ];

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

    /**
     * @return array
     */
    private function getUnDeletableOptions():array
    {
        $settingsService = pluginApp(DefaultSettingsService::class);
        $webStores = $settingsService->getWebstores();
        $unDeletableOptions = [];

        if (count($webStores)) {
            foreach ($webStores as $webStore) {
                $optionId = "webstore_" . $webStore['id'] . "." . "pluginSet_" . $webStore['pluginSetId'];
                $unDeletableOptions[] = $optionId;
            }
        }

        return $unDeletableOptions;
    }
}
