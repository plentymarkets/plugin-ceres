<?php

namespace Ceres\Widgets\OrderConfirmation;

use Ceres\Widgets\Helper\BaseWidget;
use IO\Builder\Order\OrderType;
use IO\Services\OrderService;
use Plenty\Modules\Order\Contracts\OrderRepositoryContract;

class OrderConfirmationBaseWidget extends BaseWidget
{
    /**
     * @inheritdoc
     */
    protected function getPreviewData($widgetSettings)
    {
        /** @var OrderService $orderService */
        $orderService = pluginApp(OrderService::class);
        /** @var OrderRepositoryContract $orderRepo */
        $orderRepo = pluginApp(OrderRepositoryContract::class);
        $filters['orderType'] = OrderType::ORDER;
        $orderRepo->setFilters($filters);
        $order = $orderService->findOrderById(
            $orderRepo->searchOrders(1, 1)
                ->getResult()
                ->first()['id']
        );

        return [
            'data' => $order->toArray(),
            'totals' => $order->totals,
            'showAdditionalPaymentInformation' => true
        ];
    }
}