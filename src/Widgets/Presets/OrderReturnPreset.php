<?php

namespace Ceres\Widgets\Presets;

use Ceres\Widgets\Helper\PresetHelper;
use Ceres\Widgets\Presets\Helper\HasWhiteBackground;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;

/**
 * Class OrderReturnPreset
 *
 * This is a preset for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular preset generates a page for viewing the order return form. It contains:
 * - InlineTextWidget
 * - OrderReturnWidget
 *
 * @package Ceres\Widgets\Presets
 */
class OrderReturnPreset implements ContentPreset
{
    /** @var PresetHelper */
    private $preset;

    use HasWhiteBackground;
    
    /**
     * @inheritDoc
     */
    public function getWidgets()
    {
        $this->preset = pluginApp(PresetHelper::class);

        $this->createBackground($this->preset);

        $this->createWidget("Ceres::InlineTextWidget")
            ->withSetting("text", '<h1>{{ trans("Ceres::Template.return") }}</h1>')
            ->withSetting("appearance", "none")
            ->withSetting("customClass", "")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.left.value", 0)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 0)
            ->withSetting("spacing.padding.right.unit", null);

        $this->createWidget("Ceres::OrderReturnWidget")
            ->withSetting("appearance", "primary")
            ->withSetting("customClass", "")
            ->withSetting("itemDetailsData", ["availability"]);

            return $this->preset->toArray();
    }
}
