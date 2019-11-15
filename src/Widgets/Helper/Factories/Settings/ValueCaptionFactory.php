<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class ValueCaptionFactory
{
    private $valueList;

    public function addEntry($key, $value)
    {
        $this->valueList[] = [$key => $value];
        return $this;
    }

    public function toArray()
    {
        return $this->valueList;
    }
}