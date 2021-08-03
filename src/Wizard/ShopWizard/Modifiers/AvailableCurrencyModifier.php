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
        return $parameters['data'];
    }
}
