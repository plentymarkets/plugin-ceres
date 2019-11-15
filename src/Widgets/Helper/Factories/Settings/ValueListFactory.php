<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class ValueListFactory
{
    private $valueList;

    public function addEntry($value, $caption)
    {
        $this->valueList[] = [
            "value" => $value,
            "caption" => $caption
        ];
        return $this;
    }

    public function toArray()
    {
        return $this->valueList;
    }
}