<?php

namespace Ceres\Widgets\Checkout;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class GtcCheckWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Checkout.GtcCheckWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::GtcCheckWidget")
            ->withLabel("Widget.gtcCheckLabel")
            ->withPreviewImageUrl("/images/widgets/gtc-check.svg")
            ->withType(WidgetTypes::CHECKOUT)
            ->withCategory(WidgetCategories::CHECKOUT)
            ->withPosition(400)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createAppearance();

        $settings->createCheckbox("hideCheckbox")
            ->withDefaultValue(false)
            ->withName("Widget.gtcCheckHideCheckboxLabel");
        // missing tooltip

        $settings->createCheckbox("isPreselected")
            ->withCondition("hideCheckbox !== true")
            ->withDefaultValue(false)
            ->withName("Widget.gtcCheckIsPreselectedLabel");
        // missing tooltip

        $settings->createCheckbox("isRequired")
            ->withCondition("hideCheckbox !== true")
            ->withDefaultValue(true)
            ->withName("Widget.gtcCheckIsRequiredLabel");
        // missing tooltip

        $settings->createCodeEditor("customText")
            ->withDefaultValue("")
            ->withName("Widget.gtcCheckCustomTextLabel");
        // missing tooltip

        $settings->createSpacing(false, true);

        return $settings->toArray();
    }
}
