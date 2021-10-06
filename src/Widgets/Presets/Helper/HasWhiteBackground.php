<?php

namespace Ceres\Widgets\Presets\Helper;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;

/**
 * Trait HasWhiteBackground
 *
 * This is a helper trait for presets for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular helper provides a preconfigured white background widget.
 *
 * @package Ceres\Widgets\Presets\Helper
 */
trait HasWhiteBackground
{
    /** @var PresetWidgetFactory $backgroundWidget The background widget */
    protected $backgroundWidget;

    /**
     * Creates a preconfigured white background widget
     * @param PresetHelper $preset
     * @return PresetWidgetFactory
     */
    public function createBackground($preset)
    {
        $this->backgroundWidget = $this->setBackgroundWidgetSettings(
            $preset->createWidget("Ceres::BackgroundWidget")
        );
        return $this->backgroundWidget;
    }

    /**
     * Configures a background widget
     * @param PresetWidgetFactory $widget
     * @return PresetWidgetFactory
     */
    public function setBackgroundWidgetSettings($widget)
    {
        return $widget
            ->withSetting('fullWidth', false)
            ->withSetting('colorPalette', 'white')
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 4)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 4)
            ->withSetting("spacing.padding.bottom.unit", null)
            ->withSetting("spacing.padding.left.value", 4)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 4)
            ->withSetting("spacing.padding.right.unit", null)
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.top.value", 5)
            ->withSetting("spacing.margin.top.unit", null)
            ->withSetting("spacing.margin.bottom.value", 5)
            ->withSetting("spacing.margin.bottom.unit", null);
    }

    /**
     * Creates the background widget with an identifier
     * @param string $identifier
     * @return PresetWidgetFactory
     */
    public function createWidget($identifier)
    {
        return $this->backgroundWidget->createChild("background", $identifier);
    }
}
