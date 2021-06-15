<?php

namespace Ceres\Widgets\Header;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class LanguageDetectionWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Header.LanguageDetectionWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::LanguageDetectionWidget")
            ->withLabel("Widget.languageDetectionWidgetLabel")
            /*
             * TODO: replace the image with a proper one
             */
            ->withPreviewImageUrl("/images/widgets/top-bar.svg")
            ->withType(WidgetTypes::HEADER)
            ->withCategory(WidgetCategories::HEADER)
            ->withPosition(0)
            ->withAllowedNestingTypes(
                [
                    WidgetTypes::STRUCTURE,
                    WidgetTypes::STATIC,
                    WidgetTypes::DEFAULT,
                    WidgetTypes::ITEM_SEARCH
                ]
            )
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
        $settingsFactory->createAppearance();
        $settingsFactory->createCheckbox("redirect")
            ->withDefaultValue(false)
            ->withName("Widget.languageDetectionRedirect");

        return $settingsFactory->toArray();
    }
}
