<?php

namespace Ceres\Widgets\Item;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class WishListWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Item.WishListWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::WishListWidget")
            ->withLabel("Widget.wishListLabel")
            ->withPreviewImageUrl("/images/widgets/wish-list.svg")
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(700)
            ->withSearchKeyWords([
                "item", "artikel", "article", "wishlist", "add", "wunschliste"
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
        $settingsFactory->createCheckboxGroup("itemDetailsData")
            ->withName("Widget.wishListItemDetailsDataLabel")
            ->withDefaultValue(["wishListItem.variation.availability"])
            ->withCheckboxValues(
                ValueListFactory::make()
                    ->addEntry("wishListItem.item.id", "Widget.wishListItemDetailsDataItemId")
                    ->addEntry("wishListItem.variation.number", "Widget.wishListItemDetailsDataCustomNumber")
                    ->addEntry("wishListItem.variation.availability", "Widget.wishListItemDetailsDataAvailability")
                    ->addEntry("wishListItem.texts.description", "Widget.wishListItemDetailsDataDescriptionLong")
                    ->addEntry("wishListItem.texts.shortDescription", "Widget.wishListItemDetailsDataDescriptionShort")
                    ->toArray()
            );

        $settingsFactory->createSpacing();

        return $settingsFactory->toArray();
    }
}
