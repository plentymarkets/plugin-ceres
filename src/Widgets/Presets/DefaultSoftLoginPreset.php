<?php

namespace Ceres\Widgets\Presets;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;

/**
 * Class DefaultSoftLoginPreset
 *
 * This is a preset for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular preset generates a page for changing the customer's password. It contains:
 * - ThreeColumnWidget
 * - InlineTextWidget
 * - ChangePasswordWidget
 *
 * @package Ceres\Widgets\Presets
 */
class DefaultSoftLoginPreset implements ContentPreset
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

        $row->createChild("second", "Ceres::SoftLoginWidget")->withSetting('appearance', 'primary');
        return $preset->toArray();
    }
}
