<?php

namespace Ceres\Widgets\Grid;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class AdditionalInformationWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Grid.AdditionalInformationWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::AdditionalInformationWidget")
            ->withLabel("Widget.additionalInformationLabel")
            ->withPreviewImageUrl("/images/widgets/additional-information.svg")
            ->withType(WidgetTypes::STRUCTURE)
            ->withCategory(WidgetCategories::STRUCTURE)
            ->withPosition(600)
            ->withSearchKeyWords([
                "grid", "struktur", "information", "additional", "weitere", "informationen"
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

        $settings->createText("title")
            ->withDefaultValue("")
            ->withName("Widget.additionalInformationTitleLabel");

        $settings->createSelect("placement")
            ->withDefaultValue("auto")
            ->withName("Widget.additionalInformationPlacementLabel")
            ->withTooltip("Widget.additionalInformationPlacementTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("auto", "Widget.additionalInformationPlacementAuto")
                    ->addEntry("top", "Widget.additionalInformationPlacementTop")
                    ->addEntry("bottom", "Widget.additionalInformationPlacementBottom")
                    ->addEntry("left", "Widget.additionalInformationPlacementLeft")
                    ->addEntry("right", "Widget.additionalInformationPlacementRight")
                    ->toArray()
            );

        $settings->createSelect("size")
            ->withDefaultValue("")
            ->withName("Widget.additionalInformationSizeLabel")
            ->withTooltip("Widget.additionalInformationSizeTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("", "Widget.additionalInformationSizeSmall")
                    ->addEntry("popover-md", "Widget.additionalInformationSizeMedium")
                    ->addEntry("popover-lg", "Widget.additionalInformationSizeLarge")
                    ->toArray()
            );

        $settings->createIcon()->withDefaultValue("fa-info");
        $settings->createButtonSize();
        $settings->createSpacing();

        return $settings->toArray();
    }
}
