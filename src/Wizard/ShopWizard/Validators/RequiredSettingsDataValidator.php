<?php

namespace Ceres\Wizard\ShopWizard\Validators;

use Plenty\Validation\Validator;

/**
 * Class RequiredSettingsDataValidator
 * @package Ceres\Wizard\ShopWizard\Validators
 */
class RequiredSettingsDataValidator extends Validator
{
    protected function defineAttributes()
    {
        $this->addString('setAllRequiredAssistants', true);
    }
}
