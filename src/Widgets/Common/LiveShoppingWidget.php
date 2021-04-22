<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class LiveShoppingWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Common.LiveShoppingWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::LiveShoppingWidget")
            ->withLabel("Widget.liveShoppingLabel")
            ->withPreviewImageUrl("/images/widgets/live-shopping.svg")
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(800)
            ->withSearchKeyWords([
                "live", "shopping", "liveshopping", "angebot", "angebote", "sell"
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

        $settings->createSelect("liveShoppingSelection")
            ->withDefaultValue(1)
            ->withName("Widget.liveShoppingSelectionLabel")
            ->withTooltip("Widget.liveShoppingSelectionTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry(1, "Widget.liveShoppingSelectionValue1")
                    ->addEntry(2, "Widget.liveShoppingSelectionValue2")
                    ->addEntry(3, "Widget.liveShoppingSelectionValue3")
                    ->addEntry(4, "Widget.liveShoppingSelectionValue4")
                    ->addEntry(5, "Widget.liveShoppingSelectionValue5")
                    ->addEntry(6, "Widget.liveShoppingSelectionValue6")
                    ->addEntry(7, "Widget.liveShoppingSelectionValue7")
                    ->addEntry(8, "Widget.liveShoppingSelectionValue8")
                    ->addEntry(9, "Widget.liveShoppingSelectionValue9")
                    ->addEntry(10, "Widget.liveShoppingSelectionValue10")
                    ->toArray()
            );

        $settings->createSelect("sorting")
            ->withDefaultValue("sorting.price.avg_asc")
            ->withName("Widget.liveShoppingSortingLabel")
            ->withTooltip("Widget.liveShoppingSortingTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("sorting.price.avg_asc", "Widget.itemPrice_asc")
                    ->addEntry("sorting.price.avg_desc", "Widget.itemPrice_desc")
                    ->addEntry("variation.createdAt_desc", "Widget.itemVariationCreateTimestamp_desc")
                    ->addEntry("variation.createdAt_asc", "Widget.itemVariationCreateTimestamp_asc")
                    ->addEntry("variation.availability.averageDays_asc", "Widget.itemAvailabilityAverageDays_asc")
                    ->addEntry("variation.availability.averageDays_desc", "Widget.itemAvailabilityAverageDays_desc")
                    ->addEntry("variation.number_asc", "Widget.itemVariationCustomNumber_asc")
                    ->addEntry("variation.number_desc", "Widget.itemVariationCustomNumber_desc")
                    ->addEntry("variation.updatedAt_asc", "Widget.itemVariationLastUpdateTimestamp_asc")
                    ->addEntry("variation.updatedAt_desc", "Widget.itemVariationLastUpdateTimestamp_desc")
                    ->addEntry("item.manufacturer.externalName_asc", "Widget.itemProducerName_asc")
                    ->addEntry("item.manufacturer.externalName_desc", "Widget.itemProducerName_desc")
                    ->addEntry("item.random", "Widget.itemRandom")
                    ->toArray()
            );

        $settings->createCheckbox("showTimer")
            ->withDefaultValue(true)
            ->withName("Widget.liveShoppingShowTimerLabel");

        $settings->createCheckbox("showTimerProgress")
            ->withCondition("showTimer === true")
            ->withDefaultValue(true)
            ->withName("Widget.liveShoppingShowTimerProgressLabel");

        $settings->createCheckbox("showStock")
            ->withDefaultValue(true)
            ->withName("Widget.liveShoppingShowStockLabel");

        $settings->createCheckbox("showStockProgress")
            ->withCondition("showStock === true")
            ->withDefaultValue(true)
            ->withName("Widget.liveShoppingShowStockProgressLabel");

        $settings->createCheckbox("showCrossPrice")
            ->withDefaultValue(true)
            ->withName("Widget.liveShoppingShowCrossPriceLabel");

        $settings->createFile("customImagePath")
            ->withDefaultValue("")
            ->withName("Widget.liveShoppingCustomImagePathLabel")
            ->withTooltip("Widget.liveShoppingCustomImagePathTooltip");

        $settings->createSpacing();

        return $settings->toArray();
    }

    /**
     * @inheritDoc
     */
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        return [
            'liveShoppingConfig' => $this->transformWidgetSettings($widgetSettings)
        ];
    }

    private function transformWidgetSettings($widgetSettings)
    {
        $transformedSettings = [];
        foreach($widgetSettings as $key => $setting)
        {
            $transformedSettings[$key] = $setting['mobile'];
        }

        return $transformedSettings;
    }
}
