<?php

namespace Ceres\Wizard\ShopWizard\Modifiers;

use Plenty\Modules\Wizard\Contracts\WizardDataModifier;

/**
 * Class AvailableCurrencyModifier
 * @package Ceres\Wizard\ShopWizard\Modifiers
 */
class AvailableCurrencyModifier implements WizardDataModifier
{
    /**
     * @param array $parameters
     *
     * @return mixed
     */
    public function modify(array $parameters)
    {
        $data = $parameters['data'];
        $this->allowCurrenciesModifier($data);
        return $data;
    }

    private function allowCurrenciesModifier(array &$data)
    {
        if(!$data['currencies_allowCurrencyChange']) {
            $data['currencies_availableCurrencies'] = [];
        }
    }
}
