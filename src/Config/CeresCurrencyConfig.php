<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

/**
 * Class CeresCurrencyConfig
 *
 * PluginConfig class, including all plugin settings for the currencies.
 *
 * @package Ceres\Config
 */
class CeresCurrencyConfig extends PluginConfig
{
    /**
     * @var string $format Format of currencies. Possible values are 'name' and 'symbol'.
     */
    public $format;

    /**
     * @var bool $enableSelection Allow customer to change the currency.
     */
    public $enableSelection;

    /**
     * @var string $formatSelection Format of currencies in header.
     */
    public $formatSelection;

    /**
     * @var array Available currencies.
     */
    public $availableCurrencies;

    /**
     * @inheritDoc
     */
    protected function getPluginName(): string
    {
        return 'Ceres';
    }

    /**
     * @inheritDoc
     */
    protected function load()
    {
        $this->format = $this->getTextValue('currency.format', 'name');

        $this->enableSelection = $this->getBooleanValue('currency.enable_selection', true);

        $this->formatSelection = $this->getTextValue('currency.format_selection', 'all');

        $this->availableCurrencies = $this->getMultiSelectValue(
            'currency.available_currencies',
            [
                'AED',
                'ARS',
                'AUD',
                'BGN',
                'BHD',
                'BRL',
                'CAD',
                'CHF',
                'CNY',
                'CZK',
                'DKK',
                'EUR',
                'GBP',
                'HKD',
                'JRK',
                'HUF',
                'IDR',
                'INR',
                'JPY',
                'KES',
                'MXN',
                'MYR',
                'NOK',
                'NZD',
                'PHP',
                'PLN',
                'QAR',
                'RON',
                'RUB',
                'SEK',
                'SGD',
                'THB',
                'THB',
                'TRY',
                'TWD',
                'UAH',
                'USD',
                'VND',
                'XCD',
                'ZAR'
            ]
        );
    }
}
