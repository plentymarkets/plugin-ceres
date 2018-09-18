<?php

namespace Ceres\Widgets\Helper;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;

class PresetHelper
{
    private $widgetFactories = [];

    public function createWidget($identifier)
    {
        /** @var PresetWidgetFactory $widgetFactory */
        $widgetFactory = pluginApp( PresetWidgetFactory::class );
        $widgetFactory->identifier = $identifier;
        $this->widgetFactories[] = $widgetFactory;
        return $widgetFactory;
    }

    public function toArray()
    {
        return array_map(function($widgetFactory)
        {
            /** @var PresetWidgetFactory $widgetFactory */
            return $widgetFactory->toArray();
        }, $this->widgetFactories);
    }
}