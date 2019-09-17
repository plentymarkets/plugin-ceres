<?php

namespace Ceres\Widgets\Presets;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;

class WishListPreset implements ContentPreset
{
    public function getWidgets()
    {
        /** @var PresetHelper */
        $preset = pluginApp(PresetHelper::class);

        $preset->createWidget("Ceres::InlineTextWidget")
               ->withSetting("text", '<h1>{{ trans("Ceres::Template.wishList") }}</h1>')
               ->withSetting("customClass", "bg-white")
               ->withSetting("appearance", "none")
               ->withSetting("spacing.customPadding", true)
               ->withSetting("spacing.padding.top.value", 4)
               ->withSetting("spacing.padding.top.unit", null)
               ->withSetting("spacing.padding.bottom.value", 3)
               ->withSetting("spacing.padding.bottom.unit", null)
               ->withSetting("spacing.padding.left.value", 3)
               ->withSetting("spacing.padding.left.unit", null)
               ->withSetting("spacing.padding.right.value", 3)
               ->withSetting("spacing.padding.right.unit", null)
               ->withSetting("spacing.customMargin", true)
               ->withSetting("spacing.margin.top.value", 5)
               ->withSetting("spacing.margin.top.unit", null);

        $preset->createWidget("Ceres::SeparatorWidget")
               ->withSetting('customClass', '')
               ->withSetting("customMargin", true)
               ->withSetting("margin.top.value", 0)
               ->withSetting("margin.top.unit", null)
               ->withSetting("margin.bottom.value", 0)
               ->withSetting("margin.bottom.unit", null);
               
        $preset->createWidget("Ceres::WishListWidget")
               ->withSetting("customClass", "bg-white")
               ->withSetting("appearance", "primary")
               ->withSetting("itemDetailsData", ["wishListItem.variation.availability"])
               ->withSetting("spacing.customPadding", true)
               ->withSetting("spacing.padding.top.value", 3)
               ->withSetting("spacing.padding.top.unit", null)
               ->withSetting("spacing.padding.bottom.value", 4)
               ->withSetting("spacing.padding.bottom.unit", null)
               ->withSetting("spacing.padding.left.value", 3)
               ->withSetting("spacing.padding.left.unit", null)
               ->withSetting("spacing.padding.right.value", 3)
               ->withSetting("spacing.padding.right.unit", null);

        return $preset->toArray();
    }
}
