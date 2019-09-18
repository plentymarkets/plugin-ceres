<?php

namespace Ceres\Widgets\Presets;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;

class RegistrationPreset implements ContentPreset
{
    public function getWidgets()
    {
        /** @var PresetHelper */
        $preset = pluginApp(PresetHelper::class);

        /** @var PresetWidgetFactory $row */
        $threeColumnWidget = $preset->createWidget("Ceres::ThreeColumnWidget")
                                    ->withSetting("customClass", "")
                                    ->withSetting("layout", "oneToTwoToOne");

        $popper = "<popper v-cloak class='float-right' style='padding-top:18px; z-index:1;'><template #handle><button class='btn btn-icon btn-secondary btn-sm'><i class='fa fa-info'></i></button></template><template #title>{{ trans('Ceres::Template.regContactInformations') }}</template><template #content><ul class='pl-3'><li class='mb-3'>{{ trans('Ceres::Template.regContactInfoText1') }}</li><li class='mb-3'>{{ trans('Ceres::Template.regContactInfoText2') }}</li><li class='mb-3'>{{ trans('Ceres::Template.regContactInfoText3') }}</li><li>{{ trans('Ceres::Template.regContactInfoText4') }}</li></ul></template></popper>";

        $threeColumnWidget->createChild("second", "Ceres::CodeWidget")
                          ->withSetting("text", $popper)
                          ->withSetting("appearance", "none")
                          ->withSetting("customClass", "");

        $threeColumnWidget->createChild("second", "Ceres::InlineTextWidget")
                          ->withSetting("text", '<h1>{{ trans("Ceres::Template.regRegisterAccount") }}</h1>')
                          ->withSetting("customClass", "")
                          ->withSetting("appearance", "none")
                          ->withSetting("spacing.customPadding", true)
                          ->withSetting("spacing.padding.top.value", 3)
                          ->withSetting("spacing.padding.top.unit", null)
                          ->withSetting("spacing.padding.bottom.value", 3)
                          ->withSetting("spacing.padding.bottom.unit", null)
                          ->withSetting("spacing.padding.right.value", 0)
                          ->withSetting("spacing.padding.right.unit", null)
                          ->withSetting("spacing.padding.left.value", 0)
                          ->withSetting("spacing.padding.left.unit", null);

        $threeColumnWidget->createChild("second", "Ceres::RegistrationWidget")
                          ->withSetting("customClass", "");

        return $preset->toArray();
    }
}
