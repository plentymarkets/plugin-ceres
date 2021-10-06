<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

use Plenty\Modules\ShopBuilder\Factories\Settings\TextSettingFactory as CoreTextSettingFactory;

/**
 * Class TextSettingFactory
 * @package Ceres\Widgets\Helper\Factories\Settings
 * @deprecated since 5.0.23
 * @see \Plenty\Modules\ShopBuilder\Factories\Settings\TextSettingFactory
 */
class TextSettingFactory extends CoreTextSettingFactory
{
    /**
     * @param boolean $isIBAN
     * @return $this
     */
    public function withIBAN($isIBAN)
    {
        return $this->withOption('isIban', $isIBAN);
    }
}
