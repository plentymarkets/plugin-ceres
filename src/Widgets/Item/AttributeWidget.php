<?php

namespace Ceres\Widgets\Item;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class AttributeWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Item.AttributeWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::AttributeWidget")
            ->withLabel("Widget.attributeLabel")
            ->withPreviewImageUrl("/images/widgets/attribute.svg")
            ->withType(WidgetTypes::SET_COMPONENT)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(100)
            ->withSearchKeyWords([
                "item", "artikel", "article", "attribute", "eigenschaft"
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
        $settingsFactory->createCheckbox("forceContent")
            ->withName("Widget.attributeForceContentLabel")
            ->withTooltip("Widget.attributeForceContentTooltip")
            ->withDefaultValue(false);

        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
