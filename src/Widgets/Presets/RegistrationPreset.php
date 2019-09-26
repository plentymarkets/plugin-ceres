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

        $popper = "<h1>{{ trans('Ceres::Template.regRegisterAccount') }}<popper v-cloak class='float-right' style='z-index:1;'><template #handle><button class='btn btn-icon btn-secondary btn-sm'><i class='fa fa-info'></i></button></template><template #title>{{ trans('Ceres::Template.regContactInformations') }}</template><template #content><ul class='pl-3'><li class='mb-3'>{{ trans('Ceres::Template.regContactInfoText1') }}</li><li class='mb-3'>{{ trans('Ceres::Template.regContactInfoText2') }}</li><li class='mb-3'>{{ trans('Ceres::Template.regContactInfoText3') }}</li><li>{{ trans('Ceres::Template.regContactInfoText4') }}</li></ul></template></popper></h1>";

        $threeColumnWidget->createChild("second", "Ceres::CodeWidget")
                          ->withSetting("text", $popper)
                          ->withSetting("appearance", "none")
                          ->withSetting("customClass", "")
                          ->withSetting("spacing.customMargin", true)
                          ->withSetting("spacing.margin.top.value", 4)
                          ->withSetting("spacing.margin.top.unit", null)
                          ->withSetting("spacing.margin.bottom.value", 3)
                          ->withSetting("spacing.margin.bottom.unit", null);

        $threeColumnWidget->createChild("second", "Ceres::RegistrationWidget")
                          ->withSetting("customClass", "");

        return $preset->toArray();
    }
}
