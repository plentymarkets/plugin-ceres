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
     * Create a generic widget settings entry.
     *
     * @param string    $key    The key of the new settings entry. If key already exists, previous entry will be overridden.
     *
     * @return GenericSettingFactory
     */
    public function createSetting($key)
    {
        /** @var GenericSettingFactory $setting */
        $setting = pluginApp(GenericSettingFactory::class);
        $this->settings[$key] = $setting;
        return $setting;
    }

    /**
     * Create a container entry which may contain nested settings.
     * @param string $key
     * @return ContainerSettingFactory
     */
    public function createContainer($key)
    {
        /** @var ContainerSettingFactory $setting */
        $setting = pluginApp(ContainerSettingFactory::class);
        $this->settings[$key] = $setting;
        return $setting;
    }

    /**
     * Create a vertical container
     *
     * @param string $key
     * @return ContainerSettingFactory
     */
    public function createVerticalContainer($key)
    {
        /** @var ContainerSettingFactory $setting */
        $setting = pluginApp(ContainerSettingFactory::class);
        $this->settings[$key] = $setting->withType("vertical");
        return $setting;
    }

    /**
     * Create a horizontal container
     *
     * @param string $key
     * @return ContainerSettingFactory
     */
    public function createHorizontalContainer($key)
    {
        /** @var ContainerSettingFactory $setting */
        $setting = pluginApp(ContainerSettingFactory::class);
        $this->settings[$key] = $setting->withType("horizontal");
        return $setting;
    }

    /**
     * Create a text input setting
     *
     * @param string $key
     * @return TextSettingFactory
     */
    public function createText($key)
    {
        /** @var TextSettingFactory $setting */
        $setting = pluginApp(TextSettingFactory::class);
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