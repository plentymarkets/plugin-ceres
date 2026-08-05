<?php

namespace Ceres\Widgets\Checkout;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class GuaranteeLabelWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Checkout.GuaranteeLabelWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::GuaranteeLabelWidget")
            ->withLabel("Widget.guaranteeLabelLabel")
            ->withPreviewImageUrl("/images/widgets/guarantee-label.svg")
            ->withType(WidgetTypes::CHECKOUT)
            ->withCategory(WidgetCategories::CHECKOUT)
            ->withPosition(450)
            ->withMaxPerPage(1)
            ->withSearchKeyWords([
                "guarantee", "garantie", "gewährleistung", "eu", "2025/1960", "legal", "harmonised", "label"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();

        $settingsFactory->createCheckbox("useBlackAndWhite")
            ->withDefaultValue(false)
            ->withName("Widget.guaranteeLabelUseBlackAndWhiteLabel")
            ->withTooltip("Widget.guaranteeLabelUseBlackAndWhiteTooltip");

        $settingsFactory->createSpacing();

        return $settingsFactory->toArray();
    }
}
