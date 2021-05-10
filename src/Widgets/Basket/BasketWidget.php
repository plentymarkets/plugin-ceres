<?php

namespace Ceres\Widgets\Basket;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class BasketWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Basket.BasketWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::BasketWidget")
            ->withLabel("Widget.basketLabel")
            ->withPreviewImageUrl("/images/widgets/basket.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::BASKET)
            ->withPosition(100)
            ->withSearchKeyWords([
                "warenkorb", "basket"
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
        $settingsFactory->createAppearance();

        $settingsFactory->createCheckboxGroup("basketDetailsData")
            ->withName("Widget.basketDetailsDataLabel")
            ->withDefaultValue(["basket.item.availability"])
            ->withCheckboxValues(
                ValueListFactory::make()
                    ->addEntry("basket.item.item_id", "Widget.basketDetailsDataItemId")
                    ->addEntry("basket.item.customNumber", "Widget.basketDetailsDataCustomNumber")
                    ->addEntry("basket.item.availability", "Widget.basketDetailsDataAvailability")
                    ->addEntry("basket.item.description_long", "Widget.basketDetailsDataDescriptionLong")
                    ->addEntry("basket.item.description_short", "Widget.basketDetailsDataDescriptionShort")
                    ->toArray()
            );

        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
