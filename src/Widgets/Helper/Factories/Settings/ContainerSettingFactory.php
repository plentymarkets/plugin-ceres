<?php

namespace Ceres\Widgets\Helper\Factories\Settings;


use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Plenty\Modules\Plugin\Annotations\Service;

/**
 * Class ContainerSettingFactory
 *
 * This class extends the BaseSettingFactory by adding child settings.
 *
 * @package Plenty\Modules\ShopBuilder\Factories\Settings
 * @Service(description="Factory to define a container for nested settings.")
 */
class ContainerSettingFactory extends BaseSettingFactory
{
    /**
     * @var WidgetSettingsFactory
     */
    public $children;

    /**
     * Create a new factory instance with initial value.
     *
     * @param array $data
     * @return $this
     */
    public static function create($data = [])
    {
        /** @var ContainerSettingFactory $instance */
        $instance = pluginApp(ContainerSettingFactory::class);
        $instance->children = WidgetSettingsFactory::create($data['children']);
        unset($data['children']);
        $instance->data = $data;
        return $instance;
    }

    public function __construct()
    {
        $this->children = pluginApp(WidgetSettingsFactory::class);
    }

    /**
     * Get all children as a native array
     *
     * @return array
     */
    public function toArray()
    {
        $data = parent::toArray();
        $data['children'] = $this->children->toArray();
        return $data;
    }
}
