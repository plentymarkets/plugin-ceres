<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 08/07/2019
 * Time: 10:26
 */

namespace Ceres\Wizard\ShopWizard\Steps\Builder;


use Ceres\Wizard\ShopWizard\Config\CurrencyConfig;
use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;
use Ceres\Wizard\ShopWizard\Modifiers\AvailableCurrencyModifier;
use Plenty\Modules\Order\Currency\Contracts\CurrencyRepositoryContract;

class CurrencyStep extends Step
{
    /**
     * @var CurrencyConfig
     */
    private $currencyConfig;

    /**
     * CurrencyStep constructor.
     *
     * @param CurrencyConfig $currencyConfig
     */
    public function __construct(CurrencyConfig $currencyConfig)
    {
        parent::__construct();
        $this->currencyConfig = $currencyConfig;
    }

    /**
     * @return array
     */
    public function generateStep()
    {
        return [
            "title" => "Wizard.currenciesSettings",
            "description" => "Wizard.currenciesSettingsDescription",
            "condition" => $this->hasRequiredSettings(),
            "modifierClass" => AvailableCurrencyModifier::class,
            "sections" => [
                $this->generateCurenciesSection(),
                $this->generateFormatCurrenciesSection(),
                $this->generateAvailableCurrenciesSection()
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateCurenciesSection(): array
    {
        $currencyRepo = pluginApp(CurrencyRepositoryContract::class);

        return [
            "title" => "Wizard.defaultCurrencies",
            "description" => "Wizard.defaultCurrenciesDescription",
            "condition" => $this->globalsCondition,
            "form" => $this->generateCurenciesList($currencyRepo->getCurrencyList())
        ];
    }

    /**
     * @param $currenciesCollection
     *
     * @return array
     */
    private function generateCurenciesList($currenciesCollection): array
    {
        $list = [];
        if (count($currenciesCollection)) {
            $languages = LanguagesHelper::getTranslatedLanguages();
            $currenciesList = $this->getCurrenciesListValues($currenciesCollection);
            foreach ($languages as $langCode => $language) {
                $key = 'currencies_defaultCurrency_' . $langCode;
                $list[$key] = [
                    "type" => "select",
                    "defaultValue" => 'EUR',
                    "options" => [
                        "name" => $language,
                        "listBoxValues" => $currenciesList
                    ]
                ];
            }
        }

        return $list;
    }

    /**
     * @param $currencyCollection
     *
     * @return array
     */
    private function getCurrenciesListValues ($currencyCollection): array
    {
        $currenciesList = [];

        if (count($currencyCollection)) {
            foreach($currencyCollection as $currency) {
                $currencyData = $currency->toArray();
                if ($currencyData['isActive'] === true) {
                    $currenciesList[] = [
                        'value' => $currencyData['currency'],
                        'caption' => $currencyData['currency']
                    ];
                }

            }
        }

        return $currenciesList;
    }

    /**
     * @return array
     */
    private function generateFormatCurrenciesSection(): array
    {
        $currenciesFormat = CurrencyConfig::getCurrencyFormat();
        $currenciesFormatList = StepHelper::generateTranslatedListBoxValues($currenciesFormat);
        $currenciesFormatSelection = CurrencyConfig::getCurrencyFormatSelection();
        $currenciesFormatSelectionList = StepHelper::generateTranslatedListBoxValues($currenciesFormatSelection);
        return [
            "title" => "Wizard.formatOfCurrencies",
            "description" => "",
            "form" => [
                "currencies_currencyFormat" => [
                    "type" => "select",
                    "defaultValue" => $currenciesFormatList[0]['value'],
                    "options" => [
                        "name" => "Wizard.formatCurrencies",
                        "listBoxValues" => $currenciesFormatList
                    ]
                ],
                "currencies_currencyFormatSelection" => [
                    "type" => "select",
                    "defaultValue" => $currenciesFormatSelectionList[2]['value'],
                    "options" => [
                        "name" => "Wizard.currencyCodeSymbol",
                        "listBoxValues" => $currenciesFormatSelectionList
                    ]
                ]

            ]
        ];
    }

    /**
     * @return array
     */
    private function generateAvailableCurrenciesSection(): array
    {
        $availableCurrencies = $this->currencyConfig->getAvailableCurrencies();
        $availableCurrenciesList = StepHelper::generateTranslatedListBoxValues($availableCurrencies);
        return [
            "title" => "Wizard.availableCurrencies",
            "description" => "",
            "form" => [
                "currencies_allowCurrencyChange" => [
                    "type" => "toggle",
                    "defaultValue" => true,
                    "options" => [
                        "name" => "Wizard.allowCurrencyChange"
                    ]
                ],
                "currencies_availableCurrencies" => [
                    "type" => "checkboxGroup",
                    "isVisible" => "typeof currencies_allowCurrencyChange === 'undefined' || currencies_allowCurrencyChange === true",
                    "defaultValue" => array_values($availableCurrencies),
                    "options" => [
                        "name" => "Wizard.activateCurrencies",
                        "checkboxValues" => $availableCurrenciesList
                    ]
                ]
            ]
        ];
    }
}