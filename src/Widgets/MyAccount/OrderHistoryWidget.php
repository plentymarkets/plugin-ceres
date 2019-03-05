<?php

namespace Ceres\Widgets\MyAccount;

class OrderHistoryWidget extends OrderHistoryBaseWidget
{
    protected $template = "Ceres::Widgets.MyAccount.OrderHistoryWidget";

    protected function getItemsPerPage($widgetSettings)
    {
        return $widgetSettings["ordersPerPage"]["mobile"] ?? 5;
    }
}
