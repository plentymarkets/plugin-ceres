<?php

namespace Ceres\Widgets\Helper\Factories;

use Ceres\Widgets\Helper\Factories\Settings\ContainerSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\BaseSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\GenericSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\TextSettingFactory;

class WidgetSettingsFactory
{
    private $settings = [];

    /**
     * @param $key
     * @return GenericSettingFactory
     */
    public function createSetting($key)
    {
        return $this->create($key, GenericSettingFactory::class);
    }

    /**
     * @param $key
     * @return ContainerSettingFactory
     */
    public function createContainer($key)
    {
        return $this->create($key, ContainerSettingFactory::class);
    }

    /**
     * @param $key
     * @return ContainerSettingFactory
     */
    public function createVerticalContainer($key)
    {
        return $this->createContainer($key)->withType("vertical");
    }

    /**
     * @param $key
     * @return ContainerSettingFactory
     */
    public function createHorizontalContainer($key)
    {
        return $this->createContainer($key)->withType("horizontal");
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
         * @var BaseSettingFactory $setting
         */
        foreach($this->settings as $key => $setting)
        {
            $result[$key] = $setting->toArray();
        }
        return $result;
    }
}