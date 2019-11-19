<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

/**
 * Class GenericSettingFactory
 *
 * This factory is used to create generic widget settings.
 * It just makes the generic methods `withType` and `withOptions` public visible.
 *
 * @package Ceres\Widgets\Helper\Factories\Settings
 */
class GenericSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
    }

    /**
     * @inheritDoc
     */
    public function withType($type)
    {
        /** @var static $self */
        $self = parent::withType($type);
        return $self;
    }

    /**
     * @inheritDoc
     */
    public function withOption($key, $value)
    {
        /** @var static $self */
        $self = parent::withOption($key, $value);
        return $self;
    }
}