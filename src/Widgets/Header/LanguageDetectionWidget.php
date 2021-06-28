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
            ->withPreviewImageUrl("/images/widgets/language-detection.svg")
            ->withType(WidgetTypes::HEADER)
            ->withCategory(WidgetCategories::HEADER)
            ->withPosition(100)
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
        $settingsFactory->createAppearance(true)
            ->withDefaultValue("primary");
        $settingsFactory->createCheckbox("redirect")
            ->withDefaultValue(false)
            ->withName("Widget.languageDetectionRedirect");

        $spacingContainer = $settingsFactory->createVerticalContainer('spacing')
            ->withName('Widget.widgetSpacing');

        $spacingContainer->children->createCheckbox('customPadding')
                ->withName('Widget.widgetCustomPadding');

        $spacingContainer->children->createSetting('padding')
                ->withType('spacing')
                ->withCondition('!!spacing.customPadding')
                ->withOption(
                    'units',
                    [
                        'px',
                        'rem'
                    ]
                )
                ->withOption('direction', 'all');

        $spacingContainer->children->createCheckbox('customMargin')
                ->withName('Widget.widgetCustomMargin');

        $spacingContainer->children->createSetting('margin')
                ->withType('spacing')
                ->withCondition('!!spacing.customMargin')
                ->withOption(
                    'units',
                    [
                        'px',
                        'rem'
                    ]
                )
                ->withOption('direction', 'vertical');

        return $settingsFactory->toArray();
    }
}
