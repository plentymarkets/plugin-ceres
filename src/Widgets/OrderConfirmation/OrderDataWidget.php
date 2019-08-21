<?php

namespace Ceres\Widgets\OrderConfirmation;

use Ceres\Widgets\Helper\BaseWidget;
use IO\Services\OrderService;

class OrderDataWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.OrderConfirmation.OrderDataWidget";
    
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        if($isPreview)
        {
            /** @var OrderService $orderService */
            $orderService = pluginApp(OrderService::class);
            $order = $orderService->getRandomOrder();
            
            return [
                'data' => $order,
                'totals' => $order->totals,
                'showAdditionalPaymentInformation' => true
            ];
        }
    }
}
