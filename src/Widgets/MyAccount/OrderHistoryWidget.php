<?php

namespace Ceres\Widgets\MyAccount;

class OrderHistoryWidget extends OrderHistoryBaseWidget
{
    protected $template = "Ceres::Widgets.MyAccount.OrderHistoryWidget";

    protected function getItemsPerPage($widgetSettings)
    {
        return $widgetSettings["ordersPerPage"]["mobile"] ?? 5;
    }

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $previewData = null;

        if ( $isPreview )
        {
            $previewData = $this->mockPaginatedResult(
                function($i)
                {
                    return [
                        "id"            => $i,
                        "total"         => rand(100, 100000) / 100,
                        "status"        => $this->getRandomStatusName(),
                        "creationDate"  => date("Y-m-d H:i:s")
                    ];
                },
                $widgetSettings["ordersPerPage"]["mobile"] ?? 5

            );
        }

        return [
            "previewData" => $previewData
        ];
    }
}
