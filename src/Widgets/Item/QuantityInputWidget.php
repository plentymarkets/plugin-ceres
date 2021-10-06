<?php

namespace Ceres\Widgets\Item;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class QuantityInputWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = 'Ceres::Widgets.Item.QuantityInputWidget';

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::QuantityInputWidget')
            ->withLabel("Widget.quantityInputLabel")
            ->withPreviewImageUrl("/images/widgets/quantity-input.svg")
            ->withType(WidgetTypes::SET_COMPONENT_ONLY)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(200)
            ->withSearchKeyWords([
                "item", "artikel", "article", "menge", "quantity"
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
        $settingsFactory->createAppearance(true)
                 ->withDefaultValue('none');
        $settingsFactory->createAlignment();
        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
