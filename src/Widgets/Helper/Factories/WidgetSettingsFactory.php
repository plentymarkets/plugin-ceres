<?php

namespace Ceres\Widgets\Helper\Factories;

use Ceres\Widgets\Helper\Factories\Settings\CustomSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\SettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\TextSettingFactory;

class WidgetSettingsFactory
{
    private $settings = [];

    /**
     * @param $key
     * @return CustomSettingFactory
     */
    public function createSetting($key)
    {
        return $this->create($key, CustomSettingFactory::class);
    }

    /**
     * @param $key
     * @return TextSettingFactory
     */
    public function createText($key)
    {
        return $this->create($key, TextSettingFactory::class);
    }

    private function create($key, $class)
    {
        $setting = pluginApp($class);
        $this->settings[$key] = $setting;
        return $setting;
    }

    public function toArray()
    {
        $result = [];
        /**
         * @var string $key
         * @var SettingFactory $setting
         */
        foreach($this->settings as $key => $setting)
        {
            $result[$key] = $setting->toArray();
        }
        return $result;
    }
}