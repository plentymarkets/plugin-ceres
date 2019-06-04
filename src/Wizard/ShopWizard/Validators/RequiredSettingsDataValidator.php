<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 03/06/2019
 * Time: 13:02
 */

namespace Ceres\Wizard\ShopWizard\Validators;

use Plenty\Validation\Validator;

class RequiredSettingsDataValidator extends Validator
{

    protected function defineAttributes()
    {
        $this->addString('setAllRequiredAssistants', true);
    }
}