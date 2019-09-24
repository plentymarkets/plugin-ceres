<?php

namespace Ceres\Widgets\OrderConfirmation;

use IO\Services\Order\Factories\OrderResultFactory;

class OrderReturnWidget extends OrderConfirmationBaseWidget
{
    protected $template = "Ceres::Widgets.OrderConfirmation.OrderReturnWidget";

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
