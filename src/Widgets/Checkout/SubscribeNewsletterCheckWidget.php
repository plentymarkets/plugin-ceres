<?php

namespace Ceres\Widgets\Checkout;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class SubscribeNewsletterCheckWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Checkout.SubscribeNewsletterCheckWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::SubscribeNewsletterCheckWidget")
            ->withLabel("Widget.subscribeNewsletterCheckLabel")
            ->withPreviewImageUrl("/images/widgets/newsletter-subscription-check.svg")
            ->withType(WidgetTypes::CHECKOUT)
            ->withCategory(WidgetCategories::CHECKOUT)
            ->withPosition(600)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();

        $settings->createNumber("emailFolder")
            ->withDefaultValue("")
            ->withName("Widget.subscribeNewsletterCheckEmailFolderLabel");

        $settings->createCheckbox("hideCheckbox")
            ->withDefaultValue(false)
            ->withName("Widget.subscribeNewsletterCheckHideCheckboxTooltip");
        // missing tooltip

        $settings->createCheckbox("isPreselected")
            ->withCondition("hideCheckbox !== true")
            ->withDefaultValue(false)
            ->withName("Widget.subscribeNewsletterCheckIsPreselectedLabel");
        // missing tooltip

        $settings->createCheckbox("isRequired")
            ->withCondition("hideCheckbox !== true")
            ->withDefaultValue(true)
            ->withName("Widget.subscribeNewsletterCheckIsRequiredLabel");
        // missing tooltip

        $settings->createCodeEditor("customText")
            ->withDefaultValue("")
            ->withName("Widget.subscribeNewsletterCheckCustomTextLabel");
        // missing tooltip

        $settings->createSpacing(false, true);

        return $settings->toArray();
    }
}
