<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class ValueListFactory
{
    private $valueList;

    public function addEntry($key, $caption)
    {
        $this->valueList[] = [$key => $caption];
        return $this;
    }

    public function toArray()
    {
        return $this->valueList;
    }
}