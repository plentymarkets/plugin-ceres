<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 14/08/2019
 * Time: 15:29
 */

namespace Ceres\Wizard\ShopWizard\Modifiers;


use Plenty\Modules\Wizard\Contracts\WizardDataModifier;

class AvailableCurrencyModifier implements WizardDataModifier
{
    /**
     * @param array $parameters
     *
     * @return mixed
     */
    public function modify(array $parameters)
    {
        //if toggle button is on false position

        if (!$parameters['data']['currencies_allowCurrencyChange']) {
            $parameters['data']['currencies_availableCurrencies'] = [];
        }
        return $parameters;
    }
}