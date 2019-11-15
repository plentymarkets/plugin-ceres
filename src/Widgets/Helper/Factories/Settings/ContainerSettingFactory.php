<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;

class ContainerSettingFactory extends GenericSettingFactory
{
    /** @var WidgetSettingsFactory $children */
    public $children;

    public function __construct()
    {
        parent::__construct();
        $this->children = pluginApp(WidgetSettingsFactory::class);
    }

    public function toArray()
    {
        $data = parent::toArray();
        $data['children'] = $this->children->toArray();
    }
}