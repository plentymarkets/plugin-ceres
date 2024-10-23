<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ManufacturerDataWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Common.ManufacturerDataWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ManufacturerDataWidget")
            ->withLabel("Widget.manufacturerLabel")
            ->withPreviewImageUrl("/images/widgets/manufacturer-filter.svg")
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::TEXT)
            ->withPosition(800)
            ->withDeprecated()
            ->withSearchKeyWords([
                "text", "produzentin"
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
        $settings->createAppearance(true);
        $settings->createCodeEditor("text")
            ->withName("Widget.textCodeEditorLabel");

        $settings->createCheckbox('customPadding')
            ->withName('Widget.widgetCustomPadding');

        $settings->createSetting('padding')
            ->withType('spacing')
            ->withCondition('!!customPadding')
            ->withOption('units', ['px', 'rem'])
            ->withOption('direction', 'all');

        $settings->createCheckbox('customMargin')
            ->withName('Widget.widgetCustomMargin');

        $settings->createSetting('margin')
            ->withType('spacing')
            ->withCondition('!!customMargin')
            ->withOption('units', ['px', 'rem'])
            ->withOption('direction', 'all');

        return $settings->toArray();
    }
}