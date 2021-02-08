<?php

namespace Ceres\Widgets\Presets;

use Ceres\Widgets\Helper\PresetHelper;
use Ceres\Widgets\Presets\Helper\HasWhiteBackground;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;

/**
 * Class WishListPreset
 *
 * This is a preset for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular preset generates a page for viewing the customer's wishlist. It contains:
 * - InlineTextWidget
 * - BackgroundWidget
 * - SeparatorWidget
 * - WishListWidget
 *
 * @package Ceres\Widgets\Presets
 */
class WishListPreset implements ContentPreset
{
    use HasWhiteBackground;
    
    /**
     * @inheritDoc
     */
    public function getWidgets()
    {
        /** @var PresetHelper */
        $preset = pluginApp(PresetHelper::class);

        $this->createBackground($preset);

        $this->createWidget("Ceres::InlineTextWidget")
            ->withSetting("text", '<h1>{{ trans("Ceres::Template.wishList") }}</h1>')
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 0)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 0)
            ->withSetting("spacing.padding.bottom.unit", null)
            ->withSetting("spacing.padding.left.value", 0)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 0)
            ->withSetting("spacing.padding.right.unit", null);

        $this->createWidget("Ceres::SeparatorWidget");

        $this->createWidget("Ceres::WishListWidget")
            ->withSetting("appearance", "primary")
            ->withSetting("itemDetailsData", ["wishListItem.variation.availability"]);

        return $preset->toArray();
    }
}
