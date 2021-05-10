<?php

namespace Ceres\Widgets\OrderConfirmation;

use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use IO\Services\Order\Factories\OrderResultFactory;

class OrderReturnWidget extends OrderConfirmationBaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.OrderConfirmation.OrderReturnWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::OrderReturnWidget")
            ->withLabel("Widget.orderReturnLabel")
            ->withPreviewImageUrl("/images/widgets/order-return.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::ORDER_CONFIRMATION)
            ->withPosition(500)
            ->withSearchKeyWords([
                "order", "bestellung", "retoure"
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
        $settings->createAppearance();

        $settings->createCheckboxGroup("itemDetailsData")
            ->withDefaultValue([])
            ->withName("Widget.basketDetailsDataLabel")
            ->withCheckboxValues(
                ValueListFactory::make()
                    ->addEntry("item_id", "Widget.basketDetailsDataItemId")
                    ->addEntry("custom_number", "Widget.basketDetailsDataCustomNumber")
                    ->addEntry("availability", "Widget.basketDetailsDataAvailability")
                    ->addEntry("description_long", "Widget.basketDetailsDataDescriptionLong")
                    ->addEntry("description_short", "Widget.basketDetailsDataDescriptionShort")
                    ->toArray()
            );

        $settings->createButtonSize();
        $settings->createSpacing(false, true);

        return $settings->toArray();
    }

    /**
     * @inheritdoc
     */
    protected function getPreviewData($widgetSettings)
    {
        /** @var OrderResultFactory $orderResultFactory */
        $orderResultFactory = pluginApp(OrderResultFactory::class);
        $order = $orderResultFactory->fillOrderResult();

        return [
            'orderData' => $order,
        ];
    }
}
