<?php

namespace Ceres\Widgets\Presets\Helper;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;

trait HasWhiteBackground
{
    /** @var PresetWidgetFactory */
    protected $backgroundWidget;

    /**
     * @param PresetHelper $preset
     *
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
     * @param string $identifier
     *
     * @return PresetWidgetFactory
     */
    public function createWidget($identifier)
    {
        return $this->backgroundWidget->createChild("background", $identifier);
    }
}