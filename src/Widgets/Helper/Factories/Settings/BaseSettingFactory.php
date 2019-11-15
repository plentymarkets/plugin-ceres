<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

class BaseSettingFactory
{
    protected $data = [];

    protected function withType($type)
    {
        $this->data['type'] = $type;
        return $this;
    }

    protected function withOption($key, $value)
    {
        $this->data['options'] = $this->data['options'] ?? [];
        $this->data['options'][$key] = $value;
        return $this;
    }

    public function withDefaultValue($defaultValue)
    {
        $this->data['defaultValue'] = $defaultValue;
        return $this;
    }

    public function withCondition($condition)
    {
        $this->data['isVisible'] = $condition;
        return $this;
    }

    public function withName($name)
    {
        return $this->withOption("name", $name);
    }

    public function toArray()
    {
        return $this->data;
    }
}