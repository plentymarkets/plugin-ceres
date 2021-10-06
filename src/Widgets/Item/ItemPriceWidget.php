<?php

namespace Ceres\Widgets\Item;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ItemPriceWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Item.ItemPriceWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ItemPriceWidget")
            ->withLabel("Widget.itemPriceLabel")
            ->withPreviewImageUrl("/images/widgets/item-price.svg")
            ->withType(WidgetTypes::ITEM)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(400)
            ->withSearchKeyWords([
                "item", "artikel", "article", "price", "preis"
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
        $settingsFactory->createAppearance(true);
        $settingsFactory->createCheckbox("showCrossPrice")
            ->withName("Widget.showCrossPriceLabel")
            ->withDefaultValue(true);

        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
