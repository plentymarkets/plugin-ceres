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
     */
    public function withPassword($isPassword)
    {
        $this->withOption('isPassword', $isPassword);
    }

    /**
     * @param boolean $isIBAN
     */
    public function withIBAN($isIBAN)
    {
        $this->withOption('isIban', $isIBAN);
    }

    /**
     * @param boolean $isReadonly
     */
    public function withReadonly($isReadonly)
    {
        $this->withOption('isReadonly', $isReadonly);
    }
}