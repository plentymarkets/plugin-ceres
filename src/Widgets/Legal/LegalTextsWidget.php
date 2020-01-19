<?php

namespace Ceres\Widgets\Legal;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class LegalTextsWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Legal.LegalTextsWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::LegalTextsWidget")
            ->withLabel("Widget.legalTextsLabel")
            ->withPreviewImageUrl("/images/widgets/legal-texts.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withPosition(200)
            ->toArray();
    }
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);
        $settings->createCustomClass();

        $settings->createSelect("type")
            ->withDefaultValue("cancellationRights")
            ->withName("Widget.legalTextsType")
            ->withTooltip("Widget.legalTextsTypeTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("cancellationRights", "Widget.legalTextsTypeValueCancellationRights")
                    ->addEntry("cancellationForm", "Widget.legalTextsTypeValueCancellationForm")
                    ->addEntry("legalDisclosure", "Widget.legalTextsTypeValueLegalDisclosure")
                    ->addEntry("privacyPolicy", "Widget.legalTextsTypeValuePrivacyPolicy")
                    ->addEntry("gtc", "Widget.legalTextsTypeValueGTC")
                    ->toArray()
            );

        $settings->createSpacing(false, true);

        return $settings->toArray();
    }
}
