<?php

namespace Ceres\Widgets\Helper\Factories;

class PresetWidgetFactory
{
    public $identifier = "";

    public $settings = [];

    public $children = [];

    public function withSetting($key, $value)
    {
        if ( $this->isBreakpointList($value) )
        {
            $this->mergeValue($this->settings, $key, $value );
        }
        else
        {
            $this->mergeValue($this->settings, $key, [
                'mobile'        => $value,
                'tablet'        => $value,
                'desktop'       => $value,
                'largeDesktop'  => $value
            ]);
        }

        return $this;
    }

    public function withChild($dropzone, $childWidget)
    {
        if ( !array_key_exists($dropzone, $this->children) )
        {
            $this->children[$dropzone] = [];
        }
        $this->children[$dropzone][] = $childWidget;

        return $this;
    }

    private function isBreakpointList($obj)
    {
        return array_key_exists('mobile', $obj)
            && array_key_exists('tablet', $obj)
            && array_key_exists('desktop', $obj)
            && array_key_exists('largeDesktop', $obj);
    }

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
        return [
            'identifier'     => $this->identifier,
            'widgetSettings' => $this->settings,
            'children'       => $this->children
        ];
    }
}