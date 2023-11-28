<?php

namespace Ceres\Widgets\OrderConfirmation;

use Ceres\Widgets\Helper\BaseWidget;
use IO\Services\Order\Factories\OrderResultFactory;

class OrderConfirmationBaseWidget extends BaseWidget
{
    /**
     * @inheritdoc
     */
    protected function getPreviewData($widgetSettings)
    {
        /** @var OrderResultFactory $orderResultFactory */
        $orderResultFactory = pluginApp(OrderResultFactory::class);
        $order = $orderResultFactory->fillOrderResult();

        return json_decode(json_encode([
            'data' => $order,
            'totals' => $order['totals'],
            'showAdditionalPaymentInformation' => true
        ]));
    }
}
