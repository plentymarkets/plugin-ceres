<?php

namespace Ceres\Widgets\Helper\Factories;

class PresetWidgetFactory
{
    public $identifier = "";

    public $settings = [];

    public $children = [];

    /**
     * @param string    $key
     * @param mixed     $value
     * @return PresetWidgetFactory
     */
    public function withSetting($key, $valueMobile, $valueTalet = null, $valueDesktop = null, $valueLargeDesktop = null )
    {
        $this->mergeValue($this->settings, $key, [
            'mobile'        => $valueMobile,
            'tablet'        => $valueTalet ?? $valueMobile,
            'desktop'       => $valueDesktop ?? $valueMobile,
            'largeDesktop'  => $valueLargeDesktop ?? $valueMobile
        ]);

        return $this;
    }


    /**
     * @param string    $dropzone
     * @param string    $identifier
     * @return PresetWidgetFactory
     */
    public function createChild($dropzone, $identifier)
    {
        /** @var PresetWidgetFactory $childWidgetFactory */
        $childWidgetFactory = pluginApp(PresetWidgetFactory::class);
        $childWidgetFactory->identifier = $identifier;

        if ( !array_key_exists($dropzone, $this->children) )
        {
            $this->children[$dropzone] = [];
        }
        $this->children[$dropzone][] = $childWidgetFactory;

        return $childWidgetFactory;
    }

    /**
     * @param mixed     $obj
     * @param string    $key
     * @param mixed     $value
     */
    private function mergeValue(&$obj, $key, $value)
    {
        $keyList = explode(".", $key );
        $nextKey = array_shift($keyList);
        if ( !is_null($nextKey) )
        {
            if ( count($keyList) )
            {
                $this->mergeValue($obj[$nextKey], implode(".", $keyList), $value );
            }
            else
            {
                $obj[$nextKey] = $value;
            }
        }
    }

    public function toArray()
    {
        $children = [];
        foreach( $this->children as $dropzone => $childList )
        {
            $children[$dropzone] = [];
            /** @var PresetWidgetFactory $child */
            foreach($childList as $child)
            {
                $children[$dropzone][] = $child->toArray();
            }
        }
        return [
            'identifier'     => $this->identifier,
            'widgetSettings' => $this->settings,
            'children'       => $children
        ];
    }
}