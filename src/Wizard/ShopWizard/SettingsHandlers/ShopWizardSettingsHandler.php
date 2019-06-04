<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 03/06/2019
 * Time: 14:01
 */

namespace Ceres\Wizard\ShopWizard\SettingsHandlers;

use Plenty\Modules\Wizard\Contracts\WizardSettingsHandler;

class ShopWizardSettingsHandler implements WizardSettingsHandler
{

    public function handle(array $parameters)
    {
        return true;
    }
}