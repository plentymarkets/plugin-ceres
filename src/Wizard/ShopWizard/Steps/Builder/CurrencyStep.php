<?php

namespace Ceres\Wizard\ShopWizard\Steps\Builder;

use Ceres\Wizard\ShopWizard\Config\CurrencyConfig;
use Ceres\Wizard\ShopWizard\Helpers\LanguagesHelper;
use Ceres\Wizard\ShopWizard\Helpers\StepHelper;
use Ceres\Wizard\ShopWizard\Modifiers\AvailableCurrencyModifier;
use Plenty\Modules\Order\Currency\Contracts\CurrencyRepositoryContract;

/**
 * Class CurrencyStep
 * @package Ceres\Wizard\ShopWizard\Steps\Builder
 */
class CurrencyStep extends Step
{
    private $currencies = [];

    /**
     * CurrencyStep constructor.
     *
     * @param CurrencyRepositoryContract $currencyRepositoryContract
     */
    public function __construct(CurrencyRepositoryContract $currencyRepositoryContract)
    {
        parent::__construct();
        
        $currencyList = $currencyRepositoryContract->getCurrencyList();
        foreach($currencyList as $currency)
        {
            $this->currencies[] = $currency->currency;
        }
    }

    /**
     * @return array
     */
    public function generateStep()
    {
        return [
            "title"         => "Wizard.currenciesSettings",
            "description"   => "Wizard.currenciesSettingsDescription",
            "condition"     => $this->hasRequiredSettings(),
            "modifierClass" => AvailableCurrencyModifier::class,
            "sections"      => [
                $this->generateCurrenciesSection(),
                $this->generateFormatCurrenciesSection(),
                $this->generateAvailableCurrenciesSection()
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateCurrenciesSection():array
    {
        return [
            "title"       => "Wizard.defaultCurrencies",
            "description" => "Wizard.defaultCurrenciesDescription",
            "condition"   => $this->globalsCondition,
            "form"        => $this->generateCurrenciesList()
        ];
    }
    
    /**
     * @return array
     */
    private function generateCurrenciesList():array
    {
        $list = [];
        $languages = LanguagesHelper::getTranslatedLanguages();
        $currenciesList = $this->getCurrenciesListValues();
        
        foreach ($languages as $langCode => $language) {
            $key = 'currencies_defaultCurrency_' . $langCode;
            $list[$key] = [
                "type" => "select",
                "defaultValue" => 'EUR',
                "options"      => [
                    "name"          => $language,
                    "listBoxValues" => $currenciesList
                ]
            ];
        }

        return $list;
    }

    /**
     * @return array
     */
    private function getCurrenciesListValues():array
    {
        $currenciesList = [];

        foreach($this->currencies as $currency) {
            $currenciesList[] = [
                'value'   => $currency,
                'caption' => 'Wizard.currencyAvailable'. $currency
            ];
        }

        return $currenciesList;
    }

    /**
     * @return array
     */
    private function generateFormatCurrenciesSection():array
    {
        $currenciesFormat              = CurrencyConfig::getCurrencyFormat();
        $currenciesFormatList          = StepHelper::generateTranslatedListBoxValues($currenciesFormat);
        $currenciesFormatSelection     = CurrencyConfig::getCurrencyFormatSelection();
        $currenciesFormatSelectionList = StepHelper::generateTranslatedListBoxValues($currenciesFormatSelection);
        
        return [
            "title" => "Wizard.formatOfCurrencies",
            "description" => "",
            "form" => [
                "currencies_currencyFormat" => [
                    "type"         => "select",
                    "defaultValue" => $currenciesFormatList[0]['value'],
                    "options"      => [
                        "name"          => "Wizard.formatCurrencies",
                        "listBoxValues" => $currenciesFormatList
                    ]
                ],
                "currencies_currencyFormatSelection" => [
                    "type"         => "select",
                    "defaultValue" => $currenciesFormatSelectionList[2]['value'],
                    "options"      => [
                        "name"          => "Wizard.currencyCodeSymbol",
                        "listBoxValues" => $currenciesFormatSelectionList
                    ]
                ]
            ]
        ];
    }

    /**
     * @return array
     */
    private function generateAvailableCurrenciesSection():array
    {
        $availableCurrenciesList = $this->getCurrenciesListValues();

        return [
            "title"       => "Wizard.availableCurrencies",
            "description" => "",
            "form"        => [
                "currencies_allowCurrencyChange" => [
                    "type"         => "toggle",
                    "defaultValue" => true,
                    "options"      => [
                        "name" => "Wizard.allowCurrencyChange"
                    ]
                ],
                "currencies_availableCurrencies" => [
                    "type"         => "checkboxGroup",
                    "isVisible"    => "typeof currencies_allowCurrencyChange === 'undefined' || currencies_allowCurrencyChange === true",
                    "defaultValue" => $this->currencies,
                    "options"      => [
                        "name"           => "Wizard.activateCurrencies",
                        "checkboxValues" => $availableCurrenciesList
                    ]
                ]
            ]
        ];
    }
}
