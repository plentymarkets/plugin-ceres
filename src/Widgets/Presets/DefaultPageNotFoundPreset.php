<?php

namespace Ceres\Widgets\Presets;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Translation\Translator;

/**
 * Class DefaultPageNotFoundPreset
 *
 * This is a preset for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular preset generates a page for viewing the 404 errors. It contains:
 * - TwoColumnWidget
 * - InlineTextWidget
 * - SeparatorWidget
 * - LinkWidget
 *
 * @package Ceres\Widgets\Presets
 */
class DefaultPageNotFoundPreset implements ContentPreset
{
    /**
     * @inheritDoc
     */
    public function getWidgets()
    {
        /** @var PresetHelper */
        $preset = pluginApp(PresetHelper::class);
        
        /** @var Translator */
        $translator = pluginApp(Translator::class);

        /** @var PresetWidgetFactory $row */
        $row = $preset
            ->createWidget("Ceres::TwoColumnWidget")
            ->withSetting("customClass", "")
            ->withSetting("layout", "oneToOne")
            ->withSetting("layoutTablet", "oneToOne")
            ->withSetting("layoutMobile", "stackedMobile");

        $row->createChild("first", "Ceres::InlineTextWidget")
            ->withSetting("text", '<h1>{{ trans("Ceres::Template.pageNotFoundOops") }}</h1><p>{{ trans("Ceres::Template.pageNotFoundPage") }}</p>')
            ->withSetting("customClass", "")
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 5)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 0)
            ->withSetting("spacing.padding.bottom.unit", null)
            ->withSetting("spacing.padding.left.value", 0)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 0)
            ->withSetting("spacing.padding.right.unit", null);

        $row->createChild("first", "Ceres::SeparatorWidget")
            ->withSetting("customClass", "");

        $row->createChild("first", "Ceres::LinkWidget")
            ->withSetting("text", $translator->trans("Ceres::Template.pageNotFoundHomepage"))
            ->withSetting("customClass", "")
            ->withSetting("appearance", "primary")
            ->withSetting("size", "md")
            ->withSetting("block", false)
            ->withSetting("url.type", "external")
            ->withSetting("url.value", "/");

        $row->createChild("second", "Ceres::InlineTextWidget")
            ->withSetting("text", '<p class="align-right">404</p>')
            ->withSetting("customClass", "not-found-text")
            ->withSetting("appearance", "none");

        return $preset->toArray();
    }
}
