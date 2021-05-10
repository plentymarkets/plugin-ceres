<?php

namespace Ceres\Widgets\Item;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use IO\Services\ItemListService;

class ItemSetWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Item.ItemSetWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ItemSetWidget")
            ->withLabel("Widget.itemSetLabel")
            ->withPreviewImageUrl("/images/widgets/item-set.svg")
            ->withType(WidgetTypes::SET_ITEM)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(0)
            ->withSearchKeyWords([
                "item", "artikel", "article", "set"
            ])
            ->withMaxPerPage(1)
            ->withAllowedNestingTypes(
                [
                    WidgetTypes::STRUCTURE,
                    WidgetTypes::STATIC,
                    WidgetTypes::ITEM,
                    WidgetTypes::SET_COMPONENT,
                    WidgetTypes::SET_COMPONENT_ONLY
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
        $settingsFactory->createSpacing();

        return $settingsFactory->toArray();
    }
}
