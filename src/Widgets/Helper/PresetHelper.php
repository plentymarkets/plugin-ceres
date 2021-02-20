<?php

namespace Ceres\Widgets\Helper;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;

class PresetHelper
{
    private $widgetFactories = [];
    
    /**
     * @param string $identifier The identifier of the widget to create
     * @return PresetWidgetFactory
     */
    public function createWidget($identifier)
    {
        /** @var PresetWidgetFactory $widgetFactory */
        $widgetFactory = pluginApp( PresetWidgetFactory::class );
        $widgetFactory->identifier = $identifier;
        $this->widgetFactories[] = $widgetFactory;
        return $widgetFactory;
    }
    
    /**
     * Return the widget factory as an array
     * @return array
     */
    public function toArray()
    {
        return array_map(function($widgetFactory)
        {
            /** @var PresetWidgetFactory $widgetFactory */
            return $widgetFactory->toArray();
        }, $this->widgetFactories);
    }
}
