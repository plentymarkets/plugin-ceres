<?php

namespace Ceres\Widgets\Item;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ItemImageWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Item.ItemImageWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ItemImageWidget")
            ->withLabel("Widget.itemImageLabel")
            ->withPreviewImageUrl("/images/widgets/item-image.svg")
            ->withType(WidgetTypes::ITEM)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(200)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();
        $settingsFactory->createAppearance();
        $settingsFactory->createSelect("animationStyle")
            ->withName("Widget.itemImageAnimationStyleLabel")
            ->withTooltip("Widget.itemImageAnimationStyleTooltip")
            ->withDefaultValue("standard")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("standard", "Widget.itemImageAnimationStyleSlide")
                    ->addEntry("fade-out", "Widget.itemImageAnimationStyleFade")
                    ->toArray()
            );

        $settingsFactory->createNumber("maxQuantity")
            ->withName("Widget.itemImageMaxQuantityLabel")
            ->withTooltip("Widget.itemImageMaxQuantityTooltip")
            ->withDefaultValue(10);

        $settingsFactory->createSelect("imageSize")
            ->withName("Widget.itemImageSizeLabel")
            ->withTooltip("Widget.itemImageTooltip")
            ->withDefaultValue("urlMiddle")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("urlPreview", "Widget.itemImageSizePreview")
                    ->addEntry("urlSecondPreview", "Widget.itemImageSizeSecondPreview")
                    ->addEntry("urlMiddle", "Widget.itemImageSizeMiddle")
                    ->addEntry("url", "Widget.itemImageSizeFull")
                    ->toArray()
            );

        $settingsFactory->createCheckbox("showThumbs")
            ->withName("Widget.itemImageShowThumbsLabel")
            ->withTooltip("Widget.itemImageShowThumbsTooltip")
            ->withDefaultValue(true);

        $settingsFactory->createCheckbox("showDots")
            ->withName("Widget.itemImageShowDotsLabel")
            ->withTooltip("Widget.itemImageShowDotsTooltip")
            ->withDefaultValue(true);

        return $settingsFactory->toArray();
    }
}
