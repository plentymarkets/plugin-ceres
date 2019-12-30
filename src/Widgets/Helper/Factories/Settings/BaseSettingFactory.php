<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

/**
 * Class BaseSettingFactory
 *
 * Base factory class to generate widget settings.
 * Contains interfaces for all common properties of a setting.
 *
 * @package Ceres\Widgets\Helper\Factories\Settings
 */
class BaseSettingFactory
{
    protected $data = [];

    public static function create($data = [])
    {
        /** @var BaseSettingFactory $instance */
        $instance = pluginApp(BaseSettingFactory::class);
        $instance->data = $data;
        return $instance;
    }

    /**
     * Set the type of the setting.
     *
     * @param string    $type
     * @return $this
     */
    public function withType($type)
    {
        $this->data['type'] = $type;
        return $this;
    }

    /**
     * Set an option for the setting.
     *
     * @param string    $key        The option key
     * @param mixed     $value      The option value
     * @return $this
     */
    public function withOption($key, $value)
    {
        $this->data['options'] = $this->data['options'] ?? [];
        $this->data['options'][$key] = $value;
        return $this;
    }

    /**
     * Set the default value for the setting.
     *
     * @param array|mixed    $defaultValue   The default value
     * @return $this
     */
    public function withDefaultValue($defaultValue)
    {
        $this->data['defaultValue'] = $defaultValue;
        return $this;
    }

    /**
     * Set a condition if the setting should be visible or not.
     *
     * @param string    $condition  Condition if the related form element should be visible or not.
     * @return $this
     */
    public function withCondition($condition)
    {
        $this->data['isVisible'] = $condition;
        return $this;
    }

    /**
     * Set the name of the setting.
     *
     * @param string $name  The label of the setting
     * @return $this
     */
    public function withName($name)
    {
        return $this->withOption("name", $name);
    }

    /**
     * Set a tooltip text for this input
     *
     * @param string $tooltip   An additional description of the setting
     * @return $this
     */
    public function withTooltip($tooltip)
    {
        return $this->withOption("tooltipText", $tooltip);
    }

    /**
     * Determines whether the declaration is used to render a list of the specified form field.
     *
     * @param int $min  Minimum number of entries.
     * @param int $max  Maximum number of entries. If not set or smaller than 0, unlimited entries might be added by the user.
     * @return $this
     */
    public function withList($min = 0, $max = 0)
    {
        if($min < 0) {
            $min = 0;
        }

        if($min <= 0 && $max <= 0) {
            $this->data['isList'] = true;
        } else {
            if($max <= 0) {
                $this->data['isList'] = "[{$min},]";
            } else {
                $this->data['isList'] = "[{$min}, {$max}]";
            }
        }
        return $this;
    }

    /**
     * Get all data as a native array
     *
     * @return array
     */
    public function toArray()
    {
        return $this->data;
    }
}
