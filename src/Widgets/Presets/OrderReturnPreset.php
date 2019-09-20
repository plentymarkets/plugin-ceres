<?php

namespace Ceres\Widgets\Presets;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;

class OrderReturnPreset implements ContentPreset
{
    public function getWidgets()
    {
        /** @var PresetHelper */
        $preset = pluginApp(PresetHelper::class);

        $preset->createWidget("Ceres::InlineTextWidget")
            ->withSetting("text", '<h1>{{ trans("Ceres::Template.return") }}</h1>')
            ->withSetting("appearance", "none")
            ->withSetting("customClass", "")
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.left.value", 0)
            ->withSetting("spacing.margin.left.unit", null);

        $preset->createWidget("Ceres::OrderReturnWidget")
            ->withSetting("appearance", "primary")
            ->withSetting("customClass", "")
            ->withSetting("itemDetailsData", "availability");

        return $preset->toArray();
    }
}
