<?php

namespace Ceres\Widgets\Presets;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;

/**
 * Class DefaultNewsletterUnsubscribePreset
 *
 * This is a preset for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular preset generates a page for unsubscribing the customer from a newsletter. It contains:
 * - ThreeColumnWidget
 * - InlineTextWidget
 * - NewsletterUnsubscribeWidget
 *
 * @package Ceres\Widgets\Presets
 */
class DefaultNewsletterUnsubscribePreset implements ContentPreset
{
    /**
     * @inheritDoc
     */
    public function getWidgets()
    {
        /** @var PresetHelper */
        $preset = pluginApp(PresetHelper::class);

        /** @var PresetWidgetFactory $row */
        $row = $preset
            ->createWidget("Ceres::ThreeColumnWidget")
            ->withSetting("customClass", "")
            ->withSetting("layout", "oneToTwoToOne");

        $row->createChild("second", "Ceres::InlineTextWidget")
            ->withSetting("text", '<h1>{{ trans("Ceres::Template.newsletterOptOutTitle") }}</h1><p>{{ trans("Ceres::Template.newsletterOptOutInfoText") }}</p>')
            ->withSetting("customClass", "");

        $row->createChild("second", "Ceres::NewsletterUnsubscribeWidget")
            ->withSetting("customClass", "")
            ->withSetting("appearance", "primary");

        return $preset->toArray();
    }
}
