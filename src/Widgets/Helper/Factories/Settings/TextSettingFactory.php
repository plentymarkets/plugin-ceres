<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class TextSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $this->withType("text");
    }

    /**
     * @param boolean $isPassword
     * @return TextSettingFactory
     */
    public function withPassword($isPassword)
    {
        return $this->withOption('isPassword', $isPassword);
    }

    /**
     * @param boolean $isIBAN
     * @return TextSettingFactory
     */
    public function withIBAN($isIBAN)
    {
        return $this->withOption('isIban', $isIBAN);
    }

    /**
     * @param boolean $isReadonly
     * @return TextSettingFactory
     */
    public function withReadonly($isReadonly)
    {
        return $this->withOption('isReadonly', $isReadonly);
    }
}