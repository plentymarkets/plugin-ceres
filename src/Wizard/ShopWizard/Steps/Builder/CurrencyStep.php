<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 08/07/2019
 * Time: 10:26
 */

namespace Ceres\Wizard\ShopWizard\Steps\Builder;


use Ceres\Wizard\ShopWizard\Helpers\ConfigHelper;
use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;
use Plenty\Modules\Order\Currency\Contracts\CurrencyRepositoryContract;

class CurrencyStep extends Step
{
    public function generateStep()
    {
        return [
            "title" => "Wizard.currenciesSettings",
            "description" => "Wizard.currenciesSettingsDescription",
            "condition" => $this->hasRequiredSettings(),
            "sections" => [
                $this->generateCurenciesSection(),
                $this->generateFormatCurrenciesSection(),
                $this->generateAvailableCurrenciesSection()
            ]
        ];
    }

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


    private function generateFormatCurrenciesSection(): array
    {
        $currenciesFormat = ConfigHelper::getCurrencyFormat();
        $currenciesFormatList = $this->generateTranslatedListBoxValues($currenciesFormat);
        $currenciesFormatSelection = ConfigHelper::getCurrencyFormatSelection();
        $currenciesFormatSelectionList = $this->generateTranslatedListBoxValues($currenciesFormatSelection);
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

    private function generateAvailableCurrenciesSection(): array
    {
        $availableCurrencies = ConfigHelper::getAvailableCurrencies();
        $availableCurrenciesList = $this->generateTranslatedListBoxValues($availableCurrencies);
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
                    "isVisible" => "currencies_allowCurrencyChange !== false",
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