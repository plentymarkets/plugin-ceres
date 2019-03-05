<?php

namespace Ceres\Widgets\MyAccount;

class OrderReturnHistoryWidget extends OrderHistoryBaseWidget
{
    protected $template = "Ceres::Widgets.MyAccount.OrderHistoryWidget";

    protected function getItemsPerPage($widgetSettings)
    {
        return $widgetSettings["returnsPerPage"]["mobile"] ?? 5;
    }
}
