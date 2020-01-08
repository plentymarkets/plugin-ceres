<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class ValueListFactory
{
    private $valueList;

    /**
     * @return ValueListFactory
     */
    public static function make()
    {
        /** @var ValueListFactory $instance */
        $instance = pluginApp(ValueListFactory::class);
        return $instance;
    }

    /**
     * @param $value
     * @param $caption
     * @return ValueListFactory
     */
    public function addEntry($value, $caption)
    {
        $this->valueList[] = [
            'value' => $value,
            'caption' => $caption
        ];
        return $this;
    }

    public function toArray()
    {
        return $this->valueList;
    }
}