<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;

/**
 * Class ContainerSettingFactory
 *
 * This class extends the GenericSettingsFactory by adding child settings.
 *
 * @package Ceres\Widgets\Helper\Factories\Settings
 */
class ContainerSettingFactory extends GenericSettingFactory
{
    /**
     * @var WidgetSettingsFactory $children
     *
     * Nested settings which are grouped inside a container.
     */
    public $children;

    public function __construct()
    {
        parent::__construct();
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