<?php

namespace Ceres\Widgets\Checkout;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class GtcCheckWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Checkout.GtcCheckWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::GtcCheckWidget")
            ->withLabel("Widget.gtcCheckLabel")
            ->withPreviewImageUrl("/images/widgets/gtc-check.svg")
            ->withType(WidgetTypes::CHECKOUT)
            ->withCategory(WidgetCategories::CHECKOUT)
            ->withPosition(400)
            ->withMaxPerPage(1)
            ->withSearchKeyWords([
                "checkout", "bestellvorgang", "bestellung", "zahlungsmittel", "zahlung", "payment"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createAppearance();

        $settings->createCheckbox("hideCheckbox")
            ->withDefaultValue(false)
            ->withName("Widget.gtcCheckHideCheckboxLabel")
            ->withTooltip("Widget.gtcCheckHideCheckboxTooltip");

        $settings->createCheckbox("isPreselected")
            ->withCondition("hideCheckbox !== true")
            ->withDefaultValue(false)
            ->withName("Widget.gtcCheckIsPreselectedLabel")
            ->withTooltip("Widget.gtcCheckIsPreselectedTooltip");

        $settings->createCheckbox("isRequired")
            ->withCondition("hideCheckbox !== true")
            ->withDefaultValue(true)
            ->withName("Widget.gtcCheckIsRequiredLabel")
            ->withTooltip("Widget.gtcCheckIsRequiredTooltip");

        $settings->createCodeEditor("customText")
            ->withDefaultValue("")
            ->withName("Widget.gtcCheckCustomTextLabel")
            ->withTooltip("Widget.gtcCheckCustomTextTooltip");

        $settings->createSpacing(false, true);

        return $settings->toArray();
    }
}
